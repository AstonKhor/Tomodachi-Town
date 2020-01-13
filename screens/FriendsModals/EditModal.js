import { Modal, View, Text, Button } from 'react-native';
import React from 'react';

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
            return <Text key={friend.name}>{friend.name}</Text>
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
    
    