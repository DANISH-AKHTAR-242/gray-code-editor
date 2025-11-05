import NextAuth from "next-auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
} from "@/routes";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Original: isApiAuthRoutes
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  // Original: isPublicRoutes
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  // Original: isAuthRoutes
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    // Corrected: was isApiAuthRoutes
    return null;
  }

  if (isAuthRoute) {
    // Corrected: was isAuthRoutes
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    // Corrected: was isPublicRoutes
    return Response.redirect(new URL("/auth/sign-in", nextUrl));
  }

  return null;
});

export const config = {
  // copied from clerk
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
