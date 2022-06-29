import * as Sentry from '@sentry/react-native';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

export const getCertsCollections = () => {
  let collections: any[] = [];
  return firestore()
    .collection('certsConfig')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach((documentSnapshot: any) => {
        collections = documentSnapshot.data()?.certificateCollections;
      });
      return collections;
    });
};

export const getCertificates = async (url: string, publicAddress: any) => {
  try {
    return await axios
      .post(`${url}/get-certificates-by-address`, {
        publicAddress: publicAddress,
      })
      .then(response => {
        console.log('response');
        console.log(response);
        return response.data;
      })
      .catch(error => {
        Sentry.captureException(error);
        return error;
      });
  } catch (error) {
    Sentry.captureException(error);
    return error;
  }
};
