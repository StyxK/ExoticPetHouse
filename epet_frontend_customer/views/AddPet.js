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
  View,
  Grid,
  Col,
  Row
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
    gender: "",
    imageFile: undefined
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
        this.setState({
          image: "data:image/jpeg;base64," + response.data,
          imageFile: response
        });
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
            <Button rounded transparent onPress={Actions.pop}>
              <Icon
                name="arrow-back"
                style={{
                  color: theme.primaryTextColor,
                  marginLeft: 10,
                  fontSize: theme.arrowSize
                }}
              />
            </Button>
          </Left>
          <Body style={{ flex: 1, alignItems: "center" }}>
            <Title style={{ color: theme.primaryTextColor, fontSize: 20 }}>
              {id ? "แก้ไขข้อมูล" : "เพิ่มสัตว์เลี้ยง"}
            </Title>
          </Body>
          <Right>
            <Button rounded transparent onPress={this.submitForm}>
              <Icon
                name="md-checkmark"
                style={{
                  color: theme.primaryTextColor,
                  marginLeft: 10,
                  fontSize: theme.arrowSize
                }}
              />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Form>
            <View style={{ flexDirection: "row" }}>
              <Left style={{ flex: 0.5 }}>
                <View style={{ display: "flex", justifyContent: "center" }}>
                  <Button transparent onPress={this.handleChoosePhoto}>
                    <Label
                      style={{
                        width: 100,
                        position: "absolute",
                        bottom: -30,
                        zIndex: 1,
                        backgroundColor: "black",
                        color: "white",
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5,
                        textAlign: "center"
                      }}
                    >
                      เลือกรูป
                    </Label>
                    {image ? (
                      <Image
                        source={{ uri: image }}
                        style={{
                          width: 100,
                          height: 100,
                          borderColor: theme.primaryColor,
                          borderWidth: 1,
                          borderRadius: 5
                        }}
                      />
                    ) : (
                      <Image
                        source={{
                          uri:
                            "epet_frontend_customer/assets/no_image_available.jpeg"
                        }}
                        style={{
                          width: 100,
                          height: 100,
                          borderColor: theme.primaryColor,
                          borderWidth: 1,
                          borderRadius: 5
                        }}
                      />
                    )}
                  </Button>
                </View>
              </Left>
              <Right>
                <Item style={{ borderColor: "transparent" }}>
                  <Left style={{ flex: 0.5 }}>
                    <Label>ชื่อ</Label>
                  </Left>
                  <Body style={{ flex: 2 }}>
                    <Input
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        maxHeight: "90%",
                        borderRadius: 5,
                        borderBottomColor: "grey"
                      }}
                      onChangeText={this.onChangeText("name")}
                      defaultValue={name}
                    />
                  </Body>
                </Item>
                <Item style={{ borderColor: "transparent" }}>
                  <Left style={{ flex: 0.5 }}>
                    <Label>อายุ</Label>
                  </Left>
                  <Body style={{ flex: 2 }}>
                    <Input
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        maxHeight: "90%",
                        borderRadius: 5,
                        borderBottomColor: "grey"
                      }}
                      keyboardType="numeric"
                      onChangeText={this.onChangeText("age")}
                      defaultValue={age + ""}
                    />
                  </Body>
                </Item>
              </Right>
            </View>
            <Item style={{ borderColor: "transparent" }}>
              <Label>ประเภท</Label>
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
            <Item style={{ borderColor: "transparent" }}>
              <Left style={{ flex: 1 }}>
                <Label>เพศ</Label>
              </Left>
              <Body
                underline={false}
                style={{
                  flex: 5,
                  alignItems: "flex-start",
                  flexDirection: "row"
                }}
              >
                <Item style={{ padding: 10, borderColor: "transparent" }}>
                  <Radio
                    selected={gender == "male"}
                    onPress={() => this.onChangeText("gender")("male")}
                  />
                  <Text> เพศผู้ </Text>
                </Item>
                <Item
                  underline={false}
                  style={{ padding: 10, borderColor: "transparent" }}
                >
                  <Radio
                    selected={gender == "female"}
                    onPress={() => this.onChangeText("gender")("female")}
                  />
                  <Text> เพศเมีย </Text>
                </Item>
              </Body>
            </Item>
            <Item style={{ borderColor: "transparent" }}>
              <Left style={{ flex: 1 }}>
                <Label>โรคประจำตัว</Label>
              </Left>
              <Body style={{ flex: 2 }}>
                <Input
                  style={{
                    width: "100%",
                    borderBottomWidth: 1,
                    maxHeight: "90%",
                    borderRadius: 5,
                    borderBottomColor: "grey"
                  }}
                  onChangeText={this.onChangeText("congenitalDisease")}
                  defaultValue={congenitalDisease}
                />
              </Body>
            </Item>
            <Item style={{ borderColor: "transparent" }}>
              <Left style={{ flex: 1 }}>
                <Label>ยาที่แพ้</Label>
              </Left>
              <Body style={{ flex: 2 }}>
                <Input
                  style={{
                    width: "100%",
                    borderBottomWidth: 1,
                    maxHeight: "90%",
                    borderRadius: 5,
                    borderBottomColor: "grey"
                  }}
                  onChangeText={this.onChangeText("allergicDrugs")}
                  defaultValue={allergicDrugs}
                />
              </Body>
            </Item>
            <Item style={{ borderColor: "transparent" }}>
              <Left style={{ flex: 1 }}>
                <Label>อาหารที่แพ้</Label>
              </Left>
              <Body style={{ flex: 2 }}>
                <Input
                  style={{
                    width: "100%",
                    borderBottomWidth: 1,
                    maxHeight: "90%",
                    borderRadius: 5,
                    borderBottomColor: "grey"
                  }}
                  onChangeText={this.onChangeText("allergicFoods")}
                  defaultValue={allergicFoods}
                />
              </Body>
            </Item>
            <Item style={{ borderColor: "transparent" }}>
              <Left style={{ flex: 1 }}>
                <Label>สิ่งที่ชอบ</Label>
              </Left>
              <Body style={{ flex: 2 }}>
                <Input
                  style={{
                    width: "100%",
                    borderBottomWidth: 1,
                    maxHeight: "90%",
                    borderRadius: 5,
                    borderBottomColor: "grey"
                  }}
                  onChangeText={this.onChangeText("favThing")}
                  defaultValue={favThing}
                />
              </Body>
            </Item>
            <Item style={{ borderColor: "transparent" }}>
              <Left style={{ flex: 1 }}>
                <Label>สิ่งที่ไม่ชอบ</Label>
              </Left>
              <Body style={{ flex: 2 }}>
                <Input
                  style={{
                    width: "100%",
                    borderBottomWidth: 1,
                    maxHeight: "90%",
                    borderRadius: 5,
                    borderBottomColor: "grey"
                  }}
                  onChangeText={this.onChangeText("hateThing")}
                  defaultValue={hateThing}
                />
              </Body>
            </Item>
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

  submitForm = async () => {
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

    let imageName = undefined;
    const { imageFile } = this.state;
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", {
        name: imageFile.fileName,
        type: imageFile.type,
        uri: imageFile.uri
      });
      const response = await axios({
        method: "post",
        url: API_URL + "/image",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
      });
      imageName = response.data.url;
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
          image: imageName || image
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
          image: imageName
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
