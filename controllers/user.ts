import {createContext, useContext} from 'react';

interface Issuer {
  icon: string;
  name: string;
  description: string;
  url: string;
}

export const userInit = {
  public_address: '',
  private_key: '',
  mnemonic: '',
  key_copy_confirmed: false,
  pin: '',
  name: '',
  email: '',
  photo: '',
  identifier: '',
  city: '',
  phone: '',
  issuers: [],
};

export type userType = {
  public_address: string;
  private_key: string;
  mnemonic: string;
  key_copy_confirmed: boolean;
  pin: string;
  name: string;
  email: string;
  photo: string;
  identifier: string;
  city: string;
  phone: string;
  issuers: Array<Issuer>;
};

export type userProps = {
  user: userType;
  setUser: (user: any) => void;
};

export const MyUserContext = createContext<userProps>({
  user: userInit,
  setUser: () => {},
});

export const useUserContext = () => useContext(MyUserContext);
