module.exports = {
  async rewrites() {
    return [
      {
        source: '/en',
        destination: '/',
      },
      {
        source: '/campaign/en',
        destination: '/campaign',
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
