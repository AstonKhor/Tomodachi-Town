import { AsyncStorage } from 'react-native';

let _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('PEOPLE');
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log('error on retrieve:', error)
  }
}

let _storeData = async (data) => {
  try {
    await AsyncStorage.setItem('PEOPLE', JSON.stringify(data));
  } catch (error) {
    console.log('error on storage:', error)
  }
}

export { _retrieveData, _storeData };