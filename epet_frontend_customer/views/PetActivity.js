import axios from "axios";
import {
  Body,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title,
  View
} from "native-base";
import React, { Component } from "react";
import { TouchableHighlight } from "react-native";
import Config from "react-native-config";
import { Actions } from "react-native-router-flux";
import ActivitiesCard from "../components/ActivitiesCard";
import theme from "../theme";

const API_URL = Config.API_URL;

export default class PetActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: []
    };
  }

  componentWillMount() {
    const { orderLine } = this.props;
    axios
      .get("/petactivity/" + orderLine.id)
      .then(response => {
        this.setState({
          activities: response.data
        });
      })
      .then(error => console.log(error));
  }

  render() {
    const { activities } = this.state;
    const { orderLine } = this.props;
    const { pet } = orderLine;

    return (
      <Container>
        <Header style={{ backgroundColor: theme.primaryColor }}>
          <Left style={{ flex: 1 }}>
            <Icon
              name="ios-arrow-back"
              onPress={() => Actions.pop({ refresh: {} })}
              style={{ color: "white", marginLeft: 10 }}
            />
          </Left>
          <Body style={{ flex: 1, alignItems: "center" }}>
            <Title style={{ color: "white", fontSize: 20 }}>Activity</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={{ backgroundColor: "black", alignItems: "center" }}>
            <Icon style={{ color: "white", fontSize: 100 }} name="person" />
            <Text style={{ color: "white" }}> {pet.name} </Text>
          </View>
          {activities.map(activity => (
            <TouchableHighlight key={activity.id}>
              <ActivitiesCard activity={activity} />
            </TouchableHighlight>
          ))}
        </Content>
      </Container>
    );
  }
}
