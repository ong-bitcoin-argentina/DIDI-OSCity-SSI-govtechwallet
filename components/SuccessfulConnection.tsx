import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import {globalStyles} from '../config/styles';
import I18n from '../i18n/i18n';

function SuccessfulConnection({navigation: {navigate}}) {
  useEffect(() => {
    setTimeout(() => {
      navigate('MainScreen');
    }, 5000);
  });

  return (
    <View style={styles.connectionContainer}>
      <View style={styles.connectionTextContainer}>
        <Image
          source={require('../config/assets/manita.png')}
          style={styles.connectionImage}
        />
      </View>
      <View style={styles.connectionTextContainer}>
        <Text style={[globalStyles.fontRegular, styles.connectionText]}>
          {I18n.t('qrScan.success')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  connectionImage: {
    width: 260,
    height: 260,
    resizeMode: 'contain',
  },
  connectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  connectionTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%',
  },
  connectionText: {
    textAlign: 'center',
    fontSize: 18,
    paddingLeft: 50,
    paddingRight: 50,
    color: '#4A22AF',
  },
});

export default SuccessfulConnection;
