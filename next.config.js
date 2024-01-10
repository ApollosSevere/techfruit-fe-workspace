/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  // webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = { fs: false };

  //   return config;
  // },
  // Can be safely removed in newer versions of Next.js
  // future: {
  //   // by default, if you customize webpack config, they switch back to version 4.
  //   // Looks like backward compatibility approach.
  //   webpack5: true,
  // },

  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // the solution
    };

    return config;
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/v1/:path*",
  //       destination: "http://localhost:8000/api/v1/:path*",
  //     },
  //   ];
  // },
  // async headers() {
  //   return [
  //     {
  //       // matching all API routes
  //       source: "/api/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value: "http://localhost:8000/:path*",
  //         }, // replace this your actual origin
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET,DELETE,PATCH,POST,PUT",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value:
  //             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  //         },
  //       ],
  //     },
  //   ];
  // },
  // async headers() {
  //   return [
  //     {
  //       // Routes this applies to
  //       source: "/api/(.*)",
  //       // Headers
  //       headers: [
  //         // Allow for specific domains to have access or * for all
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value: "*",
  //           // DOES NOT WORK
  //           // value: process.env.ALLOWED_ORIGIN,
  //         },
  //         // Allows for specific methods accepted
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET, POST, PUT, DELETE, OPTIONS",
  //         },
  //         // Allows for specific headers accepted (These are a few standard ones)
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value: "Content-Type, Authorization",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
