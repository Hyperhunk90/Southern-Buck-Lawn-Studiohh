import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import ts from 'typescript';
import nextConfig from '../next.config.mjs';

function* sourceFiles(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* sourceFiles(path);
    else if (entry.name.endsWith('.tsx')) yield path;
  }
}

test('every explicit image quality is accepted by the production optimizer', () => {
  const allowed = new Set(nextConfig.images.qualities);
  let checked = 0;
  for (const path of sourceFiles(join(process.cwd(), 'src'))) {
    const source = ts.createSourceFile(path, readFileSync(path, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    function visit(node) {
      if (ts.isJsxAttribute(node) && node.name.getText(source) === 'quality') {
        const value = node.initializer && ts.isJsxExpression(node.initializer)
          ? node.initializer.expression
          : node.initializer;
        assert.ok(value && (ts.isNumericLiteral(value) || ts.isStringLiteral(value)), `Review dynamic image quality in ${path}`);
        const quality = Number(value.text);
        assert.ok(allowed.has(quality), `${path} requests quality ${quality}, which would return HTTP 400 in production`);
        checked++;
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  assert.ok(checked > 0, 'the regression check must inspect image quality values');
});
