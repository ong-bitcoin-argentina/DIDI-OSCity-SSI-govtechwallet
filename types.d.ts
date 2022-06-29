declare module 'react-native-dotenv';
declare module 'react-native-shadow-cards';
declare module '@env';
declare module 'react-native-sqlite-storage';
declare module 'react-test-renderer';
declare module 'lodash';
declare module 'enzyme';
declare module 'ts-jest/presets';
// declare module '@react-navigation/native-stack';
declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
