/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, {useState, useEffect, useRef} from 'react';
import LogRocket from '@logrocket/react-native';
import * as Sentry from '@sentry/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Home from './components/Home';
import Tutorial from './components/Tutorial';
import FirstCertificate from './components/FirstCertificate';
import AlreadyWallet from './components/AlreadyWallet';
import HomeTabs from './components/HomeTabs';
import ValidatePinCode from './components/ValidatePinCode';
import DocHolder from './components/DocHolder';
import QrScan from './components/QrScan';
import ImportKeys from './components/ImportKeys';
import PinCode from './components/PinCode';
import Private from './components/Private';
import WalletCreationLoader from './components/WalletCreationLoader';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import HelpAndInformation from './components/HelpAndInformation';
import SuccessfulConnection from './components/SuccessfulConnection';
import CardIssuer from './components/CardIssuer';
import IssuersList from './components/IssuersList';
import AsyncStorage from '@react-native-community/async-storage';

import {MyUserContext, userInit} from './controllers/user';
import {MyBrandWalletContext, brandWalletInit} from './controllers/brandWallet';
import {getUserInfo, saveUserInfo, createUserTable} from './services/user';
import {getDBConnection} from './services/sqlite';

import {LOGROCKET_ID, NODE_ENV, SENTRY_DSN} from '@env';
import {Platform} from 'react-native';

const Stack = createStackNavigator();

const StatusBarConst = StatusBar.currentHeight || 100;
const StatusBarHeight = StatusBarConst;

const App = () => {
  const [user, setUser] = useState(userInit);
  const [brandWallet, setBrandWallet] = useState(brandWalletInit);
  const [initializing, setInitializing] = useState(true);
  const logrocket = useRef(false);

  if (NODE_ENV === 'production' && !logrocket.current) {
    try {
      LogRocket.init(LOGROCKET_ID);
    } catch (error) {
      console.error('error con LogRocket');
      console.error(error);
    }
    Sentry.init({dsn: SENTRY_DSN});
    logrocket.current = true;
  }

  useEffect((): any => {
    const getUser = async () => {
      const db = await getDBConnection();
      let userInfo = {
        private_key: '',
        mnemonic: '',
        public_address: '',
        key_copy_confirmed: null,
        pin: '',
      };
      try {
        userInfo = await getUserInfo(db);
        if (userInfo?.code === 0) {
          userInfo = {
            private_key: '',
            mnemonic: '',
            public_address: '',
            key_copy_confirmed: null,
            pin: '',
          };
          userInfo.private_key =
            (await AsyncStorage.getItem('private_key')) || '';
          userInfo.mnemonic = (await AsyncStorage.getItem('mnemonic')) || '';
          userInfo.public_address =
            (await AsyncStorage.getItem('public_address')) || '';
          userInfo.pin = (await AsyncStorage.getItem('pincode')) || '';
          await createUserTable(db);
          await saveUserInfo(
            db,
            userInfo.public_address ? userInfo.public_address : '',
            userInfo.private_key ? userInfo.private_key : '',
            userInfo.mnemonic ? userInfo.mnemonic : '',
            false,
            userInfo.pin ? userInfo.pin : '',
            '',
            '',
            '',
            '',
            '',
            '',
          );
        }
      } catch (error: any) {
        if (error.code === 0) {
          userInfo = {
            private_key: '',
            mnemonic: '',
            public_address: '',
            key_copy_confirmed: null,
            pin: '',
          };
        }
      }
      setUser(prevState => {
        return {
          ...prevState,
          ...userInfo,
          // key_copy_confirmed: userInfo.key_copy_confirmed === 0 ? false : true,
        };
      });
      if (userInfo.public_address && userInfo.pin) {
        setBrandWallet(prevState => {
          return {...prevState, inWallet: true};
        });
      }
      if (Platform.OS === 'android' && userInfo?.public_address) {
        LogRocket.identify(userInfo.public_address, {
          name: `${userInfo.public_address}`,
        });
      }
    };
    if (initializing) {
      setInitializing(false);
    }
    let subscriber = null;
    if (
      !user.public_address &&
      !user.pin &&
      (!user.mnemonic || !user.private_key)
    ) {
      subscriber = getUser();
    }
    return subscriber;
  }, [
    brandWallet,
    initializing,
    user.mnemonic,
    user.pin,
    user.private_key,
    user.public_address,
  ]);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      <MyBrandWalletContext.Provider value={{brandWallet, setBrandWallet}}>
        <MyUserContext.Provider value={{user, setUser}}>
          {!brandWallet.inWallet && !user.pin && !user.public_address ? (
            <Stack.Navigator headerMode="none" initialRouteName="Home">
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Tutorial" component={Tutorial} />
              <Stack.Screen name="AlreadyWallet" component={AlreadyWallet} />
              <Stack.Screen
                name="WalletCreationLoader"
                component={WalletCreationLoader}
              />
              <Stack.Screen name="ImportKeys" component={ImportKeys} />
              <Stack.Screen name="PinCode" component={PinCode} />
            </Stack.Navigator>
          ) : !brandWallet.inWallet && !user.pin && user.public_address ? (
            <Stack.Navigator headerMode="none" initialRouteName="Home">
              <Stack.Screen name="PinCode" component={PinCode} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator
              headerMode={Platform.OS === 'android' ? 'none' : 'screen'}
              initialRouteName="HomeTabs"
              screenOptions={{
                headerStyle: {elevation: 0},
                headerLeft: () => null,
                headerBackground: () => (
                  <LinearGradient
                    colors={['#3827B4', '#5120ac', '#6C18A4']}
                    style={{height: '100%'}}
                    start={{x: 0, y: 1}}
                    end={{x: 1, y: 1}}
                  />
                ),
              }}>
              <Stack.Screen
                name="HomeTabs"
                component={HomeTabs}
                options={{
                  title: '',
                  headerStyle: {
                    height: 60,
                  },
                }}
              />
              <Stack.Screen
                name="FirstCertificate"
                component={FirstCertificate}
                options={{
                  title: '',
                  headerStyle: {
                    height: 60,
                  },
                }}
              />
              <Stack.Screen
                name="IssuersList"
                component={IssuersList}
                options={{
                  title: '',
                  headerStyle: {
                    height: 60,
                  },
                }}
              />
              <Stack.Screen
                name="TermsAndConditions"
                component={TermsAndConditions}
                options={{
                  title: '',
                  headerStyle: {
                    height: 50,
                  },
                }}
              />
              <Stack.Screen
                name="DocHolder"
                component={DocHolder}
                options={{
                  title: '',
                  headerStyle: {
                    height: 60,
                  },
                }}
              />
              <Stack.Screen
                name="CardIssuer"
                component={CardIssuer}
                options={{
                  title: '',
                  headerStyle: {
                    height: 60,
                  },
                }}
              />
              <Stack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicy}
                options={{
                  title: '',
                  headerStyle: {
                    height: 50,
                  },
                }}
              />
              <Stack.Screen
                name="Private"
                component={Private}
                options={{
                  title: '',
                  headerStyle: {
                    height: 60,
                  },
                }}
              />
              <Stack.Screen
                name="QrScan"
                component={QrScan}
                options={{
                  title: '',
                  headerStyle: {
                    height: 60,
                  },
                }}
              />
              <Stack.Screen
                name="HelpAndInformation"
                component={HelpAndInformation}
                options={{
                  title: '',
                  headerStyle: {
                    height: 50,
                  },
                }}
              />
              <Stack.Screen
                name="SuccessfulConnection"
                component={SuccessfulConnection}
                options={{
                  title: '',
                  headerStyle: {
                    height: 50,
                  },
                }}
              />
              <Stack.Screen
                name="ValidatePinCode"
                component={ValidatePinCode}
                options={{
                  title: '',
                  headerStyle: {
                    height: 60,
                  },
                }}
              />
            </Stack.Navigator>
          )}
        </MyUserContext.Provider>
      </MyBrandWalletContext.Provider>
    </NavigationContainer>
  );
};

export default Sentry.wrap(App);
