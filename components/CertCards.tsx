/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Share,
  Linking,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Collapsible from 'react-native-collapsible';
import {Card} from 'react-native-shadow-cards';

import {globalStyles} from '../config/styles';
import I18n from '../i18n/i18n';

function CertCards(props: any) {
  const [collapsed, setCollapsed] = useState(true);
  const [currentkey, setKey] = useState(null);
  const [activeSharing, setactiveSharing] = useState(false);

  const onShare = async (link: string) => {
    setactiveSharing(true);
    try {
      const result = await Share.share({
        message: link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          setactiveSharing(false);
        } else {
          // shared
          setactiveSharing(false);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        setactiveSharing(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const viweCert = async (link: string) => {
    Linking.openURL(link);
  };

  return (
    <ScrollView>
      {props.certs.length > 0
        ? props.certs.map((section: any, key: any) => {
            return (
              <Card style={styles.card}>
                <View style={styles.certifyCollapsibleContainer}>
                  <View style={styles.containerTextIdentityButton}>
                    <Text
                      style={[
                        styles.titleIdentityButton,
                        globalStyles.fontBold,
                      ]}>
                      {section?.title}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={[
                          styles.dateIdentityButton,
                          globalStyles.fontBold,
                        ]}>
                        {I18n.t('certificate.date')}:
                      </Text>
                      <Text
                        style={[
                          styles.dateIdentityButton,
                          globalStyles.fontRegular,
                        ]}>
                        {section?.created?.split('T')[0]}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.actionsContainer}>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                      onPress={async () => {
                        setCollapsed(true);
                        setKey(key);
                        if (currentkey === key) {
                          setCollapsed(!collapsed);
                        } else {
                          setCollapsed(false);
                        }
                      }}>
                      <Image
                        style={{width: 15, height: 15, resizeMode: 'contain'}}
                        source={require('../config/assets/codeqr_color.png')}
                      />
                      <Text
                        style={[
                          styles.actionIdentityButton,
                          globalStyles.fontRegular,
                        ]}>
                        qr
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                      onPress={() => {
                        viweCert(section?.link);
                      }}>
                      <Image
                        style={{width: 15, height: 15, resizeMode: 'contain'}}
                        source={require('../config/assets/ojo_abierto_color.png')}
                      />
                      <Text
                        style={[
                          styles.actionIdentityButton,
                          globalStyles.fontRegular,
                        ]}>
                        {I18n.t('see')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                      onPress={() => {
                        onShare(section?.link);
                      }}>
                      <Image
                        style={{width: 15, height: 15, resizeMode: 'contain'}}
                        source={require('../config/assets/artboard80.png')}
                      />
                      <Text
                        style={[
                          styles.actionIdentityButton,
                          globalStyles.fontRegular,
                        ]}>
                        {I18n.t('share')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {currentkey === key ? (
                  <View style={styles.qrContainer}>
                    <Collapsible collapsed={collapsed} align="center">
                      <View style={{marginBottom: 15, marginTop: 20}}>
                        {section?.link ? (
                          <QRCode value={section?.link} />
                        ) : null}
                      </View>
                    </Collapsible>
                  </View>
                ) : null}
              </Card>
            );
          })
        : null}
    </ScrollView>
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
  card: {
    width: '100%',
    padding: 5,
    borderWidth: 0.9,
    borderColor: '#00000014',
    borderRadius: 15,
    marginBottom: 20,
  },
  title: {
    color: '#404040',
    fontSize: 25,
    marginBottom: 10,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#9DA1B2',
    lineHeight: 22,
    paddingBottom: 30,
  },
  qrCollapsible: {
    width: '100%',
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  certifyCollapsibleContainer: {
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
  },
  containerTextIdentityButton: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: '#AEB2B4',
    borderBottomWidth: 0.2,
    paddingBottom: 7,
  },
  titleIdentityButton: {
    color: '#2A3042',
    fontSize: 14,
  },
  dateIdentityButton: {
    color: '#74788D',
    fontSize: 12,
    marginRight: 3,
  },
  actionIdentityButton: {
    color: '#74788D',
    fontSize: 12,
    marginLeft: 5,
    marginRight: 15,
  },
  actionsContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
  },
  qrContainer: {
    width: 100,
    alignSelf: 'center',
  },
});

export default CertCards;
