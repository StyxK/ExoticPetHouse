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
  Body,
  View
} from "native-base";
import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import Config from "react-native-config";
import { connect } from "react-redux";
import { addPet, setPets } from "../actions";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import ImagePicker from "react-native-image-picker";
import theme from "../theme";

const API_URL = Config.API_URL;

export default class AddPet extends Component {
  state = {
    id: undefined,
    name: "",
    congenitalDisease: "",
    allergicDrugs: "",
    allergicFoods: "",
    favThing: "",
    hateThing: "",
    age: "",
    typeOfPet: "",
    image: null,
    gender: ""
  };
  constructor(props) {
    super(props);
    this.state = { ...this.state, ...props.pet };
  }

  componentWillMount() {}

  handleChoosePhoto = () => {
    const options = {
      noData: false
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        //alert(JSON.stringify(response))
        //alert(JSON.stringify('data:image/jpeg;base64,' + response.data))
        this.setState({ image: "data:image/jpeg;base64," + response.data });
      }
    });
  };

  render() {
    const {
      id,
      name,
      congenitalDisease,
      allergicDrugs,
      allergicFoods,
      favThing,
      hateThing,
      age,
      typeOfPet,
      gender,
      image
    } = this.state;
    return (
      <Container>
        <Header style={{ backgroundColor: theme.primaryColor }}>
          <Left style={{ flex: 1 }}>
            <Icon
              name="ios-arrow-back"
              onPress={Actions.pop}
              style={{ color: theme.primaryTextColor, marginLeft: 10 }}
            />
          </Left>
          <Body style={{ flex: 1, alignItems: "center" }}>
            <Title style={{ color: theme.primaryTextColor, fontSize: 20 }}>Add Pet</Title>
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
                <Picker.Item label="สัตว์เลื้อยคลาน" value="สัตว์เลื้อยคลาน" />
                <Picker.Item
                  label="สัตว์ครึ่งบกครึ่งน้ำ "
                  value="สัตว์ครึ่งบกครึ่งน้ำ"
                />
                <Picker.Item
                  label="สัตว์ไม่มีกระดูกสันหลัง"
                  value="สัตว์ไม่มีกระดูกสันหลัง"
                />
                <Picker.Item label="สัตว์ปีก" value="สัตว์ปีก" />
                <Picker.Item label="ปลาแปลก" value="ปลาแปลก" />
                <Picker.Item
                  label="เลี้ยงลูกด้วยนม  "
                  value="เลี้ยงลูกด้วยนม"
                />
              </Picker>
            </Item>
            <Label>อายุ</Label>
            <Item stackedLabel>
              <Input
                style={styles.textInput}
                keyboardType="numeric"
                onChangeText={this.onChangeText("age")}
                defaultValue={age + ""}
              />
            </Item>
            <Label>เพศ</Label>
            <ListItem>
              <Left>
                <Text>เพศผู้</Text>
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
                <Text>เพศเมีย</Text>
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
            <View style={{ display: "flex", justifyContent: "center" }}>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 300,
                    height: 300,
                    borderColor: theme.primaryColor,
                    borderWidth: 1,
                    borderRadius: 5
                  }}
                />
              )}
            </View>
            <View style={{ display: "flex", flexDirection: "row", margin: 15 }}>
              <Left>
                <Button
                  style={{
                    backgroundColor: theme.primaryColor,
                    flex: 1,
                    borderRadius: 10
                  }}
                  onPress={this.handleChoosePhoto}
                >
                  <Text>Choose Photo</Text>
                </Button>
              </Left>
              <Right>
                <Button
                  style={{
                    backgroundColor: theme.primaryColor,
                    flex: 1,
                    borderRadius: 10
                  }}
                  onPress={this.submitForm}
                >
                  <Text>{id ? "Edit" : "Add Pet"}</Text>
                </Button>
              </Right>
            </View>
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
      id,
      name,
      congenitalDisease,
      allergicDrugs,
      allergicFoods,
      favThing,
      hateThing,
      age,
      typeOfPet,
      gender,
      image
    } = this.state;
    const { addPet, updatePet } = this.props;
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
    if (!image) {
      return alert("Plese Enter your pet photo");
    }
    if (id) {
      axios
        .put("/pet/" + id, {
          name,
          congenitalDisease,
          allergicDrugs,
          allergicFoods,
          favThing,
          hateThing,
          age: Number(age),
          typeOfPet,
          gender,
          image
        })
        .then(response => {
          alert("success");
          updatePet(response.data);
          Actions.pop({ refresh: { pet: response.data } });
        })
        .catch(error => {
          alert("error" + error);
          console.log(error);
        });
    } else {
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
          image
        })
        .then(response => {
          alert("success");
          addPet(response.data);
          Actions.pop({ refresh: {} });
        })
        .catch(error => {
          alert("error" + error);
          console.log(error);
        });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});
