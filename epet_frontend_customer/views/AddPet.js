import {
  Container,
  Fab,
  Icon,
  Header,
  Form,
  Item,
  Label,
  Input,
  Content,
  Picker,
  Button,
  Title,
  ListItem,
  Left,
  Right,
  Radio,
  Text,
  List,
  Body
} from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Config from "react-native-config";
import { connect } from "react-redux";
import { addPet, setPets } from "../actions";
import axios from "axios";
import { Actions } from "react-native-router-flux";

const API_URL = Config.API_URL;

export default class AddPet extends Component {
  state = {
    name: "",
    congenitalDisease: "",
    allergicDrugs: "",
    allergicFoods: "",
    favThing: "",
    hateThing: "",
    age: "",
    typeOfPet: "",
    gender: ""
  };
  constructor(props){
    super(props)
    alert(JSON.stringify(props.pet))
    this.state = {...this.state, ...props.pet}
  }

  componentWillMount() {}

  render() {
    const {
      name,
      congenitalDisease,
      allergicDrugs,
      allergicFoods,
      favThing,
      hateThing,
      age,
      typeOfPet,
      gender
    } = this.state;
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
            <Title style={{ color: "white", fontSize: 20 }}>Add Pet</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Form>
            <Label>ชื่อ</Label>
            <Item stackedLabel>
              <Input
                onChangeText={this.onChangeText("name")}
                defaultValue={name}
              />
            </Item>
            <Label>ประเภท</Label>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={typeOfPet}
                onValueChange={this.onChangeText("typeOfPet")}
              >
                <Picker.Item label="โปรดเลือกประเภทของสัตว์เลี้ยง" value="" />
                <Picker.Item label="สัตว์เลื้อยคลาน" value="key0" />
                <Picker.Item label="สัตว์ครึ่งบกครึ่งน้ำ " value="key1" />
                <Picker.Item label="สัตว์ไม่มีกระดูกสันหลัง" value="key2" />
                <Picker.Item label="สัตว์ปีก" value="key3" />
                <Picker.Item label="ปลาแปลก" value="key4" />
                <Picker.Item label="เลี้ยงลูกด้วยนม  " value="key5" />
              </Picker>
            </Item>
            <Label>อายุ</Label>
            <Item stackedLabel>
              <Input
                style={styles.textInput}
                keyboardType="numeric"
                onChangeText={this.onChangeText("age")}
                defaultValue={age}
              />
            </Item>
            <Label>เพศ</Label>
            <ListItem>
              <Left>
                <Text>ชาย</Text>
              </Left>
              <Right>
                <Radio
                  selected={gender == "male"}
                  onPress={() => this.onChangeText("gender")("male")}
                />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>หญิง</Text>
              </Left>
              <Right>
                <Radio
                  selected={gender == "female"}
                  onPress={() => this.onChangeText("gender")("female")}
                />
              </Right>
            </ListItem>
            <Label>โรคประจำตัว</Label>
            <Item stackedLabel>
              <Input
                onChangeText={this.onChangeText("congenitalDisease")}
                defaultValue={congenitalDisease}
              />
            </Item>
            <Label>ยาที่แพ้</Label>
            <Item stackedLabel>
              <Input
                onChangeText={this.onChangeText("allergicDrugs")}
                defaultValue={allergicDrugs}
              />
            </Item>
            <Label>อาหารที่แพ้</Label>
            <Item stackedLabel>
              <Input
                onChangeText={this.onChangeText("allergicFoods")}
                defaultValue={allergicFoods}
              />
            </Item>
            <Label>สิ่งที่ชอบ</Label>
            <Item stackedLabel>
              <Input
                onChangeText={this.onChangeText("favThing")}
                defaultValue={favThing}
              />
            </Item>
            <Label>สิ่งที่ไม่ชอบ</Label>
            <Item stackedLabel>
              <Input
                onChangeText={this.onChangeText("hateThing")}
                defaultValue={hateThing}
              />
            </Item>
            <Button
              style={{ backgroundColor: "#7A5032" }}
              onPress={this.submitForm}
            >
              <Text>Add Pet</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }

  onChangeText = key => text => {
    this.setState({
      [key]: text
    });
  };

  submitForm = () => {
    const {
      name,
      congenitalDisease,
      allergicDrugs,
      allergicFoods,
      favThing,
      hateThing,
      age,
      typeOfPet,
      gender
    } = this.state;
    if (!name) {
      return alert("Plese Enter your pet name");
    }
    if (!age) {
      return alert("Plese Enter your pet age");
    }
    if (!gender) {
      return alert("Plese Enter your pet gender");
    }
    if (!typeOfPet) {
      return alert("Plese Enter your pet type");
    }
    axios
      .post(API_URL + "/pet/", {
        name,
        congenitalDisease,
        allergicDrugs,
        allergicFoods,
        favThing,
        hateThing,
        age: Number(age),
        typeOfPet,
        gender,
        owner: {
          userName: "nongnaem5"
        }
      })
      .then(response => {
        alert("success");
        console.log(JSON.stringify(response));
      })
      .catch(error => {
        alert("error" + error);
        console.log(error);
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});
