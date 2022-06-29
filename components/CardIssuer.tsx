import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';

import {Card} from 'react-native-shadow-cards';

function CardIssuer(props) {
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          props.navigate('DocHolder', {issuer: props.issuer});
        }}>
        <Card style={styles.card}>
          <Image
            style={styles.iconIssuer}
            source={{uri: `${props.issuer.icons}`}}
          />
          <View style={styles.issuerContent}>
            <Text style={styles.nameIssuer}>
              {props.issuer.name.split('+')[0]}
            </Text>
            <Text numberOfLines={3} style={styles.descriptionIssuer}>
              {props.issuer.description}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconIssuer: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },
  issuerContent: {
    marginLeft: 10,
    paddingRight: 27,
  },
  card: {
    width: '100%',
    padding: 15,
    borderWidth: 0.9,
    borderColor: '#00000014',
    borderRadius: 15,
    marginBottom: 20,
    flexDirection: 'row',
    // alignItems: 'stretch',
  },
  nameIssuer: {
    color: '#000000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  descriptionIssuer: {
    color: '#74788D',
    fontSize: 12,
    marginTop: 2,
    width: 200,
  },
});

export default CardIssuer;
