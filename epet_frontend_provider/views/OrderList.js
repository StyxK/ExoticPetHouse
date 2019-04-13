
import React, { Component } from 'react';
import {Container, Header, Body, Text, Left, Right, Content, ListItem, List, Icon, Button, Footer, FooterTab} from 'native-base'
import { StyleSheet, View , Modal} from 'react-native';
import { connect } from 'react-redux'
import Axios from 'axios'
import Config from 'react-native-config'

const API_URL = Config.API_URL;

class OrderList extends Component {

    constructor(props){
        super(props)
        this.state = {
            orders:[],
            orderLines:[],
            modalVisible:false,
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible:visible })
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
        const { modalVisible , orders} = this.state

        let orderFlatList = orders.map((data)=>{
            return  <ListItem avatar key={data.id}>
                        <Left>
                            <Icon name='person' onPress={
                                ()=>{
                                    alert(this.props.name)
                                }
                            }/>
                        </Left>
                        <Body style={{flex:2}}>
                            <Text style={{fontSize:15}}> รหัสการสั่ง : <Text note>{data.id}</Text></Text>
                            <Text style={{fontSize:15}}> ผู้ฝาก : <Text note>{this.props.name} </Text ></Text>
                            <Text style={{fontSize:15}}> การขนส่งสัตว์ : <Text note>{data.transportation} </Text></Text>
                        </Body>
                        <Right style={{flex:1 , justifyContent:'center' , alignItems :'center'}}>
                            <Button style={{borderBottomEndRadius:20,height:30}} onPress={()=>this.setModalVisible(!modalVisible)}>
                                <Text style={{fontSize:10}}> ดูรายละเอียด </Text>
                            </Button>
                        </Right>
                    </ListItem>
        })


        return (
            <Container>
                <Header style={{backgroundColor:'#7A5032'}}>
                    <Left style={{flex:1}}>
                        <Icon name='person' onPress={()=>{this.props.logout()}}/>
                    </Left>
                    <Body style={{flex:2.5}}>
                        <Text style={{color:'white'}}>
                            รายการคำขอฝากสัตว์เลี้ยง
                        </Text>
                    </Body>
                    <Right style={{flex:1}}>
                        <Icon name='person' onPress={()=>{this.props.login()}}/>
                    </Right>
                </Header>
                <Content>
                    <List>
                        {orderFlatList}
                    </List>
                    <Modal animationType="slide" visible={modalVisible} transparent={true}>
                        <View style={styles.modalContainer}>
                            <Container style={styles.modal}>
                                <Content>
                                    <Button full style={{borderTopLeftRadius:10,borderTopRightRadius:10}} 
                                            onPress={()=>this.setModalVisible(!modalVisible)}>
                                        <Text>ปิดรายละเอียด</Text>
                                    </Button>
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
        marginTop: 40
      }
})
