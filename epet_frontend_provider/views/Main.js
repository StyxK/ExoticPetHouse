import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store,persistor } from '../src/configStore'
import Route from './Route'
import { initialLoad } from '../components/Loading'

export default class Main extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={initialLoad()} persistor={persistor}>
                    <View style={styles.container}>
                        <Route/>
                    </View>
                </PersistGate>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
})
