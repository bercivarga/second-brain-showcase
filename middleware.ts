import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    // 👇 Leaving this here so that later I can adjust the middleware logic according to the project's needs
    // /^(?!\/notes).*/, // Match routes that don't start with "/notes"
    "/", // Match the root route
  ],
  // Routes that can always be accessed, and have
  // no authentication information
  // ignoredRoutes: ["/no-auth-in-this-route"],
});

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
