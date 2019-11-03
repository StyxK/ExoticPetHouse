import React, { Component } from "react";
import { Image, Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  Container,
  Text,
  Header,
  Left,
  Body,
  Right,
  Fab,
  Icon,
  Button,
  ListItem,
  List,
  Label,
  Content,
  View
} from "native-base";
import axios from "axios";
import theme from "../theme";
import ImagePicker from "react-native-image-picker";
import Config from "react-native-config";

const API_URL = Config.API_URL;

export default class StoreManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cages: [],
      createActivate: false,
      images: [],
      imageFile: undefined
    };
  }

  getCages = () => {
    axios.get("/store/" + this.props.store.id).then(response => {
      let cagelist = response.data.cage;
      this.setState({
        images: response.data.storeImages.map(storeImage => storeImage.image),
        cages: cagelist
      });
    });
  };

  componentWillMount() {
    this.getCages();
  }

  handleChoosePhoto = () => {
    const options = {
      noData: false
    };
    ImagePicker.showImagePicker(options, async imageFile => {
      if (imageFile.uri) {
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
        const imgUrl = response.data.url;
        axios
          .post("/store/" + this.props.store.id + "/image/", { imgUrl })
          .then(response => {});
        this.setState(s => ({
          images: [...s.images, imgUrl]
        }));
      }
    });
  };

  render() {
    const { store } = this.props;
    const { cages, images } = this.state;

    let cagesList = cages.map(data => {
      return (
        <List style={{ backgroundColor: theme.primaryColor }} key={data.id}>
          <ListItem
            style={{
              backgroundColor: theme.secondaryColor,
              borderBottomWidth: 3,
              borderBottomColor: theme.primaryColor,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 5
            }}
            onPress={() => this.goToSubCage(data)}
          >
            <Body>
              <Text style={{ color: "white" }}> {data.typeName}</Text>
              <Text />
              <Text style={{ color: "white" }}> ราคาต่อวัน : {data.price}</Text>
            </Body>
            <Right style={{ flexDirection: "row", flex: 1 }}>
              <Button
                style={{
                  flex: 0.5,
                  marginRight: 10,
                  backgroundColor: theme.warningColor,
                  justifyContent: "center"
                }}
                rounded
                onPress={() => this.deleteCage(data)}
              >
                <Label
                  style={{ fontSize: 14, textAlign: "center", color: "white" }}
                >
                  {" "}
                  ลบ{" "}
                </Label>
              </Button>
              <Button
                style={{
                  flex: 1,
                  justifyContent: "center",
                  backgroundColor: theme.successColor
                }}
                rounded
                onPress={() => this.goToEditCage(data)}
              >
                <Label
                  style={{
                    fontSize: 14,
                    textAlign: "center",
                    color: theme.successTextColor
                  }}
                >
                  {" "}
                  แก้ไขข้อมูล{" "}
                </Label>
              </Button>
            </Right>
          </ListItem>
        </List>
      );
    });

    return (
      <Container>
        <Header style={{ backgroundColor: theme.primaryColor }}>
          <Left style={{ flex: 2 }}>
            <Icon
              name="ios-arrow-back"
              style={{ marginLeft: 10, color: "white" }}
              onPress={() => {
                this.goToProfile();
              }}
            />
          </Left>
          <Body style={{ flex: 2 }}>
            <Text style={{ color: "white" }}>{store.name}</Text>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: theme.secondaryColor,
            height: "25%"
          }}
        >
          <Left style={{ flex: 1, marginLeft: 20 }}>
            <Image
              style={{ width: 100, height: 100 }}
              source={
                store.image
                  ? { uri: store.image }
                  : require("../assets/no_image_available.jpeg")
              }
            />
          </Left>
          <Body
            style={{
              alignSelf: "center",
              flex: 2,
              alignContent: "flex-end",
              justifyContent: "flex-start"
            }}
          >
            <Text
              style={{
                color: theme.secondaryTextColor,
                alignSelf: "flex-start"
              }}
            >
              {" "}
              ชื่อร้าน :
              <Text style={{ color: "white", alignSelf: "flex-start" }}>
                {" "}
                {store.name}{" "}
              </Text>
            </Text>
            <Text
              style={{
                color: theme.secondaryTextColor,
                alignSelf: "flex-start"
              }}
            >
              {" "}
              เบอร์โทรศัพท์ :
              <Text style={{ color: "white", alignSelf: "flex-start" }}>
                {" "}
                {store.phoneNumber}{" "}
              </Text>
            </Text>
            <Text
              style={{
                color: theme.secondaryTextColor,
                alignSelf: "flex-start"
              }}
            >
              {" "}
              คะแนนร้าน :
              <Text style={{ color: "white", alignSelf: "flex-start" }}>
                {" "}
                {store.rating}{" "}
              </Text>
            </Text>
            <Text
              style={{
                color: theme.secondaryTextColor,
                alignSelf: "flex-start"
              }}
            >
              {" "}
              คำอธิบายร้าน :
              <Text style={{ color: "white", alignSelf: "flex-start" }}>
                {" "}
                {store.description}{" "}
              </Text>
            </Text>
            <Button
              style={{
                backgroundColor: theme.primaryColor,
                borderRadius: 10,
                alignSelf: "center",
                margin: 5,
                height:30
              }}
              onPress={this.handleChoosePhoto}
            >
              <Text>เพิ่มรูปภายในร้าน</Text>
            </Button>
          </Body>
        </View>
        <View
          style={{
            margin: 15,
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: theme.secondaryColor,
            margin: 0,
            padding: 0
          }}
        >
          {images &&
            images.map(image => (
              <Image
                key={image}
                source={{ uri: image }}
                style={{ width: 100, height: 100, margin: 5,marginBottom:10 }}
              />
            ))}
        </View>
        <View style={{ flex: 2, backgroundColor: theme.backgroundColor }}>
          <ListItem style={{ backgroundColor: theme.primaryColor }} itemDivider>
            <Left>
              <Label style={{ color: "white" }}>กรงภายในร้าน </Label>
            </Left>
            <Right>
              <Button
                small
                rounded
                onPress={() => {
                  this.goToCreateCage();
                }}
                style={{
                  height: 40,
                  width: 90,
                  justifyContent: "center",
                  backgroundColor: theme.successColor
                }}
              >
                <Label style={{ color: theme.successTextColor }}>
                  {" "}
                  เพิ่มกรง{" "}
                </Label>
              </Button>
            </Right>
          </ListItem>
          <Content>{cagesList}</Content>
        </View>
      </Container>
    );
  }

  deleteCage = async data => {
    Alert.alert(
      `ยืนยันการลบกรง`,
      `ต้องการลบ ${data.typeName} หรือไม่ ?`,
      [
        {
          text: "ยืนยัน",
          onPress: () => {
            axios
              .delete("/cage/" + data.id)
              .then(alert(`ทำรายการเสร็จสิ้น`))
              .then(this.getCages())
              .catch(err => {
                console.log(err);
                alert(
                  "ไม่สามารถทำรายการได้ กรุณาตรวจสอบว่ามีการรับฝากในกรงนี้อยู่หรือไม่ แล้วทำรายการอีกครั้ง"
                );
              });
          }
        },
        { text: "ยกเลิก", style: "cancel" }
      ],
      { cancelable: true }
    );
  };

  goToSubCage = cageType => {
    Actions.subCage({ cageType });
  };

  goToEditCage = data => {
    Actions.cage({ store: this.props.store, cage: data });
  };

  goToCreateCage = () => {
    Actions.cage({ store: this.props.store });
  };

  goToProfile = () => {
    Actions.profile();
  };
}
