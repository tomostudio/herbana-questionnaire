module.exports = {
  async redirects() {
    return [
      {
        source: '/en',
        destination: '/',
        permanent: true,
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
