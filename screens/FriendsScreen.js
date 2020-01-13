import React from 'react';
import { ScrollView, Image, StyleSheet, Picker, Button, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
// import { EditModal } from './friends-modal/EditModal';
import AddModal from './friends-modal/AddModal.js';

class FriendsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['', 'Birth', 'Hangouts(YTD)', 'Goal Hangouts'],
      tableData: [
        ['June 1', '5', '6'],
        ['May 1', '4', '4'],
        ['October 1', '3', '2'],
        ['September 1', '2', '10']
      ],
      tableTitle: ['Aston Khor', 'Felix Ding', 'Peter Park', 'SueJung Shin'],
      editModalVisible: false,
      addModalVisible: false,
    }
  }

  buildView () {
      
  }

  render() {
    return (
      <View style={styles.page}>
        {/* <EditModal/> */}
        <AddModal/>
        <ScrollView style={styles.container}>
          <View style={styles.editAdd}>
            <Button title='Edit/Add' onPress={() => {this.setState({ editModalVisible: true })}}></Button>
            <Button title='Add' onPress={() => {}}></Button>
          </View>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={this.state.tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text}/>
            <TableWrapper style={styles.wrapper}>
              <Col data={this.state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
              <Rows data={this.state.tableData} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
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
