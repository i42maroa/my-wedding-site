import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function proxy(request: NextRequest) {
  const { nextUrl } = request;

  // if (nextUrl.pathname.startsWith('/admin')) {
  //   const token = nextUrl.searchParams.get('token');
  //   const TOKEN_ESPERADO = process.env.TOKEN_ADMIN;

  //   if (token !== TOKEN_ESPERADO) {
  //     return NextResponse.redirect(new URL('/', request.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'
  ]
};
