
import React, { Component } from 'react';
import {Container, Header, Body, Text, Left, Right, Content, ListItem, List, Icon, Button, Footer, FooterTab, Thumbnail} from 'native-base'
import { StyleSheet, View , Modal} from 'react-native';
import { connect } from 'react-redux'
import Axios from 'axios'
import Config from 'react-native-config'

const API_URL = Config.API_URL;
const PIC_URI = 'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/55939405_2308833056062946_4136779926751674368_n.jpg?_nc_cat=106&_nc_eui2=AeH5b-9CK5S_6JAA_ash6iAXc2SpheOGBTewp6Rq83gs-NrgCAcd_W0AWkRxIrEnTV4IuAkjk3Tp5E86LuNct1-OcaeNqoI04ZainbaFnbF8hA&_nc_ht=scontent.fbkk22-2.fna&oh=f0c597ef26cac129d249308ce2017371&oe=5D468406'

class OrderList extends Component {

    constructor(props){
        super(props)
        this.state = {
            orders:[],
            orderLines:[],
            orderDetialDescription:[],
            orderStatusBar:[],
            modalVisible:false,
            selectedOrderId:''
        }
    }

    setModalVisible = (visible) => {
        this.setState({ 
            modalVisible:visible,
            orderLines:[],
            orderDetialDescription:[],
            orderStatusBar:[]
        })
    }

    getOrderDetails = (orderId) => {
        Axios.get(API_URL+'/order/'+orderId).then(
            (response) =>{
                data = response.data
                const approveButton = [
                    <FooterTab key={'approve'} badge style={{backgroundColor: 'rgba(52, 52, 52, 0)'}}>
                        <Button full style={{backgroundColor:'green'}} onPress={()=>this.updateStatus(2)}>
                            <Text style={{color:'white'}}> ตอบรับการรับฝาก </Text>
                        </Button>
                    </FooterTab>
                ]
                const cancelButton = [
                    <FooterTab key={'cancel'} badge style={{backgroundColor: 'rgba(52, 52, 52, 0)'}}>
                        <Button full style={{backgroundColor:'red'}} onPress={()=>this.updateStatus(3)}>
                            <Text style={{color:'white'}}> ปฏิเสธการรับฝาก </Text>
                        </Button>
                    </FooterTab>
                ]
                let startDate = new Date(data.startDate).toUTCString().substring(0,17)
                let endDate = new Date(data.endDate).toUTCString().substring(0,17)
                let orderStatus = JSON.parse(JSON.stringify(data.orderStatus.status))
                this.setState({
                    selectedOrderId : data.id,
                    orderLines : data.orderLines,
                    orderDetialDescription : [
                        <View key={data.id}>
                            <View style={{margin:10}}>
                                <Text>
                                    ผู้ฝาก : <Text note> {data.customerUsername} </Text>
                                </Text>
                                <Text>
                                    ฝากวันที่ : <Text note> {startDate} </Text>
                                </Text>
                                <Text>
                                    ถึงวันที่ : <Text note> {endDate} </Text>
                                </Text>
                                <Text>
                                    การขนส่งสัตว์ : <Text note> {data.transportation} </Text>
                                </Text>
                                <Text>
                                    ระยะเวลาฝาก : <Text note> {data.duration} </Text> วัน
                                </Text>
                                <Text>
                                    ค่าบริการทั้งหมด : <Text note> {data.totalPrice} </Text> บาท
                                </Text>
                            </View>
                        </View>
                    ],
                })
                switch(orderStatus){
                    case 'ร้านยืนยันการรับฝากแล้ว' :
                        this.setState(
                            {
                                orderStatusBar : [
                                    <View key={data.id}>
                                        <Footer style={{height:30,backgroundColor:'rgb(175, 175, 175)',color:'white'}}>
                                            <Text style={{color:'white',marginTop:2}}> {orderStatus} </Text>
                                        </Footer>
                                        <Footer style={{backgroundColor: 'rgba(52, 52, 52, 0)'}}>
                                            {cancelButton}
                                        </Footer>
                                    </View>
                                ]
                            }
                        )
                    break 
                    case 'รอร้านตอบรับ' : 
                        this.setState(
                            {
                                orderStatusBar : [
                                    <View key={data.id}>
                                        <Footer style={{height:30,backgroundColor:'rgb(175, 175, 175)',color:'white'}}>
                                                <Text style={{color:'white',marginTop:2}}> {orderStatus} </Text>
                                        </Footer>
                                        <Footer style={{backgroundColor: 'rgba(52, 52, 52, 0)'}}>
                                            {approveButton}
                                            {cancelButton}
                                        </Footer>
                                    </View>
                                ]
                            }
                        )
                    break
                    default :
                        this.setState(
                            {
                                orderStatusBar : [
                                    <View key={data.id}>
                                        <Footer style={{height:30,backgroundColor:'rgb(175, 175, 175)',color:'white'}}>
                                                <Text style={{color:'white',marginTop:2}}> {orderStatus} </Text>
                                        </Footer>
                                    </View>
                                ]
                            }
                        )
                }
            }
        )
    }

    showOrderDetail = (data)=>{
        this.getOrderDetails(data.id)
        this.setModalVisible(!this.state.modalVisible)
    }

    updateStatus = (status)=>{
        let orderID = this.state.selectedOrderId
        Axios.put(API_URL+'/order/'+orderID,{
            orderStatus:{
                id: status
            }
        })
        .then(
            this.setState({
                modalVisible: false
            })
        )
    }

    componentWillMount(){
        Axios.get(API_URL+'/order').then(
            (response)=>{
                this.setState({
                    orders : response.data
                })
            }
        )
    }

    render() {
        const { modalVisible , orders , orderLines , orderDetialDescription , orderStatusBar} = this.state

        let orderFlatList = orders.map((data)=>{
            let status = JSON.parse(JSON.stringify(data.orderStatus.status))
            let statusLabel = []
            switch(status){
                case 'ร้านยืนยันการรับฝากแล้ว':  
                    statusLabel  = <Text note key={'approve'} style={{color:'green'}}> {status} </Text>
                break
                case 'ร้านปฏิเสธการรับฝากแล้ว':  
                    statusLabel  = <Text note key={'cancel'} style={{color:'red'}}> {status} </Text>
                break
                case 'รอร้านตอบรับ':  
                    statusLabel  = <Text note key={'waiting'} style={{color:'#7A5032'}}> {status} </Text>
                break
            }
            return  <ListItem avatar key={data.id}>
                        <Left>
                            <Thumbnail small source={{uri:PIC_URI}}/>
                        </Left>
                        <Body style={{flex:2}}>
                            <Text style={{fontSize:15}}> ผู้ฝาก : <Text note> {data.customerUsername} </Text ></Text>
                            <Text style={{fontSize:15}}> การขนส่งสัตว์ : <Text note>{data.transportation} </Text></Text>
                            <Text style={{fontSize:15}}> สถานะการฝาก : </Text>
                            {statusLabel}
                        </Body>
                        <Right style={{flex:1 , justifyContent:'center' , alignItems :'center'}}>
                            <Button style={{height:30,backgroundColor:'#7A5032'}} 
                                onPress={()=> this.showOrderDetail(data)}>
                                <Text style={{fontSize:10}}> รายละเอียด </Text>
                            </Button>
                        </Right>
                    </ListItem>
        })

        let orderLineFlatList = orderLines.map((data)=>{
            cage = JSON.parse(JSON.stringify(data.cage))
            petDetail = JSON.parse(JSON.stringify(data.pet))
            return  <ListItem key={data.id}>
                        <Left style={{flex:0.75}}>
                            <Thumbnail small source={{uri:PIC_URI}}/>
                        </Left>
                        <Body style={{flex:3}}>
                            <Text style={{fontSize:10}}> ชื่อสัตว์เลี้ยง <Text note> {petDetail.name} </Text></Text>
                            <Text style={{fontSize:10}}> ประเภท <Text note> {petDetail.typeOfPet} </Text></Text>
                            <Text style={{fontSize:10}}> กรง : <Text note> {cage.name} </Text></Text>
                            <Text style={{fontSize:10}}> ค่าบริการกรง / วัน : <Text note> {cage.price} </Text> บาท </Text>
                        </Body>
                   </ListItem>
        })


        return (
            <Container>
                <Header style={{backgroundColor:'#7A5032'}}>
                    <Left style={{flex:1}}/>
                    <Body style={{flex:2.5}}>
                        <Text style={{color:'white'}}>
                            รายการคำขอฝากสัตว์เลี้ยง
                        </Text>
                    </Body>
                    <Right style={{flex:1}}/>
                </Header>
                <Content>
                    <List>
                        {orderFlatList}
                    </List>
                </Content>
                <Modal animationType="slide" visible={modalVisible} transparent={true}>
                        <View style={styles.modalContainer}>
                            <Container style={styles.modal}>
                                <Header translucent style={{borderTopLeftRadius:10,borderTopRightRadius:10,backgroundColor:'#7A5032'}}>
                                    <Button transparent style={{width:'100%',height:'100%',backgroundColor:'#7A5032'}}
                                        onPress={()=>this.setModalVisible(!modalVisible) }>
                                        <Text>ปิดรายละเอียด</Text>
                                    </Button>
                                </Header>
                                <Content>
                                    {orderDetialDescription}
                                    <List>
                                        {orderLineFlatList}
                                    </List>
                                </Content>
                                {orderStatusBar}
                            </Container>
                        </View>
                    </Modal>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        login : ()=> dispatch({ 'type':'LOGIN' , 'payload' : 'developer'}),
        logout : ()=> dispatch({ 'type':'LOGOUT' , 'payload' : 'annonymous'})
    }
}

const mapStateToProps = (state)=>{
    return state
}
export default connect (mapStateToProps,mapDispatchToProps)(OrderList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    modalContainer: {
        flex: 1,
        flexDirection: 'column-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        height: 500,
        backgroundColor:'rgba(52, 52, 52, 0.8)'
      },
      modal: {
        borderRadius: 10,
        marginBottom: 65,
        backgroundColor: 'white',
        opacity: 0.99,
        width: '85%',
        marginTop: 40,
      }
})
