/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io"],
  },

  webpack: (config, { dev, isServer }) => {
    config.mode = "production";

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // the solution
    };

    if (!dev && isServer) {
      const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
      config.plugins = [new HardSourceWebpackPlugin(), ...config.plugins];
    }

    return config;
  },
};

module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["utfs.io"],
//   },

//   webpack(config) {
//     config.resolve.fallback = {
//       ...config.resolve.fallback,
//       fs: false, // the solution
//     };

//     return config;
//   },
// };

// module.exports = nextConfig;
