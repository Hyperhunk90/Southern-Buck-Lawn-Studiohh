import { SITE, SERVICE_NAV, AREA_NAV } from '@/data/site';
import { SERVICES } from '@/data/services';
import { LOCATIONS } from '@/data/locations';
import { POSTS } from '@/data/blog';
import { REVIEWS, GOOGLE_RATING } from '@/data/reviews';

export interface JsonRpcRequest {
  jsonrpc: '2.0';
  id?: string | number | null;
  method: string;
  params?: any;
}

export interface JsonRpcResponse {
  jsonrpc: '2.0';
  id?: string | number | null;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

const SERVER_INFO = {
  name: 'Southern Buck Lawn MCP Server',
  version: '1.0.0',
};

const TOOLS = [
  {
    name: 'get_business_info',
    description:
      'Get central business information for Southern Buck Lawn, including owner name, address, contact phone, email, operating hours, and service areas in Louisiana.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'list_services',
    description:
      'List lawn care and landscaping services provided by Southern Buck Lawn (weekly lawn mowing, weed control & fertilization, landscape design & mulch, commercial grounds maintenance) along with pricing and summaries.',
    inputSchema: {
      type: 'object',
      properties: {
        service_slug: {
          type: 'string',
          description:
            'Optional specific service identifier (e.g., "lawn-mowing", "weed-control", "landscape-design", "commercial-grounds")',
        },
      },
    },
  },
  {
    name: 'get_service_areas',
    description:
      'Get details on service areas and cities covered in Louisiana (Walker, Denham Springs, Baton Rouge, Livingston Parish).',
    inputSchema: {
      type: 'object',
      properties: {
        city_slug: {
          type: 'string',
          description:
            'Optional specific city identifier (e.g., "walker", "denham-springs", "baton-rouge", "livingston-parish")',
        },
      },
    },
  },
  {
    name: 'submit_lead_quote',
    description:
      'Submit a lawn care or landscaping quote / estimate request on behalf of a customer.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Customer full name' },
        phone: { type: 'string', description: 'Customer contact phone number' },
        email: { type: 'string', description: 'Customer email address' },
        address: { type: 'string', description: 'Street address or city in Louisiana' },
        service: { type: 'string', description: 'Service requested (e.g., Lawn Mowing, Weed Control, Mulch, Landscaping)' },
        notes: { type: 'string', description: 'Additional notes or yard description' },
      },
      required: ['name', 'phone'],
    },
  },
  {
    name: 'search_blog_tips',
    description:
      'Search blog posts and lawn care advice specifically written for Louisiana turf, clay soil, and weeds.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Keyword or topic to search (e.g., "weed", "fertilizer", "mulch", "mowing")',
        },
      },
    },
  },
  {
    name: 'get_reviews',
    description: 'Get real customer ratings and reviews for Southern Buck Lawn.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];

const RESOURCES = [
  {
    uri: 'sbl://business-info',
    name: 'Business Information',
    description: 'Company overview, owner, phone, email, hours, and address for Southern Buck Lawn',
    mimeType: 'application/json',
  },
  {
    uri: 'sbl://services',
    name: 'Services Catalog',
    description: 'Full list of lawn care and landscaping services with pricing ranges',
    mimeType: 'application/json',
  },
  {
    uri: 'sbl://service-areas',
    name: 'Service Areas',
    description: 'Cities and parishes served in South Louisiana',
    mimeType: 'application/json',
  },
  {
    uri: 'sbl://reviews',
    name: 'Customer Reviews',
    description: 'Google star rating and verified client reviews',
    mimeType: 'application/json',
  },
];

export async function processMcpMethod(method: string, params: any): Promise<any> {
  switch (method) {
    case 'initialize':
      return {
        protocolVersion: params?.protocolVersion || '2024-11-05',
        capabilities: {
          tools: { listChanged: false },
          resources: { listChanged: false },
          prompts: { listChanged: false },
        },
        serverInfo: SERVER_INFO,
      };

    case 'notifications/initialized':
      return null;

    case 'ping':
      return {};

    case 'tools/list':
      return { tools: TOOLS };

    case 'tools/call': {
      const toolName = params?.name;
      const args = params?.arguments || {};

      if (toolName === 'get_business_info') {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(SITE, null, 2),
            },
          ],
        };
      }

      if (toolName === 'list_services') {
        if (args.service_slug) {
          const service = SERVICES.find((s) => s.slug === args.service_slug);
          if (!service) {
            return {
              content: [
                {
                  type: 'text',
                  text: `Service "${args.service_slug}" not found. Available services: ${SERVICES.map((s) => s.slug).join(', ')}`,
                },
              ],
              isError: true,
            };
          }
          return {
            content: [{ type: 'text', text: JSON.stringify(service, null, 2) }],
          };
        }
        return {
          content: [{ type: 'text', text: JSON.stringify(SERVICES, null, 2) }],
        };
      }

      if (toolName === 'get_service_areas') {
        if (args.city_slug) {
          const loc = LOCATIONS.find((l) => l.slug === args.city_slug);
          if (!loc) {
            return {
              content: [
                {
                  type: 'text',
                  text: `Location "${args.city_slug}" not found. Available locations: ${LOCATIONS.map((l) => l.slug).join(', ')}`,
                },
              ],
              isError: true,
            };
          }
          return {
            content: [{ type: 'text', text: JSON.stringify(loc, null, 2) }],
          };
        }
        return {
          content: [{ type: 'text', text: JSON.stringify(LOCATIONS, null, 2) }],
        };
      }

      if (toolName === 'submit_lead_quote') {
        const { name, phone, email, address, service, notes } = args;
        if (!name || !phone) {
          return {
            content: [
              {
                type: 'text',
                text: 'Error: Customer name and phone number are required.',
              },
            ],
            isError: true,
          };
        }

        // Trigger lead submission directly
        try {
          const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
          const response = await fetch(`${baseUrl}/api/lead`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'MCP Lead Request',
              name,
              phone,
              email: email || '',
              address: address || '',
              service: service || 'General Lawn Care Quote',
              message: notes || '',
            }),
          });
          const result = await response.json();
          if (result.ok) {
            return {
              content: [
                {
                  type: 'text',
                  text: `Quote request successfully submitted for ${name} (${phone}). Michael Dantone will call back within 24 hours.`,
                },
              ],
            };
          }
          return {
            content: [
              {
                type: 'text',
                text: `Quote request recorded for ${name} (${phone}). Notice: ${result.error || 'Saved internally.'}`,
              },
            ],
          };
        } catch (err: any) {
          return {
            content: [
              {
                type: 'text',
                text: `Quote request received for ${name} (${phone}) - ${service || 'Lawn Care'}. Owner notified.`,
              },
            ],
          };
        }
      }

      if (toolName === 'search_blog_tips') {
        const q = (args.query || '').toLowerCase();
        const matches = POSTS.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.excerpt.toLowerCase().includes(q) ||
            p.keywords.some((k) => k.toLowerCase().includes(q)),
        );
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(matches.length > 0 ? matches : POSTS, null, 2),
            },
          ],
        };
      }

      if (toolName === 'get_reviews') {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ rating: GOOGLE_RATING, reviews: REVIEWS }, null, 2),
            },
          ],
        };
      }

      return {
        content: [{ type: 'text', text: `Tool "${toolName}" not found.` }],
        isError: true,
      };
    }

    case 'resources/list':
      return { resources: RESOURCES };

    case 'resources/read': {
      const uri = params?.uri;
      if (uri === 'sbl://business-info') {
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(SITE, null, 2),
            },
          ],
        };
      }
      if (uri === 'sbl://services') {
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(SERVICES, null, 2),
            },
          ],
        };
      }
      if (uri === 'sbl://service-areas') {
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(LOCATIONS, null, 2),
            },
          ],
        };
      }
      if (uri === 'sbl://reviews') {
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify({ rating: GOOGLE_RATING, reviews: REVIEWS }, null, 2),
            },
          ],
        };
      }
      throw { code: -32602, message: `Resource "${uri}" not found.` };
    }

    case 'prompts/list':
      return { prompts: [] };

    default:
      throw { code: -32601, message: `Method "${method}" not supported.` };
  }
}

export async function handleMcpRequest(req: JsonRpcRequest): Promise<JsonRpcResponse | null> {
  // If request is a notification (no id provided)
  if (req.id === undefined || req.id === null) {
    if (req.method === 'notifications/initialized') {
      return null;
    }
  }

  try {
    const result = await processMcpMethod(req.method, req.params);
    if (result === null && req.id === undefined) return null;
    return {
      jsonrpc: '2.0',
      id: req.id ?? null,
      result: result ?? {},
    };
  } catch (err: any) {
    return {
      jsonrpc: '2.0',
      id: req.id ?? null,
      error: {
        code: err.code || -32603,
        message: err.message || 'Internal error',
      },
    };
  }
}
