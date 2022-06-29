/**
 * @jest-environment jsdom
 */
import React from 'react';
import {shallow} from 'enzyme';
import Tutorial from '../components/Tutorial';
jest.mock('react-native-swiper', () => jest.fn);

describe('Check components/TermsAndConditions functionalities', () => {
  let wrapper: any;
  let useRefSpy: any;
  const navigation = {navigate: jest.fn()};

  beforeEach(async () => {
    wrapper = null;
    wrapper = await shallow(<Tutorial navigation={navigation} />);
    useRefSpy = jest.spyOn(React, 'useRef').mockReturnValueOnce({
      current: {
        scrollBy: jest.fn(),
      },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Should navigate to the AlreadyWallet Component From Skip', () => {
    wrapper.find({'data-testid': 'continueButtonStep0'}).props().onPress();
    expect(navigation.navigate).toHaveBeenCalledTimes(1);
  });

  test('Should navigate to the AlreadyWallet Component From Tutorial 1st Screen', () => {
    wrapper.find({'data-testid': 'continueButtonStep1'}).props().onPress();
    expect(navigation.navigate).toHaveBeenCalledTimes(2);
  });

  test('Should navigate to the AlreadyWallet Component From Tutorial 2nd Screen', () => {
    wrapper.find({'data-testid': 'continueButtonStep2'}).props().onPress();
    expect(navigation.navigate).toHaveBeenCalledTimes(3);
  });

  test('Should navigate to the AlreadyWallet Component From Tutorial 3rd Screen', () => {
    wrapper.find({'data-testid': 'continueButtonStep3'}).props().onPress();
    expect(navigation.navigate).toHaveBeenCalledTimes(4);
  });

  it('swipergoUp to Tutorial 2nd Screen', () => {
    const component = shallow(<Tutorial navigation={navigation} />);
    component.find({'data-testid': 'swipergoUp'}).props().onPress();
    expect(useRefSpy).toHaveBeenCalled();
  });

  it('swipergoUp to Tutorial 3rd Screen', () => {
    const component = shallow(<Tutorial navigation={navigation} />);
    component.find({'data-testid': 'swipergoUpBis'}).props().onPress();
    expect(useRefSpy).toHaveBeenCalled();
  });

  it('swipergoDown on 2nd screen', () => {
    const component = shallow(<Tutorial navigation={navigation} />);
    component.find({'data-testid': 'swipergoDown'}).props().onPress();
    expect(useRefSpy).toHaveBeenCalled();
  });

  it('swipergoDown on 3rd screen', () => {
    const component = shallow(<Tutorial navigation={navigation} />);
    component.find({'data-testid': 'swipergoDownBis'}).props().onPress();
    expect(useRefSpy).toHaveBeenCalled();
  });
});
