// const {defaults: tsjPreset} = require('ts-jest/presets');

module.exports = {
  preset: 'react-native',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!@react-native|react-native)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  cacheDirectory: '.jest/cache',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
