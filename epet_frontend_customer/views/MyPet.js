
import { Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class MyPet extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>My Pet</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
})
