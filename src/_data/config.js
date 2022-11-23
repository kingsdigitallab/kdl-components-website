const baseUrl = "/kdl-components-website/";
const paths = {
  assets: `${baseUrl}assets`,
  images: `${baseUrl}assets/images`,
  stylesheets: `${baseUrl}assets/stylesheets`,
};

module.exports = {
  baseUrl: baseUrl,
  title: "King's Digital Lab components website",
  description: "Components demo",
  url: `https://kingsdigitallab.github.io${baseUrl}`,
  author: "King's Digital Lab",
  twitter: "kingsdigitallab",
  feature: {
    image: `${paths.images}/logo.svg`,
    description: "Logo ipsum",
  },
  // SEO plugin options
  options: {
    titleDivider: "|",
    imageWithBaseUrl: true,
  },
  paths: { ...paths },
};
