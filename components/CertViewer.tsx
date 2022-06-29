import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {NavigationState} from '@react-navigation/native';
import {useBrandWalletContext} from '../controllers/brandWallet';
import {globalStyles, BackgroundColor, setLogo} from '../config/styles';
import I18n from '../i18n/i18n';
interface Props {
  navigation: NavigationState;
}

function CertViewer({navigation}: Props, props: any) {
  const {brandWallet} = useBrandWalletContext();
  // const { name } = navigation?.state.params;
  console.log('*******props*****');
  console.log(props);
  return (
    <SafeAreaView style={globalStyles.backgroundContainer}>
      <View style={{height: '13%'}}>
        <LinearGradient
          colors={['#3827B4', '#5120ac', '#6C18A4']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          style={styles.containerGradient}>
          <TouchableOpacity onPress={() => navigation.goBack(null)}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../config/assets/regresar.png')}
            />
          </TouchableOpacity>
          <Image
            style={styles.logo}
            source={{
              uri: setLogo(),
            }}
          />
        </LinearGradient>
      </View>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        style={styles.container}>
        <Text style={[styles.title, globalStyles.fontBold]}>
          {I18n.t('certificate.certViewer')}
        </Text>
        <WebView
          automaticallyAdjustContentInsets={true}
          scalesPageToFit={true}
          bounces={true}
          javaScriptEnabled
          // source={{
          //   html: `
          //         <!DOCTYPE html>
          //         <html>
          //           <head></head> // <--add header styles if needed
          //           <body>
          //             <div id="baseDiv">${iframeString}</div> //<--- add your iframe here
          //           </body>
          //         </html>
          //   `,
          // }}
          source={{
            uri: 'https://misiones-id.os.city/ab6854cf-d54d-4686-8376-866570f255a7',
          }}
          style={{marginTop: 10, marginBottom: 10, width: 600, height: 400}}
        />
        {/* <Text style={styles.text}>{brandWallet.termsAndConditions}</Text> */}
        <TouchableOpacity
          style={[styles.nextButton, BackgroundColor()]}
          onPress={() => {
            navigation.navigate('DocHolder');
          }}>
          <Text style={[styles.textButton, globalStyles.fontRegular]}>
            {I18n.t('accept')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 55,
    paddingRight: 55,
  },
  containerGradient: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 35,
    paddingRight: 55,
    height: '100%',
    flexDirection: 'row',
  },
  logo: {
    width: '40%',
    height: 100,
    resizeMode: 'contain',
    marginLeft: 15,
  },
  buttonsContainer: {
    alignItems: 'center',
  },
  title: {
    color: '#404040',
    fontSize: 25,
    marginTop: 25,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#9DA1B2',
    lineHeight: 22,
    paddingBottom: 30,
  },
  nextButton: {
    width: 270,
    textAlign: 'center',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    height: 38,
  },
  textButton: {
    color: 'white',
    fontSize: 15,
  },
});

export default CertViewer;
