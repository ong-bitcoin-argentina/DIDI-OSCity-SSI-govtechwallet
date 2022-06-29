import AsyncStorage from '@react-native-community/async-storage';

export async function setLocal(key: string, data: any) {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
}

export async function getLocal(key: string) {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
}

export async function removeLocal(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }
}

export async function updateLocal(key: string, data: any) {
  const localData = (await getLocal(key)) || {};
  const mergedData = {...localData, ...data};
  await setLocal(key, mergedData);
}
