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
  DatePicker
} from "native-base";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { addPet, setPets, updatePet } from "../actions";
import Config from "react-native-config";

const API_URL = Config.API_URL;
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startChosenDate: new Date(),
      endChosenDate: new Date(),
      petIdTemp: "id"
    };
  }

  setStartDate = newDate => {
    this.setState({ startChosenDate: newDate });
  };

  setEndDate = newDate => {
    this.setState({ endChosenDate: newDate });
  };

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
      this.state.endChosenDate.getTime() - this.state.startChosenDate.getTime()
    );
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  showPetName = petId => {
    const { pets = [], setPets } = this.props;
    const petArray = pets.find(item => item.id === petId);
    this.state.petIdTemp = petArray.id;
    return petArray.name + "";
  };

  componentWillMount() {
    //this.setStoreDataToOrder();
  }

  changPetStatusForm = () => {
    const{updatePet} = this.props
    axios
      .put("/pet/" + this.state.petIdTemp, {
        wasDeposit: true
      })
      .then(response => {
        alert("success");
        updatePet(response.data);
      })
      .catch(error => {
        alert("error" + error);
        console.log(error);
      });
  };

  submitForm = () => {
    axios
      .post(API_URL + "/order/", {
        transportation: "kerry",
        submitDate: this.state.startChosenDate,
        startDate: this.state.startChosenDate,
        endDate: this.state.endChosenDate,
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
            <Text>
              สัตว์เลี้ยง: {this.showPetName(data.pet)}
              {this.state.petIdTemp}
            </Text>
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
                <Text>
                  {" "}
                  ที่อยู่ของผู้ฝาก: 200 ซอยบางแค13 บางแค กรุงเทพ 10160
                </Text>
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
                  วันที่ฝาก:{" "}
                  {this.state.startChosenDate.toString().substr(4, 12)}-{" "}
                  {this.state.endChosenDate.toString().substr(4, 12)}
                </Text>
              </CardItem>
              <CardItem>
                <Text note>ยอดชำระรวม: {totalPrice}</Text>
              </CardItem>
            </Card>
          </Content>
          <Footer style={{ height: "10%", backgroundColor: "#A37E63" }}>
            <Left
              style={{
                marginTop: "2.5%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 15, color: "white" }}>ฝากตั้งแต่</Text>
              <DatePicker
                defaultDate={new Date().getDate}
                locale={"th"}
                minimumDate={new Date()}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"slide"}
                androidMode={"default"}
                placeHolderText="เลือกวัน"
                textStyle={{ color: "#5CFF31", fontSize: 17 }}
                placeHolderTextStyle={{ color: "#d3d3d3", fontSize: 17 }}
                onDateChange={this.setStartDate}
                disabled={false}
              />
            </Left>
            <Left
              style={{
                marginTop: "2.5%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 15, color: "white" }}>
                สิ้นสุดการฝาก
              </Text>
              <DatePicker
                defaultDate={new Date().getDate}
                locale={"th"}
                minimumDate={this.state.startChosenDate}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"slide"}
                androidMode={"calendar"}
                placeHolderText="เลือกวัน"
                textStyle={{ color: "#5CFF31", fontSize: 17 }}
                placeHolderTextStyle={{ color: "#d3d3d3", fontSize: 17 }}
                onDateChange={this.setEndDate}
                disabled={false}
              />
            </Left>
          </Footer>
          <Footer style={{ backgroundColor: "#A37E63" }}>
            <Button
              full
              style={{ flex: 2, marginTop: 1, backgroundColor: "#7A5032" }}
              onPress={this.sendOrderToStore}
            >
              <Text style={{ color: "white" }}>ยืนยันคำสั่งฝาก</Text>
            </Button>
          </Footer>
        </Container>
      </View>
    );
  }

  sendOrderToStore = () => {
    alert("ส่งคำร้องเสร็จสิ้น");
    this.submitForm();
    this.changPetStatusForm();
    Actions.home();
  };
}

const mapStateToProps = state => {
  return { pets: state.pets };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePet: pet => dispatch(updatePet(pet))
  };
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
