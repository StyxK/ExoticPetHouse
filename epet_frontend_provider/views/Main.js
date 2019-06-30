
import React, { Component } from 'react';
import { StyleSheet, View , Text } from 'react-native';
import { Router, Scene, Actions} from 'react-native-router-flux';
import OrderList from '../views/OrderList'
import Profile from '../views/Profile'
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Field,reduxForm} from 'redux-form'
import StoreManager from './StoreManager';
import CreateStore from './CreateStore';
import allReducers from '../src/reducer';
import Pet from './Pet';
import Store from './Store';

const store = createStore(allReducers)

export default class Main extends Component {

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Router>
                        <Scene key="root" hideNavBar={true} >
                            <Scene key="pet" component={Pet} title="Pet"/>
                            <Scene key="store" component={Store} title="Store" initial="true"/>
                            <Scene key="home" component={OrderList} title="Home"/>
                            <Scene key="profile" component={Profile} title="Profile"/>
                            <Scene key="storeManager" component={StoreManager} title="StoreManager"/>
                            <Scene key="createStore" component={CreateStore} title="CreateStore"/>
                        </Scene>
                    </Router>
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
