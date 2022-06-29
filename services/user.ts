import * as Sentry from '@sentry/react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import firestore from '@react-native-firebase/firestore';

export const createUserTable = async (db: any) => {
  const query = `CREATE TABLE IF NOT EXISTS person (
      public_address VARCHAR(50),
      private_key VARCHAR(100),
      mnemonic VARCHAR(100),
      key_copy_confirmed int(1),
      pin VARCHAR(6),
      name VARCHAR(100),
      email VARCHAR(50),
      photo VARCHAR(100),
      identifier VARCHAR(50),
      city VARCHAR(50),
      phone VARCHAR(30)
    );`;
  try {
    return db.executeSql(query);
  } catch (error: any) {
    Sentry.captureException(error);
    crashlytics().log('Error create users table.');
    crashlytics().recordError(error);
    return error;
  }
};

export const saveUserInfo = async (
  db: any,
  public_address: string,
  private_key: string,
  mnemonic: string,
  key_copy_confirmed: boolean,
  pin: string,
  name: string,
  email: string,
  photo: any,
  identifier: string,
  city: string,
  phone: string,
) => {
  try {
    console.log('saveuser');
    const insertQuery = `INSERT INTO person (public_address, private_key, mnemonic, key_copy_confirmed, pin, name, email, photo, identifier, city, phone) VALUES ('${public_address}', '${private_key}', '${mnemonic}', '${
      !key_copy_confirmed ? 0 : 1
    }', '${pin}', '${name}', '${email}', '${photo}', '${identifier}', '${city}', '${phone}')`;
    return db.executeSql(insertQuery);
  } catch (error: any) {
    console.log('saveuser error');
    console.log(error);
    Sentry.captureException(error);
    crashlytics().log('Error create users register.');
    crashlytics().recordError(error);
    return error;
  }
};

export const getUserInfo = async (db: any) => {
  try {
    const results = await db.executeSql('SELECT * FROM person');
    const usersInfo: any = [];
    results.forEach((result: any) => {
      for (let index = 0; index < result.rows.length; index++) {
        usersInfo.push(result.rows.item(index));
      }
    });
    return usersInfo[0];
  } catch (error) {
    return error;
  }
};

export const updateUserInfo = async (
  db: any,
  public_address: string,
  private_key: string,
  mnemonic: string,
  key_copy_confirmed: boolean,
  pin: string,
  name: string,
  email: string,
  photo: any,
  identifier: string,
  city: string,
  phone: string,
) => {
  try {
    const updateQuery = `UPDATE person SET public_address = '${public_address}', private_key = '${private_key}', mnemonic = '${mnemonic}', key_copy_confirmed = '${
      !key_copy_confirmed ? 0 : 1
    }', pin = '${pin}', name = '${name}', email = '${email}', photo = '${photo}', identifier = '${identifier}', city = '${city}', phone = '${phone}'`;
    return db.executeSql(updateQuery);
  } catch (error: any) {
    Sentry.captureException(error);
    crashlytics().log('Error update users table.');
    crashlytics().recordError(error);
    return error;
  }
};

export const getCertificates = (uid: string) => {
  return firestore()
    .collection('certificates')
    .where('id_user', '==', uid)
    .get();
};
