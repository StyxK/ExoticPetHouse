import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Router, Scene, Actions } from "react-native-router-flux";
import NavFooter from "../components/NavFooter.js";
import MyPet from "./MyPet";
import Search from "./Search";
import Store from "./Store";
import AddPet from "./AddPet.js";
import PetDescription from "./PetDescription.js";
import Order from "./Order.js"
import { createStore } from "redux";
import petsReducer from "../reducers/petsReducer.js";

const store = createStore(petsReducer);

export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Router>
          <Scene key="root" hideNavBar={true}>
            <Scene key="home" component={Search} title="Home" initial={true} />
            <Scene key="myPet" component={MyPet} title="MyPet" />
            <Scene key="store" component={Store} title="Store" />
            <Scene key="addPet" component={AddPet} title="AddPet" />
            <Scene
              key="petDescription"
              component={PetDescription}
              title="PetDescription"
            />
            <Scene key="order" component={Order} title="Order" />
          </Scene>
        </Router>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});
