import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { View, Label } from "native-base";
import { Actions } from "react-native-router-flux";
import { setUser, setPets } from "../actions";
import { connect } from "react-redux";
import axios from "axios";
import { storage } from "../Storage";
import theme from "../theme";

class Loading extends Component {
  async componentDidMount() {
    storage
      .load({
        key: "user"
      })
      .then(user => {
        const { setUser, setPets } = this.props;
        setUser(user);
        axios.get("/pet").then(response => {
          setPets(response.data);
          Actions.home();
        });
      })
      .catch(e => {
        Actions.login();
      });
  }
  render() {
    return (
      <View
        style={{
          backgroundColor: theme.primaryColor,
          flex: 1,
          justifyContent: "center"
        }}
      >
        <ActivityIndicator size={100} />
        <Label style={{ marginTop: 20, textAlign: "center", color: "white" }}>
          {" "}
          กำลังเรียกข้อมูลจากแอปพลิเคชัน กรุณารอสักครู่{" "}
        </Label>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user)),
    setPets: pets => dispatch(setPets(pets))
  };
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loading);
