import React from 'react';
import { ScrollView, StyleSheet, Picker } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['', 'Birth', 'Age', 'Head4'],
      tableData: [
        ['1', '2', '3'],
        ['a', 'b', 'c'],
        ['1', '2', '3'],
        ['a', 'b', 'c']
      ],
      tableTitle: ['Aston Khor', 'Title2', 'Title3', 'Title4'],
      editMode: false,
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        
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
    );
  }
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center' }
});

export default LinksScreen;
