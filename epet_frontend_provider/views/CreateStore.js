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
import { Dimensions, Modal } from "react-native";
import { Field, reduxForm, change } from "redux-form";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";

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
      modalVisible: false
    };
  }

  componentWillMount() {
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
    this.props.dispatch(change('createStore','latitude',initialPoint.latitude+''))
    this.props.dispatch(change('createStore','longitude',initialPoint.longitude+''))
  };

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#7A5032" }}>
          <Left style={{ flex: 2 }}>
            <Icon
              name="ios-arrow-back"
              style={{ marginLeft: 10, color: "white" }}
              onPress={() => {
                goToProfile();
              }}
            />
          </Left>
          <Body style={{ flex: 2.5 }}>
            <Text style={{ color: "white" }}>ตั้งร้านเพิ่ม</Text>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        {storeForm(
          this.props,
          this.state,
          this.setModalVisible,
          this.setLocation
        )}
      </Container>
    );
  }
}

renderInput = ({ state ,input, label, type, meta: { touched, error, warning } }) => {
  console.log(state,'state ja')
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
          { console.log(input,'what da heck is input') }
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
            <Input keyboardType="number-pad" {...input} disabled/>
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

const storeForm = (props, state, setModalVisible, setLocation) => {
  const { initialPoint, startPoint, modalVisible } = state;
  const { handleSubmit } = props;
  return (
    <Content>
      <Form>
        <ListItem style={{ backgroundColor: '#A78B45' }} itemDivider>
          <Text style={{ color: "white" }}>ข้อมูลทั่วไปของร้าน</Text>
        </ListItem>
        <Field name="name" component={renderInput} label="ชื่อร้าน" />
        <Field
          name="phoneNumber"
          component={renderInput}
          label="เบอร์ติดต่อร้าน"
        />
        <Field
          name="description"
          component={renderInput}
          label="คำอธิบายร้าน"
        />
        <Field
          name="maxOfDeposit"
          component={renderInput}
          label="จำนวนรับฝากสูงสุด"
        />
        <ListItem style={{ backgroundColor: '#A78B45' }} itemDivider>
          <Text style={{ color: "white" }}>ตำแหน่งที่ตั้งของร้าน</Text>
        </ListItem>
        <Field name="street" component={renderInput} label="ถนน" />
        <Field name="district" component={renderInput} label="เขต / อำเภอ" />
        <Field name="province" component={renderInput} label="จังหวัด" />
        <Field name="postcode" component={renderInput} label="รหัสไปรษณีย์" />
        <Field name="latitude" component={renderInput} label="ละติจูด" />
        <Field name="longitude" component={renderInput} label="ลองจิจูด"/>
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
            setModalVisible(true);
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
            <Header style={{ backgroundColor: "#7A5032" }}>
              <Left style={{ flex: 1 }} />
              <Body style={{ display: "flex", flex: 1, alignItems: "center" }}>
                <Title style={{ color: "white", fontSize: 20 }}>
                  เลือกตำแหน่งร้าน
                </Title>
              </Body>
              <Right style={{ flex: 1 }}>
                <Text
                  onPress={() => {
                    setModalVisible(false);
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
              onPress={l => setLocation(l.nativeEvent.coordinate)}
            >
              {startPoint && <Marker coordinate={startPoint} />}
            </MapView>
          </View>
        </Modal>
      </View>
      <Footer>
        <FooterTab style={{ backgroundColor: "none" }}>
          <Button
            style={{ backgroundColor: "green" }}
            full
            onPress={handleSubmit(submit)}
          >
            <Text> ลงทะเบียนร้านรับฝาก </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Content>
  );
};

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

submit = value => {
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
  let storeDetail = { name, phoneNumber, description, maxOfDeposit, rating: 0 };
  let address = { street, district, province, postcode, latitude, longitude };
  let data = { ...storeDetail, address };
  axios.post("/store", data).then(response => {
    alert(response.data);
  });
  goToProfile();
};

goToProfile = () => {
  Actions.profile();
};

export default reduxForm({
  form: "createStore",
  validate
})(CreateStore);
