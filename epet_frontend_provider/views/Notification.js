import React, { Component } from 'react'
import { Container, Text, Header, Left, Body, Right, Icon, Content, ListItem, Label, List, Card, CardItem, Accordion, Button, View } from 'native-base'
import { connect } from 'react-redux'
import NavFooter from '../components/NavFooter'
import theme from "../theme";
import moment from 'moment-timezone'
import axios from 'axios';
import { loading } from '../components/Loading'
import {Actions} from 'react-native-router-flux' 
import Config from 'react-native-config'
import io from 'socket.io-client'
const socket = io.connect(Config.SOCKET_URL)

class Notification extends Component {

    constructor(props) {
        super(props)
        this.state = {
            notificationList: [],
            loading:true
        }
    }

    componentDidMount() {
        this.getNotification()
    }

    componentWillUpdate() {
        socket.on('storeNotification', data => {
            this.getNotification()
        })
    }

    getNotification = async () => {
        const response = await axios.get(`/notification/store/${this.props.store.storeId}`)
        const data = response.data
        this.setState({ notificationList: data , loading: false})
    }

    renderOrderTimeLine = (order) => {
        let list = []
        this.state.notificationList.filter(data=>{
            return data.id == order.id
        }).map(data =>{
            list.push(
                <Label>{data.orderStatus}</Label>
            )
        })
        return list
    }

    renderList = () => {
        let list = []
        console.log(this.state.notificationList)
        this.state.notificationList.map(data => {
            const message = JSON.parse(data.message)
            list.push(
                <Card key={data.id} style={{borderRadius:7}}>
                    <CardItem button header style={{flex:1,backgroundColor:'#e6e1de',borderTopLeftRadius:7,borderTopRightRadius:7,flexDirection:'column'}} onPress={()=>Actions.orderDetail({item:message})}>
                        <Right style={{flex:1,flexDirection:'row'}}>
                            <Body style={{flex:4,alignItems:'flex-start'}}>
                                <Label style={{fontWeight:'bold',fontSize:15}}> ออร์เดอร์ของคุณ {message.customerUsername}</Label>
                                <Label style={{fontWeight:'bold',fontSize:15}}> อยู่ในสถานะ {message.orderStatus.status}</Label>
                            </Body>
                            <Right style={{flex:0.7}}>
                                <Icon name='ios-arrow-forward' />
                            </Right>
                        </Right>
                        <Left style={{marginTop:10}}>
                            <Left style={{flex:1}}/>
                            <Right style={{flex:10}}>
                                <Label style={{fontSize:13}}>เมื่อวันที่ {moment.unix(data.millisec).format("DD MMM YYYY hh:mm a")}</Label>
                            </Right>
                        </Left>
                    </CardItem>
                </Card>
            )
        })
        return list
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: theme.primaryColor }}>
                    <Left style={{ flex: 1 }} />
                    <Body style={{ flex: 3, alignItems: 'center' }}>
                        <Text style={{ color: "white" }}> การแจ้งเตือน </Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <Content padder>
                    {
                        this.state.loading ? 
                        <View style={{justifyContent:'center',alignItems:'center',marginTop:150}}>
                            {loading()}
                            <Label style={{color:theme.primaryColor}}> กรุณารอสักครู่ </Label>
                        </View>
                        :
                        (this.state.notificationList.length != 0 ? this.renderList() : 
                        <View style={{flex:1}}><Label style={{alignSelf:'center'}}> ยังไม่มีการแจ้งเตือนในขณะนี้ </Label></View>)
                    }
                </Content>
                <NavFooter />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state }
}

export default connect(mapStateToProps)(Notification)