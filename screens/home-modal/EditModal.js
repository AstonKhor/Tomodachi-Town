import { Modal, View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';
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
          <View style={styles.backgroundColor}>
          <Button buttonStyle={styles.button} title='Done' onPress={() => edit(!visible) }></Button>
          <Button buttonStyle={styles.button} title='Reset All' onPress={() => reset() }></Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}
    
let styles = StyleSheet.create({
  buttons: {
    flexDirection: 'column',
  },
  button: {
    backgroundColor: '#4ee44e',
    margin: 5,
  },
  row: {
    flexDirection: 'row',

  }
})