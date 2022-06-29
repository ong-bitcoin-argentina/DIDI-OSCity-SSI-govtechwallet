/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import {TabView, SceneMap} from 'react-native-tab-view';

import CertCards from './CertCards';
import {useUserContext} from '../controllers/user';
import {globalStyles} from '../config/styles';
import {getCertificates} from '../services/certs';
import I18n from '../i18n/i18n';

const StatusBarHeight = StatusBar.currentHeight;
const ScreenHeight = Dimensions.get('screen').height;

function DocHolder(props) {
  const {user}: any = useUserContext();
  const [index, setIndex] = useState(0);
  const [cert, setCertificate] = useState([{}]);
  const [certRevocated, setCertificateRevocated] = useState([{}]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const refFirstLaunch = useRef(true);
  const [routes] = React.useState([
    {key: 'activos', title: 'Activos'},
    {key: 'revocados', title: 'Revocados'},
  ]);

  const issuer = props.route.params.issuer;

  useEffect(() => {
    const fetchCertificates = async () => {
      let certs: any[] = [];
      let certsRevocated: any[] = [];
      const response = await getCertificates(issuer?.url, user?.public_address);
      console.log('response2');
      console.log(response);
      if (
        response &&
        response?.certificates &&
        response?.certificates?.length > 0
      ) {
        certsRevocated = response.certificates.filter((element: any) => {
          return element?.is_revocated;
        });
        certs = response.certificates.filter((element: any) => {
          return element?.is_certified;
        });
      }
      refFirstLaunch.current = false;
      // setTimeout(() => {
      setLoading(false);
      setCertificates(response.certificates);
      setCertificate(certs);
      setCertificateRevocated(certsRevocated);
      // }, 500);
    };
    if (refFirstLaunch.current && cert && certRevocated) {
      fetchCertificates();
    }
  });

  const ActivosRoute = (index: number) => {
    return (
      <View>
        {certificates !== undefined && certificates.length > 0 ? (
          <CertCards key={index} certs={cert} />
        ) : (
          <Text
            style={
              (globalStyles.fontBold,
              [
                styles.notCertificates,
                {fontSize: ScreenHeight > 640 ? 18 : 13},
              ])
            }>
            {I18n.t('docHolder.empty')}
          </Text>
        )}
      </View>
    );
  };

  const RevocadosRoute = (index: number) => (
    <View>
      {certificates !== undefined && certificates.length > 0 ? (
        <CertCards key={index} certs={certRevocated} />
      ) : (
        <Text
          style={
            (globalStyles.fontBold,
            [styles.notCertificates, {fontSize: ScreenHeight > 640 ? 18 : 13}])
          }>
          {I18n.t('docHolder.revocateEmpty')}
        </Text>
      )}
    </View>
  );

  const _renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map((x: any, i: any) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route: any, i: any) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: any) =>
              inputIndex === i ? 1 : 0.2,
            ),
          });
          return (
            <TouchableOpacity
              style={[i === index ? styles.active : styles.inactive]}
              onPress={() => setIndex(i)}>
              <Animated.View style={{opacity: opacity}}>
                <Text style={styles.text}>{route.title}</Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderScene = SceneMap({
    activos: ActivosRoute,
    revocados: RevocadosRoute,
  });

  return (
    <SafeAreaView>
      <View style={styles.statusBar}>
        <LinearGradient
          colors={['#3827B4', '#5120ac', '#6C18A4']}
          style={styles.containerGradient}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}>
          <StatusBar translucent={true} backgroundColor={'transparent'} />
          <View style={styles.pageTitle}>
            <TouchableOpacity
              style={styles.pageTitleButton}
              onPress={() => props.navigation.goBack(null)}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../config/assets/regresar.png')}
              />
              <Text style={(globalStyles.fontBold, [styles.pageTitleText])}>
                {I18n.t('docHolder.verifiableCredential')}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      <View style={styles.container}>
        <Card style={styles.card}>
          <ScrollView>
            <View style={styles.issuer}>
              <Image
                style={styles.iconIssuer}
                source={{uri: `${issuer.icons}`}}
              />
              <View style={styles.issuerContent}>
                <Text style={styles.nameIssuer}>
                  {issuer.name.split('+')[0]}
                </Text>
                <Text
                  style={[
                    styles.descriptionIssuer,
                    {fontSize: ScreenHeight > 640 ? 12 : 10},
                  ]}>
                  {issuer.description}
                </Text>
              </View>
            </View>
            {loading ? (
              <ActivityIndicator
                size="large"
                color={'#3827B4'}
                style={{marginTop: 40, marginBottom: 30}}
              />
            ) : certRevocated.length > 0 ? (
              <TabView
                style={{
                  height: ScreenHeight - 200,
                  width: '100%',
                }}
                navigationState={{index, routes}}
                renderScene={renderScene}
                renderTabBar={_renderTabBar}
                onIndexChange={setIndex}
              />
            ) : (
              // cert.map((route: any, i: number) => {
              <ActivosRoute />
              // })
            )}
          </ScrollView>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  notCertificates: {
    alignSelf: 'center',
    marginTop: 20,
  },
  statusBar: {
    height: StatusBarHeight + 80,
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
  card: {
    padding: 20,
    margin: 15,
    borderRadius: 15,
    height: 680,
    // height: ScreenHeight - 150,
    marginBottom: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  issuer: {
    width: '90%',
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomColor: '#D4D4D4',
    borderBottomWidth: 0.9,
    padding: 15,
    alignItems: 'center',
    paddingBottom: 10,
  },
  iconIssuer: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  issuerContent: {
    marginLeft: 15,
    paddingRight: 20,
  },
  nameIssuer: {
    color: '#000000',
  },
  descriptionIssuer: {
    color: '#74788D',
    marginTop: 5,
    paddingRight: 14,
  },
  pageTitleButton: {
    flexDirection: 'row',
  },
  pageTitle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  pageTitleText: {
    color: 'white',
    fontSize: 15,
    paddingLeft: 10,
  },
  title: {
    color: '#404040',
    fontSize: 25,
    marginBottom: 10,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  text: {color: '#74788D', textAlign: 'center'},
  tabBar: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  active: {
    marginTop: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#3827B4',
    paddingBottom: 10,
    width: '50%',
  },
  inactive: {
    paddingBottom: 5,
    width: '50%',
  },
});

export default DocHolder;
