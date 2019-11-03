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
      <Card key={activity.id}>
        <CardItem style={{ backgroundColor: theme.primaryColor3 }}>
          <Left>
            <Text style={{ color: theme.primaryTextColor }}>{activity.topic}</Text>
          </Left>
          <Right>
            <Text style={{ color: theme.primaryTextColor }}>
              {" "}
              {moment(activity.date).fromNow()}{" "}
            </Text>
          </Right>
        </CardItem>
        {activity.picture ? (
          <CardItem cardBody>
            <Image
              source={{ uri: activity.picture }}
              style={{ height: 150, width: null, flex: 1 }}
            />
          </CardItem>
        ) : null}
        <CardItem>
          <Text>{activity.description}</Text>
        </CardItem>
      </Card>
    );
  }
}

