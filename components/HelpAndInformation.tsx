import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import {Card} from 'react-native-shadow-cards';

import {useHelpInfoContext} from '../controllers/helpInfo';
import {globalStyles} from '../config/styles';
import I18n from '../i18n/i18n';

const StatusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const ScreenHeight = Dimensions.get('screen').height;

function HelpAndInformation({navigation: {goBack}}) {
  const [activeSections, setActiveSection] = useState([]);
  const {helpInfo} = useHelpInfoContext();

  const _renderHeader = (section: any) => {
    return (
      <View style={styles.itemList}>
        <Text style={[styles.textItemList, globalStyles.fontBold]}>
          {section.question}
        </Text>
      </View>
    );
  };

  const _renderContent = (section: any) => {
    return (
      <View style={styles.itemContent}>
        <Text style={globalStyles.fontRegular}>{section.answer}</Text>
      </View>
    );
  };

  const _updateSections = activeSections => {
    setActiveSection(activeSections);
  };

  return (
    <SafeAreaView style={globalStyles.backgroundContainer}>
      <View style={styles.statusBar}>
        <LinearGradient
          colors={['#3827B4', '#5120ac', '#6C18A4']}
          style={styles.containerGradient}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}>
          <StatusBar translucent={true} backgroundColor={'transparent'} />
          <View
            style={[
              styles.pageTitle,
              {bottom: Platform.OS === 'ios' ? 40 : 20},
            ]}>
            <TouchableOpacity
              style={styles.pageTitleButton}
              onPress={() => goBack(null)}>
              <Image
                style={{width: 15, height: 15}}
                source={require('../config/assets/regresar.png')}
              />
              <Text style={(globalStyles.fontBold, [styles.pageTitleText])}>
                {I18n.t('settings.helpAndInformation')}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      <View style={styles.container}>
        <Card style={styles.card}>
          <ScrollView>
            <Text style={[styles.title, globalStyles.fontBold]}>
              {I18n.t('settings.helpAndInformation')}
            </Text>
            <Accordion
              activeSections={activeSections}
              sections={helpInfo}
              touchableComponent={TouchableOpacity}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              onChange={_updateSections}
              duration={400}
              renderAsFlatList={false}
            />
          </ScrollView>
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
    height: ScreenHeight - 200,
    marginBottom: 20,
  },
  statusBar: {
    height: StatusBarHeight + 80,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerGradient: {
    paddingLeft: 25,
    height: '100%',
  },
  pageTitleButton: {
    flexDirection: 'row',
  },
  pageTitle: {
    position: 'absolute',
    left: 20,
  },
  pageTitleText: {
    color: 'white',
    fontSize: 15,
    paddingLeft: 10,
  },
  title: {
    color: '#404040',
    fontSize: 20,
    marginBottom: 25,
    alignSelf: 'center',
  },
  itemList: {
    borderBottomColor: '#D4D4D4',
    borderBottomWidth: 0.9,
    fontSize: 18,
    paddingBottom: 15,
    paddingTop: 15,
  },
  itemContent: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 5,
  },
  textItemList: {
    paddingLeft: 13,
    color: '#404040',
  },
});

export default HelpAndInformation;
