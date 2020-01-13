import { Modal, View, Text, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import React from 'react';
import images from '../../assets/characters/characters.js';
import { Input, Button } from 'react-native-elements';
import { _retrieveData, _storeData } from '../async-storage/data';

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.currentSelection = 'gabe';
    this.state = {
      name: '',
      count: 1,
      locx: [],
      locy: [],
      character: '',
    };
  }

  handleCharSelect (evt, name) {
    console.log(name);
    this.currentSelection = name;
    this.setState({ 
      character: name
    })
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}>
        <View style={{ marginTop: 22, padding: 50 }}>
          <Input placeholder='Full Name' errorStyle={{ color: 'red' }} errorMessage='ENTER A VALID NAME' />
          <Input placeholder='DOB' errorStyle={{ color: 'red' }} errorMessage='ENTER A VALID DOB' />
          <ScrollView horizontal style={styles.characters}>
            {Object.keys(images).map((name) => {
              let charStyle = 'unchosenChar';
              if (this.currentSelection === name) {
                charStyle = 'chosenChar'
              }
              return (
                <TouchableHighlight onPress={(evt) => { this.handleCharSelect(evt, name)}} key={name}>
                  <Image style={styles[charStyle]} source={images[name]} />
                </TouchableHighlight>
              )
            })}
          </ScrollView>
          <Input placeholder='Location (Optional)' label='Optional' />
          <Input placeholder='Current Job (Optional)' />
          <Input placeholder='SO Name (Optional)' />
          <Input placeholder='Hobbies (Optional)' />
          <Input placeholder='Future Aspirations (Optional)' />
          <Button buttonStyle={styles.submit} title="Add" onPress={() => { _storeData }} />
          <Button buttonStyle={styles.cancel} title="Cancel" onPress={() => { this.props.toggleModal(!this.props.visible) }} />
        </View>
      </Modal>
    )
  }

}

let styles = StyleSheet.create({
  chosenChar: {
    width: 36,
    height: 52,
    padding: 25,
    borderColor: 'black',
    borderWidth: 5
  },
  unchosenChar: {
    width: 36,
    height: 52,
    padding: 25
  },
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