import React, {useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Platform,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Snackbar} from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';

import {useUserContext} from '../controllers/user';
import Copy from '../config/assets/copiar.svg';
import I18n from '../i18n/i18n';

const StatusBarConst = StatusBar.currentHeight || 100;
const StatusBarHeight = Platform.OS === 'ios' ? 0 : StatusBarConst;

function Header() {
  const {user, setUser} = useUserContext();
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <SafeAreaView style={[styles.statusBar]}>
      <LinearGradient
        colors={['#3827B4', '#5120ac', '#6C18A4']}
        style={styles.containerGradient}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor={'transparent'}
        />
        <View style={styles.headerContainer}>
          <Image
            style={[styles.logo, {marginTop: Platform.OS === 'ios' ? 0 : 30}]}
            source={require('../config/assets/logo_white_beta.png')}
          />
          <View style={styles.containerWithCopyBtn}>
            <View style={styles.publicKeyContainer}>
              <Text style={styles.publicKeyText}>
                {I18n.t('publicAddress')}
              </Text>
              <Text style={styles.publicKey}>{`${user.public_address.slice(
                0,
                5,
              )} ... ${user.public_address.slice(-4)}`}</Text>
            </View>
            <TouchableOpacity
              style={[styles.publicKeyCopyButton]}
              onPress={() => {
                Clipboard.setString(user.public_address);
                setVisible(true);
              }}>
              <Copy style={[styles.publicKeyCopyButtonImg, {marginTop: 5}]} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <Snackbar
        style={styles.snackbar}
        visible={visible}
        onDismiss={onDismissSnackBar}>
        {I18n.t('copied')}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  publicKey: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  publicKeyText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '100',
    textAlign: 'left',
  },
  publicKeyCopyButton: {
    paddingTop: '10%',
    color: 'white',
    textAlign: 'center',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  publicKeyCopyButtonImg: {
    width: 5,
    height: 5,
    resizeMode: 'contain',
    alignSelf: 'center',
    paddingTop: '2%',
  },
  containerWithCopyBtn: {
    width: '33%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  publicKeyContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  snackbar: {
    width: '45%',
    backgroundColor: 'gray',
    color: '#fff',
    position: 'absolute',
    bottom: 0,
    flex: 1,
    zIndex: 5,
    fontSize: 10,
  },
  containerGradient: {
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 55,
    height: '100%',
    alignItems: 'flex-start',
    borderTopColor: '#5120ac',
    borderTopWidth: 0,
  },
  logo: {
    width: '40%',
    height: 100,
    resizeMode: 'contain',
  },
  statusBar: {
    height: StatusBarHeight + 80,
  },
});

export default Header;
