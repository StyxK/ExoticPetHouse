
import React, { Component } from 'react';
import { StyleSheet, View , AsyncStorage } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import OrderList from '../views/OrderList'
import Profile from '../views/Profile'
import StoreManager from './StoreManager';
import CreateStore from './CreateStore';
import Pet from './Pet';
import PetActivities from './PetActivities';
import PetPost from './PetPost';
import Chat from './Chat';
import ChatBox from './ChatBox'
import Cage from './Cage';
import Login from './Login';
import {connect} from 'react-redux'

class Route extends Component {

    constructor(props){
        super(props)
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
                        <Scene key="pet" component={Pet} title="Pet"/>
                        <Scene key="orderList" component={OrderList} title="orderList"/>
                        <Scene key="profile" component={Profile} title="Profile" initial={this.state.loggedIn}/>
                        <Scene key="storeManager" component={StoreManager} title="StoreManager"/>
                        <Scene key="createStore" component={CreateStore} title="CreateStore"/>
                        <Scene key="petActivities" component={PetActivities} title="PetActivities"/>
                        <Scene key="petPost" component={PetPost} title="PetPost"/>
                        <Scene key="chat" component={Chat} title="Chat"/>
                        <Scene key="chatbox" component={ChatBox} title="ChatBox"/>
                        <Scene key="cage" component={Cage} title="Cage"/>
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