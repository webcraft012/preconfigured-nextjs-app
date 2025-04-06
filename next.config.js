/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: true,
  },
  transpilePackages: ["zustand"],
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "Content-Security-Policy",
  //           // For development, we'll allow both http and https for easier testing
  //           value: "frame-ancestors 'self' http: https:;",
  //         },
  //         // Add this header to ensure proper loading in dev mode
  //         {
  //           key: "X-Frame-Options",
  //           value: "ALLOW-FROM http:",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
