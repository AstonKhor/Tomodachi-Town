import { Modal, View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import React from 'react';
import { Button, Overlay } from 'react-native-elements';
import images from '../../assets/characters/characters.js';

export let EditModal = ({ visible, people, edit, reset, placeMode }) => {
  return (
    <Overlay
        animationType="slide"
        transparent={true}
        isVisible={visible}>
      <View style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <Image
            style={styles.logo}
            source={require('../../assets/Town/Title.png')}>
          </Image>
          <Text></Text>
          {people.map((friend) => {
            //conditional rendering based on if characters had been placed
            return (
              <TouchableHighlight style={styles.person} onPress={() => { placeMode(friend.name, friend.count) }} key={friend.name}>
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
    </Overlay>
  )
}
    
let styles = StyleSheet.create({
  logo: {
    height: 64,
    width: 272,
    justifyContent: 'center'
  },
  buttons: {
    flexDirection: 'column',
  },
  button: {
    backgroundColor: 'green',
    margin: 5,
  },
  row: {
    flexDirection: 'row',

  }
})