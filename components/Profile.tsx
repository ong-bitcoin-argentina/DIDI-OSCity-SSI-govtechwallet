/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Linking,
  StyleSheet,
  Image,
} from 'react-native';
import * as Sentry from '@sentry/react-native';
import {NavigationState} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import crashlytics from '@react-native-firebase/crashlytics';
import AsyncStorage from '@react-native-community/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import {Snackbar} from 'react-native-paper';

import {getAppControllers} from '../controllers';
import {useBrandContext} from '../controllers/brand';
import {userType, useUserContext} from '../controllers/user';
import {useBrandWalletContext} from '../controllers/brandWallet';
import {globalStyles, setLogo} from '../config/styles';

import ImportKeys from '../components/ImportKeys';
import WalletCreationLoader from '../components/WalletCreationLoader';

// import Foco from '../config/assets/foco.svg';
// import Artboard27 from '../config/assets/artboard27.svg';

interface Props {
  navigation: NavigationState;
}

function Profile({navigation}: Props) {
  const {brand} = useBrandContext();
  const {brandWallet, setBrandWallet} = useBrandWalletContext();
  const [cert, setCertificate] = useState({link: '', created: ''});
  const userRef = useRef(true);
  const certRef = useRef(true);
  const {user, setUser} = useUserContext();
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  const pkToClipboard = async () => {
    setVisible(true);
    Clipboard.setString(user.public_address);
  };

  useEffect(() => {
    const getWallet = async () => {
      userRef.current = false;
      try {
        if (user?.public_address === '') {
          const citizen_wallet = getAppControllers().wallet;
          let public_address = citizen_wallet.wallet.address;
          let private_key = citizen_wallet.wallet.privateKey;
          let mnemonic = citizen_wallet.wallet.mnemonic.phrase;
          await AsyncStorage.setItem('public_address', public_address);
          await AsyncStorage.setItem('private_key', private_key);
          await AsyncStorage.setItem('mnemonic', mnemonic);
          setUser((prevState: userType) => {
            return {...prevState, public_address, private_key, mnemonic};
          });
          await firestore()
            .collection('users')
            .doc(user.uid)
            .update({
              public_address: public_address,
            })
            .catch(error => {
              Sentry.captureException(error);
              crashlytics().log('Error update users collection.');
              crashlytics().recordError(error);
            });
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
    const setWalletStorage = () => {
      if (user?.public_address) {
        const certs: any[] = [];
        firestore()
          .collection('certificates')
          .where('id_user', '==', user?.dni)
          .get()
          .then(async querySnapshot => {
            console.log('Total certs: ', querySnapshot.size);
            querySnapshot.forEach(documentSnapshot => {
              certs.push(documentSnapshot.data());
            });
            await setCertificate(certs[0]);
            if (cert.link && cert.created) {
              certRef.current = false;
            }
          })
          .catch((error: Error) => {
            Sentry.captureException(error);
            crashlytics().log('User getCertificates.');
            crashlytics().recordError(error);
          });
      }
    };

    if (user && certRef.current) {
      firestore().collection('certificates').onSnapshot(setWalletStorage);
    }

    setBrandWallet(prevState => {
      return {...prevState, firstLaunch: false};
    });
  }, [setUser, user?.uid, user?.public_address]);

  return (
    <SafeAreaView style={globalStyles.backgroundContainerLoader}>
      {user && user?.public_address && (user?.private_key || user?.mnemonic) ? (
        <View>
          <View style={{height: '13%'}}>
            <LinearGradient
              colors={['#3827B4', '#5120ac', '#6C18A4']}
              style={styles.containerGradient}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}>
              <Image
                style={styles.logo}
                source={{
                  uri: setLogo(),
                }}
              />
            </LinearGradient>
          </View>
          <ScrollView
            contentContainerStyle={{alignItems: 'flex-start'}}
            style={styles.container}>
            <Text style={[styles.gradientTitle, globalStyles.fontBold]}>
              Mi Perfil Digital
            </Text>
            {cert?.link ? (
              <View style={{width: '100%', marginTop: 10}}>
                <TouchableOpacity
                  style={styles.identityButton}
                  onPress={() => {
                    navigation.navigate('DocHolder');
                  }}>
                  <View
                    style={[
                      styles.imageIdentity,
                      {backgroundColor: brand.secondary_color},
                    ]}>
                    <Artboard27 style={styles.keyImageIdentity} fill="white" />
                  </View>
                  <View style={styles.containerTextIdentityButton}>
                    <Text
                      style={[
                        styles.titleIdentityButton,
                        globalStyles.fontRegular,
                      ]}>
                      Portadocumentos
                    </Text>
                  </View>
                </TouchableOpacity>
                <Text
                  style={[
                    styles.knowMore,
                    globalStyles.fontRegular,
                    {
                      color: brand.primary_color,
                      marginBottom: 10,
                      marginTop: 5,
                    },
                  ]}
                  onPress={() => {
                    Linking.openURL(`${brandWallet.domain}/what-is`);
                  }}>
                  {/* <Foco style={styles.focoImage} fill={brand.primary_color} /> */}
                  Saber más sobre la Identidad Digital
                </Text>
              </View>
            ) : null}
            <Snackbar
              style={styles.snackbar}
              visible={visible}
              onDismiss={onDismissSnackBar}>
              Copiado al portapapeles
            </Snackbar>
            <Text
              style={[
                !cert?.link ? styles.space : null,
                styles.placeholder,
                globalStyles.fontBold,
              ]}>
              Código ID
            </Text>
            <TouchableOpacity style={styles.inputPK} onPress={pkToClipboard}>
              <Text style={[styles.textInputPK, globalStyles.fontRegular]}>
                {/* <Artboard27 style={styles.keyImage} fill="#707070" /> */}
                {user.public_address}
              </Text>
            </TouchableOpacity>
            <Text style={[styles.placeholder, globalStyles.fontBold]}>
              Nombre y apellido
            </Text>
            <TextInput
              value={`${user.first_name} ${user.last_name}`}
              style={[styles.input, globalStyles.fontRegular]}
              editable={false}
            />
            <Text style={[styles.placeholder, globalStyles.fontBold]}>
              Correo
            </Text>
            <TextInput
              value={user.email}
              style={[styles.input, globalStyles.fontRegular]}
              editable={false}
            />
            <Text style={[styles.placeholder, globalStyles.fontBold]}>
              CUIL/CUIT
            </Text>
            <TextInput
              value={user.dni}
              style={[styles.input, globalStyles.fontRegular]}
              editable={false}
            />
          </ScrollView>
        </View>
      ) : user &&
        !user?.private_key &&
        !user?.mnemonic &&
        !user?.public_address ? (
        <WalletCreationLoader />
      ) : user &&
        user.public_address &&
        !user?.mnemonic &&
        !user?.private_key ? (
        <ImportKeys />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 55,
    paddingRight: 55,
    height: '85%',
  },
  containerGradient: {
    justifyContent: 'center',
    paddingLeft: 35,
    paddingRight: 55,
    height: '100%',
    alignItems: 'flex-start',
  },
  containerSubtitle: {
    paddingLeft: 10,
    paddingBottom: 30,
  },
  gradientTitle: {
    color: '#5C5C5C',
    fontSize: 18,
    marginTop: 25,
  },
  logo: {
    width: '40%',
    height: 100,
    resizeMode: 'contain',
  },
  knowMore: {
    fontSize: 13,
    paddingTop: 10,
    paddingBottom: 10,
    flexWrap: 'wrap',
    fontWeight: '700',
    textDecorationLine: 'underline',
    letterSpacing: 0.4,
    marginLeft: 10,
  },
  input: {
    fontSize: 12,
    marginBottom: 10,
    width: '100%',
    height: 35,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: '#E6E6E6',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#ACACAC',
  },
  inputPK: {
    marginBottom: 10,
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: '#E6E6E6',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    flex: 1,
    flexWrap: 'wrap',
  },
  textInputPK: {color: '#707070', fontSize: 11},
  placeholder: {
    color: '#5C5C5C',
    fontSize: 13,
    paddingBottom: 5,
  },
  keyImage: {
    width: 10,
    height: 10,
    marginRight: 20,
    paddingRight: 10,
  },
  focoImage: {
    width: 15,
    height: 15,
    paddingRight: 10,
    marginRight: 20,
  },
  identityButton: {
    backgroundColor: 'white',
    width: '100%',
    height: 60,
    borderRadius: 7,
    borderWidth: 0.9,
    borderColor: '#00000014',
    shadowColor: '#00000014',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    flexDirection: 'row',
  },
  containerTextIdentityButton: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleIdentityButton: {
    color: '#404040',
    fontSize: 17,
  },
  dateIdentityButton: {
    color: '#A5A5A5',
    fontSize: 10,
  },
  space: {
    marginTop: 30,
  },
  imageIdentity: {
    backgroundColor: '#762767',
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    marginRight: 15,
  },
  keyImageIdentity: {
    width: 30,
    height: 30,
  },
  loginButton: {
    width: '85%',
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 15,
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
});

export default Profile;
