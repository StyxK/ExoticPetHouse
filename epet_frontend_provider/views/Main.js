
import React, { Component } from 'react';
import { StyleSheet, View , Text } from 'react-native';
import { Router, Scene, Actions} from 'react-native-router-flux';
import OrderList from '../views/OrderList'
import NavFooter from '../components/NavFooter';


export default class Main extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Router>
                    <Scene key="root" hideNavBar={true} >
                        <Scene key="home" component={OrderList} title="Home" initial={true} />
                    </Scene>
                </Router>
                <NavFooter/>
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
