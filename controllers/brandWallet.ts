import {createContext, useContext} from 'react';

export const brandWalletInit = {
  firstLaunch: true,
  inWallet: false,
  uri: '',
  mainLogoApp: '',
  logo: '',
  officialLogo: '',
  appColorImage: '',
};

export type brandWalletType = {
  uri: any;
  firstLaunch: boolean;
  inWallet: boolean;
  mainLogoApp: string;
  logo: string;
  officialLogo: string;
  appColorImage: string;
};

export type brandWalletProps = {
  brandWallet: brandWalletType;
  setBrandWallet: (brandWallet: any) => void;
};

export const MyBrandWalletContext = createContext<brandWalletProps>({
  brandWallet: brandWalletInit,
  setBrandWallet: () => {},
});

export const useBrandWalletContext = () => useContext(MyBrandWalletContext);
