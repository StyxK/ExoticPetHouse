import React,{Component} from 'react'
import { Container, Content, Header, Text, Left, Body, Right, Icon, View, Button, ListItem, Card,Thumbnail } from 'native-base'
import {Actions} from 'react-native-router-flux'
import axios from 'axios'
import moment from 'moment-timezone'
import OrderButton from '../components/OrderButton'
import theme from "../theme";

export default class OrderDetail extends Component{

    constructor(props){
        super(props)
        this.state = {
            order: {},
            statusId: undefined,
            loading: true
        }
    }

    componentWillMount() {
        axios.get("/order/"+this.props.item.id).then(response => {
            this.setState({ order: response.data , loading:false ,statusId:response.data.orderStatus.id});
        });
        console.log(this.props.item.orderStatus.id,'item')
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
                <Header style={{ backgroundColor: theme.primaryColor }}>
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
                        <ListItem itemDivider style={{ justifyContent:'center',backgroundColor:theme.primaryColor }}>
                            <Text style={{ fontSize: 15,color:'white' }}>
                            สัตว์เลี้ยงที่อยู่ในรายการฝาก
                            </Text>
                        </ListItem>
                        {orderLines.map(orderLine => {
                            const { pet, cage } = orderLine;
                            return (
                            <Card key={pet.id} style={{ display: "flex", flexDirection: "row", alignItems:'center',margin:10,marginLeft:10,marginRight:10,borderRadius:10 }}>
                                <Left style={{flex:1,alignItems:'center'}}>
                                    {pet.image ?
                                        <Thumbnail style={{ width: 40, height: 40 }} source={{ uri: pet.image }} />
                                        :
                                        <Thumbnail style={{ width: 40, height: 40 }} source={require('../assets/no_image_available.jpeg')} />
                                    }
                                </Left>
                                <Body style={{flex:2}}>
                                    <Text style={{ fontSize: 15 }}>
                                        ชนิดกรง : <Text note> {cage.name} </Text>
                                    </Text>
                                    <Text>
                                        สัตว์เลี้ยง : <Text note> {pet.name} </Text>
                                    </Text>
                                </Body>
                                <Right>
                                    <Button style={{borderTopRightRadius:10,borderBottomRightRadius:10}}>
                                        <Icon name="search"/>
                                    </Button>
                                </Right>
                            </Card>
                            );
                        })}
                        </Content>
                </Content>
                <View style={{flex:0.5,flexDirection:'row'}}>
                    <OrderButton item={order} orderStatus={this.state.statusId}/>  
                </View>                      
            </Container>
        )
    }

}