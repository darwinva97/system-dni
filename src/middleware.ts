export { default } from "next-auth/middleware";

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin", "/admin/:path*" /*, "/dni/:dni*"*/],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getServerAuthSession } from "./server/auth";

// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   getServerAuthSession(request)
//   if (!isAuthenticated(request)) {
//     // Respond with JSON indicating an error message
//     return Response.json(
//       { success: false, message: 'authentication failed' },
//       { status: 401 }
//     )
//   }
//   return NextResponse.redirect(new URL("/login", request.url));
// }