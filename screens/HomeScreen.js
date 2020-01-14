import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, Modal, TouchableHighlight } from 'react-native';
import Layout from '../constants/Layout.js';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { _retrieveData, _storeData } from './async-storage/data.js'
import { MonoText } from '../components/StyledText';
import { EditModal } from './home-modal/EditModal.js';
import seed from '../components/seed.js';
import images from '../assets/characters/characters';


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      editModalVisible: false,
      count: 0,
      placeMode: false,
      person: ''
    }
    _storeData(seed());  //for testing only, delete in production

    this.edit = this.edit.bind(this);
    this.reset = this.reset.bind(this);
    this.togglePlaceMode = this.togglePlaceMode.bind(this);
    this.reset = this.reset.bind(this);
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
    
    _storeData(peopleUpdate)
      .then(() => {
        this.retrieveAndUpdate();
      })
  }

  togglePlaceMode (person, count) {
    if (count > 0) {
      console.log('placemode on')
      this.setState({
        count: count,
        editModalVisible: false,
        placeMode: true,
        person: person
      }, ()=>{console.log(this.state)})
    } else {
      console.log('placemode off');
      this.setState({
        count: count,
        editModalVisible: false,
        placeMode: false
      }, ()=>{console.log(this.state)})
    }
  }

  handlePlace (data, callback) {
    if (this.state.placeMode) {
      let locx = data.touchHistory.touchBank[1].currentPageX;
      let locy = data.touchHistory.touchBank[1].currentPageY;
      let peopleCopy = JSON.parse(JSON.stringify(this.state.people));
      for (let i = 0; i < peopleCopy.length; i++) {
        if (peopleCopy[i].name === this.state.person) {
          peopleCopy[i].locx.push(locx);
          peopleCopy[i].locy.push(locy);
        }
      }
      this.setState({
        people: peopleCopy,
        count: this.state.count - 1
      }, () => {
        this.togglePlaceMode(this.state.person, this.state.count);
        _storeData(this.state.people)
          .then(()=>{
            this.retrieveAndUpdate();
          })
      })
    }
  }

  render() {
    return (
        <View style={styles.map}>
          <EditModal visible={this.state.editModalVisible} people={this.state.people} edit={this.edit} reset={this.reset} placeMode={this.togglePlaceMode} reset={this.reset}/>
            <ScrollView 
              horizontal = {true}>
              <ReactNativeZoomableView minZoom={0.7} >
                {this.state.people.map((person)=> {
                  return (person.locx.map((locx, idx) => {
                    return <Image key={locx} style={{position: 'absolute', left: person.locx[idx], top: person.locy[idx], width: 15, height: 25, zIndex: 10001}} source={images[person.character]}></Image>
                  }))
                })}
                <TouchableHighlight activeOpacity={1} style={styles.placeModeMap} onPress={(data) => {this.handlePlace(data)}}>
                  <Image 
                  style={{height: '100%', width: (Layout.window.height* 1.20)}}
                  source={require('../assets/Town/background-HarvestMoon1.png')}>
                  </Image>
                </TouchableHighlight>
              </ReactNativeZoomableView>
            </ScrollView>
          <View style={styles.tabBarInfoContainer}>
            <Image
              style={styles.logo}
              source={require('../assets/Town/Title.png')}>
            </Image>
            <TouchableOpacity onPress={()=>{this.edit(true)}}>
              <Image
                style={styles.add}
                source={require('../assets/Town/add-homes.png')}>
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
  logo: {
    marginLeft: 10,
    height: 70,
    width: 298,
  },
  add: {
    height: 40,
    width: 40,
    marginLeft: 0,
    marginTop: 10,
    backgroundColor: '#ffd4b7',
    borderRadius: 20
  },
  placeModeMap: {
    zIndex: 105,
    opacity: 1
  },
  map: {
    zIndex: 100,
    flex: 1,
    opacity: 1,
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
    width: '100%',
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
    justifyContent: 'center',
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