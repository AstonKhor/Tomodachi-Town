import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View, TouchableHighlight } from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import Layout from '../constants/Layout.js';
import { _retrieveData, _storeData } from './async-storage/data.js'
import { EditModal } from './home-modal/EditModal.js';
import seed from '../components/seed.js';
import images from '../assets/characters/characters.js';


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      person: '',
      count: 0,
      editModalVisible: false,
      placeMode: false,
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

  reset(person) {
    let peopleUpdate = JSON.parse(JSON.stringify(this.state.people));
    if (person) {
      for (let i = 0; i < this.state.people.length; i++) {
        if (this.state.people[i].name === person.name) {
          peopleUpdate[i].locx = [];
          peopleUpdate[i].locy = [];
        }
      }
    } else {
      for (let i = 0; i < this.state.people.length; i++) {
        peopleUpdate[i].locx = [];
        peopleUpdate[i].locy = [];
      }
    }
    
    _storeData(peopleUpdate)
      .then(() => {
        this.retrieveAndUpdate();
      })
  }

  togglePlaceMode (person = this.state.person, count) {
    let placeMode = false;
    if (count > 0) {
      placeMode = true;
    }
    this.setState({
      count: count,
      editModalVisible: false,
      placeMode: placeMode,
      person: person
    })
  }

  handlePlace (data) {
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
            <ReactNativeZoomableView minZoom={1} >
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
  logo: { marginLeft: 10, height: 70, width: 298 },
  add: { height: 40, width: 40, marginLeft: 0, marginTop: 10, backgroundColor: '#ffd4b7', borderRadius: 20 },
  placeModeMap: { zIndex: 105, opacity: 1 },
  map: { zIndex: 100, flex: 1, opacity: 1, backgroundColor: '#266402' },
  tabBarInfoContainer: { width: '100%', position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20,
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
    }) },
  navigationFilename: { marginTop: 5 }
});


export default HomeScreen;