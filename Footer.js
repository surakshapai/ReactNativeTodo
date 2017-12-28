import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class Footer extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.filters}>{this.props.count}</Text>
                <View style={styles.filters}>
                    <TouchableOpacity style={[styles.filter, this.props.filter === 'All' && styles.selected]} onPress={() => this.props.onFilter('All')}>
                        <Text>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.filter, this.props.filter === 'Active' && styles.selected]} onPress={() => this.props.onFilter('Active')}>
                        <Text>Active</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.filter, this.props.filter === 'Completed' && styles.selected]} onPress={() => this.props.onFilter('Completed')}>
                        <Text>Completed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.onClearComplete}>
                        <Text>Clear</Text>
                    </TouchableOpacity>               
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    filters: {
        flexDirection: "row"
    },
    filter: {
        padding: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "transparent"
    },
    selected: {
        borderColor: 'rgba(175, 47, 47, .2)'
    }


})