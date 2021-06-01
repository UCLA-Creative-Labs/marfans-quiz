// next.config.js

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // Configure target to be serverless to allow netlify deploy
  target: 'serverless',

  // Fix against mixed content between http and https for assets
  assetPrefix: isProd ? 'https://quiz.creativelabsucla.com' : '',
  
  // SVG loader
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
};