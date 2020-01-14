import { Modal, View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import React from 'react';
import { Button, Overlay } from 'react-native-elements';
import images from '../../assets/characters/characters.js';
import { ScrollView } from 'react-native-gesture-handler';

export let EditModal = ({ visible, people, edit, reset, placeMode }) => {
  return (
    <Overlay
        animationType="slide"
        transparent={true}
        isVisible={visible}
        windowBackgroundColor="rgba(255, 255, 255, 0)"
        overlayBackgroundColor="rgba(0, 0, 0, .9)"
        style={styles.overlay}
        borderRadius={20}>
      <ScrollView style={{borderColor: 'black'}}>
        <View style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
          <View>
            <Image
              style={styles.logo}
              source={require('../../assets/Town/Title.png')}>
            </Image>
            {people.map((friend) => {
              //conditional rendering based on if characters had been placed
              return (
                <TouchableHighlight style={styles.person} onPress={() => { placeMode(friend.name, friend.count) }} key={friend.name}>
                  <View style={styles.row} >
                    <Image source={images[friend.character]} style={styles.image}/>
                    <Text style={styles.rowText}>{friend.name}  </Text>
                    <Text style={styles.rowText}>  X  {friend.count}</Text>
                  </View>
                </TouchableHighlight>)
            })}
            <View style={styles.backgroundColor}>
            <Button buttonStyle={styles.button} title='Done' onPress={() => edit(!visible) }></Button>
            <Button buttonStyle={styles.button} title='Reset All' onPress={() => reset() }></Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </Overlay>
  )
}
    
let styles = StyleSheet.create({
  rowText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: 25,
    height: 32,
  },
  overlay: {
    opacity: .5,
  },
  logo: {
    height: 64,
    width: 272,
    justifyContent: 'center',
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
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    alignItems:'center',
    borderBottomColor: '#ffbab5',
    color: 'white',
  }
})