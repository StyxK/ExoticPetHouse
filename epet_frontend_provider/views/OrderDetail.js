import React,{Component} from 'react'
import { Container, Content, Header, Text, Left, Body, Right, Icon, View, Button, ListItem, Card,Thumbnail } from 'native-base'
import {Actions} from 'react-native-router-flux'
import axios from 'axios'
import moment from 'moment-timezone'

export default class OrderDetail extends Component{

    constructor(props){
        super(props)
        this.state = {
            order: {},
            loading: true
        }
    }

    componentWillMount() {
        axios.get("/order/"+this.props.item.id).then(response => {
            this.setState({ order: response.data , loading:false});
        });
        console.log(this.props.item.orderStatus.id,'item')
    }

    renderButton(){
        let buttonList = []
        switch(this.props.item.orderStatus.id){
            case 1 : buttonList.push(
                <View style={{ display: "flex",flex:1}}>
                    <Button full style={{margin:10,backgroundColor: "green",borderRadius: 10,justifyContent:'center'}}
                        onPress={()=>this.acceptOrder()}
                    >
                        <Text>ยอมรับคำขอฝาก</Text>
                    </Button>
                    <Button full style={{margin:10,backgroundColor: "red",borderRadius: 10,justifyContent:'center'}}
                        onPress={()=>this.denyOrder()}
                    >
                        <Text>ปฏิเสธคำขอฝาก</Text>
                    </Button>
                </View>
            )
            case 9 : buttonList.push(
                <View style={{ display: "flex",flex:1}}>
                    <Button full style={{margin:10,backgroundColor: "green",borderRadius: 10,justifyContent:'center'}}
                        onPress={()=>this.acceptOrder()}
                    >
                        <Text>ส่งคืนสัตว์เลี้ยงให้เจ้าของ</Text>
                    </Button>
                </View>
            )
            default : null
        }
        return buttonList
    }

    acceptOrder = () => {
        axios.put('/order/storeAccept/'+this.props.item.id).then( () => Actions.pop('orderList') )
    }

    denyOrder = () => {
        axios.put('/order/denyByStore/'+this.props.item.id).then( () => Actions.pop('orderList') )
    }

    returnPets = () => {
        axios.put('/order/returnPets/'+this.props.item.id).then( () => Actions.pop('orderList') )
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
                        <ListItem itemDivider style={{ justifyContent:'center',backgroundColor:'#7A5032' }}>
                            <Text style={{ fontSize: 15,color:'white' }}>
                            สัตว์เลี้ยงที่อยู่ในรายการฝาก
                            </Text>
                        </ListItem>
                        {orderLines.map(orderLine => {
                            const { pet, cage } = orderLine;
                            return (
                            <Card key={pet.id} style={{ display: "flex", flexDirection: "row", alignItems:'center',marginLeft:10,marginRight:10,borderBottomLeftRadius:20,borderTopRightRadius:20 }}>
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
                                    <Button style={{borderTopEndRadius:20}}>
                                        <Icon name="search"/>
                                    </Button>
                                </Right>
                            </Card>
                            );
                        })}
                        </Content>
                </Content>
                <View style={{flex:0.5,flexDirection:'row'}}>
                    {this.renderButton()}  
                </View>                      
            </Container>
        )
    }

}