/* eslint-disable react-native/no-inline-styles */
import _ from 'lodash';
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native';

import {useUserContext} from '../controllers/user';
import {useBrandWalletContext} from '../controllers/brandWallet';
import ModalComponent from './ModalComponent';
import FirstCertificate from './FirstCertificate';
import Header from './Header';
import WalletConnect from '@walletconnect/client';
import {DEFAULT_CHAIN_ID} from '../constants/default';
import AsyncStorage from '@react-native-community/async-storage';

import {
  getDBConnection,
  createIssuersTable,
  getIssuersInfo,
  saveIssuersInfo,
  // deleteTable,
} from '../services/sqlite';
import {getUserInfo} from '../services/user';

import IssuersList from './IssuersList';
interface Props {
  navigation: {
    navigate(destination: string, params: object): void;
    goBack: () => void;
  };
}

function MainScreen({navigation}: Props) {
  // const uriRef = useRef(true);
  const sqliteRef = useRef(true);
  const resettingRef = useRef(true);

  const {user, setUser} = useUserContext();
  const {brandWallet} = useBrandWalletContext();
  // News
  const [db, setDB] = useState();
  const [issuers, setIssuers] = useState([
    {
      name: '',
      icons: '',
      description: '',
      url: '',
    },
  ]);
  const [connector, setConnector] = useState();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFromQr, setFromQr] = useState(false);
  const [connected, setConnected] = useState(false);
  const [erroMessage, setErroMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  const loadDataCallback = useCallback(async () => {
    try {
      console.log('Empezaré la conexión');
      const db = await getDBConnection();
      setDB(db);
      /* Aquí empieza a usar la db de sqlite */
      await createIssuersTable(db);
      // await saveIssuersInfo(
      //   db,
      //   'Govtech Hub',
      //   'Entender al ecosistema GovTech como una red de conversaciones, un sistema abierto, un espacio de colaboración distribuida, variados nodos y personas articulándose a través de conexiones, generando valor público, privado, social y cívico a través del uso inteligente de la tecnología para la transformación digital de gobiernos',
      //   'https://url.com',
      //   'https://govtechhub.org/wp-content/uploads/2022/03/logo-768x232.png',
      // );
      const issuersInfo = await getIssuersInfo(db);
      /* Async */
      // const issuersInfo: any = [];
      if (issuersInfo.length > 0) {
        await setIssuers(issuersInfo);
      } else {
        console.log('Llegué de primera a versi había; MEANWHILE');
        /* @MEANWHILE */
        let issuersStorage: any = await AsyncStorage.getItem('issuer');
        issuersStorage = JSON.parse(issuersStorage) || [];
        console.log(
          'issuersStorage de los que ya hay, CUANDO  SE RECARGA EL COMPONENT',
        );
        console.log(issuersStorage);
        await setIssuers(issuersStorage);
      }
      // deleteTable(db, 'issuers_connections');
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  useEffect(() => {
    const setUserCallback = async () => {
      try {
        console.log(
          'issuers de los que ya hay, CUANDO  SE RECARGA EL COMPONENT',
        );
        console.log(issuers);
        setUser((prevState: userType) => {
          // return {...prevState, issuers: {...issuers[0]}};
          return {...prevState, issuers: issuers};
        });
      } catch (error) {
        console.error(error);
      }
    };
    if (
      sqliteRef.current &&
      issuers.length > 0 &&
      issuers[0]?.url &&
      issuers[0]?.name
    ) {
      setUserCallback();
    }
  }, [issuers, setUser]);

  useEffect(() => {
    // console.log(uriRef.current);
    // console.log(brandWallet.uri);
    const initWalletConnect = (uri: string) => {
      console.log('***** DESDE principio de Wallet connect uri ****');
      console.log(brandWallet.uri);
      setLoading(true);
      try {
        const connector: any = new WalletConnect({
          uri,
          clientMeta: {
            description: 'WalletConnect Developer App',
            url: 'https://walletconnect.org',
            icons: ['https://walletconnect.org/walletconnect-logo.png'],
            name: 'Test Ebriaana',
          },
        });
        // console.log('***** CONNECTOR DESDE initWalletConnect ****');
        // console.log(connector);
        // if (!connector.connected) {
        //   await connector.createSession();
        // }
        resettingRef.current = true;
        setLoading(false);
        setConnector(connector);
        // setUri(connector.uri);
      } catch (error) {
        setLoading(false);
        setConnected(false);
        // throw error;
      }
    };
    if (brandWallet.uri) {
      initWalletConnect(brandWallet.uri);
      setFromQr(true);
      // uriRef.current = false;
    }
  }, [brandWallet.uri]);

  const subscribeToEvents = () => {
    if (connector) {
      // console.log('***** DESDE Suscribe to events connector ****');
      // console.log(connector);
      // console.log(connector?._eventManager?._eventEmitters);
      connector.on('session_request', async (error: any, payload?: any) => {
        console.log('EVENT', 'session_request');
        console.log('isFromQr');
        console.log(isFromQr);
        if (error) {
          setConnected(false);
          throw error;
        } else if (isFromQr) {
          approveSession();
        }

        const {peerMeta} = payload.params[0];
        console.log('**** PEERMETA ***');
        console.log(peerMeta);
        // Llega hasta aquí y ya no hace lo demás pra abajo
        let validate: any = []; // Desde aquí ya no hace
        if (peerMeta.name.includes('+')) {
          validate = issuers.map((issuer: any) => {
            const issuer_project = issuer.name.split('+')[1];
            const peer_project = peerMeta.name.split('+')[1];
            return issuer_project === peer_project;
          });
        }
        if (validate.includes(true)) {
          setModalVisible(true);
          setLoading(false);
          setErroMessage('Ya se ha agregado anteriormente esta entidad');
        } else {
          /* Aquí empieza a usar la db de sqlite */
          await saveIssuersInfo(
            db,
            peerMeta.name,
            peerMeta.description,
            peerMeta.icons,
            peerMeta.url,
          );
          const issuersInfo = await getIssuersInfo(db);
          /* Async */
          // const issuersInfo: any = [];
          console.log('* * * issuersInfo * * *');
          console.log(issuersInfo);
          if (issuersInfo.length > 0) {
            console.log('DESDE el if normal de los issuers');
            await setIssuers(issuersInfo);
          } else {
            console.log('tiene que entrar acá a agregar nuevo issuer');
            /* @MEANWHILE */
            const issuersStorage: any = [];
            await issuersStorage.push({
              description: peerMeta.description,
              name: peerMeta.name,
              icons: peerMeta.icons,
              url: peerMeta.url,
            });
            if (issuers.length > 0) {
              issuers.forEach((issuer: any) => {
                issuersStorage.push(issuer);
              });
            }
            console.log('issuersStorage');
            console.log(issuersStorage);
            await setIssuers(issuersStorage);
            // await AsyncStorage.setItem(
            //   'issuer',
            //   JSON.stringify(issuersStorage),
            // );
          }
        }
      });

      connector.on('session_update', error => {
        console.log('EVENT', 'session_update');
        if (error) {
          throw error;
        }
      });

      connector.on('call_request', async (error: any, payload: any) => {
        // tslint:disable-next-line
        console.log('EVENT', 'call_request', 'method', payload.method);
        console.log('EVENT', 'call_request', 'params', payload.params);

        if (error) {
          throw error;
        }

        // await getAppConfig().rpcEngine.router(payload, state, bindedSetState);
      });

      connector.on('connect', (error: any) => {
        console.log('EVENT', 'connect');
        if (error) {
          throw error;
        }

        // setState(prevState => {
        //   return {...prevState, ...{connected: true}};
        // });
        setConnected(true);
      });

      connector.on('disconnect', (error: any) => {
        console.log('EVENT', 'disconnect');
        if (error) {
          throw error;
        }
        setConnected(false);
        // connector?.killSession();
        resettingRef.current = false;
        // setConnector(null);
        // resetApp();
      });
    }
  };

  const approveSession = () => {
    // const {connector, chainId, address} = state;
    // console.log('Holi, vine a aprovear');
    // console.log('******Connector desde el aprove***');
    // console.log(connector);
    resettingRef.current = true;
    if (connector) {
      connector.approveSession({
        DEFAULT_CHAIN_ID,
        accounts: [user.public_address],
      });
      setConnected(true);
    }
    // setState(prevState => {
    //   return {...prevState, connector};
    // });
  };

  useEffect(() => {
    // console.log('***** Connector despues de initWallet ****');
    // console.log(connector);
    if (resettingRef.current && connector) {
      resettingRef.current = false;
      subscribeToEvents();
    }
  }, [connector]);

  return (
    <SafeAreaView>
      <ModalComponent
        erroMessage={erroMessage}
        titleModal="Error de conexión con la entidad"
        textButtonModal="Cerrar"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Header />
      {user && user.issuers.length <= 0 ? (
        <FirstCertificate navigation={navigation.navigate} />
      ) : (
        <IssuersList navigation={navigation.navigate} />
      )}
    </SafeAreaView>
  );
}

export default MainScreen;
