import React, { Component } from 'react';
import { Actions } from "react-native-router-flux";
import { View, StyleSheet } from 'react-native';
import {
    Body,
    Card,
    CardItem,
    Container,
    Content,
    Header,
    Icon,
    Left,
    List,
    Right,
    Text,
    Title,
    Thumbnail,
    Button
} from "native-base";
import theme from "../theme";
import StarRating from "react-native-star-rating";
import moment from "moment-timezone";
import axios from "axios";
import Config from "react-native-config";

const API_URL = Config.API_URL;
export default class EditReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback: {},
        };
    }

    editButton = () => {
            return (
                <Button
                    style={{
                        backgroundColor: theme.primaryColor3,
                        flex: 0.5,
                        marginHorizontal: 20,
                        borderRadius: 10
                    }}
                    onPress={() => {
                        Actions.feedback(this.props);
                    }}>
                    <Text>แก้ไข</Text>
                </Button>
            );
    }

    componentWillMount() {
        axios
            .get(API_URL + "/feedback/order/" + this.props.id)
            .then(response => {
                this.setState({
                    feedback: response.data,
                });
            })
            .then(error => console.log(error));
    }

    render() {
        const { feedback } = this.state;
        return (
            <View style={styles.container}>
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
                        <Body style={{ flex: 5, alignItems: "center" }}>
                            <Title style={{ color: theme.primaryTextColor, fontSize: 20 }}>
                                รีวิวการให้บริการ
                            </Title>
                        </Body>
                        <Right style={{ flex: 1 }} />
                    </Header>
                    <Content>
                        <Card>
                            <List>
                                <CardItem>
                                    <Left>
                                        <Thumbnail />
                                        <Text>{feedback.customerUserName}</Text>
                                    </Left>
                                    <Right>
                                        {this.state.feedback.wasEdit==false ? this.editButton():false}
                                        <Text note>{moment(feedback.submitDate).tz("Asia/Bangkok").format("DD MMM YYYY")}</Text>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <StarRating
                                        disabled={true}
                                        emptyStar={"ios-star-outline"}
                                        fullStar={"ios-star"}
                                        halfStar={"ios-star-half"}
                                        iconSet={"Ionicons"}
                                        maxStars={5}
                                        rating={feedback.score}
                                        fullStarColor={"orange"}
                                        starSize={20}
                                    />
                                </CardItem>
                                <CardItem bordered>
                                    <Text>{feedback.comment}</Text>
                                </CardItem>
                            </List>
                        </Card>
                    </Content>
                </Container>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    }
});