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
import { StyleSheet, Image } from "react-native";
import Config from "react-native-config";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { addPet, setPets, removePet } from "../actions";

const API_URL = Config.API_URL;

export default class PetDescription extends Component {
  state = {};

  componentWillMount() {}

  render() {
    const { pet, updatePet } = this.props;
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
                  {pet.gender == "male" ? "เพศผู้" : "เพศเมีย"}
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
            <CardItem>
              <Left
                style={{
                  marginTop: "2.5%",
                  justifyContent: "flex-start",
                  alignItems: "flex-start"
                }}
              >
                <Text>สถานะของสัตว์เลี้ยง</Text>
                <Text note style={{ color: "#7A5032" }}>
                  {pet.wasDeposit ? "กำลังถูกฝากอยู๋" : "ยังไม่ถูกฝาก"}
                </Text>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Image source={{ uri: pet.image }}
                  style={{ width: 300, height: 300 }}></Image>
              </Left>
            </CardItem>
          </Card>
          <Left
            style={{
              marginTop: "2.5%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Button
              style={{ backgroundColor: "#7A5032" }}
              onPress={() => Actions.addPet({ pet: pet, updatePet })}
            >
              <Text>edit</Text>
            </Button>
          </Left>
          <Right>
            <Button
              style={{ backgroundColor: "#7A5032" }}
              onPress={this.removePet}
            >
              <Text>remove</Text>
            </Button>
          </Right>
        </Content>
      </Container>
    );
  }
  removePet = () => {
    const { pet, removePet } = this.props;
    if (!pet.wasDeposit) {
      axios
        .delete(API_URL + "/pet/" + pet.id)
        .then(response => {
          if (response.data.delete) {
            alert("success");
            removePet(pet);
            Actions.pop({ refresh: {} });
          }
        })
        .catch(error => {
          alert("error" + error);
          console.log(error);
        });
    } else {
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
