import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationState} from '@react-navigation/native';
import {Card} from 'react-native-shadow-cards';

import {globalStyles} from '../config/styles';
import {useUserContext} from '../controllers/user';
import {useEffect} from 'react';
import I18n from '../i18n/i18n';

interface ItemProps {
  item: {
    id: string;
    title: string;
    slug: string;
    private_key: string;
  };
}
interface Props {
  navigation: NavigationState;
}

const StatusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

function Settings({navigation}: Props) {
  const pkRef = useRef(true);
  const [pkCopyConfirmed, setpkCopyConfirmed] = useState(false);
  const {user} = useUserContext();
  const [data, setData] = useState([
    {
      id: '1',
      title: `${I18n.t('settings.termsAndConditions')}`,
      slug: 'TermsAndConditions',
      private_key: '',
    },
    {
      id: '2',
      title: `${I18n.t('settings.privacyPolicy')}`,
      slug: 'PrivacyPolicy',
      private_key: '',
    },
    {
      id: '4',
      title: `${I18n.t('settings.helpAndInformation')}`,
      slug: 'HelpAndInformation',
      private_key: '',
    },
  ]);

  const actionButton = (slug: string) => {
    navigation.navigate(slug);
  };

  useEffect(() => {
    let auxData = data;
    if (pkRef.current) {
      if (user?.private_key) {
        auxData[2] = {...auxData[2], private_key: user?.private_key};
        setData(auxData);
      }
    }
  }, [data, user, user?.private_key]);

  useEffect(() => {
    if (user?.key_copy_confirmed) {
      setpkCopyConfirmed(true);
    }
  }, [user]);

  const Item = ({item}: ItemProps) => {
    return (
      <TouchableOpacity
        onPress={() => actionButton(item.slug)}
        style={(globalStyles.fontRegular, [styles.itemList])}>
        {item.id === '1' ? (
          <Image
            style={{width: 20, height: 20}}
            source={require('../config/assets/artboard30_gray.png')}
          />
        ) : item.id === '2' ? (
          <Image
            style={{width: 20, height: 20}}
            source={require('../config/assets/artboard31_gray.png')}
          />
        ) : (
          <Image
            style={{width: 20, height: 20}}
            source={require('../config/assets/ayuda_gray.png')}
          />
        )}
        <Text style={styles.textItemList}>{item.title}</Text>
        <Image
          style={[styles.nextItemList, {width: 13, height: 13}]}
          source={require('../config/assets/flecha.png')}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.statusBar}>
        <LinearGradient
          colors={['#3827B4', '#5120ac', '#6C18A4']}
          style={styles.containerGradient}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}>
          <StatusBar translucent={true} backgroundColor={'transparent'} />
          <Image
            style={[styles.logo, {marginTop: Platform.OS === 'ios' ? 0 : 30}]}
            source={require('../config/assets/logo_white_beta.png')}
          />
        </LinearGradient>
      </View>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Text style={[styles.textHeader, globalStyles.fontBold]}>
            General
          </Text>
          <FlatList
            data={data}
            renderItem={Item}
            keyExtractor={item => item.id}
          />
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 30,
    margin: 15,
    borderRadius: 15,
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
  textHeader: {
    color: '#5C5C5C',
    fontSize: 14,
    borderBottomColor: '#F0F4F7',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  itemList: {
    borderBottomColor: '#F0F4F7',
    borderBottomWidth: 1,
    flexDirection: 'row',
    fontSize: 16,
    paddingBottom: 15,
    paddingTop: 15,
    alignItems: 'center',
  },
  textItemList: {
    paddingLeft: 13,
    color: '#404040',
  },
  statusBar: {height: StatusBarHeight + 80},
  nextItemList: {
    position: 'absolute',
    right: 0,
  },
});

export default Settings;
