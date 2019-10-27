import React, { Component } from "react";
import {
  CardItem,
  Icon,
  List,
  Text,
  Container,
  Header,
  Content,
  Title,
  Right,
  Left,
  Body,
  Item,
  Input,
  FooterTab,
  Footer,
  Button,
  ListItem,
  Card
} from "native-base";
import StarRating from "react-native-star-rating";
import { TextInput } from "react-native";
import Config from "react-native-config";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import theme from "../theme";

const API_URL = Config.API_URL;
export class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 0,
      reviewText: ""
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  submitForm = () => {
    if (!this.state.starCount) {
      alert("โปรดให้คะแนนผู้รับฝาก");
    } else {
      axios
        .post(API_URL + "/feedback/", {
          score: this.state.starCount,
          comment: this.state.reviewText,
          customerUserName: this.props.customerUsername,
          order: this.props.id,
          storeId: this.props.storeId,
          submitDate : new Date()
        })
        .then(response => {
          console.log(JSON.stringify(response));
        })
        .catch(error => {
          console.log(error);
        });
      axios
        .put(API_URL + "/order/updateWasFeedBack/" + this.props.id,{
          wasFeedBack: true
        })
        .catch(error => {
          console.log(error);
        });
      Actions.history();
    }
  };

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: theme.primaryColor }}>
          <Left style={{ flex: 1 }}>
            <Icon
              name="ios-arrow-back"
              onPress={() => {
                Actions.pop();
              }}
              style={{ color: theme.primaryTextColor, marginLeft: 10 }}
            />
          </Left>
          <Body>
            <Title style={{ color: theme.primaryTextColor, fontSize: 20 }}>
              ให้คะแนนผู้รับฝาก
            </Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Text>{this.props.store.name}</Text>
              </Left>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Text>รหัส order: {this.props.id}</Text>
              </Left>
            </CardItem>
            <CardItem bordered>
              <Left />
              <Body>
                <StarRating
                  disabled={false}
                  emptyStar={"ios-star-outline"}
                  fullStar={"ios-star"}
                  halfStar={"ios-star-half"}
                  iconSet={"Ionicons"}
                  maxStars={5}
                  rating={this.state.starCount}
                  selectedStar={rating => this.onStarRatingPress(rating)}
                  fullStarColor={"orange"}
                />
              </Body>
              <Right />
            </CardItem>
            <CardItem bordered style={{ backgroundColor: "#E8E8E8" }}>
              <TextInput
                multiline={true}
                numberOfLines={5}
                placeholder="เขียนรีวิวของคุณได้ที่นี่"
                onChangeText={text => this.setState({ reviewText: text })}
              />
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <FooterTab style={{ backgroundColor: theme.primaryColor }}>
            <Button full onPress={() => this.submitForm()}>
              <Text>ให้คะแนน</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Feedback;
