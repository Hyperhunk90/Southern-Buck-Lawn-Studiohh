import { NextRequest } from 'next/server';
import { GET as mcpGet, OPTIONS as mcpOptions } from '../route';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  return mcpGet(req);
}

export async function OPTIONS() {
  return mcpOptions();
}
