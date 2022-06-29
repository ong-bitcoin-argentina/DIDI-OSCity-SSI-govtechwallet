/**
 * @jest-environment jsdom
 */

import React from 'react';
import {shallow} from 'enzyme';
import PrivacyPolicy from '../components/PrivacyPolicy';

const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

jest.mock('react-native-linear-gradient', () => 'LinearGradient');

describe('Check components/PrivacyPolicy functionalities', () => {
  let wrapper: any;
  let Platform: any;

  beforeEach(() => {
    Platform = require('react-native').Platform;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should navigate to the "Settings"', () => {
    wrapper = shallow(<PrivacyPolicy navigation={navigation} />);
    wrapper.find({'data-testid': 'nextButton'}).props().onPress();
    expect(navigation.navigate).toHaveBeenCalledTimes(1);
  });

  test('Should goBack', () => {
    wrapper = shallow(<PrivacyPolicy navigation={navigation} />);
    wrapper.find({'data-testid': 'backButton'}).props().onPress();
    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });

  test('Style pageTitle with Android', () => {
    Platform.OS = 'android';
    const expected = {bottom: 20};
    wrapper = shallow(<PrivacyPolicy navigation={navigation} />);
    const pageTitle = wrapper.find({'data-testid': 'pageTitle'}).props().style;
    expect(pageTitle).toEqual(
      expect.arrayContaining([expect.objectContaining(expected)]),
    );
  });

  test('Style pageTitle with ios', () => {
    Platform.OS = 'ios';
    const expected = {bottom: 40};
    wrapper = shallow(<PrivacyPolicy navigation={navigation} />);
    const pageTitle = wrapper.find({'data-testid': 'pageTitle'}).props().style;
    expect(pageTitle).toEqual(
      expect.arrayContaining([expect.objectContaining(expected)]),
    );
  });
});
