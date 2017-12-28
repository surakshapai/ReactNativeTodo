import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Keyboard,
  ListItem,
  List
} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import Row from './Row';

const filterItems = (filter, items) => {
  return items.filter((item) => {
    if(filter === 'All') return true;
    if(filter === 'Active') return !item.complete
    if(filter === 'Completed') return item.complete
  })
}

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      allComplete: false,
      value: "",
      items: [],
      filter: "All",
      dataSource: []
    }

    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
    this.handleTaskToggle = this.handleTaskToggle.bind(this);
    this.handleRemoveTask = this.handleRemoveTask.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.getFilteredItems = this.getFilteredItems.bind(this);
    this.handleClearComplete = this.handleClearComplete.bind(this);
  }

  handleAddItem() {
    if(!this.state.value) return;
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ]
    this.setState({
      items: newItems,
      dataSource: newItems,
      value: ""
    })
  }

  handleToggleComplete() {
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map((item) => ({
      ...item,
      complete
    }))
    this.setState({
      items: newItems,
      dataSource: newItems,
      allComplete: complete
    })
  }

  handleTaskToggle(item) {
    const complete = !item.complete;
    const newItems = this.state.items.map((i) => {
      if(i.key !== item.key) {
        return i;
      } else {
        return {
          ...i,
          complete
        }
      }
    })

    this.setState({
      items: newItems,
      dataSource: newItems,
    })
  }

  handleRemoveTask(key) {
    const newItems = this.state.items.filter((item) => {
      return item.key !== key
    })

    this.setState({
      items: newItems,
      dataSource: newItems,
    })
  }

  getFilteredItems(filter) {
    return this.state.items.filter((item) => {
      if(filter === 'All') return true;
      if(filter === 'Active') return !item.complete
      if(filter === 'Completed') return item.complete
    })
  }

  handleFilter(filter) {
    this.setState({
      dataSource: this.getFilteredItems(filter),
      filter: filter
    })
  }

  handleClearComplete() {
    const newItems = this.getFilteredItems('Active');
    this.setState({
      dataSource: newItems,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={(value) => this.setState({ value })}
          onToggleComplete={this.handleToggleComplete}
        />
        <View style={styles.content}>
          { this.state.items.length ?
              <FlatList
                data={this.state.dataSource}
                renderItem={({item}) => 
                  <Row
                    item= {item.text}
                    complete={item.complete}
                    onComplete={() => this.handleTaskToggle(item)}
                    onRemove={() => this.handleRemoveTask(item.key)}
                  />}
              /> : null 
          }
        </View>
        <Footer
          filter={this.state.filter}
          onFilter={this.handleFilter}
          count={this.getFilteredItems('Active').length}
          onClearComplete={this.handleClearComplete}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    ...Platform.select({
      ios: {
        paddingTop: 40
      }
    })
  },
  content: {
    flex: 1
  }
})
