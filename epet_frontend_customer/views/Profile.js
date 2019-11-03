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
import theme from "../theme";
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
        <Header style={{ backgroundColor: theme.primaryColor }}>
          <Left style={{ flex: 1 }}/>
          <Body style={{ flex: 1, alignItems: "center" }}>
            <Title style={{ color: theme.primaryTextColor, fontSize: 20 }}>Profile</Title>
          </Body>
          <Right>
            <Icon
              name="exit"
              onPress={() => Actions.home()}
              style={{ color: theme.primaryTextColor, marginLeft: 10 }}
            />
          </Right>
        </Header>
        <View style={{ backgroundColor: theme.primaryColor,borderBottomRightRadius:10,borderBottomLeftRadius:10 }}>
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
                <Text style={{ fontWeight: "bold" }}>ชื่อ</Text>
                <Text note>
                  {customerProfile.firstName} {customerProfile.lastName}
                </Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>เบอร์โทรศัทพ์</Text>
                <Text note>{customerProfile.phoneNumber}</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>อีเมล</Text>
                <Text note>{customerProfile.email}</Text>
              </Body>
            </ListItem>
          </List>
        </View>
        <NavFooter />
      </Container>
    );
  }
}
