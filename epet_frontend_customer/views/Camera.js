import {
  Body,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title,
  View,
  Thumbnail,
  Label,
  Fab
} from "native-base";
import React, { Component } from "react";
import { Image, StyleSheet, Dimensions, WebView } from "react-native";
import DeviceInfo from "react-native-simple-device-info";
import axios from "axios";
import theme from "../theme";
import { Actions } from "react-native-router-flux";
import buildUrl from "build-url";

export default class Camera extends Component {
  state = {
    url: undefined
  };
  componentWillMount() {
    this.load();
  }

  load = async () => {
    const { cage } = this.props;
    if (!cage.cameraAddress) {
      return;
    }
    const { storeId } = cage;
    const deviceId = DeviceInfo.getUniqueID();
    const url = buildUrl("https://epet-fd10e.web.app", {
      queryParams: {
        deviceId: deviceId,
        storeId: storeId,
        cameraUrl: cage.cameraAddress
      }
    });
    console.log(url);
    this.setState({ url: url });
  };
  render() {
    const { url } = this.state;
    return (
      <Container style={{backgroundColor:'black'}}>
        <Header style={{ backgroundColor: theme.primaryColor }}>
          <Left style={{ flex: 1 }}>
            <Icon
              style={{ color: theme.primaryTextColor }}
              onPress={() => Actions.pop()}
              name="ios-arrow-back"
            />
          </Left>
          <Body style={{ flex: 3, alignItems: "center" }}>
            <Text style={{ color: theme.primaryTextColor }}>Camera</Text>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <View style={{justifyContent:'center',backgroundColor: 'black'}}>
          {(url && (
            <WebView
              style={{ justifyContent:'center',backgroundColor: 'black' }}
              source={{
                uri: url
              }}
            />
          )) || <Text>Not Fround Camera</Text>}
        </View>
      </Container>
    );
  }
}
