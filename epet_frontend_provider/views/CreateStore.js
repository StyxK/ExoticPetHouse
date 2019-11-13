import React, { Component } from "react";
import {
  Container,
  Text,
  Header,
  Left,
  Right,
  Body,
  Form,
  Item,
  ListItem,
  View,
  Button,
  Input,
  Icon,
  FooterTab,
  Content,
  Footer,
  Title,
  Label
} from "native-base";
import { Dimensions, Modal, Image } from "react-native";
import { Field, reduxForm, change, destroy } from "redux-form";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";
import theme from "../theme";
import ImagePicker from "react-native-image-picker";
import Config from "react-native-config";

const API_URL = Config.API_URL;
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class CreateStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPoint: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      startPoint: undefined,
      modalVisible: false,
      image: null,
      imageFile: undefined
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      lat = parseFloat(position.coords.latitude);
      long = parseFloat(position.coords.longitude);
      initialCoordinate = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      };
      this.setState({
        initialPoint: initialCoordinate,
        startPoint: {
          latitude: lat,
          longitude: long
        }
      });
    });
  }
  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };
  setLocation = l => {
    const initialPoint = { ...this.state.initialPoint };
    initialPoint.latitude = l.latitude;
    initialPoint.longitude = l.longitude;
    this.setState({
      initialPoint: initialPoint,
      startPoint: l
    });
    this.props.dispatch(
      change("createStore", "latitude", initialPoint.latitude + "")
    );
    this.props.dispatch(
      change("createStore", "longitude", initialPoint.longitude + "")
    );
  };

  handleChoosePhoto = () => {
    const options = {
      noData: false
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.setState({
          image: "data:image/jpeg;base64," + response.data,
          imageFile: response
        });
      }
    });
  };

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: theme.primaryColor }}>
          <Left style={{ flex: 2 }}>
            <Button rounded transparent onPress={() => {this.goToProfile()}}>
              <Icon
                name="arrow-back"
                style={{ marginLeft: 10, color: "white" }}
              />
            </Button>
          </Left>
          <Body style={{ flex: 2.5 }}>
            <Text style={{ color: "white" }}>ตั้งร้านเพิ่ม</Text>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        {this.storeForm()}
      </Container>
    );
  }

  goToProfile = () => {
    this.props.dispatch(destroy("createStore"));
    Actions.profile();
  };

  storeForm = () => {
    const { initialPoint, startPoint, modalVisible, image } = this.state;
    const { handleSubmit } = this.props;
    return (
      <Content>
        <Form>
          <ListItem style={{ backgroundColor: "#A78B45" }} itemDivider>
            <Text style={{ color: "white" }}>ข้อมูลทั่วไปของร้าน</Text>
          </ListItem>
          <Field name="name" component={this.renderInput} label="ชื่อร้าน" />
          <Field
            name="phoneNumber"
            component={this.renderInput}
            label="เบอร์ติดต่อร้าน"
          />
          <Field
            name="description"
            component={this.renderInput}
            label="คำอธิบายร้าน"
          />
          <Field
            name="maxOfDeposit"
            component={this.renderInput}
            label="จำนวนรับฝากสูงสุด"
          />

          <ListItem style={{ backgroundColor: "#A78B45" }} itemDivider>
            <Text style={{ color: "white" }}>ตำแหน่งที่ตั้งของร้าน</Text>
          </ListItem>
          <Field name="street" component={this.renderInput} label="ถนน" />
          <Field
            name="district"
            component={this.renderInput}
            label="เขต / อำเภอ"
          />
          <Field name="province" component={this.renderInput} label="จังหวัด" />
          <Field
            name="postcode"
            component={this.renderInput}
            label="รหัสไปรษณีย์"
          />
          <Field name="latitude" component={this.renderInput} label="ละติจูด" />
          <Field
            name="longitude"
            component={this.renderInput}
            label="ลองจิจูด"
          />
        </Form>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            padding: 10
          }}
        >
          <MapView
            style={{
              width: "100%",
              height: 200
            }}
            region={initialPoint}
            scrollEnabled={false}
            zoomEnabled={false}
            zoomTapEnabled={false}
            minZoomLevel={18}
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            {startPoint && <Marker coordinate={startPoint} />}
          </MapView>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              alert("Modal has been closed.");
            }}
          >
            <View>
              <Header style={{ backgroundColor: theme.primaryColor }}>
                <Left style={{ flex: 1 }} />
                <Body
                  style={{ display: "flex", flex: 1, alignItems: "center" }}
                >
                  <Title style={{ color: "white", fontSize: 20 }}>
                    เลือกตำแหน่งร้าน
                  </Title>
                </Body>
                <Right style={{ flex: 1 }}>
                  <Text
                    onPress={() => {
                      this.setModalVisible(false);
                    }}
                    style={{ color: "white" }}
                  >
                    ยืนยัน
                  </Text>
                </Right>
              </Header>
              <MapView
                style={{
                  width: "100%",
                  height: "100%"
                }}
                initialRegion={initialPoint}
                onPress={l => this.setLocation(l.nativeEvent.coordinate)}
              >
                {startPoint && <Marker coordinate={startPoint} />}
              </MapView>
            </View>
          </Modal>
        </View>
        <View style={{ display: "flex" }}>
          <ListItem style={{ backgroundColor: "#A78B45" }} itemDivider>
            <Text style={{ color: "white" }}>เลือกรูปของร้าน</Text>
          </ListItem>
          <View
            style={{
              margin: 15,
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
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
          <View style={{ margin: 15, flexDirection: "row" }}>
            <Left></Left>
            <Right>
              <Button
                style={{
                  backgroundColor: theme.primaryColor,
                  flex: 1,
                  borderRadius: 10
                }}
                onPress={this.handleChoosePhoto}
              >
                <Text>เลือกรูปของร้าน</Text>
              </Button>
            </Right>
          </View>
        </View>
        <Footer>
          <FooterTab style={{ backgroundColor: "none" }}>
            <Button
              style={{ backgroundColor: "green" }}
              full
              onPress={handleSubmit(this.submit)}
            >
              <Text> ลงทะเบียนร้านรับฝาก </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Content>
    );
  };

  submit = async value => {
    let {
      name,
      phoneNumber,
      description,
      maxOfDeposit,
      street,
      district,
      province,
      postcode,
      latitude,
      longitude
    } = value;
    let storeDetail = {
      name,
      phoneNumber,
      description,
      maxOfDeposit,
      rating: 0
    };
    let address = { street, district, province, postcode, latitude, longitude };
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
      storeDetail.image = imageName;
    }
    let data = { ...storeDetail, address };

    axios.post("/store", data).then(response => {
      this.goToProfile();
    });
    
  };

  renderInput = ({
    state,
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => {
    console.log(state, "state ja");
    switch (input.name) {
      case "phoneNumber":
      case "maxOfDeposit":
      case "postcode":
        return (
          <View style={{ marginVertical: 5, paddingHorizontal: 10 }}>
            <Text style={{ marginHorizontal: 15, marginVertical: 2 }}>
              {label}
              <Text>{"     "}</Text>
              {touched &&
                (error ? (
                  <Text note style={{ color: "red" }}>
                    {error}
                  </Text>
                ) : (
                  <Text />
                ))}
            </Text>
            <Item bordered rounded>
              <Input keyboardType="number-pad" {...input} />
            </Item>
          </View>
        );
      case "latitude":
      case "longitude":
        return (
          <View style={{ marginVertical: 5, paddingHorizontal: 10 }}>
            {console.log(input, "what da heck is input")}
            <Text style={{ marginHorizontal: 15, marginVertical: 2 }}>
              {label}
              <Text>{"     "}</Text>
              {touched &&
                (error ? (
                  <Text note style={{ color: "red" }}>
                    {error}
                  </Text>
                ) : (
                  <Text />
                ))}
            </Text>
            <Item bordered rounded>
              <Input keyboardType="number-pad" {...input} disabled />
            </Item>
          </View>
        );
      default:
    }
    return (
      <View style={{ marginVertical: 5, paddingHorizontal: 10 }}>
        <Text style={{ marginHorizontal: 15, marginVertical: 2 }}>
          {label}
          <Text>{"     "}</Text>
          {touched &&
            (error ? (
              <Text note style={{ color: "red" }}>
                {error}
              </Text>
            ) : (
              <Text />
            ))}
        </Text>
        <Item bordered rounded>
          <Input keyboardType="default" {...input} />
        </Item>
      </View>
    );
  };
}
const validate = value => {
  const error = {};
  error.name = "";
  error.phoneNumber = "";
  error.description = "";
  error.maxOfDeposit = "";
  error.district = "";
  error.province = "";
  error.postcode = "";
  let {
    name,
    phoneNumber,
    description,
    maxOfDeposit,
    street,
    district,
    province,
    postcode,
    latitude,
    longitude
  } = value;
  if (name == undefined) {
    error.name = "กรุณาใส่ชื่อร้าน";
  }
  if (phoneNumber == undefined) {
    error.phoneNumber = "กรุณาใส่เบอร์ติดต่อร้าน";
  }
  if (description == undefined) {
    description = "-";
  }
  if (maxOfDeposit == undefined) {
    error.maxOfDeposit = "กรุณาระบุจำนวน";
  }
  if (street == undefined) {
    error.description = "กรุณาระบุรายละเอียด";
  }
  if (district == undefined) {
    error.district = "กรุณาระบุเขต / อำเภอ";
  }
  if (province == undefined) {
    error.province = "กรุณาระบุจังหวัด";
  }
  if (postcode == undefined || postcode.length != 5) {
    error.postcode = "กรุณากรอกรหัส 5 หลัก";
  }
  if (latitude == undefined) {
    error.latitude = "กรุณากรอกละติจูด";
  }
  if (longitude == undefined) {
    error.longitude = "กรุณากรอกลองจิจูด";
  }
  return error;
};
export default reduxForm({
  form: "createStore",
  validate
})(CreateStore);
