import { Body, ListItem, Text, Card, CardItem, Icon, View } from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import moment from "moment-timezone";
import theme from "../theme";

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
    return (
      <Card transparent style={{flex:1}}>
        <CardItem button onPress={onPress} style={{borderBottomWidth:0.5}}>
          <Body style={{ flex: 2 }}>
            <Text style={{ fontSize: 15 }}>
              <Text> {store.name} </Text>
            </Text>
            <Text style={{ fontSize: 15 ,paddingVertical:5}}>
              <Icon name='md-calendar' style={{color:theme.secondaryColor}}/> <Text> {startDate} - {endDate} </Text>
            </Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});
