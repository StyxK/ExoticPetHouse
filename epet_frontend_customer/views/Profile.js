import React, { Component } from "react";
import {
  Text,
  Container,
  Left,
  Body,
  Right,
  Header,
  Thumbnail,
  ListItem,
  List,
  Fab,
  Icon,
  Button,
  Content,
  Title,
  View
} from "native-base";
import { StyleSheet } from "react-native";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import NavFooter from "../components/NavFooter";
const PIC_URI =
  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerProfile: {}
    };
  }
  componentWillMount() {
    axios
      .get("/customer/me")
      .then(response => {
        this.setState({
          customerProfile: response.data
        });
      })
      .then(error => console.log(error));
  }
  render() {
    const { customerProfile } = this.state;
    return (
      <Container style={{ display: "flex", height: "100%" }}>
        <Header style={{ backgroundColor: "#7A5032" }}>
          <Left style={{ flex: 1 }}>
            <Icon
              name="ios-arrow-back"
              onPress={() => Actions.home()}
              style={{ color: "white", marginLeft: 10 }}
            />
          </Left>
          <Body style={{ flex: 1, alignItems: "center" }}>
            <Title style={{ color: "white", fontSize: 20 }}>Profile</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ backgroundColor: "#d4d4d4" }}>
          <List style={{ alignItems: "center" }}>
            <ListItem noBorder>
              <Thumbnail source={{ uri: PIC_URI }} />
            </ListItem>
          </List>
        </View>
        <View style={{ flex: 1 }}>
          <List>
            <ListItem>
              <Body style={{ flex: 1 }}>
                <Text style={{ fontWeight:"bold" }} >ชื่อ</Text>
                <Text note>
                  {customerProfile.firstName} {customerProfile.lastName}
                </Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body style={{ flex: 1 }}>
                <Text style={{ fontWeight:"bold" }} >เบอร์โทรศัทพ์</Text>
                <Text note>
                  {customerProfile.phoneNumber}
                </Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body style={{ flex: 1 }}>
                <Text style={{ fontWeight:"bold" }} >อีเมล</Text>
                <Text note>
                  {customerProfile.email}
                </Text>
              </Body>
            </ListItem>
          </List>
        </View>
        <NavFooter />
      </Container>
    );
  }
}
