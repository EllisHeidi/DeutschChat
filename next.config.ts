import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // typedRoutes disabled in Step 4: dynamic lesson routes (`/lesson/[u]/[l]`)
  // don't play well with literal-only Link hrefs. Revisit with a Route cast helper.
  typedRoutes: false,
};

export default nextConfig;
