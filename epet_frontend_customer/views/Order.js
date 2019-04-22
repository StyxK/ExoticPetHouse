import { Container, Icon, Left, Body, Header, Title, Right, Content, Text, Card, CardItem, List, Button, Footer} from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import axios from "axios";
import { Actions } from "react-native-router-flux";

export default class Order extends Component {

    constructor(props) {
        super(props)
        this.state = {
          stores: [],
          address:{},
          cage:[],
          cageSelected:{},
          startChosenDate: new Date(),
          endChosenDate: new Date()
        }
    }

    setStateFromStore(){
        this.stores = this.props.stores;
        this.address = this.props.address;
        this.cageSelected = this.props.cage.find(item => item.id === this.props.cageSelected)
        this.startChosenDate = this.props.startChosenDate;
        this.endChosenDate = this.props.endChosenDate;
    }
    
    submitForm = () => {
        axios
          .post(API_URL + "/pet/", {
              
          })
          .then(response => {
            alert("success");
            console.log(JSON.stringify(response));
          })
          .catch(error => {
            alert("error" + error);
            console.log(error);
          });
    };

    render(){
        {this.setStateFromStore()}
        return(
            <View style={styles.container}>
                <Container>
                    <Header style={{backgroundColor:'#7A5032'}}>
                        <Left style={{flex:1}}>
                            <Icon name="ios-arrow-back" style={{color:'white',marginLeft:10}}/>
                        </Left>
                        <Body style={{flex:1}}>
                            <Title style={{color:'white',fontSize:20}}>รายการคำสั่งฝาก</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <Content>
                        <Card style={{flex: 0}}>
                                <CardItem header>
                                    <Text style={{fontSize:20}}> รหัส order  </Text>
                                </CardItem>
                                <CardItem >
                                    <Text> ที่อยู่ของผู้ฝาก </Text>
                                </CardItem>
                                <CardItem >
                                    <List>
                                        <Text>{this.stores.name}</Text>
                                        <Text>กรงที่เลือก : {this.cageSelected.name}{" "} 
                                        {this.cageSelected.type}{" "} 
                                        {this.cageSelected.price} บาท/คืน
                                        </Text>
                                    </List>
                                    
                                </CardItem>
                                <CardItem>
                                    <Text note>
                                                วันที่ฝาก: {this.startChosenDate.toString().substr(4, 12)}
                                                - {this.endChosenDate.toString().substr(4, 12)}
                                    </Text>
                                </CardItem>
                                <CardItem >
                                    <Text> ตัวเลือกการจัดส่ง  </Text>
                                </CardItem>
                                <CardItem >
                                    <List>
                                        <Text>วิธีการชำระเงิน</Text>
                                        <Text>ค่าบริการฝาก</Text>
                                        <Text>การจัดส่ง</Text>
                                        <Text>ยอดชำระเงินทั้งหมด</Text>
                                    </List>
                                </CardItem>
                        </Card>
                    </Content>
                    <Footer style={{backgroundColor:'#A37E63'}}>
                        <Button full style={{flex:2,marginTop:1,backgroundColor:'#7A5032'}} onPress={this.sendOrderToStore}>
                            <Text style={{color:'white'}}>ยืนยันคำสั่งฝาก</Text>
                        </Button>
                    </Footer>
                </Container>
            </View>
        );
    }
}

sendOrderToStore= () =>{
    alert("ส่งคำร้องเสร็จสิ้น");

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
})