/**
 * An Array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  "/", // The homepage should be public
];

/**
 * An Array of routes that are protected
 * These routes require authentication
 * (Note: This array is not currently used in your middleware.ts)
 * @type {string[]}
 */
export const protectedRoutes: string[] = [
  "/dashboard", // /dashboard is now protected by default
];

/**
 * An Array of routes used for authentication
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */
export const authRoutes: string[] = ["/auth/sign-in"];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after a user logs in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard"; // Redirect to dashboard
