import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import moment from "moment-timezone";
import {
  Container,
  Card,
  CardItem,
  Body,
  Text,
  Left,
  Thumbnail,
  Right,
  Button
} from "native-base";
import theme from "../theme";

export default class ActivitiesCard extends Component {
  render() {
    const { activity } = this.props;
    return (
      <View style={styles.container}>
        <Card key={activity.id} style={{ marginLeft: 10, marginRight: 10 }}>
          <CardItem style={{ backgroundColor: theme.primaryColor }}>
            <Left>
              <Text style={{ color: "white" }}>{activity.topic}</Text>
            </Left>
            <Right>
              <Text style={{ color: "white" }}>
                {" "}
                {moment(activity.date).fromNow()}{" "}
              </Text>
            </Right>
          </CardItem>
          {activity.picture ? (
            <CardItem cardBody>
              <Image
                source={{ uri: activity.picture }}
                style={{ height: 200, width: null, flex: 1 }}
              />
            </CardItem>
          ) : null}
          <CardItem>
            <Text>{activity.description}</Text>
          </CardItem>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  }
});
