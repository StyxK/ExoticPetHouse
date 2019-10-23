
import React, { Component } from 'react';
import { StyleSheet, View , ToastAndroid } from 'react-native';
import { Toast, Root } from 'native-base'
import { Router, Scene, Actions } from 'react-native-router-flux';
import OrderList from '../views/OrderList'
import Profile from '../views/Profile'
import Notification from '../views/Notification'
import StoreManager from './StoreManager';
import CreateStore from './CreateStore';
import Pet from './Pet';
import PetActivities from './PetActivities';
import PetPost from './PetPost';
import Chat from './Chat';
import ChatBox from './ChatBox'
import Cage from './Cage';
import Login from './Login';
import OrderDetail from './OrderDetail'
import Register from './Register'
import {connect} from 'react-redux'
import Config from 'react-native-config'
import io from 'socket.io-client'
const socket = io.connect(Config.SOCKET_URL)
import LocalNotification from 'react-native-android-local-notification'

class Route extends Component {

    constructor(props){
        super(props)
        socket.on('storeNotification',data=>{
            console.log('notification')
            LocalNotification.create({ subject: 'มีรายการคำสั่งของท่านเปลี่ยนแปลง', message: 'กรุณาตรวจสอบการเปลี่ยนแปลง' });
        })
        this.state = {
            loggedIn : this.props.user.token ? true : false
        }
    }

    shouldComponentUpdate(nextProps){
        if(this.props.user.token != nextProps.user.token){
            return true
        }
        return false
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Router>
                    <Scene key="root" hideNavBar={true}>
                        <Scene key="login" component={Login} title="login" initial={!this.state.loggedIn}/>
                        <Scene key="profile" component={Profile} title="Profile" initial={this.state.loggedIn}/>
                        <Scene key="pet" component={Pet} title="Pet"/>
                        <Scene key="register" component={Register} title="Register"/>
                        <Scene key="orderList" component={OrderList} title="orderList"/>
                        <Scene key="orderDetail" component={OrderDetail} title="orderDetail"/>
                        <Scene key="storeManager" component={StoreManager} title="StoreManager"/>
                        <Scene key="createStore" component={CreateStore} title="CreateStore"/>
                        <Scene key="petActivities" component={PetActivities} title="PetActivities"/>
                        <Scene key="petPost" component={PetPost} title="PetPost"/>
                        <Scene key="chat" component={Chat} title="Chat"/>
                        <Scene key="chatbox" component={ChatBox} title="ChatBox"/>
                        <Scene key="cage" component={Cage} title="Cage"/>
                        <Scene key="notification" component={Notification} title="Notification"/>
                    </Scene>
                </Router>
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

const mapStateToProps = state => {
    return {user:state.user}
}

export default connect(mapStateToProps)(Route)