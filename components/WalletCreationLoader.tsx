import React from 'react';
import {Text, View, ActivityIndicator, StyleSheet} from 'react-native';

import * as Sentry from '@sentry/react-native';
import {useEffect, useRef} from 'react';
import crashlytics from '@react-native-firebase/crashlytics';

import Loading from '../config/assets/loading.svg';

import {getAppControllers} from '../controllers';
import {userType, useUserContext} from '../controllers/user';
import {getDBConnection} from '../services/sqlite';
import {createUserTable, saveUserInfo} from '../services/user';
import I18n from '../i18n/i18n';
interface Props {
  navigation: {
    navigate(destination: string, params: object): void;
    goBack: () => void;
  };
}

function WalletCreationLoader({navigation}: Props) {
  const userRef = useRef(true);
  const {user, setUser} = useUserContext();

  useEffect(() => {
    const getWallet = async () => {
      userRef.current = false;
      try {
        if (user?.public_address === '') {
          const db = await getDBConnection();
          await createUserTable(db);
          const citizen_wallet = getAppControllers().wallet;
          let public_address = citizen_wallet.wallet.address;
          let private_key = citizen_wallet.wallet.privateKey;
          let mnemonic = citizen_wallet.wallet.mnemonic.phrase;
          await saveUserInfo(
            db,
            public_address,
            private_key,
            mnemonic,
            false,
            '',
            '',
            '',
            '',
            '',
            '',
            '',
          );
          setUser((prevState: userType) => {
            return {...prevState, public_address, private_key, mnemonic};
          });
          setTimeout(() => {
            navigation.navigate('PinCode', {navigation: navigation});
          }, 5000);
        }
      } catch (error: any) {
        crashlytics().log('Error getWallet.');
        crashlytics().recordError(error);
        Sentry.captureException(error);
      }
    };
    if (userRef.current) {
      getWallet();
    }
  }, [setUser, user?.public_address]);

  return (
    <View style={styles.loaderContainer}>
      <View style={styles.loaderTextContainer}>
        <Loading style={styles.loadingImage} />
      </View>
      <View style={styles.loaderTextContainer}>
        <Text style={[styles.loaderText, {color: '#4A22AF'}]}>
          {I18n.t('walletCreationLoader.weAreCreating')}.
        </Text>
        <Text
          style={[styles.loaderText, {fontWeight: 'bold', color: '#4A22AF'}]}>
          {I18n.t('walletCreationLoader.documentHolder')}.
        </Text>
      </View>
      <View style={styles.loaderTextContainer}>
        <Text style={[styles.loaderText, {color: '#4A22AF'}]}>
          {I18n.t('walletCreationLoader.linkedDocHolder')}.
        </Text>
        <Text
          style={[styles.loaderText, {fontWeight: 'bold', color: '#4A22AF'}]}>
          {I18n.t('walletCreationLoader.sovereignIdentity')}.
        </Text>
      </View>
      <View style={styles.loaderTextContainer}>
        <Text style={[styles.loaderText, {color: '#4A22AF'}]}>
          {I18n.t('walletCreationLoader.waitMoment')}.
        </Text>
      </View>
      <ActivityIndicator
        size="large"
        color={'#4A22AF'}
        style={{marginTop: '5%'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingImage: {
    width: 270,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  loaderTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%',
  },
  loaderText: {
    textAlign: 'center',
    fontSize: 18,
    paddingLeft: 50,
    paddingRight: 50,
    flexShrink: 1,
  },
});

export default WalletCreationLoader;
