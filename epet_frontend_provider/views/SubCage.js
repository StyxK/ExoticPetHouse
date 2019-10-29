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
  View,
  Title
} from "native-base";
import axios from "axios";
import theme from "../theme";

export default class SubCage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cages: []
    };
  }

  componentWillMount() {
    const { cageType } = this.props;
    axios.get("/cage/types/" + cageType.id).then(response => {
      this.setState({ cages: response.data });
    });
  }
  render() {
    const { cages } = this.state;
    const { cageType } = this.props;
    let cagesList = cages.map(cage => {
      return (
        <List style={{ backgroundColor: theme.primaryColor }} key={cage.id}>
          <ListItem
            style={{
              backgroundColor: theme.secondaryColor,
              borderBottomWidth: 3,
              borderBottomColor: theme.primaryColor,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 5
            }}
          >
            <Body>
              <Text style={{ color: "white" }}> {cage.id}</Text>
              <Text />
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
                onPress={() => this.deleteSubCage(cage)}
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
              >
                <Label
                  style={{
                    fontSize: 14,
                    textAlign: "center",
                    color: theme.successTextColor
                  }}
                >
                  {" "}
                  เพิ่มกล้อง{" "}
                </Label>
              </Button>
            </Right>
          </ListItem>
        </List>
      );
    });

    return (
      <Container>
        <View style={{ flex: 2, backgroundColor: theme.backgroundColor }}>
          <Header style={{ backgroundColor: theme.primaryColor }}>
            <Body style={{ flex: 1, alignItems: "center" }}>
              <Title style={{ color: theme.primaryTextColor, fontSize: 20 }}>
                กรงประเภท {cageType.typeName}
              </Title>
            </Body>
          </Header>
          <Content>{cagesList}</Content>
        </View>
      </Container>
    );
  }

  deleteSubCage = async cage => {
    Alert.alert(
      `ยืนยันการลบกรง`,
      `ต้องการลบ ${cage.id} หรือไม่ ?`,
      [
        {
          text: "ยืนยัน",
          onPress: () => {
            axios
              .delete("/cage/types/" + cage.id)
              .then(alert(`ทำรายการเสร็จสิ้น`))
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
}
