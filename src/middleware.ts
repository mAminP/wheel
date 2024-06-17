import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Initialize a NextResponse object
    const nextResponse = NextResponse.next();
    const { pathname } = req.nextUrl;
    console.log("[middleware] nextUrl = ", pathname);

    let profile: any | null = req?.nextauth?.token?.user || null;

    function redirectTo(path: string) {
      return NextResponse.redirect(new URL(path, req.url), {
        status: 302,
      });
    }
    // if (pathname.startsWith("/login")) {
    //   if (profile && profile.me.roles.includes(Roles.User)) {
    //     return redirectTo("/profile");
    //   }
    //
    //   return nextResponse;
    // }
    //
    // if (pathname.startsWith("/profile")) {
    //   if (profile && (profile as ProfileQuery).me.roles.includes(Roles.User)) {
    //     return nextResponse;
    //   }
    //   if (profile && profile.me.roles.includes(Roles.Admin)) {
    //     return redirectTo("/admin");
    //   }
    //   return redirectTo("/login");
    // }

    return nextResponse;
  },
  {
    callbacks: {
      authorized({ req, token }) {
        return true;
      },
    },
    // pages: {
    //   signIn: "/login",
    //   newUser: "/login",
    //   error: "/error",
    //   signOut: "/logout",
    //   verifyRequest: "/verify",
    // },
  },
);

export const config = {
  matcher: [
    "/profile/:path*",
    "/admin/:path*",
    "/login/:path*",
    // {
    //   source: "/((?!_next/static|_next/image|favicon.ico).*)",
    //   missing: [{ type: "header", key: "Next-Action" }],
    // },
  ],
};
