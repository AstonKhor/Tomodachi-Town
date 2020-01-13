import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, Modal, TouchableHighlight } from 'react-native';
import Layout from '../constants/Layout.js';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { _retrieveData, _storeData } from './async-storage/data.js'
import { MonoText } from '../components/StyledText';
import { EditModal } from './FriendsModals/EditModal.js';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      editModalVisible: false
    }
    let sampleData = [{name: 'Aston Khor', count: 1, character: 'gabe', locx: [50], locy: [50]}]
    _storeData(sampleData);  //for testing only, delete in production

    this.edit = this.edit.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    _retrieveData()
      .then((data) => {
        this.setState({
          people: JSON.parse(data)
        });
        console.log(this.state.people);
      })
    console.log('mounted');
  }

  edit(visible) {
    this.setState({
      editModalVisible: visible,
    })
  }
  //create Modal with different player info
  reset(person) {
    let peopleUpdate = [];
    if (person) {
      for (let i = 0; i < this.state.people.length; i++) {
        if (this.state.people[i].name === person.name) {
          peopleUpdate[i] = {name: this.state.people[i].name, count: this.state.people[i].count, character: this.state.people[i].character, locx: null, locy: null}
        } else {
          peopleUpdate[i] = {name: this.state.people[i].name, count: this.state.people[i].count, character: this.state.people[i].character, locx: this.state.people[i].locx, locy: this.state.people[i].locx}
        }
      }
      console.log('Resetting one', person.name);
    } else {
      for (let i = 0; i < this.state.people.length; i++) {
        peopleUpdate[i] = {name: this.state.people[i].name, count: this.state.people[i].count, character: this.state.people[i].character, locx: null, locy: null}
      }
      console.log('Resetting All');

    }
    
    _storeData(this.state.people)
      .then(() => {
        // console.log(peopleUpdate);
        this.setState({
          people: peopleUpdate,
        });
      })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <EditModal visible={this.state.editModalVisible} people={this.state.people} edit={this.edit} reset={this.reset}/>
        <ScrollView 
          horizontal = {true}
          snapToAlignment={"center"} >
          <ReactNativeZoomableView minZoom={0.5} >
            <Image 
            style={{height: '100%', width: (Layout.window.height* 1.20)}}
            source={require('../assets/Town/background-HarvestMoon1.png')}>
            </Image>
          </ReactNativeZoomableView>
        </ScrollView>
        <View style={styles.tabBarInfoContainer}>
          <Image
            style={{marginLeft: 10}}
            source={require('../assets/Town/Title.png')}
            >
          </Image>
          <TouchableOpacity onPress={()=>{this.edit(true)}}>
            <Image
              style={{height: 40, width: 40, marginLeft: 10, marginTop: 10, backgroundColor: 'white', borderRadius: 30}}
              source={require('../assets/Town/add-homes.png')}
              >
            </Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#266402',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});


export default HomeScreen;