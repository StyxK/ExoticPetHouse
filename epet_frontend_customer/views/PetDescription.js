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
const PIC_URI =
  "https://camo.githubusercontent.com/f8ea5eab7494f955e90f60abc1d13f2ce2c2e540/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f323037383234352f3235393331332f35653833313336322d386362612d313165322d383435332d6536626439353663383961342e706e67";

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
              <Text style={{ fontSize: 25 ,color: "#7A5032", fontWeight:"bold"}}> {pet.name} </Text>
            </CardItem>
            <CardItem>
              <Left>
                <Text>ชื่อ</Text>
              </Left>
              <Text note style={styles.container}>
                {pet.name}
              </Text>
            </CardItem>
            <CardItem>
              <Left>
                <Text>ประเภท</Text>
              </Left>
              <Text note style={styles.container}>
                {pet.typeOfPet}
              </Text>
            </CardItem>
            <CardItem>
              <Left>
                <Text>อายุ</Text>
              </Left>
              <Text note style={styles.container}>
                {pet.age}
              </Text>
            </CardItem>
            <CardItem>
              <Left>
                <Text>เพศ</Text>
              </Left>
              <Text note style={styles.container}>
                {pet.gender == "male" ? "เพศผู้" : "เพศเมีย"}
              </Text>
            </CardItem>
            <CardItem>
              <Left>
                <Text>โรคประจำตัว</Text>
              </Left>
              <Text note style={styles.container}>
                {pet.congenitalDisease || "-"}
              </Text>
            </CardItem>
            <CardItem>
              <Left>
                <Text>ยาที่แพ้</Text>
              </Left>
              <Text note style={styles.container}>
                {pet.allergicDrugs || "-"}
              </Text>
            </CardItem>
            <CardItem>
              <Left>
                <Text>อาหารที่แพ้</Text>
              </Left>
              <Text note style={styles.container}>
                {pet.allergicFoods || "-"}
              </Text>
            </CardItem>
            <CardItem>
              <Left>
                <Text>สิ่งที่ชอบ</Text>
              </Left>
              <Text note style={styles.container}>
                {pet.favThing || "-"}
              </Text>
            </CardItem>
            <CardItem>
              <Left>
                <Text>สิ่งที่ไม่ชอบ</Text>
              </Left>
              <Text note style={styles.container}>
                {pet.hateThing || "-"}
              </Text>
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
              </Left>
              <Text note style={styles.container}>
                {pet.wasDeposit ? "กำลังถูกฝากอยู๋" : "ยังไม่ถูกฝาก"}
              </Text>
            </CardItem>
            <CardItem style={{ display: "flex", justifyContent: "center" }}>
              <Image
                source={{ uri: pet.image||PIC_URI }}
                style={{
                  width: 300,
                  height: 300,
                  borderColor: "#7A5032",
                  borderWidth: 1,
                  borderRadius: 5
                }}
              />
            </CardItem>
          </Card>

          <View style={{ display: "flex", flexDirection: "row", margin: 15 }}>
            <Left>
              <Button
                style={{
                  backgroundColor: "#7A5032",
                  flex: 1,
                  borderRadius: 10
                }}
                onPress={() => Actions.addPet({ pet: pet, updatePet })}
              >
                <Text>edit</Text>
              </Button>
            </Left>
            <Right>
              <Button
                style={{
                  backgroundColor: "#7A5032",
                  flex: 1,
                  borderRadius: 10
                }}
                onPress={this.removePet}
              >
                <Text>remove</Text>
              </Button>
            </Right>
          </View>
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
    color: "#7A5032",
    borderColor: "#7A5032",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: "50%",
    textAlign: "center",
    fontWeight: "bold"
  }
});
