module.exports = {
  async rewrites() {
    return [
      {
        source: '/en',
        destination: '/',
      },
    ];
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};
