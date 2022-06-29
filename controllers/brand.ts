import {createContext, useContext} from 'react';

export const brandInit = {
  app_name: '',
  city_splash_primary: '',
  city_splash_secondary: '',
  city_splash_login: '',
  city_url: '',
  city_name: '',
  favicon: '',
  logo: '',
  logo_footer: '',
  primary_color: '#fff',
  secondary_color: '#fff',
  header_color: '#fff',
  footer_color: '#fff',
  textHeaderColor: '#fff',
  textFooterColor: '#fff',
  heightLogo: '',
  additional_color: '#fff',
  about_title: '',
  about_content: '',
  contact_title: '',
  contact_info: '',
};

export type brandType = {
  app_name: string;
  city_splash_primary: string;
  city_splash_secondary: string;
  city_splash_login: string;
  city_url: string;
  city_name: string;
  favicon: string;
  logo: string;
  logo_footer: string;
  primary_color: string;
  secondary_color: string;
  header_color: string;
  footer_color: string;
  textHeaderColor: string;
  textFooterColor: string;
  heightLogo: string;
  additional_color: string;
  about_title: string;
  about_content: string;
  contact_title: string;
  contact_info: string;
};

export type brandProps = {
  brand: brandType;
  setBrand: (brand: brandType) => void;
};

export const MyBrandContext = createContext<brandProps>({
  brand: brandInit,
  setBrand: () => {},
});

export const useBrandContext = () => useContext(MyBrandContext);
