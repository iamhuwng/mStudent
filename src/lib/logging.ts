// @module:platform-core @layer:api @owner:studio
import { randomUUID } from 'crypto';
import type { NextRequest, NextResponse } from 'next/server';

// >>> BEGIN gen:core.logging (layer:api)
function getRequestId(request: Request | NextRequest): string {
    return request.headers.get('x-request-id') || randomUUID();
}

function log(level: 'info' | 'error', event: string, requestId: string, details: object) {
    console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        level,
        event,
        requestId,
        ...details,
    }));
}

export function logApiRequest(request: Request | NextRequest) {
  const requestId = getRequestId(request);
  const { method, url } = request;
  const { pathname, searchParams } = new URL(url);

  log('info', 'API Request Start', requestId, {
      req: {
          method,
          url,
          pathname,
          searchParams: Object.fromEntries(searchParams),
      }
  });

  return requestId;
}

export function logApiResponse(
    requestId: string, 
    request: Request | NextRequest,
    response: { status: number; body: any }
) {
    const { method, url } = request;
    const { pathname } = new URL(url);
    const event = response.status >= 400 ? 'API Request Error' : 'API Request Success';
    const level = response.status >= 400 ? 'error' : 'info';
    
    log(level, event, requestId, {
        req: { method, url, pathname },
        res: response,
    });
}
// <<< END gen:core.logging
