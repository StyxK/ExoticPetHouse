import { Body, ListItem, Text } from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import moment from "moment-timezone";

export default class HistoryList extends Component {

  render() {
    const { item, onPress } = this.props;
    const { id, orderStatus, store = [] } = item;
    let startDate = moment(item.startDate)
      .tz("Asia/Bangkok")
      .format("DD MMM YYYY");
    let endDate = moment(item.endDate)
      .tz("Asia/Bangkok")
      .format("DD MMM YYYY");
    // let submitDate = moment(item.submitDate)
    //   .tz("Asia/Bangkok")
    //   .format("DD MMM YYYY");
    return (
      <ListItem note onPress={onPress}>
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
        </Body>
      </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});
