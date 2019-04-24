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
import { addPet, setPets, removePet } from "../actions";

const API_URL = Config.API_URL;

export default class PetDescription extends Component {
  state = {};

  componentWillMount() {}

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
            <CardItem>
              <Left>
                <Text>ชื่อ</Text>
                <Text note style={{ color: "#7A5032" }}>
                  {pet.name}
                </Text>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Text>ประเภท</Text>
                <Text note style={{ color: "#7A5032" }}>
                  {pet.typeOfPet}
                </Text>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Text>อายุ</Text>
                <Text note style={{ color: "#7A5032" }}>
                  {pet.age}
                </Text>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Text>เพศ</Text>
                <Text note style={{ color: "#7A5032" }}>
                  {pet.gender}
                </Text>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Text>โรคประจำตัว</Text>
                <Text note style={{ color: "#7A5032" }}>
                  {pet.congenitalDisease || "-"}
                </Text>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Text>ยาที่แพ้</Text>
                <Text note style={{ color: "#7A5032" }}>
                  {pet.allergicDrugs || "-"}
                </Text>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Text>อาหารที่แพ้</Text>
                <Text note style={{ color: "#7A5032" }}>
                  {pet.allergicFoods || "-"}
                </Text>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Text>สิ่งที่ชอบ</Text>
                <Text note style={{ color: "#7A5032" }}>
                  {pet.favThing || "-"}
                </Text>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Text>สิ่งที่ไม่ชอบ</Text>
                <Text note style={{ color: "#7A5032" }}>
                  {pet.hateThing || "-"}
                </Text>
              </Left>
            </CardItem>
          </Card>
          <Button onPress={() => Actions.addPet({ pet: pet })}>
            <Text>edit</Text>
          </Button>
          <Button onPress={this.removePet}>
            <Text>remove</Text>
          </Button>
        </Content>
      </Container>
    );
  }
  removePet = () => {
    const { pet } = this.props;
    if (!pet.wasDeposit) {
      axios
        .delete(API_URL + "/pet/" + pet.id)
        .then(response => {
          alert("success");
          console.log(JSON.stringify(response));
          Actions.pop();
        })
        .catch(error => {
          alert("error" + error);
          console.log(error);
        });
    }else{
      return alert("Pet was Deposit");
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});
