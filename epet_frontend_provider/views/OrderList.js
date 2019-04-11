
import React, { Component } from 'react';
import {Container, Header, Body, Text, Left, Right, Content, ListItem, List, Icon, Button, Footer, FooterTab} from 'native-base'
import { StyleSheet, View , Modal} from 'react-native';

const order = [
    {
        id:'od0001',
        transportation:'self',
        submitDate:new Date('2019-11-12'),
        startDate:new Date('2019-11-12'),
        endDate:new Date('2019-11-12'),
        customerUserName:'bankbaw',
    },
    {
        id:'od0002',
        transportation:'self',
        submitDate:new Date('2019-11-12'),
        startDate:new Date('2019-11-12'),
        endDate:new Date('2019-11-12'),
        customerUserName:'Wissanupong'
    },
    {
        id:'od0003',
        transportation:'kerry',
        submitDate:new Date('2019-11-12'),
        startDate:new Date('2019-11-12'),
        endDate:new Date('2019-11-12'),
        customerUserName:'Vuttichai'
    },
    {
        id:'od0004',
        transportation:'kerry',
        submitDate:new Date('2019-11-12'),
        startDate:new Date('2019-11-12'),
        endDate:new Date('2019-11-12'),
        customerUserName:'Kittiphun'
    },
    {
        id:'od0005',
        transportation:'kerry',
        submitDate:new Date('2019-11-12'),
        startDate:new Date('2019-11-12'),
        endDate:new Date('2019-11-12'),
        customerUserName:'Nhathakit'
    },
    {
        id:'od0006',
        transportation:'self',
        submitDate:new Date('2019-11-12'),
        startDate:new Date('2019-11-12'),
        endDate:new Date('2019-11-12'),
        customerUserName:'Kantarat'
    },
    {
        id:'od0007',
        transportation:'self',
        submitDate:new Date('2019-11-12'),
        startDate:new Date('2019-11-12'),
        endDate:new Date('2019-11-12'),
        customerUserName:'Keerati'
    },
    {
        id:'od0008',
        transportation:'kerry',
        submitDate:new Date('2019-11-12'),
        startDate:new Date('2019-11-12'),
        endDate:new Date('2019-11-12'),
        customerUserName:'Suparurk'
    },
    {
        id:'od0009',
        transportation:'kerry',
        submitDate:new Date('2019-11-12'),
        startDate:new Date('2019-11-12'),
        endDate:new Date('2019-11-12'),
        customerUserName:'FlookLSD'
    },
    {
        id:'od0010',
        transportation:'kerry',
        submitDate:new Date('2019-11-12'),
        startDate:new Date('2019-11-12'),
        endDate:new Date('2019-11-12'),
        customerUserName:'Supakorn'
    },
]


export default class OrderList extends Component {

    constructor(props){
        super(props)
        this.state = {
            orders:order,
            orderLines:[],
            modalVisible:false
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible:visible })
    }

    componentWillMount(){

    }

    render() {
        const { modalVisible , orders} = this.state
        let orderFlatList = orders.map((data)=>{
            return  <ListItem avatar key={data.id}>
                        <Left>
                            <Icon name='person'/>
                        </Left>
                        <Body style={{flex:2}}>
                            <Text style={{fontSize:15}}> ผู้ฝาก : <Text note>{data.customerUserName} </Text ></Text>
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
