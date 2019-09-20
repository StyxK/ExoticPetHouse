
import React, { Component } from 'react';
import { StyleSheet, View , Text } from 'react-native';
import {Provider} from 'react-redux';
import {createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import allReducers from '../src/reducer';
import {userReply} from '../src/actions/ChatActions'
import logger from 'redux-logger'
import Route from './Route'
import Config from 'react-native-config'
import axios from 'axios'
const store = createStore(allReducers,applyMiddleware(thunk,logger))

const API_URL = Config.API_URL

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Authorization'] = 'Epet eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ildpc3NhbnVwb25nIiwicGFzc3dvcmQiOiIkMmEkMTAkUHNpVGlhcFV1Y00ybDJBZ0o2T0RWT2FzNkIzM09zNy5tU0M3ZDllSnZSVmdOVzFyLnlkQS4iLCJpYXQiOjE1NjY5Nzk2MzEsImV4cCI6MTU2OTU3MTYzMX0.gMLTb9W26xomtQi3tAbuIkqEkomor8R55HaryHR0bqM';

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
