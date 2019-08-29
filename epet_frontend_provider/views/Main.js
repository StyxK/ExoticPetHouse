
import React, { Component } from 'react';
import { StyleSheet, View , Text } from 'react-native';
import { Router, Scene, Actions} from 'react-native-router-flux';
import OrderList from '../views/OrderList'
import Profile from '../views/Profile'
import {Provider} from 'react-redux';
import {createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {Field,reduxForm} from 'redux-form'
import StoreManager from './StoreManager';
import CreateStore from './CreateStore';
import allReducers from '../src/reducer';
import Pet from './Pet';
import Store from './Store';
import PetActivities from './PetActivities';
import PetPost from './PetPost';
import Chat from './Chat';
import ChatBox from './ChatBox'
import {userReply} from '../src/actions/ChatActions'
import logger from 'redux-logger'

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
                {console.log(this.props.chat)}
                    <Router>
                        <Scene key="root" hideNavBar={true} >
                            <Scene key="pet" component={Pet} title="Pet"/>
                            <Scene key="store" component={Store} title="Store" initial="true"/>
                            <Scene key="orderList" component={OrderList} title="orderList"/>
                            <Scene key="profile" component={Profile} title="Profile"/>
                            <Scene key="storeManager" component={StoreManager} title="StoreManager"/>
                            <Scene key="createStore" component={CreateStore} title="CreateStore"/>
                            <Scene key="petActivities" component={PetActivities} title="PetActivities"/>
                            <Scene key="petPost" component={PetPost} title="PetPost"/>
                            <Scene key="chat" component={Chat} title="Chat" />
                            <Scene key="chatbox" component={ChatBox} title="ChatBox"/>
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
