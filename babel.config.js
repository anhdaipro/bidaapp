module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@form': './src/form',
          '@screens': './src/screens',
          '@utils': './src/utils',
          // bạn có thể thêm nhiều alias khác như:
          '@hook': './src/hook',
          '@typesModel': './src/types/model',
          '@api': './src/api',
          '@store': './src/store',
          '@styles': './src/styles',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
      'react-native-reanimated/plugin',
    ],
  ],
};
