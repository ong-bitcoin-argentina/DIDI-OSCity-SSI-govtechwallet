import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import * as ethers from 'ethers';
import React, {useState} from 'react';
import * as Sentry from '@sentry/react-native';

import {globalStyles} from '../config/styles';
import {useUserContext, userType} from '../controllers/user';
import {getDBConnection} from '../services/sqlite';
import {createUserTable, saveUserInfo} from '../services/user';

import ModalComponent from './ModalComponent';
import I18n from '../i18n/i18n';
interface Props {
  navigation: {
    navigate(destination: string, params: object): void;
    goBack: () => void;
  };
}

function ImportKeys({navigation}: Props) {
  const {user, setUser} = useUserContext();
  const [mnemonic, setMnemonic] = useState('');
  const [loading, setLoading] = useState(false);
  const [privateKey, setPrivateKey] = useState('');
  const [erroMessage, setErroMessage] = useState('');
  const [mnemonicInput, setMnemonicInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [privateKeyInput, setprivateKeyInput] = useState('');

  const onSetPrivateKey = (e: any) => {
    setPrivateKey(e);
    setprivateKeyInput(e);
  };
  const onSetMnemonic = (e: any) => {
    setMnemonic(e);
    setMnemonicInput(e);
  };

  const onChangePrivate = async () => {
    if (privateKey) {
      setLoading(true);
      try {
        let wallet = new ethers.Wallet(privateKey);
        const db = await getDBConnection();
        await createUserTable(db);
        await saveUserInfo(
          db,
          wallet.address,
          privateKey,
          '',
          false,
          '',
          '',
          '',
          '',
          '',
          '',
          '',
        );
        setUser((prevState: any) => {
          return {
            ...prevState,
            private_key: privateKey,
            public_address: wallet.address,
          };
        });
        setTimeout(() => {
          navigation.navigate('PinCode', {navigation: navigation});
        }, 5000);
      } catch (error) {
        Sentry.captureException(error);
        setModalVisible(true);
        setErroMessage('LLave Privada invalida');
        setLoading(false);
      }
    } else if (mnemonic && !privateKey) {
      setLoading(true);
      try {
        let wallet = ethers.Wallet.fromMnemonic(mnemonic);
        const db = await getDBConnection();
        await createUserTable(db);
        await saveUserInfo(
          db,
          wallet.address,
          '',
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
          return {...prevState, mnemonic, public_address: wallet.address};
        });
        navigation.navigate('PinCode', {navigation: navigation});
      } catch (error) {
        Sentry.captureException(error);
        setModalVisible(true);
        setErroMessage('Mnemonic invalido');
        setLoading(false);
      }
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{alignItems: 'center'}}
      style={styles.container}>
      <ModalComponent
        erroMessage={erroMessage}
        titleModal="Error en tus llaves privadas"
        textButtonModal="Cerrar"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Text style={[{color: '#3827B4'}, styles.title]}>
        {I18n.t('importKeys.validPrivateKey')}{' '}
        <Text style={{fontWeight: '700'}}>{I18n.t('privateKey')}</Text>
      </Text>
      <TextInput
        value={privateKeyInput}
        onChangeText={onSetPrivateKey}
        style={[styles.input, globalStyles.textInputStyle]}
        placeholder="0xha8jkD82judmcvud8 ..."
      />
      <Text style={[{color: '#3827B4', marginTop: '5%'}, styles.title]}>
        {' '}
        {I18n.t('or')}{' '}
      </Text>
      <Text style={[{color: '#3827B4'}, styles.title]}>
        {I18n.t('importKeys.validMnemonic')}{' '}
        <Text style={{fontWeight: '700'}}>{I18n.t('importKeys.mnemonic')}</Text>
      </Text>
      <TextInput
        value={mnemonicInput}
        onChangeText={onSetMnemonic}
        style={[styles.input, globalStyles.textInputStyle]}
        placeholder="desert impose funny ice lottery dial manual ..."
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={'#3827B4'}
          style={{marginTop: 40, marginBottom: 30}}
        />
      ) : (
        <View style={styles.containerButtons}>
          <TouchableOpacity
            data-testid="verifyButton"
            disabled={loading || (!privateKeyInput && !mnemonicInput)}
            style={
              loading || (!privateKeyInput && !mnemonicInput)
                ? styles.copyButtonDisabled
                : styles.copyButton
            }
            onPress={onChangePrivate}>
            <Text
              style={
                loading || (!privateKeyInput && !mnemonicInput)
                  ? styles.verifyButtonDisabled
                  : styles.verifyButton
              }>
              {I18n.t('importKeys.verify')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            data-testid="backButton"
            style={[{borderColor: '#fff'}]}
            onPress={() => navigation.goBack()}>
            <Text style={styles.verifyButton}>{I18n.t('back')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '50%',
    backgroundColor: '#fff',
  },
  containerButtons: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 14,
    width: '75%',
    flexShrink: 1,
    marginBottom: '5%',
  },
  input: {
    fontSize: 10,
    width: '75%',
    height: 55,
    borderWidth: 0.75,
    borderRadius: 5,
    borderColor: '#E6E6E6',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 17,
    paddingBottom: 17,
    color: '#BD446A',
    flexWrap: 'wrap',
  },
  verifyButtonDisabled: {
    color: '#E6E6E6',
    textAlign: 'center',
    paddingTop: 7,
  },
  verifyButton: {
    color: '#3827B4',
    textAlign: 'center',
    paddingTop: 7,
  },
  copyButtonDisabled: {
    borderColor: '#E6E6E6',
    backgroundColor: 'transparent',
    marginTop: '5%',
    borderWidth: 1,
    height: 35,
    textAlignVertical: 'center',
    borderRadius: 5,
    width: '75%',
    marginBottom: 20,
  },
  copyButton: {
    borderColor: '#3827B4',
    backgroundColor: 'transparent',
    marginTop: '5%',
    borderWidth: 1,
    height: 35,
    textAlignVertical: 'center',
    borderRadius: 5,
    width: '75%',
    marginBottom: 20,
  },
  snackbar: {
    width: '95%',
    backgroundColor: '#F5BD03',
    color: '#fff',
    position: 'absolute',
  },
  placeholder: {
    color: '#5C5C5C',
    fontSize: 13,
    marginBottom: 5,
  },
  warningContainer: {
    width: '85%',
    backgroundColor: '#FEF8F9',
    padding: 10,
    marginLeft: 15,
  },
  warningText: {
    color: '#BD446A',
    fontSize: 10,
    textAlign: 'center',
  },
  pkContainer: {
    width: '85%',
    margin: '5%',
  },
});

export default ImportKeys;
