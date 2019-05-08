import {
  Container,
  Icon,
  Left,
  Body,
  Header,
  Title,
  Right,
  Content,
  Text,
  Card,
  CardItem,
  List,
  ListItem,
  Button,
  Footer,
  Radio
} from "native-base";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import axios from "axios";
import { connect } from "react-redux";
import { setPets } from "../actions";
import Config from "react-native-config";

const API_URL = Config.API_URL;
class Order extends Component {
  constructor(props) {
    super(props);
  }

  showCageName = cageId => {
    const cageArray = this.props.cage.find(item => item.id === cageId);
    return cageArray.name + " " + cageArray.price + "/คืน";
  };

  showPriceDuringDeposit = cageId => {
    const cageArray = this.props.cage.find(item => item.id === cageId);
    const totalPrice = this.showTotalPrice(cageArray.price);
    return totalPrice;
  };

  showTotalPrice(price) {
    let totalPrice = 0;
    const duration = this.calculateDate();
    totalPrice = price * duration;
    return totalPrice;
  }

  calculateDate() {
    const diffTime = Math.abs(
      this.props.endChosenDate.getTime() - this.props.startChosenDate.getTime()
    );
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  showPetName = petId => {
    const { pets = [], setPets } = this.props;
    const petArray = pets.find(item => item.id === petId);
    return petArray.name + "";
  };

  componentWillMount() {
    //this.setStoreDataToOrder();
  }

  submitForm = () => {
    axios
      .post(API_URL + "/order/", {
        transportation: "kerry",
        submitDate: this.props.startChosenDate,
        startDate: this.props.startChosenDate,
        endDate: this.props.endChosenDate,
        orderLines: this.props.orderLine,
        store: this.props.stores.id,
        orderStatus: 1
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

  render() {
    let totalPrice = 0;
    let orderList = this.props.orderLine.map(data => {
      const price = this.showPriceDuringDeposit(data.cage);
      totalPrice += price;
      return (
        <ListItem avatar key={data.cage}>
          <Left>
            <Icon name="paw" />
          </Left>
          <Body>
            <Text>กรง:{this.showCageName(data.cage)}</Text>
            <Text>สัตว์เลี้ยง: {this.showPetName(data.pet)}</Text>
            <Text>ราคาตลอดการฝาก: {price}</Text>
          </Body>
          <Right />
        </ListItem>
      );
    });

    return (
      <View style={styles.container}>
        <Container>
          <Header style={{ backgroundColor: "#7A5032" }}>
            <Left style={{ flex: 1 }}>
              <Icon
                name="ios-arrow-back"
                style={{ color: "white", marginLeft: 10 }}
              />
            </Left>
            <Body style={{ flex: 1 }}>
              <Title style={{ color: "white", fontSize: 20 }}>
                รายการคำสั่งฝาก
              </Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <Card style={{ flex: 0 }}>
              <CardItem header>
                <Text style={{ fontSize: 20 }}> รหัส order </Text>
              </CardItem>
              <CardItem>
                <Text> ที่อยู่ของผู้ฝาก </Text>
              </CardItem>
              <CardItem>
                <List>
                  <Text>{this.props.stores.name}</Text>
                  <Text>รายการฝาก :</Text>
                </List>
              </CardItem>
              {orderList}
              <CardItem>
                <Text note>
                  วันที่ฝาก: {this.props.startChosenDate.toString().substr(4, 12)}-{" "}
                  {this.props.endChosenDate.toString().substr(4, 12)}
                </Text>
              </CardItem>
              <CardItem>
                <Text note>ยอดชำระรวม: {totalPrice / 2}</Text>
              </CardItem>
            </Card>
          </Content>
          <Footer style={{ backgroundColors: "#A37E63" }}>
            <Button
              full
              style={{ flex: 2, marginTop: 1, backgroundColor: "#7A5032" }}
              onPress={this.sendOrderToStore}
            >
              <Text style={{ color: "white" }}>ส่งคำร้องเสร็จสิ้น</Text>
            </Button>
          </Footer>
        </Container>
      </View>
    );
  }

  sendOrderToStore = () => {
    alert("ส่งคำร้องเสร็จสิ้น");
    this.submitForm();
  };
}

const mapStateToProps = state => {
  return { pets: state.pets };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});
