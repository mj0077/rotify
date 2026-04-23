import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      // Admin routes require authentication
      if (req.nextUrl.pathname.startsWith("/admin")) {
        // Allow access to login page without auth
        if (req.nextUrl.pathname === "/admin/login") {
          return true;
        }
        return !!token;
      }
      // All other routes are public
      return true;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
