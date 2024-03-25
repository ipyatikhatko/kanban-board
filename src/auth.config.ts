import type { NextAuthConfig } from 'next-auth';

export const authOptions = {
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isIndexPage = nextUrl.pathname === '/';

      //Redirect authorized users from index page to dashboard
      if (isIndexPage && isLoggedIn)
        return Response.redirect(new URL('/dashboard', nextUrl));

      // Allow index page (landing)
      if (isIndexPage && !isLoggedIn) return true;

      // Other pages are protected
      return isLoggedIn;
    },
  },
  providers: [],
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
