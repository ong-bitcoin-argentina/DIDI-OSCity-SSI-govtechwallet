import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
  Platform,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {useUserContext} from '../controllers/user';
import Settings from './Settings';
import MainScreen from './MainScreen';
import ValidatePinCode from './ValidatePinCode';
import I18n from '../i18n/i18n';

const Tab = createBottomTabNavigator();

const ScreenWidth = Dimensions.get('window').width;

function HomeTabs({navigation}) {
  const {user} = useUserContext();
  const [pkCopyConfirmed, setpkCopyConfirmed] = useState(false);
  const index = navigation.getState().routes[0].state?.index;

  useEffect(() => {
    setpkCopyConfirmed(user?.key_copy_confirmed);
  }, [user.key_copy_confirmed]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.tabContainer,
          {height: Platform.OS === 'ios' ? '103%' : '100%'},
        ]}>
        <Tab.Navigator
          tabBarOptions={{
            showLabel: true,
            activeTintColor: '#3827B4',
            labelStyle: {fontSize: 13},
          }}>
          <Tab.Screen
            name="MainScreen"
            component={MainScreen}
            initialParams={{navigation: navigation}}
            options={{
              tabBarLabel: `${I18n.t('homeTabs.mainScreen')}`,
              tabBarIcon: ({focused}) => {
                return focused ? (
                  <Image
                    style={{width: 25, height: 25}}
                    source={require('../config/assets/inicio_active.png')}
                  />
                ) : (
                  <Image
                    style={{width: 25, height: 25}}
                    source={require('../config/assets/inicio_inactive.png')}
                  />
                );
              },
              title: 'My home',
            }}
          />
          {pkCopyConfirmed ? (
            <Tab.Screen
              name="ValidatePinCode"
              component={ValidatePinCode}
              initialParams={{navigation: navigation}}
              options={{
                tabBarLabel: `${I18n.t('homeTabs.securityScreen')}`,
                tabBarIcon: ({focused}) => {
                  return focused ? (
                    <Image
                      style={{width: 25, height: 25}}
                      source={require('../config/assets/seguridad_active.png')}
                    />
                  ) : (
                    <Image
                      style={{width: 25, height: 25}}
                      source={require('../config/assets/seguridad_inactive.png')}
                    />
                  );
                },
              }}
            />
          ) : (
            <Tab.Screen
              name="ValidatePinCode"
              component={ValidatePinCode}
              initialParams={{navigation: navigation}}
              options={{
                tabBarBadge: '!',
                tabBarLabel: `${I18n.t('homeTabs.securityScreen')}`,
                tabBarIcon: ({focused}) => {
                  return focused ? (
                    <Image
                      style={{width: 25, height: 25}}
                      source={require('../config/assets/seguridad_active.png')}
                    />
                  ) : (
                    <Image
                      style={{width: 25, height: 25}}
                      source={require('../config/assets/seguridad_inactive.png')}
                    />
                  );
                },
              }}
            />
          )}
          <Tab.Screen
            name="Settings"
            component={Settings}
            initialParams={{navigation: navigation}}
            options={{
              tabBarLabel: `${I18n.t('homeTabs.configScreen')}`,
              tabBarIcon: ({focused}) => {
                return focused ? (
                  <Image
                    style={{width: 25, height: 25}}
                    source={require('../config/assets/config_active.png')}
                  />
                ) : (
                  <Image
                    style={{width: 25, height: 25}}
                    source={require('../config/assets/config_inactive.png')}
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      </View>
      <View style={{display: index > 0 ? 'none' : 'flex'}}>
        <TouchableOpacity
          style={[
            styles.FloattingButton,
            {bottom: Platform.OS === 'ios' ? 100 : 60},
          ]}
          onPress={() => navigation.navigate('QrScan')}>
          <LinearGradient
            style={[styles.FloattingButtonInner]}
            colors={['#3827B4', '#5120ac', '#6C18A4']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../config/assets/codeqr.png')}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderTopColor: '#5120ac',
  },
  tabContainer: {
    display: 'flex',
    marginTop: 0,
  },
  FloattingButton: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    left: ScreenWidth - 100,
    right: 0,
    position: 'absolute',
    resizeMode: 'contain',
  },
  FloattingButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
});

export default HomeTabs;
