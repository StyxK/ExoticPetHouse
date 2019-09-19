
import React, { Component } from 'react';
import { StyleSheet, View , Text } from 'react-native';
import {Provider} from 'react-redux';
import {createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import allReducers from '../src/reducer';
import {userReply} from '../src/actions/ChatActions'
import logger from 'redux-logger'
import Route from './Route'

const store = createStore(allReducers,applyMiddleware(thunk,logger))

export default class Main extends Component {

    constructor(props){
        super(props)
        store.dispatch(userReply)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps != this.props){
            console.log(nextProps,'change')
        }
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Route/>
                </View>
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
