import { Modal, View, Text, Button, Image, StyleSheet } from 'react-native';
import React from 'react';
import images from '../../assets/characters/characters.js';

export let EditModal = ({ visible, people, edit, reset}) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}>
      <View style={{marginTop: 22, padding: 50}}>
        <View>
          <Text>Friends</Text>
          {people.map((friend) => {
            return (
              <View style={styles.row} key={friend.name}>
                <Text>{friend.name}</Text>
                <Image source={images[friend.character]}/>
                <Text> X {friend.count}</Text>
              </View>)
          })}
          <Button title='Done' onPress={() => {
            edit(!visible);
          }}></Button>

          <Button title='Reset All' onPress={() => {
            reset();
          }}></Button>
        </View>
      </View>
    </Modal>
  )
}
    
let styles = StyleSheet.create({
  
  row: {
    flexDirection: 'row',

  }
})