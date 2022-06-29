/**
 * @jest-environment jsdom
 */

import React from 'react';
import {shallow} from 'enzyme';
import TermsAndConditions from '../components/TermsAndConditions';

const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

jest.mock('react-native-linear-gradient', () => 'LinearGradient');

describe('Check components/TermsAndConditions functionalities', () => {
  let wrapper: any;
  let Platform: any;

  beforeEach(() => {
    Platform = require('react-native').Platform;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should navigate to the "Settings"', () => {
    wrapper = shallow(<TermsAndConditions navigation={navigation} />);
    wrapper.find({'data-testid': 'nextButton'}).props().onPress();
    expect(navigation.navigate).toHaveBeenCalledTimes(1);
  });

  test('Should goBack', () => {
    wrapper = shallow(<TermsAndConditions navigation={navigation} />);
    wrapper.find({'data-testid': 'backButton'}).props().onPress();
    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });

  test('Style pageTitle with Android', () => {
    Platform.OS = 'android';
    const expected = {bottom: 20};
    wrapper = shallow(<TermsAndConditions navigation={navigation} />);
    const pageTitle = wrapper.find({'data-testid': 'pageTitle'}).props().style;
    expect(pageTitle).toEqual(
      expect.arrayContaining([expect.objectContaining(expected)]),
    );
  });

  test('Style pageTitle with ios', () => {
    Platform.OS = 'ios';
    const expected = {bottom: 40};
    wrapper = shallow(<TermsAndConditions navigation={navigation} />);
    const pageTitle = wrapper.find({'data-testid': 'pageTitle'}).props().style;
    expect(pageTitle).toEqual(
      expect.arrayContaining([expect.objectContaining(expected)]),
    );
  });
});
