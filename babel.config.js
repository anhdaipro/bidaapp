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
          '@hook': './src/hook',
          '@typesModel': './src/types/model',
          '@api': './src/api',
          '@store': './src/store',
          '@navigation': './src/navigation',
          '@styles': './src/styles',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    ],
    // ⚠️ Reanimated plugin phải là dòng cuối cùng
    'react-native-reanimated/plugin',
  ],
};