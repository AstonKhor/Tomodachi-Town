import { Modal, View, Text, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import React from 'react';
import images from '../../assets/characters/characters.js';
import { Input, Button, Overlay } from 'react-native-elements';
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
      character: 'gabe',
    };
  }

  handleCharSelect (evt, name) {
    console.log(this.props);
    this.currentSelection = name;
    this.setState({ 
      character: name
    })
  }



  handleAdd () {
    let person = this.state;
    person['hangoutsYTD'] = 0;
    person['goalHangouts'] = 0;
    this.props.save(person);
  }

  render() {
    return (
      <Overlay
        animationType="slide"
        transparent={true}
        isVisible={this.props.visible}>
        <View style={{ marginTop: 0, padding: 15 }}>
          <Input placeholder='Name' onChangeText={(text) => this.setState({name: text})} errorStyle={{ color: 'red' }} errorMessage='ENTER A VALID NAME' />
          <Input placeholder='DOB' onChangeText={(text) => this.setState({dob: text})} errorStyle={{ color: 'red' }} errorMessage='ENTER A VALID DOB' />
          <Text style={styles.currSelectChar}>{this.currentSelection}</Text>
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
          <Input placeholder='Location (Optional)' label='Optional'/>
          <Input placeholder='Current Job (Optional)' />
          <Input placeholder='SO Name (Optional)' />
          <Input placeholder='Hobbies (Optional)' />
          <Input placeholder='Future Aspirations (Optional)' />
          <Button buttonStyle={styles.submit} title="Add" onPress={() => { this.handleAdd() }} />
          <Button buttonStyle={styles.cancel} title="Cancel" onPress={() => { this.props.toggleModal(!this.props.visible) }} />
        </View>
      </Overlay>
    )
  }

}

let styles = StyleSheet.create({
  currSelectChar: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
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