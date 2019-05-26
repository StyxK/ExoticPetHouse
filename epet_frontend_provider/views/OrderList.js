import React, { Component } from "react";
import update from "immutability-helper";
import {
  Container,
  Header,
  Body,
  Text,
  Left,
  Right,
  Content,
  ListItem,
  List,
  Icon,
  Button,
  Footer,
  FooterTab,
  Thumbnail
} from "native-base";
import { StyleSheet, View, Modal } from "react-native";
import { connect } from "react-redux";
import Axios from "axios";
import Config from "react-native-config";
import moment from "moment-timezone";

const API_URL = Config.API_URL;
const PIC_URI =
  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      orderLines: [],
      orderDetialDescription: [],
      orderStatusBar: [],
      modalVisible: false,
      selectedOrderId: ""
    };
  }

  setModalVisible = visible => {
    this.setState({
      modalVisible: visible,
      orderLines: [],
      orderDetialDescription: [],
      orderStatusBar: []
    });
  };

  getOrderDetails = orderId => {
    Axios.get(API_URL + "/order/" + orderId).then(response => {
      data = response.data;
      const approveButton = [
        <FooterTab
          key={"approve"}
          badge
          style={{ backgroundColor: "rgba(52, 52, 52, 0)" }}
        >
          <Button
            full
            style={{ backgroundColor: "green" }}
            onPress={() => this.updateStatus(2)}
          >
            <Text style={{ color: "white" }}> ตอบรับการรับฝาก </Text>
          </Button>
        </FooterTab>
      ];
      const cancelButton = [
        <FooterTab
          key={"cancel"}
          badge
          style={{ backgroundColor: "rgba(52, 52, 52, 0)" }}
        >
          <Button
            full
            style={{ backgroundColor: "red" }}
            onPress={() => this.updateStatus(3)}
          >
            <Text style={{ color: "white" }}> ปฏิเสธการรับฝาก </Text>
          </Button>
        </FooterTab>
      ];
      let startDate = moment(data.startDate)
        .tz("Asia/Bangkok")
        .format("DD MMM YYYY HH:mm");
      let endDate = moment(data.endDate)
        .tz("Asia/Bangkok")
        .format("DD MMM YYYY HH:mm");
      let submitDate = moment(data.submitDate)
        .tz("Asia/Bangkok")
        .format("DD MMM YYYY HH:mm");
      let orderStatus = JSON.parse(JSON.stringify(data.orderStatus.status));
      this.setState({
        selectedOrderId: data.id,
        orderLines: data.orderLines,
        orderDetialDescription: [
          <View key={data.id}>
            <View style={{ margin: 10 }}>
              <Text>
                ผู้ฝาก : <Text note> {data.customerUsername} </Text>
              </Text>
              <Text>
                วันที่ส่งคำขอ : <Text note> {submitDate} </Text>
              </Text>
              <Text>
                ฝากวันที่ : <Text note> {startDate} </Text>
              </Text>
              <Text>
                ถึงวันที่ : <Text note> {endDate} </Text>
              </Text>
              <Text>
                การขนส่งสัตว์ : <Text note> {data.transportation} </Text>
              </Text>
              <Text>
                ระยะเวลาฝาก : <Text note> {data.duration} </Text> วัน
              </Text>
              <Text>
                ค่าบริการทั้งหมด : <Text note> {data.totalPrice} </Text> บาท
              </Text>
            </View>
          </View>
        ]
      });
      switch (orderStatus) {
        case "ร้านยืนยันการรับฝากแล้ว":
          this.setState({
            orderStatusBar: [
              <View key={data.id}>
                <Footer
                  style={{
                    height: 30,
                    backgroundColor: "rgb(175, 175, 175)",
                    color: "white"
                  }}
                >
                  <Text style={{ color: "white", marginTop: 2 }}>
                    {" "}
                    {orderStatus}{" "}
                  </Text>
                </Footer>
                <Footer style={{ backgroundColor: "rgba(52, 52, 52, 0)" }}>
                  {cancelButton}
                </Footer>
              </View>
            ]
          });
          break;
        case "รอร้านตอบรับ":
          this.setState({
            orderStatusBar: [
              <View key={data.id}>
                <Footer
                  style={{
                    height: 30,
                    backgroundColor: "rgb(175, 175, 175)",
                    color: "white"
                  }}
                >
                  <Text style={{ color: "white", marginTop: 2 }}>
                    {" "}
                    {orderStatus}{" "}
                  </Text>
                </Footer>
                <Footer style={{ backgroundColor: "rgba(52, 52, 52, 0)" }}>
                  {approveButton}
                  {cancelButton}
                </Footer>
              </View>
            ]
          });
          break;
        default:
          this.setState({
            orderStatusBar: [
              <View key={data.id}>
                <Footer
                  style={{
                    height: 30,
                    backgroundColor: "rgb(175, 175, 175)",
                    color: "white"
                  }}
                >
                  <Text style={{ color: "white", marginTop: 2 }}>
                    {" "}
                    {orderStatus}{" "}
                  </Text>
                </Footer>
                <Footer style={{ backgroundColor: "rgba(52, 52, 52, 0)" }}>
                  {approveButton}
                </Footer>
              </View>
            ]
          });
      }
    });
  };

  showOrderDetail = data => {
    this.getOrderDetails(data.id);
    this.setModalVisible(!this.state.modalVisible);
  };

  updateStatus = status => {
    let orderID = this.state.selectedOrderId;
    Axios.put(API_URL + "/order/" + orderID, {
      orderStatus: {
        id: status
      }
    })
      .then(response => {
        newOrders = [];
        this.state.orders.map(data => {
          if (data.id == orderID) {
            newOrders.push(response.data);
          } else {
            newOrders.push(data);
          }
        });
        this.setState({
          orders: newOrders
        });
      })
      .then(
        this.setState({
          modalVisible: false
        })
      );
  };

  refreshOrder = () => {
    Axios.get(API_URL + "/order").then(response => {
      const newState = update(this.state, {
        orders: { $set: response.data }
      });
      this.setState(newState);
    });
  };

  componentWillMount() {
    this.refreshOrder();
  }

  render() {
    const {
      modalVisible,
      orders,
      orderLines,
      orderDetialDescription,
      orderStatusBar
    } = this.state;
    let orderFlatList = orders.map(data => {
      let status = JSON.parse(JSON.stringify(data.orderStatus.status));
      let statusLabel = [];
      switch (status) {
        case "ร้านยืนยันการรับฝากแล้ว":
          statusLabel = (
            <Text note key={"approve"} style={{ color: "green" }}>
              {" "}
              {status}{" "}
            </Text>
          );
          break;
        case "ร้านปฏิเสธการรับฝากแล้ว":
          statusLabel = (
            <Text note key={"cancel"} style={{ color: "red" }}>
              {" "}
              {status}{" "}
            </Text>
          );
          break;
        case "รอร้านตอบรับ":
          statusLabel = (
            <Text note key={"waiting"} style={{ color: "#7A5032" }}>
              {" "}
              {status}{" "}
            </Text>
          );
          break;
      }
      return (
        <ListItem note key={data.id}>
          <Body style={{ flex: 2 }}>
            <Text style={{ fontSize: 15 }}>
              {" "}
              เลขคำสั่งฝาก : <Text note> {data.id} </Text>
            </Text>
            <Text style={{ fontSize: 15 }}>
              {" "}
              ผู้ฝาก : <Text note> {data.customerUsername} </Text>
            </Text>
            <Text style={{ fontSize: 15 }}>
              {" "}
              การขนส่ง : <Text note>{data.transportation} </Text>
            </Text>
            <Text style={{ fontSize: 15 }}>
              {" "}
              สถานะ : <Text note>{statusLabel}</Text>
            </Text>
          </Body>
          <Right
            style={{
              flex: 0.75,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View style={{ flex: 1 }}>
              <Thumbnail
                style={{ alignSelf: "center" }}
                source={{ uri: PIC_URI }}
              />
              <Button
                rounded
                style={{
                  backgroundColor: "#7A5032",
                  alignSelf: "center",
                  height: 30,
                  marginTop: 10
                }}
                onPress={() => this.showOrderDetail(data)}
              >
                <Icon fontSize="15" name="search" />
              </Button>
            </View>
          </Right>
        </ListItem>
      );
    });

    let orderLineFlatList = orderLines.map(data => {
      cage = JSON.parse(JSON.stringify(data.cage));
      petDetail = JSON.parse(JSON.stringify(data.pet));
      return (
        <ListItem key={data.id}>
          <Body style={{ flex: 3 }}>
            <Text style={{ fontSize: 12 }}>
              {" "}
              ชื่อสัตว์เลี้ยง{" "}
              <Text note style={{ fontSize: 15 }}>
                {" "}
                {petDetail.name}{" "}
              </Text>
            </Text>
            <Text style={{ fontSize: 12 }}>
              {" "}
              ประเภท{" "}
              <Text note style={{ fontSize: 15 }}>
                {" "}
                {petDetail.typeOfPet}{" "}
              </Text>
            </Text>
            <Text style={{ fontSize: 12 }}>
              {" "}
              กรง :{" "}
              <Text note style={{ fontSize: 15 }}>
                {" "}
                {cage.name}{" "}
              </Text>
            </Text>
            <Text style={{ fontSize: 12 }}>
              {" "}
              ค่าบริการกรง / วัน :{" "}
              <Text note style={{ fontSize: 15 }}>
                {" "}
                {cage.price}{" "}
              </Text>{" "}
              บาท{" "}
            </Text>
          </Body>
          <Right style={{ flex: 0.75 }}>
            <Thumbnail source={{ uri: PIC_URI }} />
          </Right>
        </ListItem>
      );
    });

    return (
      <Container>
        <Header style={{ backgroundColor: "#7A5032" }}>
          <Left style={{ flex: 1 }} />
          <Body style={{ flex: 2.5 }}>
            <Text style={{ color: "white" }}>รายการคำขอฝากสัตว์เลี้ยง</Text>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content>
          <List>{orderFlatList}</List>
        </Content>
        <Modal animationType="slide" visible={modalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <Container style={styles.modal}>
              <Header
                translucent
                style={{
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  backgroundColor: "#7A5032"
                }}
              >
                <Button
                  transparent
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#7A5032"
                  }}
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <Text>ปิดรายละเอียด</Text>
                </Button>
              </Header>
              <Content>
                {orderDetialDescription}
                <List>{orderLineFlatList}</List>
              </Content>
              {orderStatusBar}
            </Container>
          </View>
        </Modal>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch({ type: "LOGIN", payload: "developer" }),
    logout: () => dispatch({ type: "LOGOUT", payload: "annonymous" })
  };
};

const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  modalContainer: {
    flex: 1,
    flexDirection: "column-reverse",
    justifyContent: "center",
    alignItems: "center",
    height: 500,
    backgroundColor: "rgba(52, 52, 52, 0.8)"
  },
  modal: {
    borderRadius: 10,
    marginBottom: 65,
    backgroundColor: "white",
    opacity: 0.99,
    width: "85%",
    marginTop: 40
  }
});
