import { NextRequest, NextResponse } from 'next/server';
import { handleMcpRequest, JsonRpcRequest } from '@/lib/mcp';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Active SSE sessions map
const sseSessions = new Map<string, ReadableStreamDefaultController>();

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, X-Requested-With, mcp-session-id, x-mcp-session-id',
  'Access-Control-Expose-Headers': 'Content-Type, Location',
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const acceptHeader = req.headers.get('accept') || '';

  // If client explicitly requests JSON only and NOT text/event-stream, return discovery doc
  if (acceptHeader.includes('application/json') && !acceptHeader.includes('text/event-stream')) {
    return NextResponse.json(
      {
        status: 'online',
        server: 'Southern Buck Lawn MCP Server',
        version: '1.0.0',
        mcp: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {}, resources: {}, prompts: {} },
        },
        endpoints: {
          sse: '/api/mcp',
          messages: '/api/mcp',
        },
      },
      { headers: corsHeaders },
    );
  }

  // Determine full absolute origin to build absolute SSE message endpoint URL
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || url.host;
  const proto = req.headers.get('x-forwarded-proto') || (url.protocol.startsWith('https') ? 'https' : 'http');
  const origin = `${proto}://${host}`;

  const sessionId = url.searchParams.get('sessionId') || crypto.randomUUID();
  const endpointUrl = `${origin}/api/mcp?sessionId=${sessionId}`;

  const stream = new ReadableStream({
    start(controller) {
      sseSessions.set(sessionId, controller);

      const encoder = new TextEncoder();
      // Send the MCP SSE endpoint event instructing client where to post messages
      controller.enqueue(encoder.encode(`event: endpoint\ndata: ${endpointUrl}\n\n`));

      // Periodic ping to keep connection alive
      const interval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: ping\n\n`));
        } catch {
          clearInterval(interval);
          sseSessions.delete(sessionId);
        }
      }, 15000);

      req.signal.addEventListener('abort', () => {
        clearInterval(interval);
        sseSessions.delete(sessionId);
      });
    },
    cancel() {
      sseSessions.delete(sessionId);
    },
  });

  return new Response(stream, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get('sessionId') || req.headers.get('mcp-session-id') || req.headers.get('x-mcp-session-id');

    const body = await req.json();

    if (Array.isArray(body)) {
      const responses = await Promise.all(
        body.map((item: JsonRpcRequest) => handleMcpRequest(item)),
      );
      const filtered = responses.filter((r) => r !== null);

      if (sessionId && sseSessions.has(sessionId)) {
        const controller = sseSessions.get(sessionId);
        if (controller) {
          const encoder = new TextEncoder();
          for (const resp of filtered) {
            controller.enqueue(
              encoder.encode(`event: message\ndata: ${JSON.stringify(resp)}\n\n`),
            );
          }
        }
        return new Response('Accepted', { status: 202, headers: corsHeaders });
      }

      return NextResponse.json(filtered, { headers: corsHeaders });
    }

    const response = await handleMcpRequest(body as JsonRpcRequest);

    // If an active SSE stream exists for this session, push response over SSE
    if (sessionId && sseSessions.has(sessionId)) {
      if (response) {
        const controller = sseSessions.get(sessionId);
        if (controller) {
          const encoder = new TextEncoder();
          controller.enqueue(
            encoder.encode(`event: message\ndata: ${JSON.stringify(response)}\n\n`),
          );
        }
      }
      return new Response('Accepted', { status: 202, headers: corsHeaders });
    }

    if (!response) {
      return new Response('Accepted', { status: 202, headers: corsHeaders });
    }

    return NextResponse.json(response, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id: null,
        error: { code: -32700, message: 'Parse error', data: err.message },
      },
      { status: 400, headers: corsHeaders },
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

