import React,{Component} from 'react'
import { Container, Content, Header, Text, Left, Body, Right, Icon, View, Button, ListItem, Card,Thumbnail,Label, Title } from 'native-base'
import {Actions} from 'react-native-router-flux'
import axios from 'axios'
import moment from 'moment-timezone'
import OrderButton from '../components/OrderButton'
import { loading } from '../components/Loading'
import theme from "../theme";

export default class OrderDetail extends Component{

    constructor(props){
        super(props)
        this.state = {
            order: {},
            statusId: undefined,
            status:undefined,
            loading: true
        }
    }

    componentWillMount() {
        axios.get("/order/"+this.props.item.id).then(response => {
            this.setState({ order: response.data , loading:false ,statusId:response.data.orderStatus.id,status:response.data.orderStatus.status});
        });
        console.log(this.props.item,'item')
    }
    
    render(){
        const { order,status } = this.state
        const { orderLines = [] ,store={}} = order
        let startDate = moment(order.startDate)
            .tz("Asia/Bangkok")
            .format("DD MMM YYYY");
        let endDate = moment(order.endDate)
            .tz("Asia/Bangkok")
            .format("DD MMM YYYY");
        let submitDate = moment(order.submitDate)
            .tz("Asia/Bangkok")
            .format("DD MMM YYYY HH:mm");

        return(
            <Container>
                <Container style={{ height: "25%", flex: 0.47 }}>
                    <Header style={{ backgroundColor: theme.primaryColor }}>
                        <Left style={{ flex: 1.5 }} >
                            <Button rounded transparent onPress={()=>Actions.orderList()}>
                                <Icon name="arrow-back" style={{color:'white'}}/>
                            </Button>
                        </Left>
                        <Body style={{ flex: 4 , alignItems:'center' }}>
                            <Title style={{ color: "white",fontSize:20 }}>รายละเอียดการจอง</Title>
                        </Body>
                        <Right style={{ flex: 1.5 }}>
                            <Button
                                transparent
                                rounded
                                onPress={() =>
                                    Actions.chatbox({
                                        customer: this.props.item.customerUsername
                                    })
                                }
                            >
                                <Icon name="ios-chatbubbles" />
                            </Button>
                        </Right>
                    </Header>
                    <View padder style={{
                        backgroundColor: theme.primaryColor,
                        borderBottomLeftRadius: 25,
                        borderBottomRightRadius: 25
                        }}
                    >
                        <Text style={{ fontSize: 15, color: theme.infoTextColor }}>
                            ร้านที่ส่งฝาก : <Text note style={{ color: theme.accentTextColor }}> {store.name} </Text>
                        </Text>
                        <Text style={{ fontSize: 15, color: theme.infoTextColor }}>
                            วันที่ส่งคำขอ : <Text note style={{ color: theme.accentTextColor }}> {submitDate} </Text>
                        </Text>
                        <Text style={{ fontSize: 15, color: theme.infoTextColor }}>
                            ช่วงเวลาฝาก :{" "}
                            <Text note style={{ color: theme.accentTextColor }}>
                                {" "}
                                {startDate} - {endDate}{" "}
                            </Text>
                        </Text>
                        <Text style={{ fontSize: 15, color: theme.infoTextColor }}>
                            สถานะ :{" "}
                            <Text note style={{ color: theme.accentTextColor }}>
                                {" "}
                                {status}{" "}
                            </Text>
                        </Text>
                        <Text
                            style={{
                                marginTop: 10,
                                fontSize: 10,
                                alignSelf: "center",
                                color: theme.infoTextColor
                            }}
                            >
                            รหัสการฝาก :{" "}
                            <Text note style={{ color: theme.accentTextColor, fontSize: 10 }}>
                                {" "}
                                {order.id}{" "}
                            </Text>
                        </Text>
                    </View>
                </Container>
                <Content style={{ backgroundColor: theme.primaryColor }}>
                    <Content padder style={{ backgroundColor: "white" }}>
                        {orderLines.map(orderLine => {
                            const { pet, cage } = orderLine;
                            return (
                                <Card
                                    transparent
                                    key={pet.id}
                                    style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center"
                                    }}
                                >
                                    <Left style={{ display: "flex", flexDirection: "row" }}>
                                    <Left style={{ flex: 1.5 }}>
                                        <Thumbnail source={{ uri: pet.image }} />
                                    </Left>
                                    <Left style={{ flex: 3 }}>
                                        <View style={{ flex: 1, flexDirection: "row" }}>
                                        <Left style={{ flex: 0.5 }}>
                                            <Text
                                            style={{
                                                fontSize: 15,
                                                backgroundColor: theme.primaryColor,
                                                padding: 3,
                                                borderRadius: 10,
                                                color: theme.infoTextColor
                                            }}
                                            >
                                            สัตว์เลี้ยง
                                            </Text>
                                        </Left>
                                        <Left style={{ flex: 0.5 }}>
                                            <Text> {pet.name} </Text>
                                        </Left>
                                        </View>
                                    </Left>
                                    </Left>
                                </Card>
                            )
                        })}
                </Content>
                <Content
                    padder
                    style={{
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                    backgroundColor: theme.secondaryColor
                    }}
                >
                    <Text style={{ color: "white", textAlign: "center" }}>
                        ค่าบริการทั้งหมด : {order.totalPrice} บาท
                    </Text>
                </Content>
                    <View
                        style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: 15,
                        justifyContent: "center"
                        }}
                    >
                        <OrderButton item={order} orderStatus={this.state.statusId} />
                    </View>
                </Content>
            </Container>
        )
    }

}