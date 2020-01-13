import { Modal, View, Text, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import React from 'react';
import images from '../../assets/characters/characters.js';
import { Input, Button } from 'react-native-elements';

let AddModal = ({ visible,  }) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}>
      <View style={{marginTop: 22, padding: 50}}>
        <Input placeholder='Full Name' errorStyle={{ color: 'red' }} errorMessage='ENTER A VALID NAME'/>
        <Input placeholder='DOB' errorStyle={{ color: 'red' }} errorMessage='ENTER A VALID DOB'/>
        <ScrollView horizontal style={styles.characters}>
          {Object.keys(images).map((name) => {
            return <Image style={{width: 36, height: 52, padding: 25}}source={images[name]}/>
          })}
        </ScrollView>
        <Input placeholder='Location (Optional)' label='Optional'/>
        <Input placeholder='Current Job (Optional)'/>
        <Input placeholder='SO Name (Optional)'/>
        <Input placeholder='Hobbies (Optional)'/>
        <Input placeholder='Future Aspirations (Optional)'/>
        <Button buttonStyle={styles.submit} title="Add" onPress={() => {}}/>
        <Button buttonStyle={styles.cancel} title="Cancel" onPress={() => {}}/>
      </View>
    </Modal>
  )
}
    
let styles = StyleSheet.create({
  submit: {
    marginTop: 30,
  },
  cancel: {
    marginTop: 20,
    backgroundColor: 'grey',
  },
  characters: {
    padding: 30,
  },
  row: {
    flexDirection: 'row',

  }
})
export default AddModal;