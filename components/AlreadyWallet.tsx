import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {globalStyles} from '../config/styles';
import I18n from '../i18n/i18n';

interface Props {
  navigation: {
    navigate(destination: string, params?: object): void;
    goBack: () => void;
  };
}

// function AlreadyWallet({navigation: {navigate, goBack}}) {
export default function AlreadyWallet({navigation}: Props) {
  return (
    <ImageBackground
      source={require('../config/assets/bgtuto3.png')}
      resizeMode="cover"
      style={styles.loaderContainer}>
      <View style={styles.loaderButtonsContainer}>
        <TouchableOpacity
          data-testid="nextButtonBis"
          onPress={() => {
            navigation.navigate('WalletCreationLoader');
          }}>
          <LinearGradient
            colors={['#3827B4', '#5120ac', '#6C18A4']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            style={[styles.confirmButton]}>
            <Text style={[styles.textButton, globalStyles.fontRegular]}>
              {I18n.t('alreadyWallet.createWallet')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.loaderTextContainer}>
        <Text style={[globalStyles.fontRegular, styles.infoText]}>
          {I18n.t('alreadyWallet.getYourID')}
        </Text>
      </View>
      <View style={styles.loaderTextContainer}>
        <Text style={[globalStyles.fontRegular, styles.loaderText]}>
          {I18n.t('alreadyWallet.haveWalletQuestion')}
        </Text>
      </View>
      <View style={styles.loaderButtonsContainer}>
        <TouchableOpacity
          data-testid="nextButton"
          onPress={() => {
            navigation.navigate('ImportKeys', {goBack: navigation.goBack});
          }}>
          <LinearGradient
            colors={['#3827B4', '#5120ac', '#6C18A4']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            style={[styles.confirmButton]}>
            <Text style={[styles.textButton, globalStyles.fontRegular]}>
              {I18n.t('alreadyWallet.iHaveWallet')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  loaderButtonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: '12%',
    marginBottom: '5%',
    textAlign: 'center',
    fontSize: 18,
    paddingLeft: 50,
    paddingRight: 50,
    flexShrink: 1,
    color: '#4A22AF',
  },
  infoText: {
    textAlign: 'center',
    fontSize: 14,
    paddingLeft: 50,
    paddingRight: 50,
    flexShrink: 1,
    color: '#4A22AF',
  },
  confirmButton: {
    width: 250,
    textAlign: 'center',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    height: 38,
  },
  textButton: {
    color: 'white',
    fontSize: 15,
  },
});

// export default AlreadyWallet;
