import AsyncStorage from 'react-native';

let _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('PEOPLE');
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log('error')
  }
}

let _storeData = async (data) => {
  let sampleData = [{name: 'Aston Khor', count: 1, character: '../assets/charcters/gabe-idle-run.png', locx: [50], locy: [50]}]
  try {
    await AsyncStorage.setItem('@MySuperStore:POPLE', JSON.stringify(sampleData));
  } catch (error) {
    console.log('error on ')
  }
}

export { _retrieveData, _storeData };