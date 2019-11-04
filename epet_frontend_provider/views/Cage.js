import React, { Component } from "react";
import {
  View,
  Container,
  Content,
  Icon,
  Header,
  Left,
  Right,
  Text,
  Body,
  Form,
  Item,
  Input,
  Footer,
  Label,
  FooterTab,
  Button,
  Picker,
  CheckBox,
  ListItem
} from "native-base";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import theme from "../theme";

export default class Cage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: undefined,
      typeName: "",
      description: undefined,
      price: undefined,
      hasCamera: false
    };
  }

  componentDidMount() {
    if (this.props.cage) {
      const cage = this.props.cage;
      this.setState({
        typeName: cage.type,
        description: cage.description,
        price: cage.price + "",
        quantity: cage.quantity
      });
    }
  }

  checkCamera = () => {
    const checked = this.state.hasCamera;
    if (checked == true) {
      this.setState({ hasCamera: false });
    } else this.setState({ hasCamera: true });
  };

  render() {
    const { quantity, typeName, description, price} = this.state;
    return (
      <Container>
        <Header style={{ backgroundColor: theme.primaryColor }}>
          <Left style={{ flex: 2 }}>
            <Icon
              name="ios-arrow-back"
              style={{ color: "white" }}
              onPress={() => Actions.storeManager({ store: this.props.store })}
            />
          </Left>
          <Body style={{ flex: 2.5 }}>
            <Text style={{ color: "white" }}>
              {" "}
              {this.props.cage ? "แก้ไขข้อมูลกรง" : "เพิ่มกรงในร้าน"}
            </Text>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content>
          <Form>
            <View style={{ marginVertical: 5, paddingHorizontal: 10 }}>
              <Text style={{ marginHorizontal: 15, marginVertical: 2 }}>
                ชื่อกรง :
              </Text>
              <Item rounded>
                <Input
                  value={typeName}
                  onChangeText={e => this.setState({ typeName: e })}
                />
              </Item>
            </View>
            <View style={{ marginVertical: 5, paddingHorizontal: 10 }}>
              <Text style={{ marginHorizontal: 15, marginVertical: 2 }}>
                คำอธิบายเพิ่มเติม :
              </Text>
              <Item rounded>
                <Input
                  value={description}
                  onChangeText={e => this.setState({ description: e })}
                />
              </Item>
            </View>
            <View style={{ marginVertical: 5, paddingHorizontal: 10 }}>
              <Text style={{ marginHorizontal: 15, marginVertical: 2 }}>
                ราคา :
              </Text>
              <Item style={{ flexDirection: "row-reverse" }} rounded>
                <Label style={{ marginRight: 5 }}> บาท / วัน </Label>
                <Input
                  keyboardType="numeric"
                  value={price}
                  onChangeText={e => this.setState({ price: e })}
                />
              </Item>
            </View>
            <View style={{ marginVertical: 5, paddingHorizontal: 10 }}>
              <Text style={{ marginHorizontal: 15, marginVertical: 2 }}>
                จำนวน :
              </Text>
              <Item style={{ flexDirection: "row-reverse" }} rounded>
                <Label style={{ marginRight: 5 }}> กรง </Label>
                <Input
                  keyboardType="numeric"
                  value={quantity}
                  onChangeText={e => this.setState({ quantity: e })}
                />
              </Item>
            </View>
            <View style={{ marginVertical: 5, paddingHorizontal: 10 }}>
              <Text style={{ marginHorizontal: 15, marginVertical: 2 }}>
                กล้อง :
              </Text>
              <ListItem onPress={this.checkCamera}>
                <CheckBox
                  onPress={this.checkCamera}
                  checked={this.state.hasCamera}
                  color={theme.primaryColor}
                />
                <Body>
                  <Text>ตัวเลือกสำหรับกรงที่ต้องการเพิ่มกล้อง</Text>
                </Body>
              </ListItem>
            </View>
          </Form>
          {console.log(this.props.store.id, "storeId")}
        </Content>
        <Footer>
          <FooterTab style={{ backgroundColor: "none" }}>
            {this.props.cage ? (
              <Button
                style={{ backgroundColor: "green" }}
                full
                onPress={() => this.handleSubmit_Edit()}
              >
                <Text> ยืนยันการแก้ไขข้อมูลกรง </Text>
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: "green" }}
                full
                onPress={() => this.handleSubmit_Create()}
              >
                <Text> ยืนยันการเพิ่มกรง </Text>
              </Button>
            )}
          </FooterTab>
        </Footer>
      </Container>
    );
  }

  handleSubmit_Edit = async () => {
    try {
      await console.log(this.state, "state");
      await axios.put("/cage/" + this.props.cage.id, this.state);
      await alert("แก้ไขข้อมูลกรงสำเร็จ");
      Actions.storeManager({ store: this.props.store });
    } catch (err) {
      alert(JSON.stringify(err))
      await console.log(err);
      await alert("กรุณาตรวจสอบข้อมูล แล้วทำรายการใหม่อีกครั้ง");
    }
  };

  handleSubmit_Create = async () => {
    try {
      await console.log(this.state, "state");

      await axios.post("/cage/" + this.props.store.id, this.state);
      await alert("เพิ่มกรงสำเร็จ");
      Actions.storeManager({ store: this.props.store });
    } catch (err) {
      await console.log(err);
      await alert("กรุณาตรวจสอบข้อมูล แล้วทำรายการใหม่อีกครั้ง");
    }
  };
}
