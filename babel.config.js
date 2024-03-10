export default function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
      // eslint-disable-next-line no-undef
      require.resolve("expo-router/babel"),
    ],
  };
}
