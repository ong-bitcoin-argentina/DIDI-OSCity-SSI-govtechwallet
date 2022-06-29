import {openDatabase, enablePromise} from 'react-native-sqlite-storage';
import * as Sentry from '@sentry/react-native';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase(
    {
      name: 'oswallet.db',
      location: 'default',
      dblocation: 'default',
      createFromLocation: 2,
    },
    () => {},
    (error: any) => {
      Sentry.captureException(error);
    },
  );
};

export const deleteTable = async (db: any, tableName: string) => {
  const query = `drop table ${tableName}`;
  await db.executeSql(query);
};

// ISSUERS

export const createIssuersTable = async (db: any) => {
  const query = `CREATE TABLE IF NOT EXISTS issuers_connections (
      name VARCHAR(50),
      description VARCHAR(100),
      icons VARCHAR(200),
      url VARCHAR(100)
    );`;
  try {
    db.executeSql(query);
  } catch (error) {
    Sentry.captureException(error);
  }
};

export const getIssuersInfo = async (db: any) => {
  try {
    const results = await db.executeSql('SELECT * FROM issuers_connections');
    const issuersInfo: any = [];
    results.forEach((result: any) => {
      for (let index = 0; index < result.rows.length; index++) {
        issuersInfo.push(result.rows.item(index));
      }
    });
    return issuersInfo;
  } catch (error) {
    Sentry.captureException(error);
    throw Error('Failed to get todoItems !!!');
  }
};

export const saveIssuersInfo = async (
  db: any,
  name: string,
  description: string,
  icon: string,
  url: string,
) => {
  try {
    const insertQuery = `INSERT INTO issuers_connections (name, description, icons, url) VALUES ('${name}', '${description}', '${icon}', '${url}')`;
    return db.executeSql(insertQuery);
  } catch (error) {
    Sentry.captureException(error);
    return error;
  }
};
