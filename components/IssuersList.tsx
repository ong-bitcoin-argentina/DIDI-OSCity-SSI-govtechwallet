import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';

import {useUserContext} from '../controllers/user';
import {Card} from 'react-native-shadow-cards';
import CardIssuer from './CardIssuer';
import I18n from '../i18n/i18n';

const ScreenHeight = Dimensions.get('screen').height;

function IssuersList({navigation}) {
  const {user} = useUserContext();

  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          source={require('../config/assets/bgsuperior1.png')}
          resizeMode="cover"
          style={styles.titleBackground}>
          <View style={styles.titleContainer}>
            <Image
              style={{width: 25, height: 25}}
              source={require('../config/assets/artboard30_white.png')}
            />
            <Text style={styles.title}>
              {I18n.t('docHolder.verifiableCredentialPlural')}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.container}>
        <Card style={styles.card}>
          <ScrollView>
            <View style={{height: 150 * user.issuers.length}}>
              {user.issuers.map((element, key) => {
                return (
                  <CardIssuer
                    key={key}
                    issuer={element}
                    navigate={navigation}
                  />
                );
              })}
            </View>
          </ScrollView>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleBackground: {
    zIndex: -1,
    marginTop: '-58%',
    paddingTop: '100%',
  },
  titleContainer: {
    marginTop: '-35%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 19,
    marginLeft: 10,
  },
  connectionImage: {
    width: 260,
    height: 260,
    resizeMode: 'contain',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 18,
    margin: 15,
    borderRadius: 15,
    height: ScreenHeight - 200,
    marginBottom: 20,
    marginTop: -10,
    minHeight: 400,
  },
});

export default IssuersList;
