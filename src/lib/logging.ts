// @module:platform-core @layer:api @owner:studio
import { randomUUID } from 'crypto';
import type { NextRequest } from 'next/server';

// >>> BEGIN gen:core.logging (layer:api)
export function logApiRequest(request: Request | NextRequest) {
  const reqId = randomUUID();
  const { method, url } = request;
  const { pathname, searchParams } = new URL(url);

  console.log(JSON.stringify({
    level: 'info',
    message: 'API Request',
    timestamp: new Date().toISOString(),
    req: {
      id: reqId,
      method,
      url,
      pathname,
      searchParams: Object.fromEntries(searchParams),
    }
  }));

  return reqId;
}
// <<< END gen:core.logging
