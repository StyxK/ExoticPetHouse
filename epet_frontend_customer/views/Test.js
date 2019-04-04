
import { Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class Test extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Testttt</Text>
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
