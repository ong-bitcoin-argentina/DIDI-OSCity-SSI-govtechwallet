import React, {useRef} from 'react';
import I18n from '../i18n/i18n';
import Swiper from 'react-native-swiper';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import {globalStyles} from '../config/styles';

const ScreenHeight = Dimensions.get('screen').height;

interface Props1 {
  navigation: any;
}

export default function Tutorial({navigation}: Props1) {
  let typeSwiper: any;
  const swiper = useRef(typeSwiper);

  const toWallet = () => {
    navigation.navigate('AlreadyWallet');
  };

  return (
    <Swiper
      ref={swiper}
      index={0}
      loop={false}
      dotColor="#D6D6D6"
      activeDotColor={'#3827B4'}
      style={styles.allContainer}
      dotStyle={{marginBottom: ScreenHeight <= 640 ? 2 : 13}}
      activeDotStyle={{marginBottom: ScreenHeight <= 640 ? 2 : 13}}>
      <SafeAreaView
        style={[styles.stepImgContainer, globalStyles.backgroundContainer]}>
        <View style={styles.containerImage}>
          <Image
            source={require('../config/assets/cintillo_beta.png')}
            style={styles.cintilloBeta}
          />
          <Image
            source={require('../config/assets/tuto01.png')}
            style={styles.stepImage}
          />
        </View>
        <View style={styles.stepContainer}>
          <Text style={[styles.titleTutorial, globalStyles.fontBold]}>
            {I18n.t('tutorial.whatIsSoberana')}
          </Text>
          <Text style={[styles.textTutorial, globalStyles.fontRegular]}>
            {I18n.t('tutorial.whatIsSoberanaContent')}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.nextButtonContainer}>
            <View />
            <TouchableOpacity>
              <Text style={[styles.textButtonFake, globalStyles.fontBold]}>
                {I18n.t('next')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.skipContainer}>
            <TouchableOpacity
              data-testid="continueButtonStep0"
              onPress={() => {
                toWallet();
              }}>
              <Text style={[globalStyles.fontBold, styles.skipButton]}>
                {I18n.t('skip')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity
              data-testid="swipergoUp"
              onPress={() => swiper.current.scrollBy(1)}>
              <Text style={[styles.textButton, globalStyles.fontBold]}>
                {I18n.t('next')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView
        style={[styles.stepImgContainer, globalStyles.backgroundContainer]}>
        <View style={styles.containerImage}>
          <Image
            source={require('../config/assets/cintillo_beta.png')}
            style={styles.cintilloBeta}
          />
          <Image
            source={require('../config/assets/tuto02.png')}
            style={styles.stepImage}
          />
        </View>
        <View style={styles.stepContainer}>
          <Text style={[styles.titleTutorial, globalStyles.fontBold]}>
            {I18n.t('tutorial.whatCanDo')}
          </Text>
          <Text style={styles.textTutorial}>
            {I18n.t('tutorial.whatCanDoContent')}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity
              data-testid="swipergoDownBis"
              onPress={() => swiper.current.scrollBy(-1)}>
              <Text style={[styles.textButton, globalStyles.fontBold]}>
                {I18n.t('back')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.skipContainer}>
            <TouchableOpacity
              data-testid="continueButtonStep1"
              onPress={() => {
                toWallet();
              }}>
              <Text style={[globalStyles.fontBold, styles.skipButton]}>
                {I18n.t('skip')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity
              data-testid="swipergoUpBis"
              onPress={() =>
                swiper.current ? swiper.current.scrollBy(1) : null
              }>
              <Text style={[styles.textButton, globalStyles.fontBold]}>
                {I18n.t('next')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView
        style={[styles.stepImgContainer, globalStyles.backgroundContainer]}>
        <View style={styles.containerImage}>
          <Image
            source={require('../config/assets/cintillo_beta.png')}
            style={styles.cintilloBeta}
          />
          <Image
            source={require('../config/assets/tuto03.png')}
            style={styles.stepImage}
          />
        </View>
        <View style={styles.stepContainer}>
          <Text style={[styles.titleTutorial, globalStyles.fontBold]}>
            {I18n.t('tutorial.whatIsIdentity')}
          </Text>
          <Text style={styles.textTutorial}>
            {I18n.t('tutorial.whatIsIdentityContent')}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity
              data-testid="swipergoDown"
              onPress={() => swiper.current.scrollBy(-1)}>
              <Text style={[styles.textButton, globalStyles.fontBold]}>
                {I18n.t('back')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.skipContainer}>
            <TouchableOpacity
              data-testid="continueButtonStep2"
              onPress={() => {
                toWallet();
              }}>
              <Text style={[globalStyles.fontBold, styles.skipButton]}>
                {I18n.t('skip')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity
              data-testid="continueButtonStep3"
              onPress={() => {
                toWallet();
              }}>
              <Text style={[styles.textButton, globalStyles.fontBold]}>
                {I18n.t('continue')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  nextButtonContainer: {
    justifyContent: 'center',
  },
  containerImage: {
    flex: 5,
  },
  titleTutorial: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 10,
  },
  textTutorial: {
    textAlign: 'center',
    fontSize: 16,
    paddingLeft: 55,
    paddingRight: 55,
    color: '#74788D',
  },
  textButtonFake: {
    backfaceVisibility: 'hidden',
    color: 'white',
  },
  textButton: {
    color: '#3827B4',
    fontSize: 14,
  },
  stepImage: {
    width: '100%',
    height: '90%',
    resizeMode: 'contain',
    paddingTop: '10%',
  },
  skipButton: {
    color: '#D6D6D6',
  },
  skipContainer: {
    justifyContent: 'center',
    marginBottom: 35,
    paddingLeft: 6,
  },
  stepImgContainer: {
    paddingTop: '10%',
    flexDirection: 'column',
    flex: 1,
  },
  allContainer: {
    position: 'relative',
  },
  cintilloBeta: {
    position: 'absolute',
    width: '35%',
    height: '35%',
    top: -70,
    right: -30,
    zIndex: 5,
  },
});

// export default Tutorial;
