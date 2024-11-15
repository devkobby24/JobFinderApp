module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-transform-export-namespace-from",
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env.local',
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
