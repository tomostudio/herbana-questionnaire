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
      {
        source: '/campaign/result/en',
        destination: '/campaign/result?lang=en',
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
