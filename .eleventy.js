module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({"node_modules/bloch/dist/lib.js": "bloch/bloch.js"});
  return {
    dir: {
      output: "public"
    }
  };
};