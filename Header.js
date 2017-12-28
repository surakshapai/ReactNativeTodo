import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class Header extends Component<{}> {
    render() {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={this.props.onToggleComplete}>
                    <Text
                        style={styles.toggleIcon}
                    >
                        {String.fromCharCode(10003)}
                    </Text>
                </TouchableOpacity>
                <TextInput
                    value={this.props.value}
                    onChangeText={this.props.onChange}
                    onSubmitEditing={this.props.onAddItem}
                    placeholder="What do you want to do?"
                    blurOnSubmit={false}
                    returnKeyType="done"
                    style={styles.input}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 50
    },
    header: {
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    toggleIcon: {
        fontSize: 30,
        color: '#CCC',
        marginLeft: 16
    }
})