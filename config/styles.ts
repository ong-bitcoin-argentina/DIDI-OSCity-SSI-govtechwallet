import {StyleSheet} from 'react-native';
import {useBrandContext} from '../controllers/brand';
import {useBrandWalletContext} from '../controllers/brandWallet';
import {Dimensions} from 'react-native';

const ScreenHeight = Dimensions.get('window').height;

export const BackgroundColor = () => {
  return {
    backgroundColor: '#5120ac',
  };
};

export const setMainLogo = () => {
  const {brandWallet} = useBrandWalletContext();
  const {brand} = useBrandContext();

  if (brandWallet?.mainLogoApp) {
    return brandWallet.mainLogoApp;
  } else {
    return brand.logo;
  }
};

export const setLogo = () => {
  const {brandWallet} = useBrandWalletContext();
  return brandWallet.logo;
};

export const setOfficialLogo = () => {
  const {brandWallet} = useBrandWalletContext();
  const {brand} = useBrandContext();

  if (brandWallet?.officialLogo) {
    return brandWallet.officialLogo;
  } else {
    return brand.logo;
  }
};

export const BackgroundImage = () => {
  const {brandWallet} = useBrandWalletContext();
  return {
    backgroundColor: brandWallet.appColorImage,
  };
};

export const TextColor = () => {
  return {
    color: '#6C18A4',
  };
};

export const globalStyles = StyleSheet.create({
  container: {
    height: ScreenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontRegular: {
    fontFamily: 'NotoSans-Regular',
  },
  fontBold: {
    fontFamily: 'NotoSans-Bold',
  },
  textInputStyle: {
    color: 'black',
  },
  backgroundContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  backgroundContainerLoader: {
    backgroundColor: 'white',
    flex: 1,
    height: 'auto',
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
});
