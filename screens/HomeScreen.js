import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, Modal, TouchableHighlight } from 'react-native';
import Layout from '../constants/Layout.js';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { _retrieveData, _storeData } from './async-storage/data.js'
import { MonoText } from '../components/StyledText';
import { EditModal } from './home-modal/EditModal.js';


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      editModalVisible: false,
      count: 0,
    }
    let sampleData = [{name: 'Aston Khor', count: 1, character: 'char1', locx: [50], locy: [50], dob: '6/1', hangoutsYTD: 5, goalHangouts: 10}, {name: 'Andrew', count: 1, character: 'char1', locx: [50], locy: [50], dob: '6/1', hangoutsYTD: 3, goalHangouts: 12}, {name: 'Rachel', count: 1, character: 'char1', locx: [50], locy: [50], dob: '6/1', hangoutsYTD: 5, goalHangouts: 10}, {name: 'Jeff', count: 1, character: 'char1', locx: [50], locy: [50], dob: '6/1', hangoutsYTD: 0, goalHangouts: 0}]
    _storeData(sampleData);  //for testing only, delete in production

    this.edit = this.edit.bind(this);
    this.reset = this.reset.bind(this);
    this.togglePlaceMode = this.togglePlaceMode.bind(this);
  }

  componentDidMount() {
    this.retrieveAndUpdate();
    console.log('mounted');
  }

  retrieveAndUpdate () {
    return _retrieveData()
      .then((data) => {
        this.setState({
          people: JSON.parse(data)
        });
      })
  }

  edit(visible) {
    this.retrieveAndUpdate()
      .then(() => {
        this.setState({
          editModalVisible: visible,
        })
      })
  }
  //create Modal with different player info
  reset(person) {
    let peopleUpdate = [];
    if (person) {
      for (let i = 0; i < this.state.people.length; i++) {
        peopleUpdate[i] = JSON.parse(JSON.stringify(this.state.people[i]));
        if (this.state.people[i].name === person.name) {
          peopleUpdate[i].locx = [];
          peopleUpdate[i].locy = [];
        }
      }
      console.log('Resetting one', person.name);
    } else {
      for (let i = 0; i < this.state.people.length; i++) {
        peopleUpdate[i] = JSON.parse(JSON.stringify(this.state.people[i]));
        peopleUpdate[i].locx = [];
        peopleUpdate[i].locy = [];
      }
      console.log('Resetting All');
    }
    
    _storeData(this.state.people)
      .then(() => {
        // console.log(peopleUpdate);
        this.retrieveAndUpdate();
      })
  }

  togglePlaceMode (person, count) {
    console.log('here', count);

    this.setState({
      count: count,
      editModalVisible: false
    })
  }

  render() {
    return (
      // <TouchableHighlight onPress={(data) => {console.log(data)}}>
        <View style={styles.map}>
          <EditModal visible={this.state.editModalVisible} people={this.state.people} edit={this.edit} reset={this.reset} placeMode={this.togglePlaceMode}/>
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
      // </TouchableHighlight>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  placeModeMap: {
    zIndex: 105,
    opacity: 50
  },
  map: {
    zIndex: 100,
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