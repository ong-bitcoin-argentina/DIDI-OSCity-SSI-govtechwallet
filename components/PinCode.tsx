import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ImageBackground,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import PINCode from '@haskkor/react-native-pincode';

import {JWT_KEY} from '@env';
import {brandWalletInit} from '../controllers/brandWallet';
import {useUserContext} from '../controllers/user';

import {getDBConnection} from '../services/sqlite';
import {updateUserInfo} from '../services/user';
import I18n from '../i18n/i18n';

const jwt = require('jsonwebtoken');

function PinCode() {
  const {user, setUser} = useUserContext();
  const [brandWallet, setBrandWallet] = useState(brandWalletInit);
  const [loading, setLoading] = useState(false);

  const savePin = async (pinCode: any) => {
    setLoading(true);
    const db = await getDBConnection();
    const pinCodeJwt = jwt.sign({pinCode}, JWT_KEY);
    await updateUserInfo(
      db,
      user.public_address,
      user.private_key,
      user.mnemonic,
      false,
      pinCodeJwt,
      user.name,
      user.email,
      user.photo,
      user.identifier,
      user.city,
      user.phone,
    );
    setUser((prevState: any) => {
      return {
        ...prevState,
        pin: pinCodeJwt,
      };
    });
    setBrandWallet((prevState: any) => {
      return {...prevState, inWallet: true};
    });
  };

  return (
    <SafeAreaView style={styles.containerGradient}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../config/assets/bgsuperior1.png')}
          resizeMode="cover"
          style={styles.sloganContainer}>
          <Image
            style={styles.logo}
            source={require('../config/assets/logo_white_beta.png')}
          />
        </ImageBackground>
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={'#3827B4'}
          style={{marginTop: 40, marginBottom: 40, flex: 1}}
        />
      ) : (
        <PINCode
          status={'choose'}
          finishProcess={savePin}
          titleChoose={I18n.t('pinCode.createPin')}
          subtitleChoose={I18n.t('pinCode.walletSafe')}
          titleConfirm={I18n.t('pinCode.confirmPin')}
          buttonDeleteText={I18n.t('erase')}
          titleConfirmFailed={I18n.t('pinCode.wrongPin')}
          subtitleError={I18n.t('pinCode.tryAgain')}
          numbersButtonOverlayColor="#6C18A4"
          colorPasswordEmpty="#6C18A4"
          colorPassword="#6C18A4"
          stylePinCodeButtonNumber="#172B4D"
          stylePinCodeColorTitle="#172B4D"
          stylePinCodeColorSubtitle="#172B4D"
          stylePinCodeButtonCircle={{
            backgroundColor: '#f2f2f2',
            width: 53,
            height: 53,
          }}
          stylePinCodeChooseContainer={{marginTop: -25}}
          colorPasswordError="#BD446A"
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerGradient: {
    justifyContent: 'center',
    height: '100%',
    marginTop: -40,
  },
  sloganContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 400,
  },
  slogan: {
    color: 'white',
    fontSize: 19,
    width: 180,
    textAlign: 'center',
  },
  logo: {
    width: '50%',
    height: 100,
    resizeMode: 'contain',
    marginTop: Platform.OS === 'ios' ? 0 : 30,
  },
});

export default PinCode;
