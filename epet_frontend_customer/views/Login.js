import React, { Component } from "react";
import { ImageBackground, Image, AsyncStorage } from "react-native";
import {
  Input,
  Item,
  Label,
  View,
  Icon,
  Left,
  Body,
  Button
} from "native-base";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import axios from "axios";
import { setUser,setPets } from "../actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: undefined,
      password: undefined,
      error: undefined
    };
  }

  async componentDidMount(){
    await console.log(this.props.user.token)
  }

  logIn = async () => {
    const { setUser,setPets } = this.props;
    try {
      const user = await axios.post("/customer/login", {
        userName: this.state.userName,
        password: this.state.password
      });
      setUser(user.data);
      axios.get("/pet").then(response => {
        setPets(response.data);
        Actions.home();
      });
    } catch (error) {
      this.setState({
        error: "ชื่อผู้ใช้ / รหัสผ่าน ของท่านไม่ถูกต้อง"
      });
      console.log(error);
    }
  };

  render() {
    return (
      <ImageBackground
        source={{
          uri: "https://media3.giphy.com/media/xT8qB5ItRMSfODfzJm/source.gif"
        }}
        style={{ flex: 1, resizeMode: "cover" }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50
          }}
        >
          <Image
            style={{ width: 210, height: 110 }}
            source={require("../assets/epet_logo.png")}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Item
            rounded
            style={{
              marginTop: 10,
              marginRight: 30,
              marginLeft: 30,
              backgroundColor: "rgba(192,192,192, .4)"
            }}
          >
            <Left
              style={{
                borderRightWidth: 3,
                flex: 1,
                alignItems: "center",
                borderColor: "white"
              }}
            >
              <Icon name="person" style={{ color: "white" }} />
            </Left>
            <Input
              style={{ flex: 5, marginLeft: 20, color: "white" }}
              placeholder="ชื่อผู้ใช้"
              placeholderTextColor="white"
              onChangeText={e => this.setState({ userName: e })}
            />
          </Item>
          <Item
            rounded
            style={{
              marginTop: 10,
              marginRight: 30,
              marginLeft: 30,
              backgroundColor: "rgba(192,192,192, .4)"
            }}
          >
            <Left
              style={{
                borderRightWidth: 3,
                alignItems: "center",
                borderColor: "white"
              }}
            >
              <Icon name="key" style={{ color: "white" }} />
            </Left>
            <Input
              style={{ flex: 5, marginLeft: 20, color: "white" }}
              placeholder="รหัสผ่าน"
              placeholderTextColor="white"
              onChangeText={e => this.setState({ password: e })}
            />
          </Item>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "center",
              marginTop: 10
            }}
          >
            <Button
              rounded
              style={{
                flex: 1,
                marginHorizontal: 30,
                backgroundColor: "#7A5032"
              }}
              onPress={() => this.logIn()}
            >
              <Label style={{ color: "white" }}>ลงชื่อเข้าใช้</Label>
            </Button>
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 2.5,
              justifyContent: "center"
            }}
          >
            <Label style={{ color: "red" }}>{this.state.error}</Label>
          </View>
        </View>
      </ImageBackground>
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
  return { ...state };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
