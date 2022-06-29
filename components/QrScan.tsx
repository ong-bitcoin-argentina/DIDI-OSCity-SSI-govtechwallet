import React, {useEffect, useState} from 'react';
import {globalStyles} from '../config/styles';
import ModalComponent from './ModalComponent';
import QRCodeScanner from 'react-native-qrcode-scanner';
import LinearGradient from 'react-native-linear-gradient';
import {useBrandWalletContext} from '../controllers/brandWallet';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import I18n from '../i18n/i18n';

interface Props1 {
  navigation: any;
}

const QrScan = ({navigation}: Props1) => {
  let scannerType: any;
  const [scanner, setScanner] = useState(scannerType);
  const [loading, setLoading] = useState(false);
  const {setBrandWallet} = useBrandWalletContext();
  const [erroMessage, setErroMessage] = useState('');
  const [closeReturn, setcloseReturn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCallback = (childData: any) => {
    setcloseReturn(childData);
  };
  const onQrUri = (e: any) => {
    setLoading(true);
    if (e?.data?.startsWith('wc:')) {
      setBrandWallet((prevState: any) => {
        return {...prevState, uri: e.data};
      });
      setTimeout(() => {
        navigation.navigate('SuccessfulConnection');
      }, 50);
    } else {
      setModalVisible(true);
      setLoading(false);
      setErroMessage(`${I18n.t('qrScan.warningScan')}`);
    }
  };
  useEffect(() => {
    if (closeReturn) {
      setTimeout(() => {
        navigation.navigate('MainScreen');
      }, 50);
    }
  }, [navigation, setBrandWallet, closeReturn]);

  return (
    <View style={styles.qrContainer}>
      <ModalComponent
        erroMessage={erroMessage}
        titleModal={I18n.t('qrScan.error')}
        textButtonModal={I18n.t('close')}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        whereFrom="Qr"
        getBack={handleCallback}
      />
      <QRCodeScanner
        data-testid="qrcodescanner"
        reactivate={false}
        showMarker={true}
        ref={(node: any) => {
          setScanner(node);
        }}
        onRead={onQrUri}
        bottomContent={
          !loading ? (
            <TouchableOpacity
              style={[styles.nextButton]}
              onPress={() => {
                (scanner as any).reactivate();
                navigation.navigate('MainScreen');
              }}>
              <LinearGradient
                style={[styles.nextButton]}
                colors={['#3827B4', '#5120ac', '#6C18A4']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}>
                <Text style={[styles.textButton, globalStyles.fontRegular]}>
                  {I18n.t('qrScan.stop')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator
              size="large"
              color="#6C18A4"
              style={styles.loadingIndicator}
            />
          )
        }
      />
    </View>
  );
};

export default QrScan;

const styles = StyleSheet.create({
  loadingIndicator: {
    marginTop: 40,
    marginBottom: 30,
  },
  textButton: {
    color: 'white',
    fontSize: 15,
  },
  nextButton: {
    width: 150,
    textAlign: 'center',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    height: 48,
  },
  qrContainer: {
    height: 900,
    backgroundColor: 'black',
  },
});
