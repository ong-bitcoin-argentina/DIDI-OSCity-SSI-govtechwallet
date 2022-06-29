import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Text,
  ImageBackground,
  Image,
} from 'react-native';
import I18n from '../i18n/i18n';

import {useBrandWalletContext} from '../controllers/brandWallet';
import {useUserContext} from '../controllers/user';

interface Props {
  navigation: {
    navigate(destination: string, params: object): void;
    goBack: () => void;
  };
}

const ScreenHeight = Dimensions.get('screen').height;

export default function Home({navigation}: Props) {
  const {brandWallet, setBrandWallet} = useBrandWalletContext();
  const {user, setUser} = useUserContext();

  useEffect(() => {
    if (!user.pin && !user.public_address) {
      setTimeout(() => {
        navigation.navigate('Tutorial', {navigation: navigation});
      }, 5000);
    } else if (!user.pin && user.public_address) {
      setTimeout(() => {
        navigation.navigate('PinCode', {navigation: navigation});
      }, 7000);
    } else if (user.pin && user.public_address) {
      setTimeout(() => {
        navigation.navigate('MainScreen', {navigation: navigation});
      }, 5000);
    }
  }, [brandWallet, navigation, user.pin, user.public_address]);

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={[styles.logoFirstLaunch]}
            source={require('../config/assets/logocolor.png')}
          />
        </View>
        <ImageBackground
          source={require('../config/assets/bgintro2.png')}
          resizeMode="cover"
          style={styles.sloganContainer}>
          <View>
            <Text style={styles.slogan}>{I18n.t('home.slogan')}</Text>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sloganContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: ScreenHeight,
  },
  logoFirstLaunch: {
    width: '60%',
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  logoContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  slogan: {
    color: 'white',
    fontSize: 19,
    width: 180,
    textAlign: 'center',
  },
});
