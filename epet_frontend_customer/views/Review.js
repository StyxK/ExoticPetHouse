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
const PIC_URI =
  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png";


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
                            <Thumbnail source={{ uri: PIC_URI }} />
                            <Text>{data.customerUserName}</Text>
                        </Left>
                        <Right>
                            <Text note>{moment(data.submitDate).tz("Asia/Bangkok").format("DD MMM YYYY")}</Text>
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
                            rating={data.score}
                            fullStarColor={"orange"}
                            starSize={20}
                        />
                    </CardItem>
                    <CardItem bordered>
                        <Text>{data.comment}</Text>
                    </CardItem>
                </List>
            );
        })
        return (
            <View style={styles.container}>
                <Container>
                    <Header style={{ backgroundColor: theme.primaryColor }}>
                        <Left style={{ flex: 1 }}>
                            <Button rounded transparent onPress={() => { Actions.pop() }}>
                                <Icon
                                    name="arrow-back"
                                    style={{ color: theme.primaryTextColor, fontSize:theme.arrowSize }}
                                />
                            </Button>
                        </Left>
                        <Body style={{ flex: 5, alignItems: "center" }}>
                            <Title style={{ color: theme.primaryTextColor, fontSize: 20 }}>
                                รีวิวการให้บริการ
                            </Title>
                        </Body>
                        <Right style={{flex:1}}/>
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