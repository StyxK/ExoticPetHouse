
import React, { Component } from 'react';
import { StyleSheet, View , Text } from 'react-native';
import { Router, Scene, Actions} from 'react-native-router-flux';
import OrderList from '../views/OrderList'
import Profile from '../views/Profile'
import NavFooter from '../components/NavFooter';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import userReducer from '../src/reducer/UserReducer'
import StoreManager from './StoreManager';
import CreateStore from './CreateStore';

const store = createStore(userReducer)

export default class Main extends Component {

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Router>
                        <Scene key="root" hideNavBar={true} >
                            <Scene key="home" component={OrderList} title="Home"  />
                            <Scene key="profile" component={Profile} title="Profile" initial={true}/>
                            <Scene key="storeManager" component={StoreManager} title="StoreManager"/>
                            <Scene key="createStore" component={CreateStore} title="CreateStore"/>
                        </Scene>
                    </Router>
                    <NavFooter/>
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
