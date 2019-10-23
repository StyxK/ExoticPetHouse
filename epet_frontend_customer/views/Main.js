import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Router, Scene } from "react-native-router-flux";
import MyPet from "./MyPet";
import Search from "./Search";
import Store from "./Store";
import AddPet from "./AddPet.js";
import History from "./History.js";
import Profile from "./Profile.js";
import PetActivity from "./PetActivity.js";
import HistoryDetail from "./HistoryDetail.js";
import PetDescription from "./PetDescription.js";
import Order from "./Order.js";
import { connect } from "react-redux";
import Chat from "./Chat.js";
import ChatBox from "./ChatBox.js";
import Payment from "./Payment";
import Login from "./Login";
import Loading from "../components/Loading";
import { setUser, setPets } from "../actions";
import axios from "axios";
import Feedback from "./Feedback";
import Camera from "./Camera";

// const store = createStore(allReducer,applyMiddleware(thunk));
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // initial: this.props.user.token ? true : false
    };
  }

  componentWillMount() {}
  render() {
    return (
      <View style={styles.container}>
        <Router>
          <Scene key="root" hideNavBar={true}>
            <Scene
              key="loading"
              component={Loading}
              title="loading"
              
            />
            <Scene key="login" component={Login} title="login" />
            <Scene key="home" component={Search} title="Home" />
            <Scene key="myPet" component={MyPet} title="MyPet" />
            <Scene key="store" component={Store} title="Store" />
            <Scene key="history" component={History} title="History" />
            <Scene key="profile" component={Profile} title="Profile" />
            <Scene
              key="petActivity"
              component={PetActivity}
              title="PetActivity"
            />
            <Scene
              key="historyDetail"
              component={HistoryDetail}
              title="HistoryDetail"
            />
            <Scene key="addPet" component={AddPet} title="AddPet" />
            <Scene
              key="petDescription"
              component={PetDescription}
              title="PetDescription"
            />
            <Scene key="order" component={Order} title="Order" />
            <Scene key="chat" component={Chat} title="Chat" />
            <Scene key="chatbox" component={ChatBox} title="ChatBox" />
            <Scene key="payment" component={Payment} title="Payment" />
            <Scene key="feedback" component={Feedback} title="feedback" />
            <Scene key="camera" component={Camera} title="camera" initial={true}/>
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
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
