import {
  Body,
  Container,
  Content,
  Header,
  Title,
  View,
  ListItem,
  Text,
  Right,
  Thumbnail,
  Button,
  Icon,
  Left,
  Footer,
  FooterTab
} from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Config from "react-native-config";
import { connect } from "react-redux";
import NavFooter from "../components/NavFooter";
import axios from "axios";
import moment from "moment-timezone";
import { Actions } from "react-native-router-flux";

const API_URL = Config.API_URL;

class HistoryDetail extends Component {
  state = {
    history: []
  };
  componentWillMount() {
    axios.get("/order").then(response => {
      this.setState({ history: response.data });
    });
  }
  render() {
    const { item } = this.props;
    const { id, orderStatus, orderLines = [], store } = item;
    let startDate = moment(item.startDate)
      .tz("Asia/Bangkok")
      .format("DD MMM YYYY HH:mm");
    let endDate = moment(item.endDate)
      .tz("Asia/Bangkok")
      .format("DD MMM YYYY HH:mm");
    let submitDate = moment(item.submitDate)
      .tz("Asia/Bangkok")
      .format("DD MMM YYYY HH:mm");
    return (
      <Container>
        <Container>
          <Header style={{ backgroundColor: "#7A5032" }}>
            <Left style={{ flex: 1 }}>
              <Icon
                name="ios-arrow-back"
                onPress={() => Actions.history()}
                style={{ color: "white", marginLeft: 10 }}
              />
            </Left>
            <Body style={{ flex: 1, alignItems: "center" }}>
              <Title style={{ color: "white", fontSize: 20 }}>
                History Detail
              </Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <View key={item.id}>
              <View style={{ margin: 20 }}>
                <Text style={{ fontSize: 15 }}>
                  {" "}
                  เลขคำสั่งฝาก : <Text note> {id} </Text>
                </Text>
                <Text style={{ fontSize: 15 }}>
                  {" "}
                  ร้านที่ส่งฝาก : <Text note> {store.name} </Text>
                </Text>
                <Text style={{ fontSize: 15 }}>
                  {" "}
                  วันที่ส่งคำขอ : <Text note> {submitDate} </Text>
                </Text>
                <Text style={{ fontSize: 15 }}>
                  {" "}
                  ฝากวันที่ : <Text note> {startDate} </Text>
                </Text>
                <Text style={{ fontSize: 15 }}>
                  {" "}
                  ถึงวันที่ : <Text note> {endDate} </Text>
                </Text>
              </View>
            </View>
            <Content style={styles.modal}>
              <View style={{ marginLeft: 20 }}>
                <Text style={{ fontSize: 15 }}>
                  {" "}
                  สัตว์เลี้ยงที่อยู่ในรายการฝาก
                </Text>
              </View>
              {orderLines.map(orderLine => {
                const { id, pet, cage } = orderLine;
                return (
                  <ListItem key={pet.id}>
                    <Text style={{ fontSize: 15 }}>
                      {" "}
                      <Text>
                        {" "}
                        ชนิดกรง : <Text note> {cage.name} </Text>
                      </Text>
                      <Text>
                        {" "}
                        สัตว์เลี้ยง : <Text note> {pet.name} </Text>
                      </Text>
                    </Text>
                  </ListItem>
                );
              })}
            </Content>
            <View style={{ display: "flex", flexDirection: "row", margin: 15 }}>
              <Left>
                <Button
                  style={{
                    backgroundColor: "#7A5032",
                    flex: 1,
                    borderRadius: 10
                  }}
                  onPress={this.goToPetActivity}
                >
                  <Text>pet activity</Text>
                </Button>
              </Left>
              <Right>
                <Button
                  style={{
                    backgroundColor: "#7A5032",
                    flex: 1,
                    borderRadius: 10
                  }}
                  onPress={this.cancelOrder}
                >
                  <Text>ยกเลิกคำสั่งฝาก</Text>
                </Button>
              </Right>
            </View>
            <View>
                <Right style={{flex:1}}/>
                <Body style={{flex:2}}>
                  <Button
                    style={{
                      backgroundColor: "#7A5032",
                      flex: 1,
                      borderRadius: 10
                    }}
                    onPress={this.payment}
                  >
                    <Text>ชำระค่าบริการ</Text>
                  </Button>
                </Body>
                <Left style={{flex:1}}/>
            </View>
          </Content>
        </Container>
      </Container>
    );
  }

  cancelOrder = () => {
    const { item, cancelOrder } = this.props;

    cancelOrder(item)
      .then(response => {
        alert("success");
        Actions.pop();
      })
      .catch(error => {
        alert("error" + error);
        console.log(error);
      });
  };

  goToPetActivity = () => {
    Actions.petActivity({});
  };

  payment = () => {
    Actions.payment({item:this.props.item});
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryDetail);
