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
    Thumbnail
} from "native-base";
import theme from "../theme";
import StarRating from "react-native-star-rating";
import moment from "moment-timezone";

export default class Review extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let feedBackList = this.props.feedBack.map(data => {
            return (
                <List avatar key={data.id}  >
                    <CardItem>
                        <Left>
                            <Thumbnail />
                            <Text>{data.customerUserName}</Text>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <StarRating
                            disabled={true}
                            emptyStar={"ios-star-outline"}
                            fullStar={"ios-star"}
                            halfStar={"ios-star-half"}
                            iconSet={"Ionicons"}
                            maxStars={5}
                            rating={data.score}
                            fullStarColor={"orange"}
                            starSize={20}
                        />
                    </CardItem>
                    <CardItem bordered>
                        <Text>{data.comment}</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Text note>{moment(data.submitDate).tz("Asia/Bangkok").format("DD MMM YYYY")}</Text>
                        </Left>
                    </CardItem>
                </List>
            );
        })
        return (
            <View style={styles.container}>
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
                        <Body style={{ flex: 1, alignItems: "center" }}>
                            <Title style={{ color: theme.primaryTextColor, fontSize: 20 }}>
                                รีวิวการให้บริการ
              </Title>
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                        <Card>
                            {feedBackList}
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