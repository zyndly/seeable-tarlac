/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/admin',
        destination: 'https://app.hygraph.com/4523b07f79a84b178e9662de3e0a97a1/master/content/6063f64fa3e34871b041ee251f0b9959/view/009bc1f6b3084fb38e2e781e4cac55e9',
        permanent: false,
      },
    ]
  },

  // media websites
  images: {
    domains: [
      'res.cloudinary.com',
      'media.graphassets.com',
    ],
  },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};
