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
  View,
  Thumbnail,
  Label
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
              style={{ color: theme.primaryTextColor }}
              onPress={() => Actions.pop()}
              name="ios-arrow-back"
            />
          </Left>
          <Body style={{ flex: 3, alignItems: "center" }}>
            <Text style={{ color: theme.primaryTextColor }}>กิจกรรมระหว่างการฝาก</Text>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content style={{ backgroundColor: theme.backgroundColor }}>
          <View
            style={{
              backgroundColor: theme.accentColor,
              flexDirection: "row",
              marginBottom: 5
            }}
          >
            <Left style={{ flex: 1, alignItems: "center" }}>
              {pet.image ? (
                <Thumbnail
                  style={{ width: 80, height: 80 }}
                  source={{ uri: pet.image }}
                />
              ) : (
                <Thumbnail
                  style={{ width: 80, height: 80 }}
                  source={require("../assets/no_image_available.jpeg")}
                />
              )}
            </Left>
            <Body style={{ flex: 2, alignItems: "flex-start" }}>
              <Label />
              <Label style={{ color: theme.accentTextColor }}>
                {" "}
                น้อง <Label> {pet.name} </Label>{" "}
              </Label>
              <Label style={{ color: theme.accentTextColor }}>
                {" "}
                อายุ <Label> {pet.age} </Label> เดือน{" "}
              </Label>
              <Label style={{ color: theme.accentTextColor }}>
                {" "}
                เจ้าของสัตว์เลี้ยง : <Label> {pet.ownerUserName} </Label>{" "}
              </Label>
              <Label />
            </Body>
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
