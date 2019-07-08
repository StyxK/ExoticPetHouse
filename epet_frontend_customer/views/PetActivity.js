import axios from "axios";
import {
  Container,
  Content,
  Button,
  Icon,
  ListItem,
  List,
  Text,
  Left,
  Body,
  Right,
  Header,
  Title,
  Card,
  View,
  CardItem
} from "native-base";
import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import Config from "react-native-config";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { addPet, setPets, removePet } from "../actions";

const API_URL = Config.API_URL;

export default class PetActivity extends Component {
  state = {};

  componentWillMount() {}

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#7A5032" }}>
          <Left style={{ flex: 1 }}>
            <Icon
              name="ios-arrow-back"
              onPress={() => Actions.pop({ refresh: {} })}
              style={{ color: "white", marginLeft: 10 }}
            />
          </Left>
          <Body style={{ flex: 1, alignItems: "center" }}>
            <Title style={{ color: "white", fontSize: 20 }}>Activity</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          
        </Content>
      </Container>
    );
  }

}
