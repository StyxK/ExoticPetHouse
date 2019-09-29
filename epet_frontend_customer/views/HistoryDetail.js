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
  Button,
  Icon,
  Left,
} from "native-base";
import React, { Component } from "react";
import { StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment-timezone";
import { Actions } from "react-native-router-flux";
import OrderButton from '../components/OrderButton'

class HistoryDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      history: {},
      statusId: null
    };
  }

  componentDidMount() {
    axios.get("/order/" + this.props.item.id).then(response => {
      this.setState({ history: response.data ,statusId : response.data.orderStatus.id});
    })
  }

  render() {
    const { history } = this.state;
    const { id, orderStatus, orderLines = [], store = {} } = history;
    let startDate = moment(history.startDate)
      .tz("Asia/Bangkok")
      .format("DD MMM YYYY HH:mm");
    let endDate = moment(history.endDate)
      .tz("Asia/Bangkok")
      .format("DD MMM YYYY HH:mm");
    let submitDate = moment(history.submitDate)
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
            <View key={history.id}>
              <View style={{ margin: 20 }}>
                <Text style={{ fontSize: 15 }}>
                  {" "}
                  เลขคำสั่งฝาก : <Text note> {id} </Text>
                </Text>
                <Text style={{ fontSize: 15 }}>
                  {" "}
                  {console.log(store.name, "store")}
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
                const { pet, cage } = orderLine;
                return (
                  <ListItem
                    key={pet.id}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <View>
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
                    </View>
                    <View>
                      <Button
                        style={{
                          backgroundColor: "#7A5032",
                          borderRadius: 10
                        }}
                        onPress={this.goToPetActivity(orderLine)}
                      >
                        <Text>pet activity</Text>
                      </Button>
                    </View>
                  </ListItem>
                );
              })}
            </Content>
            <View style={{ display: "flex", flexDirection: "row", margin: 15 }}>
              <OrderButton item={history} orderStatus={this.state.statusId}/>
            </View>
          </Content>
        </Container>
      </Container>
    );
  }

  confirmCancelOrder = () => {
    const { item } = this.props;
    if (item.orderStatus.id == 1 || item.orderStatus.id == 2) {
      Alert.alert(
        "ยกเลิกออเดอร์",
        "คุณแน่ใจว่าต้องการยกเลิกออเดอร์หรือไม่",
        [
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel"
          },
          { text: "OK", onPress: () => this.cancelOrder() }
        ],
        { cancelable: false }
      );
    } else {
      alert("ออร์เดอร์นี้ไม่สามารถยกเลิกได้");
    }
  };

  cancelOrder = () => {
    const { item, refresh } = this.props;
    if (item.orderStatus.id == 1 || item.orderStatus.id == 2) {
      axios
        .put("/order/denyByCustomer/" + item.id)
        .then(response => {
          alert("ยกเลิกออร์เดอร์สำเร็จ");
          refresh && refresh();
          Actions.pop();
        })
        .catch(error => {
          alert("error" + error);
          console.log(error);
        });
    } else {
      alert("ออร์เดอร์นี้ไม่สามารถยกเลิกได้");
    }
  };

  goToPetActivity = orderLine => () => {
    Actions.petActivity({ orderLine });
  };

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
