import React, { Component } from "react";
import { Image, Alert, TouchableHighlight } from "react-native";
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
  View,
  Card,
  CardItem
} from "native-base";
import axios from "axios";
import theme from "../theme";
import ImagePicker from "react-native-image-picker";
import Config from "react-native-config";
import Corousel,{Pagination} from "react-native-snap-carousel";

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

  refresh = () => {
    this.getCages();
  };

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
    this.refresh();
  };
  deleteImage = imgUrl => async () => {
    Alert.alert("", "คุณต้องการลบรูปภาพนี้หรือไม่", [
      {
        text: "ยืนยัน",
        onPress: async () => {
          await axios.post("/store/deleteImage", { url: imgUrl });
          this.refresh();
        }
      },
      {
        text: "ยกเลิก",
        style: "cancel"
      }
    ]);
  };
  renderItem = ({ item, index }) => {
    return (
      <TouchableHighlight
        style={{ width: 100, height: 100, margin: 5, marginBottom: 10 }}
        onLongPress={this.deleteImage(item)}
      >
        <Image style={{ width: 100, height: 100 ,borderRadius:10}} source={{ uri: item }} />
      </TouchableHighlight>
    );
  };

  render() {
    const { store } = this.props;
    const { cages, images } = this.state;

    let cagesList = cages.map(data => {
      return (
        <Card transparent key={data.id}>
          <CardItem
            button
            style={{borderRadius:10}}
            onPress={() => this.goToSubCage(data)}
          >
            <Body style={{ flex:1 }}>
              <Text> {data.typeName}</Text>
              <Text note> ราคาต่อวัน : {data.price}</Text>
            </Body>
            <Right style={{ flexDirection: "row", flex: 0.75 }}>
              <Button
                style={{
                  flex: 1,
                  marginRight: 10,
                  backgroundColor: 'red',
                  alignItems:'center'
                }}
                rounded
                onPress={() => this.deleteCage(data)}
              >
                <Icon name='delete' type='AntDesign'/>
              </Button>
              <Button
                style={{
                  flex: 1,
                  justifyContent: "center",
                  backgroundColor: theme.primaryColor3
                }}
                rounded
                onPress={() => this.goToEditCage(data)}
              >
                <Icon name='edit' type='AntDesign'/>
              </Button>
            </Right>
          </CardItem>
        </Card>
      );
    });

    return (
      <Container>
        <Header style={{ backgroundColor: theme.primaryColor }}>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              rounded
              onPress={() => {
                this.goToProfile();
              }}
            >
              <Icon name="arrow-back" style={{ color: "white" }} />
            </Button>
          </Left>
          <Body style={{ flex: 2 ,alignItems:'center'}}>
            <Text style={{ color: "white" }}>{store.name}</Text>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <View
          padder
          style={{
            flex: 0.5,
            flexDirection: "row"
          }}
        >
          <Body
            style={{
              alignSelf: "center",
              flex: 2,
              alignContent: "flex-end",
              justifyContent: "flex-start"
            }}
          >
            <Text
              note
              style={{
                color: theme.secondaryTextColor,
                alignSelf: "flex-start"
              }}
            >
              เบอร์โทรศัพท์ : {" "}
              <Text note style={{ alignSelf: "flex-start" }}>
                {store.phoneNumber}
              </Text>
            </Text>
            <Text
              note
              style={{
                color: theme.secondaryTextColor,
                alignSelf: "flex-start"
              }}
            >
              คะแนนร้าน : {" "}
              <Text note style={{ alignSelf: "flex-start" }}>
                {store.rating}{" "}
              </Text>
            </Text>
            <Text
              note
              style={{
                color: theme.secondaryTextColor,
                alignSelf: "flex-start"
              }}
            >
              คำอธิบายร้าน :
              <Text note style={{ alignSelf: "flex-start" }}>
                {store.description}{" "}
              </Text>
            </Text>
          </Body>
        </View>
        <ListItem itemDivider style={{backgroundColor: theme.primaryColor,height:50}}>
          <Body>
            <Label style={{color:'white'}}>
              รูปร้าน
            </Label>
          </Body>
          <Button
            style={{
              backgroundColor: theme.primaryColor3,
              borderRadius: 10,
              alignSelf: "center",
              margin: 5,
              height: 30
            }}
            onPress={this.handleChoosePhoto}
          >
            <Text>เพิ่มรูปภายในร้าน</Text>
          </Button>
        </ListItem>
        <View
          style={{
            backgroundColor: theme.backgroundColor,
            justifyContent: "center",
            alignItems:'center'
          }}
        >
          <Corousel
            data={images}
            renderItem={this.renderItem}
            sliderWidth={500}
            itemWidth={110}
          />
        </View>
        <View style={{ flex: 2, backgroundColor: theme.backgroundColor }}>
          <ListItem style={{ backgroundColor: theme.primaryColor,height:50 }} itemDivider>
            <Body>
              <Label style={{ color: "white" }}>กรงภายในร้าน </Label>
            </Body>
            <Button
              rounded
              onPress={() => {
                this.goToCreateCage();
              }}
              style={{
                backgroundColor: theme.primaryColor3,
                borderRadius: 10,
                alignSelf: "center",
                margin: 5,
                height: 30
              }}
            >
              <Text>
                เพิ่มกรง
              </Text>
            </Button>
          </ListItem>
          <Content padder style={{ flexDirection: "column",backgroundColor:theme.backgroundColor }}>
            {cagesList}
          </Content>
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
