import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

export default class Row extends Component<{}> {
    render() {
        const { complete } = this.props;
        return (
            <View style={styles.container}>
                <Switch
                    value={this.props.complete}
                    onValueChange={this.props.onComplete}
                />
                <View style={styles.textWrap}>
                    <Text style={[styles.text, complete && styles.complete]}>
                        {this.props.item}
                    </Text>
                </View>
                <TouchableOpacity onPress={this.props.onRemove}>
                    <Text style={styles.remove}>X</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
     text: {
         fontSize: 24,
         color: '#4d4d4d'
     },
     textWrap: {
         flex: 1,
         marginHorizontal: 10
     },
     complete: {
         textDecorationLine: "line-through"
     },
     remove: {
         fontSize: 20,
         color: '#cc9a9a'
     }
})