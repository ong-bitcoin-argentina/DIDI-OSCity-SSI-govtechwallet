import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ImageBackground,
  Image,
  Platform,
} from 'react-native';
import PINCode from '@haskkor/react-native-pincode';

import {JWT_KEY} from '@env';
import {useUserContext} from '../controllers/user';
import I18n from '../i18n/i18n';

interface Props {
  navigation: {
    navigate(destination: string, params: object): void;
    goBack: () => void;
  };
}

const jwt = require('jsonwebtoken');

function ValidatePinCode({navigation}: Props) {
  const {user, setUser} = useUserContext();

  const validatePin = async (pinCode: any) => {
    jwt.verify(
      user.pin,
      JWT_KEY,
      {algorithms: ['HS256']},
      function (error: any, payload: any) {
        if (error) {
          console.error(error);
        } else if (payload.pinCode === pinCode) {
          navigation.navigate('Private', {navigation: navigation});
        }
      },
    );
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
      <PINCode
        status={'enter'}
        handleResultEnterPin={validatePin}
        onClickButtonLockedPage={() => {
          navigation.navigate('MainScreen', {navigation: navigation});
        }}
        titleEnter={I18n.t('pinCode.verifyPin')}
        buttonDeleteText={I18n.t('erase')}
        titleAttemptFailed={I18n.t('pinCode.wrongPin')}
        subtitleError={I18n.t('pinCode.tryAgain')}
        maxAttempts={3}
        timeLocked={60000}
        textTitleLockedPage={I18n.t('pinCode.maxAttempts')}
        textDescriptionLockedPage={I18n.t('pinCode.blockView')}
        textSubDescriptionLockedPage={I18n.t('pinCode.comeBack')}
        textButtonLockedPage={I18n.t('close')}
        numbersButtonOverlayColor="#6C18A4"
        colorPasswordEmpty="#6C18A4"
        colorPassword="#6C18A4"
        styleLockScreenButton={{backgroundColor: '#6C18A4', color: 'white'}}
        stylePinCodeButtonNumber="#172B4D"
        stylePinCodeColorTitle="#172B4D"
        styleLockScreenTitle={{color: '#172B4D'}}
        stylePinCodeButtonCircle={{
          backgroundColor: '#f2f2f2',
          width: 45,
          height: 45,
        }}
        styleAlphabet={{fontSize: 1}}
        stylePinCodeDeleteButtonIcon="backspace"
        styleLockScreenViewIcon={{display: 'none'}}
        stylePinCodeChooseContainer={{marginTop: -25}}
        styleLockScreenMainContainer={{backgroundColor: '#f2f2f2'}}
        colorPasswordError="#BD446A"
        stylePinCodeDeleteButtonColorHideUnderlay="#172B4D"
        stylePinCodeDeleteButtonColorShowUnderlay="#6C18A4"
      />
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

export default ValidatePinCode;
