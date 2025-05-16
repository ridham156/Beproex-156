import { NextRequest } from 'next/server';

export interface AuthRouteContext {
  params: {
    auth0: string[];
  };
}

export function getAuthRouteParams(req: NextRequest | Request): AuthRouteContext {
  const url = new URL(req.url);
  const path = url.pathname;
  const auth0Param = path.split('/').pop() || '';
  
  return {
    params: {
      auth0: [auth0Param],
    },
  };
}
