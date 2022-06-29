import React from 'react';
import Modal from 'react-native-modal';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {globalStyles, BackgroundColor, TextColor} from '../config/styles';

function ModalComponent(props: {
  modalVisible: boolean | undefined;
  titleModal: string | null | undefined;
  erroMessage: string | null | undefined;
  textButtonModal: string | null | undefined;
  whereFrom: string | null | undefined;
  getBack: (value: boolean) => void | null | undefined;
  setModalVisible: (value: boolean) => void;
}) {
  const closeModal = () => {
    props.setModalVisible(false);
    if (props.whereFrom === 'Qr' && props.getBack) {
      props.getBack(true);
    }
  };

  return (
    <Modal
      animationIn={'slideInDown'}
      animationOut={'slideOutUp'}
      swipeDirection={'up'}
      isVisible={props.modalVisible}
      onSwipeComplete={() => props.setModalVisible(false)}
      style={styles.modal}>
      <View style={styles.containerModal}>
        <Image
          style={styles.desmayo}
          source={require('../config/assets/paracaidas.png')}
        />
        <Text style={[styles.titleModal, globalStyles.fontBold, TextColor()]}>
          OOPS!
        </Text>
        <View style={{width: 200}}>
          <Text
            style={[styles.textModal, globalStyles.fontRegular, TextColor()]}>
            {props.erroMessage}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.buttonModal, BackgroundColor()]}
          onPress={() => {
            closeModal();
          }}>
          <Text style={[styles.textButtonModal, globalStyles.fontRegular]}>
            {props.textButtonModal}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  containerModal: {
    backgroundColor: 'white',
    height: '80%',
    width: '100%',
    position: 'absolute',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleModal: {
    fontSize: 40,
    marginTop: 20,
  },
  textModal: {
    color: '#707070',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonModal: {
    width: 300,
    textAlign: 'center',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    height: 38,
  },
  textButtonModal: {
    color: 'white',
  },
  desmayo: {
    width: 330,
    height: 330,
    resizeMode: 'contain',
  },
});

export default ModalComponent;
