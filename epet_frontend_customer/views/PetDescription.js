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
  CardItem
} from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Config from "react-native-config";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { addPet, setPets } from "../actions";

const API_URL = Config.API_URL;

export default class PetDescription extends Component {
  state = {
  };

  componentWillMount() {
    
  }

  render() {
    const { pet } = this.props;
    return (
      <Container>
        <Header style={{ backgroundColor: "#7A5032" }}>
          <Left style={{ flex: 1 }}>
            <Icon
              name="ios-arrow-back"
              onPress={Actions.pop}
              style={{ color: "white", marginLeft: 10 }}
            />
          </Left>
          <Body style={{ flex: 1, alignItems: "center" }}>
            <Title style={{ color: "white", fontSize: 20 }}>My Pet</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card style={{ flex: 0 }}>
            <CardItem header>
              <Text style={{ fontSize: 25 }}> {pet.name} </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});

