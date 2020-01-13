import { Modal, View, Text, Button, Image, StyleSheet, TouchableHighlight } from 'react-native';
import React from 'react';
import images from '../../assets/characters/characters.js';

export let EditModal = ({ visible, people, edit, reset, placeMode }) => {
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
              <TouchableHighlight onPress={() => { placeMode(friend.name, friend.count) }} key={friend.name}>
                <View style={styles.row} >
                  <Text>{friend.name}</Text>
                  <Image source={images[friend.character]}/>
                  <Text> X {friend.count}</Text>
                </View>
              </TouchableHighlight>)
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