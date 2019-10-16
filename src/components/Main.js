import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';

import { 
  Header,
  Input,
  Button,
  ListItem,
  Icon,
  CheckBox
} from 'react-native-elements'

import axios from 'axios'

export default class Main extends Component {
  state = {
    todos: [],
    name: ''
  }
  
  getTodoList() {
    axios
      .get(
        `https://api.fake.rest/189bf93b-4d78-4f00-86ac-76d87cfccbd1/task/list`
      )
      .then(res =>
        this.setState({
            todos: res.data.data
        })
      )
      .catch(err => {
        throw err;
      });
  }
  componentDidMount() {
    this.getTodoList()
  }

  delete = (id) => {
		Alert.alert(
			'Confirmation',
			'Are you sure want to delete this list ?',
			[
			{text: 'No', onPress:() => console.warn('Cancel Pressed'), style: 'cancel'},
			{text: 'Yes', onPress:() => console.warn('delete Pressed')},
			],
			{ cancelable: true}
		)
	}

  addList = () => {
    const data = {
      'id': "4324324",
      'name': this.state.name,
      'isDone': false
    }
    axios
      .post(
        `POST https://api.fake.rest/189bf93b-4d78-4f00-86ac-76d87cfccbd1/task/add`,
        data
      )
      .then(res =>
        alert(res.data.data)
      )
      .catch(err => {
        throw err;
      });
  }

  render() {
    return(
      <View style={styles.container}>
        <Header 
        centerComponent={{ text: 'My Todo App', style: { color: '#fff', marginBottom: 30, fontSize: 25 } }}
        containerStyle={styles.header}
        />
        <View>
          <Input
            placeholder='Add new task'
            onChangeText={(name) => this.setState({name})}
          />
          <Button
            title="Add"
            type="outline"
            onPress={() => this.addList()}
          />
        </View>
      
        <ScrollView>
          <FlatList
            data={this.state.todos}
            renderItem={({ item }) =>
              <View> 
                <ListItem
                  title={item.name}
                  bottomDivider
                  rightIcon={
                    <Icon
                      raised
                      name='trash'
                      type='font-awesome'
                      color='#f50'
                      onPress={() => this.delete(item.id)} />}
                  leftIcon={
                    <CheckBox
                      left
                      checkedIcon='check-circle'
                      uncheckedIcon='check'
                    />}
                />
              </View>  
            }
            keyExtractor={({ id }) => id}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
})