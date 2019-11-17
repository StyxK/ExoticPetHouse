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
    Button,
    Fab,
    Label
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
                    <Content padder>
                        <Card>
                            <List>
                                <CardItem>
                                    <Left>
                                        <Thumbnail />
                                        <Text>{feedback.customerUserName}</Text>
                                    </Left>
                                    <Right>
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
                        <Label style={{textAlign:'center',paddingVertical:15,marginTop:30,backgroundColor:theme.secondaryColor,fontSize:15,color:'white',borderRadius:10}}>
                            ท่านสามารถแก้ไขรีวิวของท่านได้เพียง 1 ครั้ง
                        </Label>
                    </Content>
                    {this.state.feedback.wasEdit==false ? 
                        <Fab
                            style={{
                                backgroundColor: theme.primaryColor3,
                                flex:3
                            }}
                            onPress={() => {
                                Actions.feedback(this.props);
                            }}>
                            <Icon name='edit' type='AntDesign'/>
                        </Fab>
                        :false}
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