/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import {Snackbar} from 'react-native-paper';
import * as Sentry from '@sentry/react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useEffect, useState, useRef} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import crashlytics from '@react-native-firebase/crashlytics';
import {Card} from 'react-native-shadow-cards';

import Header from './Header';
import {useUserContext} from '../controllers/user';
import {globalStyles} from '../config/styles';
import {updateUserInfo} from '../services/user';
import {getDBConnection} from '../services/sqlite';
import I18n from '../i18n/i18n';
interface Props {
  navigation: {
    navigate(destination: string, params: object): void;
    goBack: () => void;
  };
}

const StatusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const ScreenHeight = Dimensions.get('screen').height;

function Private({navigation}: Props) {
  const {user, setUser} = useUserContext();
  const refFirstLaunch = useRef(true);
  const [visible, setVisible] = useState(false);
  const [erroMessage, setErroMessage] = useState('');
  const [visibleBis, setVisibleBis] = useState(false);
  const [confirmCopy, setconfirmCopy] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [validateCopy, setvalidateCopy] = useState({
    checkbox: false,
    key: false,
  });

  const onDismissSnackBar = () => setVisible(false);
  const onDismissSnackBarBis = () => setVisibleBis(false);

  const handleConfirmCopy = () => {
    setconfirmCopy(true);
    setvalidateCopy(data => {
      return {
        ...data,
        checkbox: true,
      };
    });
  };

  const pkToClipboard = () => {
    setVisible(true);
    onDismissSnackBarBis();
    Clipboard.setString(user.private_key || user.public_address);
    setvalidateCopy(data => {
      return {
        ...data,
        key: true,
      };
    });
  };

  const mnemonicToClipboard = () => {
    setVisibleBis(true);
    onDismissSnackBar();
    Clipboard.setString(user.mnemonic || user.public_address);
    setvalidateCopy(data => {
      return {
        ...data,
        key: true,
      };
    });
  };

  useEffect(() => {
    const setValidationAtCopy = async () => {
      try {
        if (validateCopy?.checkbox && validateCopy?.key) {
          setUser(prevState => {
            return {...prevState, key_copy_confirmed: true};
          });
          const db = await getDBConnection();
          await updateUserInfo(
            db,
            user.public_address,
            user.private_key,
            user.mnemonic,
            true,
            user.pin,
            user.name,
            user.email,
            user.photo,
            user.identifier,
            user.city,
            user.phone,
          );
        }
      } catch (error: any) {
        Sentry.captureException(error);
        crashlytics().log('Error setValidationAtCopy');
        crashlytics().recordError(error);
      }
    };
    setValidationAtCopy();
  }, [validateCopy]);

  useEffect(() => {
    if (user?.key_copy_confirmed) {
      setconfirmCopy(true);
    }
  }, [user]);

  return (
    <SafeAreaView>
      <Header />
      <View style={styles.container}>
        {user.private_key || user.mnemonic ? (
          <Card style={styles.card}>
            <ScrollView>
              <View style={[styles.titleContainer]}>
                <View style={[styles.keyImageContainer]}>
                  <Image
                    style={{width: 15, height: 20}}
                    source={require('../config/assets/artboard26.png')}
                  />
                </View>
                <Text style={[styles.textInputWords]}>
                  {I18n.t('privateKey')}
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                  {user?.private_key && user?.mnemonic
                    ? `${I18n.t('private.saveTwoKeys')}`
                    : `${I18n.t('private.saveOneKey')}`}
                </Text>
                <Text style={styles.infoText}>
                  {I18n.t('private.safeSite')}
                </Text>
              </View>
              {user?.private_key ? (
                <View>
                  <Text style={[styles.placeholder, globalStyles.fontRegular]}>
                    {I18n.t('private.yourPrivateKey')}
                  </Text>
                  <View style={[styles.input]}>
                    <View style={[styles.keyImageContainer]}>
                      <Image
                        style={{width: 15, height: 15}}
                        source={require('../config/assets/artboard27_black.png')}
                      />
                    </View>
                    <Text style={[styles.textInput, globalStyles.fontRegular]}>
                      {user.private_key}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.copyButton, {borderColor: '#3827B4'}]}
                    onPress={pkToClipboard}>
                    <View style={[styles.keyImageContainer]}>
                      <Image
                        style={{width: 15, height: 15}}
                        source={require('../config/assets/copiar_color.png')}
                      />
                    </View>
                    <Text
                      style={{
                        color: '#3827B4',
                        textAlign: 'center',
                      }}>
                      {I18n.t('copy')}
                    </Text>
                  </TouchableOpacity>
                  <Snackbar
                    style={styles.snackbar}
                    visible={visible}
                    onDismiss={onDismissSnackBar}>
                    {I18n.t('copied')}
                  </Snackbar>
                </View>
              ) : null}
              {user.mnemonic ? (
                <View>
                  <Text
                    style={[
                      styles.placeholder,
                      globalStyles.fontRegular,
                      {marginTop: 30},
                    ]}>
                    {I18n.t('private.yourMnemonic')}
                  </Text>
                  <View style={[styles.input]}>
                    <Text
                      style={[styles.textInputWords, globalStyles.fontRegular]}>
                      {user.mnemonic}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.copyButton, {borderColor: '#3827B4'}]}
                    onPress={mnemonicToClipboard}>
                    <View style={[styles.keyImageContainer]}>
                      <Image
                        style={{width: 15, height: 15}}
                        source={require('../config/assets/copiar_color.png')}
                      />
                    </View>
                    <Text
                      style={{
                        color: '#3827B4',
                        textAlign: 'center',
                      }}>
                      {I18n.t('copy')}
                    </Text>
                  </TouchableOpacity>
                  <Snackbar
                    style={styles.snackbar}
                    visible={visibleBis}
                    onDismiss={onDismissSnackBarBis}>
                    {I18n.t('copied')}
                  </Snackbar>
                </View>
              ) : null}
              <View style={styles.warningContainer}>
                <Text style={styles.warningText}>
                  {I18n.t('warning')}: {I18n.t('private.warningPrivate')}
                </Text>
                <Text style={styles.warningText}>
                  {I18n.t('private.warningText')}
                </Text>
              </View>
              <View
                style={[
                  styles.checkboxRiskContainer,
                  {marginTop: Platform.OS === 'ios' ? 15 : 5},
                ]}>
                <View
                  style={[
                    styles.checkboxContainer,
                    {marginRight: Platform.OS === 'ios' ? 25 : 0},
                  ]}>
                  <CheckBox
                    value={confirmCopy}
                    disabled={confirmCopy}
                    onChange={handleConfirmCopy}
                    style={styles.checkbox}
                    tintColors={{false: '#172B4D'}}
                  />
                </View>
                <Text style={styles.textCheckbox}>
                  {I18n.t('private.confirmText')}
                </Text>
              </View>
              <View style={[styles.checkboxRiskContainer]}>
                <TouchableOpacity
                  disabled={!confirmCopy}
                  style={
                    !confirmCopy
                      ? styles.acceptButtonDisabled
                      : styles.acceptButton
                  }
                  onPress={() => navigation.goBack(null)}>
                  <Text
                    style={[
                      !confirmCopy
                        ? styles.acceptextButtonDisabled
                        : styles.acceptextButton,
                      globalStyles.fontBold,
                    ]}>
                    {I18n.t('accept')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.checkboxRiskContainer]}>
                <TouchableOpacity
                  data-testid="backButton"
                  style={[{borderColor: '#fff'}]}
                  onPress={() =>
                    navigation.navigate('MainScreen', {navigation: navigation})
                  }>
                  <Text style={styles.verifyButton}>{I18n.t('back')}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Card>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  verifyButton: {
    color: '#3827B4',
    textAlign: 'center',
    paddingTop: 7,
  },
  statusBar: {height: StatusBarHeight + 80},
  card: {
    padding: 30,
    margin: 15,
    borderRadius: 15,
    height: ScreenHeight - 200,
    marginBottom: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerGradient: {
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 55,
    height: '100%',
    alignItems: 'flex-start',
  },
  logo: {
    width: '40%',
    height: 100,
    resizeMode: 'contain',
    marginTop: 30,
  },
  checkboxRiskContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 10,
  },
  checkboxContainer: {
    marginLeft: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  snackbar: {
    width: '95%',
    backgroundColor: '#F5BD03',
    color: '#fff',
    position: 'absolute',
    bottom: 0,
    flex: 1,
    zIndex: 5,
  },
  placeholder: {
    color: '#C1C7D0',
    fontSize: 13,
    marginBottom: 5,
  },
  warningContainer: {
    backgroundColor: '#FEF8F9',
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  warningText: {
    color: '#BD446A',
    fontSize: 12,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#F5BD03',
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
  },
  infoContainerResponsability: {
    backgroundColor: '#F5BD03',
    padding: 10,
    marginLeft: '10%',
    marginTop: '10%',
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  infoText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  copyButton: {
    backgroundColor: 'transparent',
    marginTop: '5%',
    borderWidth: 1,
    height: 35,
    textAlignVertical: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pkContainer: {
    margin: '5%',
    marginTop: 0,
  },
  textProfile: {
    color: '#BD446A',
    textAlign: 'justify',
    fontSize: 13,
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: '5%',
  },
  textCheckbox: {
    color: '#4f5058',
    textAlign: 'justify',
    fontSize: 10,
    paddingRight: 50,
    paddingLeft: 25,
  },
  passVerification: {
    borderColor: '#BD446A',
    width: '80%',
    display: 'flex',
    marginLeft: '10%',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: '5%',
  },
  passwordEyeIcon: {
    padding: 10,
    margin: 5,
    resizeMode: 'stretch',
    alignItems: 'center',
    zIndex: 1000,
    position: 'absolute',
    right: '5%',
  },
  input: {
    borderWidth: 0.75,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#F4F5F7',
    borderColor: '#F4F5F7',
    flexDirection: 'row',
  },
  textInput: {
    flexShrink: 1,
    width: '100%',
    fontSize: 12,
    color: '#172B4D',
    height: 30,
  },
  textInputWords: {
    color: '#172B4D',
  },
  inputPass: {
    fontSize: 13,
    width: '95%',
    height: 55,
    borderWidth: 0.75,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    color: '#BD446A',
    flexShrink: 1,
  },
  loginButtonDisabled: {
    width: '85%',
    borderRadius: 20,
    borderColor: '#D6D6D6',
    opacity: 0.5,
    borderWidth: 0.7,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  loginButton: {
    width: '85%',
    borderRadius: 20,
    borderColor: '#BD446A',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  acceptButtonDisabled: {
    width: '75%',
    height: 35,
    borderRadius: 20,
    borderColor: '#D6D6D6',
    opacity: 0.5,
    borderWidth: 0.7,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  acceptButton: {
    width: '75%',
    height: 35,
    borderRadius: 15,
    borderColor: '#BD446A',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 15,
    textAlignVertical: 'center',
  },
  acceptextButton: {
    color: '#BD446A',
    fontSize: 14,
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
  },
  acceptextButtonDisabled: {
    color: '#D6D6D6',
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
  },
  textButton: {
    color: '#BD446A',
    fontSize: 14,
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
  },
  textButtonDisabled: {
    color: '#D6D6D6',
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
  },
  keyImageContainer: {
    height: 15,
    width: 15,
    marginRight: 10,
    paddingTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});

export default Private;
