const path = require("path");

module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  webpack: {
    alias: {
      apis: path.resolve(__dirname, "src/apis/"),
      components: path.resolve(__dirname, "src/components/"),
      hooks: path.resolve(__dirname, "src/hooks/"),
      types: path.resolve(__dirname, "src/types/"),
      utils: path.resolve(__dirname, "src/utils/"),
    },
  },
};
