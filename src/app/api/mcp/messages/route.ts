import { NextRequest } from 'next/server';
import { POST as mcpPost, OPTIONS as mcpOptions } from '../route';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  return mcpPost(req);
}

export async function OPTIONS() {
  return mcpOptions();
}
