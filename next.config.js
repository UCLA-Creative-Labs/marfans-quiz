// next.config.js

const isProd = process.env.NODE_ENV === 'production';

console.log(isProd);

module.exports = {
  // Configure target to be serverless to allow netlify deploy
  target: 'serverless',

  // Fix against mixed content between http and https for assets
  assetPrefix: isProd ? 'https://quiz.creativelabsucla.com' : '',

  // Environment
  env: {
    NODE_ENV: process.env.NODE_ENV,
  },
  
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