import React from 'react';
import { ScrollView, Image, StyleSheet, Picker, Button, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
// import { EditModal } from './friends-modal/EditModal';
// import { DataTable } from 'react-native-paper';
import AddModal from './friends-modal/AddModal.js';
import { _retrieveData, _storeData } from './async-storage/data';

class FriendsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['', 'Birth', 'Hangouts (YTD)', 'Goal Hangouts'],
      tableData: [
        ['June 1', '5', '6'],
        ['May 1', '4', '4'],
        ['October 1', '3', '2'],
        ['September 1', '2', '10']
      ],
      tableTitle: ['Aston Khor', 'Felix Ding', 'Peter Park', 'SueJung Shin'],
      editModalVisible: false,
      addModalVisible: false,
      oldData: []
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.saveAndUpdatePage = this.saveAndUpdatePage.bind(this);
  }

  componentDidMount() {
    console.log('mounted friends')
    this.retrieveAndUpdatePage();
  }

  retrieveAndUpdatePage() {
    return _retrieveData()
      .then((data) => {
        console.log('retrieved', data)
        let names = [];
        let selectData = [];
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++) {
          names.push(data[i].name);
          selectData[i] = [data[i].dob, data[i].hangoutsYTD, data[i].goalHangouts];
        }
        this.setState({
          tableData: selectData,
          tableTitle: names,
          oldData: data
        })
      })
  }

  toggleModal (visible) {
    this.retrieveAndUpdatePage()
      .then(() => {
        this.setState({
          addModalVisible: visible
        })
      })
  }

  saveAndUpdatePage (data) {
    let copy = JSON.parse(JSON.stringify(this.state.oldData))
    copy.push(data);
    console.log('copy', copy);
    _storeData(copy)
      .then(() => {
        this.toggleModal(!this.state.addModalVisible);
      })
  }

  render() {
    return (
      <View style={styles.page}>
        {/* <EditModal/> */}
        <AddModal visible={this.state.addModalVisible} toggleModal={this.toggleModal} save={this.saveAndUpdatePage}/>
        <ScrollView style={styles.container}>
          <View style={styles.editAdd}>
            <Button title='Edit/Add' onPress={() => {this.toggleModal(!this.state.editModalVisible)}}></Button>
            <Button title='Add' onPress={() => {this.toggleModal(!this.state.addModalVisible)}}></Button>
          </View>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={this.state.tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text}/>
            <TableWrapper style={styles.wrapper}>
              <Col data={this.state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
              {this.state.tableData.map((row, idx) => {
                console.log('row', row);
                return <Row key={idx} data={row} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
              })}
              {/* <Rows data={this.state.tableData} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/> */}
            </TableWrapper>
          </Table>
          <Picker selectedValue={this.state.sort}
            style={{height: 10, width: 175}}
            onValueChange={(itemValue) =>
              this.setState({sort: itemValue})
            }>
            <Picker.Item label="Been Awhile" value="java" />
            <Picker.Item label="Too Soon" value="js" />
          </Picker>
        </ScrollView>
      </View>
      
    );
  }
}

FriendsScreen.navigationOptions = {
  title: 'Friends',
};

const styles = StyleSheet.create({
  page: {flexDirection: "column", height: '100%'},
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center' },
  editAdd: { flexDirection: 'row', justifyContent: 'space-between' },
});

export default FriendsScreen;
