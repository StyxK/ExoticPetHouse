import React,{Component} from 'react'
import { Container, Content, Header, Text, Left, Body, Right, Icon, View, Button, ListItem } from 'native-base'
import {Actions} from 'react-native-router-flux'
import axios from 'axios'
import moment from 'moment-timezone'

export default class OrderDetail extends Component{

    constructor(props){
        super(props)
        this.state = {
            order: {}
        }
    }

    componentWillMount() {
        axios.get("/order/"+this.props.item.id).then(response => {
            this.setState({ order: response.data });
            console.log(response.data,'data from api')
        });
    }

    render(){
        const { order } = this.state
        const { orderLines = [] ,store={}} = order
        let startDate = moment(order.startDate)
            .tz("Asia/Bangkok")
            .format("DD MMM YYYY HH:mm");
        let endDate = moment(order.endDate)
            .tz("Asia/Bangkok")
            .format("DD MMM YYYY HH:mm");
        let submitDate = moment(order.submitDate)
            .tz("Asia/Bangkok")
            .format("DD MMM YYYY HH:mm");

        return(
            <Container>
                <Header style={{ backgroundColor: "#7A5032" }}>
                    <Left style={{ flex: 1 }} >
                        <Icon name="ios-arrow-back" style={{color:'white'}} onPress={()=>Actions.pop()}/>
                    </Left>
                    <Body style={{ flex: 3 , alignItems:'center' }}>
                        <Text style={{ color: "white" }}>รายการคำขอฝากสัตว์เลี้ยง</Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <Content>
                    <View key={order.id}>
                        <View style={{ margin: 10 }}>
                            <Text style={{ fontSize: 15 }}>
                            {" "}
                            เลขคำสั่งฝาก : <Text note> {order.id} </Text>
                            </Text>
                            <Text style={{ fontSize: 15 }}>
                            {" "}
                            {console.log(store.name,'store')}
                            ร้านที่ส่งฝาก : <Text note> {store.name} </Text>
                            </Text>
                            <Text style={{ fontSize: 15 }}>
                            {" "}
                            วันที่ส่งคำขอ : <Text note> {submitDate} </Text>
                            </Text>
                            <Text style={{ fontSize: 15 }}>
                            {" "}
                            ฝากวันที่ : <Text note> {startDate} </Text>
                            </Text>
                            <Text style={{ fontSize: 15 }}>
                            {" "}
                            ถึงวันที่ : <Text note> {endDate} </Text>
                            </Text>
                        </View>
                    </View>
                    <Content>
                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ fontSize: 15 }}>
                            {" "}
                            สัตว์เลี้ยงที่อยู่ในรายการฝาก
                            </Text>
                        </View>
                        {orderLines.map(orderLine => {
                            const { pet, cage } = orderLine;
                            return (
                            <ListItem key={pet.id} style={{ display: "flex", flexDirection: "column" }}>
                                <View>
                                    <Text style={{ fontSize: 15 }}>
                                        {" "}
                                        <Text>
                                        {" "}
                                        ชนิดกรง : <Text note> {cage.name} </Text>
                                        </Text>
                                        <Text>
                                        {" "}
                                        สัตว์เลี้ยง : <Text note> {pet.name} </Text>
                                        </Text>
                                    </Text>
                                </View>
                            </ListItem>
                            );
                        })}
                        </Content>
                        <View style={{ display: "flex", flexDirection: "row", margin: 15 }}>
                        <Left>
                            <Button style={{backgroundColor: "#7A5032",flex: 1,borderRadius: 10}}>
                            <Text>ชำระค่าบริการ</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button style={{backgroundColor: "#7A5032",flex: 1,borderRadius: 10 }}>
                                <Text>ยกเลิกคำสั่งฝาก</Text>
                            </Button>
                        </Right>
                    </View>
                </Content>
            </Container>
        )
    }

}