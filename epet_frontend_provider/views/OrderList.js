
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
            modalVisible:false,
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible:visible })
    }

    getOrderDetails = (orderId) => {
        console.log(orderId)
        Axios.get(API_URL+'/orderline/order/'+orderId).then(
            (response) =>{
                console.log(response.data)
                this.setState({
                    orderLines : response.data
                })
            }
        )
    }

    showOrderDetail = (data)=>{
        this.getOrderDetails(data.id)
        this.setModalVisible(!this.state.modalVisible)
        this.setState({
            orderDetialDescription : [
                <View key={data.id}>
                    <View style={{margin:10}}>
                        <Text>
                            ผู้ฝาก : <Text note> {JSON.parse(JSON.stringify(data.customer.userName))} </Text>
                        </Text>
                        <Text>
                            ฝากวันที่ : <Text note> {data.startDate} </Text>
                        </Text>
                        <Text>
                            ถึงวันที่ : <Text note> {data.endDate} </Text>
                        </Text>
                        <Text>
                            การขนส่งสัตว์ : <Text note> {data.transportation} </Text>
                        </Text>
                    </View>
                </View>
            ],
        })
    }

    acceptOrder = ()=>{
        
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
        const { modalVisible , orders , orderLines , orderDetialDescription , totalPrice} = this.state

        let orderFlatList = orders.map((data)=>{
            return  <ListItem avatar key={data.id}>
                        <Left>
                            <Thumbnail small source={{uri:PIC_URI}}/>
                        </Left>
                        <Body style={{flex:2}}>
                            <Text style={{fontSize:15}}> ผู้ฝาก : <Text note> {JSON.parse(JSON.stringify(data.customer.userName))} </Text ></Text>
                            <Text style={{fontSize:15}}> การขนส่งสัตว์ : <Text note>{data.transportation} </Text></Text>
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
                        </Body>
                        <Right style={{flex:1}}>
                        </Right>
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
                    <Modal animationType="slide" visible={modalVisible} transparent={true}>
                        <View style={styles.modalContainer}>
                            <Container style={styles.modal}>
                                <Content>
                                    <Button full style={{borderTopLeftRadius:10,borderTopRightRadius:10,backgroundColor:'#7A5032'}} 
                                            onPress={()=>this.setModalVisible(!modalVisible)}>
                                        <Text>ปิดรายละเอียด</Text>
                                    </Button>
                                    {orderDetialDescription}
                                    <List>
                                        {orderLineFlatList}
                                    </List>
                                    <Text>
                                        ราคา
                                    </Text>
                                </Content>
                                <Footer style={{backgroundColor: 'rgba(52, 52, 52, 0)'}}>
                                    <FooterTab badge style={{backgroundColor: 'rgba(52, 52, 52, 0)'}}>
                                        <Button full style={{backgroundColor:'green',borderBottomLeftRadius:10}}>
                                            <Text style={{color:'white'}}> ตอบรับการรับฝาก </Text>
                                        </Button>
                                    </FooterTab>
                                    <FooterTab badge style={{backgroundColor: 'rgba(52, 52, 52, 0)'}}>
                                        <Button full style={{backgroundColor:'red',borderBottomRightRadius:10}}>
                                            <Text style={{color:'white'}}> ปฏิเสธการรับฝาก </Text>
                                        </Button>
                                    </FooterTab>
                                </Footer>
                            </Container>
                        </View>
                    </Modal>
                </Content>
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
