// https://babeljs.io/docs/en/configuration
// d3 (used by Mermaid, used by Diagram) uses import. Jest uses node, and node does not
// understand import yet.
module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "58",
          ie: "11",
          node: true
        }
        //   "loose": true
      }
    ],
    "@babel/react"
  ];
  const plugins = ["@babel/plugin-proposal-class-properties"];

  return {
    presets,
    plugins
  };
};
