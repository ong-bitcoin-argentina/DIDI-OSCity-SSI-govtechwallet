/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  FlatList,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

import React from 'react';
import {Card} from 'react-native-shadow-cards';
import LinearGradient from 'react-native-linear-gradient';

import {globalStyles} from '../config/styles';
import I18n from '../i18n/i18n';
interface ItemProps {
  item: {
    id: string;
    title: string;
  };
}

const StatusBarHeight = StatusBar.currentHeight;
const ScreenHeight = Dimensions.get('screen').height;

const DATA = [
  {
    id: '1',
    title: `${I18n.t('firstCertificate.firstPoint')}`,
  },
  {
    id: '2',
    title: `${I18n.t('firstCertificate.secondPoint')}`,
  },
  {
    id: '3',
    title: `${I18n.t('firstCertificate.thirdPoint')}`,
  },
];

function FirstCertificate({navigation}) {
  const renderItem = ({item}: ItemProps) => {
    return (
      <Text
        style={[styles.titleList, {fontSize: ScreenHeight > 640 ? 14 : 11}]}>
        • {item.title}
      </Text>
    );
  };

  return (
    <SafeAreaView style={{zIndex: -2}}>
      <View style={{backgroundColor: '#F8F8F8', height: ScreenHeight}}>
        <View style={styles.container}>
          <Card style={styles.card}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  alignContent: 'space-between',
                },
              ]}>
              <View style={[styles.keyImageContainer]}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('../config/assets/artboard27_white.png')}
                />
              </View>
              <View>
                <Text style={(globalStyles.fontBold, [{fontSize: 23}])}>
                  {I18n.t('firstCertificate.getFirst')}
                </Text>
                <Text>{I18n.t('firstCertificate.verifiableCredential')}</Text>
              </View>
            </View>
            <View>
              <Text
                style={[
                  styles.description,
                  {fontSize: ScreenHeight > 640 ? 14 : 12},
                ]}>
                {I18n.t('firstCertificate.description')}
              </Text>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
            <View style={[styles.getButton]}>
              <TouchableOpacity onPress={() => navigation('QrScan')}>
                <LinearGradient
                  colors={['#3827B4', '#5120ac', '#6C18A4']}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 1}}
                  style={[styles.nextButton]}>
                  <Text style={[styles.textButton, globalStyles.fontRegular]}>
                    {I18n.t('firstCertificate.connectDocHolder')}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleList: {
    color: '#74788D',
    marginBottom: 4,
  },
  card: {
    padding: 20,
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
  statusBar: {height: StatusBarHeight + 80},
  nextButton: {
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
  getButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '7%',
  },
  description: {
    color: '#74788D',
    marginTop: 20,
    marginBottom: 15,
  },
  keyImageContainer: {
    height: 55,
    width: 55,
    backgroundColor: '#3827B4',
    borderRadius: 10,
    marginRight: 15,
    marginBottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FirstCertificate;
