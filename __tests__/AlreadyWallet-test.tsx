/**
 * @jest-environment jsdom
 */

import React from 'react';
import {shallow} from 'enzyme';
import AlreadyWallet from '../components/AlreadyWallet';

const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

jest.mock('react-native-linear-gradient', () => 'LinearGradient');

describe('Check components/AlreadyWallet functionalities', () => {
  let wrapper: any;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should navigate to the "ImportKeys"', () => {
    wrapper = shallow(<AlreadyWallet navigation={navigation} />);
    wrapper.find({'data-testid': 'nextButton'}).props().onPress();
    expect(navigation.navigate).toHaveBeenCalledTimes(1);
  });

  test('Should navigate to the "WalletCreationLoader"', () => {
    wrapper = shallow(<AlreadyWallet navigation={navigation} />);
    wrapper.find({'data-testid': 'nextButtonBis'}).props().onPress();
    expect(navigation.navigate).toHaveBeenCalledTimes(1);
  });
});
