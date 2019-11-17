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
  Card,
  Label
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
      reviewText: "",
      feedbackId: ""
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  componentWillMount() {
    if (this.props.wasFeedBack == true) {
      axios
        .get(API_URL + "/feedback/order/" + this.props.id)
        .then(response => {
          this.setState({
            starCount: response.data.score,
            reviewText: response.data.comment,
            feedbackId: response.data.id
          });
        })
        .then(error => console.log(error));
    }
  }

  submitForm = () => {
    if (this.props.wasFeedBack == true) {
      axios
        .put(API_URL + "/feedback/" + this.state.feedbackId, {
          score: this.state.starCount,
          comment: this.state.reviewText,
          submitDate: new Date(),
          wasEdit: true
        })
        .catch(error => {
          console.log(error);
        })
      Actions.history();
    } else if (!this.state.starCount) {
      alert("โปรดให้คะแนนผู้รับฝาก");
    }
    else {
      axios
        .post(API_URL + "/feedback/", {
          score: this.state.starCount,
          comment: this.state.reviewText,
          customerUserName: this.props.customerUsername,
          orderId: this.props.id,
          storeId: this.props.storeId,
          submitDate: new Date(),
          wasEdit: false
        })
        .then(response => {
          console.log(JSON.stringify(response));
        })
        .catch(error => {
          console.log(error);
        });
      axios
        .put(API_URL + "/order/updateWasFeedBack/" + this.props.id, {
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
            <Button rounded transparent onPress={() => { Actions.pop() }}>
              <Icon
                name="arrow-back"
                style={{ color: theme.primaryTextColor, fontSize: theme.arrowSize }}
              />
            </Button>
          </Left>
          <Body style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Label style={{ color: theme.primaryTextColor, fontSize: 20, textAlign: 'center' }}>
              ให้คะแนนร้าน
            </Label>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content>
          <Content padder style={{ backgroundColor: theme.primaryColor, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
            <Body>
              <Text style={{ color: theme.accentTextColor, marginBottom: 10 }}>{this.props.store.name}</Text>
              <Text style={{ color: theme.primaryTextColor, marginBottom: 10 }}>ขอบคุณที่ใช้บริการ </Text>
              <StarRating
                disabled={false}
                emptyStar={"ios-star-outline"}
                fullStar={"ios-star"}
                halfStar={"ios-star-half"}
                iconSet={"Ionicons"}
                maxStars={5}
                starStyle={{ borderColor: 'orange' }}
                rating={this.state.starCount}
                selectedStar={rating => this.onStarRatingPress(rating)}
                fullStarColor={"orange"}
              />
              <Text style={{ color: theme.infoTextColor, fontSize: 10, marginTop: 10 }}>รหัสการจอง: {this.props.id}</Text>
            </Body>
          </Content>
          <Card transparent>
            <CardItem bordered style={{ backgroundColor: "#E8E8E8" }}>
              <TextInput
                defaultValue={(this.props.wasFeedBack == true) ? (this.state.reviewText) : ""}
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
              <Label style={{ color: theme.primaryTextColor }}>ให้คะแนน</Label>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Feedback;
