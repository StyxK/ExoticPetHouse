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
  Icon
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

class History extends Component {
  state = {
    history: []
  };
  componentWillMount() {
    axios.get("/order").then(response => {
      this.setState({ history: response.data });
    });
  }
  render() {
    const { history } = this.state;
    return (
      <Container>
        <Container>
          <Header style={{ backgroundColor: "#7A5032" }}>
            <Body style={{ flex: 1, alignItems: "center" }}>
              <Title style={{ color: "white", fontSize: 20 }}>History</Title>
            </Body>
          </Header>
          {history.map(item => {
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
              <ListItem note key={id} onPress={this.goToHistoryDetail(item)}>
                <Body style={{ flex: 2 }}>
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
                    ฝากวันที่ : <Text note> {startDate} </Text>
                  </Text>
                  <Text style={{ fontSize: 15 }}>
                    {" "}
                    ถึงวันที่ : <Text note> {endDate} </Text>
                  </Text>
                  <Text style={{ fontSize: 15 }}>
                    {" "}
                    สถานะ : <Text note> {orderStatus.status} </Text>
                  </Text>

                  {/* {orderLines.map(orderLine => {
                    const { id, pet, cage } = orderLine;
                    return (
                      <View key={id}>
                        <Text style={{ fontSize: 15 }}>
                          {" "}
                          ชื่อสัตว์เลี้ยง : <Text note>{pet.name}</Text>
                        </Text>
                      </View>
                    );
                  })} */}
                </Body>
                {/* <Right
                  style={{
                    flex: 0.75,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Button
                      rounded
                      style={{
                        backgroundColor: "#7A5032",
                        alignSelf: "center",
                        height: 30,
                        marginTop: 10
                      }}
                    >
                      <Icon fontSize="15" name="search" />
                    </Button>
                  </View>
                </Right> */}
              </ListItem>
            );
          })}

          <Content />
        </Container>
        <NavFooter />
      </Container>
    );
  }
  goToHistoryDetail = item => () => {
    Actions.historyDetail({ item });
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
)(History);
