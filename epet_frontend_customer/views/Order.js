import { Container, Icon, Left, Body, Header, Title, Right, Content, Text, Card, CardItem, List, ListItem, Button, Footer, Radio} from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import axios from "axios";
import { connect } from "react-redux";
import { setPets } from "../actions";
import Config from 'react-native-config';

const API_URL = Config.API_URL;
class Order extends Component {

    constructor(props) {
        super(props)
        this.state = {
            stores: [],
            address:{},
            cage:[],
            orderLine:[],
            startChosenDate: new Date(),
            endChosenDate: new Date(),
            modalVisible: false,
            cageTemp: "cage",
            token : "Epet ",
            checked: false,
            totalPrice : 0
        }
    }

    setStoreDataToOrder(){
        this.stores = this.props.stores;
        this.address = this.props.address;
        this.startChosenDate = this.props.startChosenDate;
        this.endChosenDate = this.props.endChosenDate;
        this.token = this.props.token;
        this.state.cage = [...this.props.cage];
        this.orderLine = this.props.orderLine;
        let orderL = [];
        orderL = [...this.orderLine];
        this.state.orderLine = orderL;
    }
    
    showCageName = (cageId) =>{
        const cageArray = this.state.cage.find(item => item.id === cageId);
        return cageArray.name+" "+cageArray.price+"/คืน";
    }

    showPriceDuringDeposit = (cageId) =>{
        const cageArray = this.state.cage.find(item => item.id === cageId);
        const totalPrice = this.showTotalPrice(cageArray.price);
        this.state.totalPrice = totalPrice+this.state.totalPrice;   
        return totalPrice;
    }
    showTotalPrice(price){
        let totalPrice = 0;
        const duration = this.calculateDate();
        totalPrice = price*duration;
        return totalPrice;
    }
    calculateDate(){
        const diffTime = Math.abs(this.endChosenDate.getTime()-this.startChosenDate.getTime());
        return Math.ceil(diffTime/(1000*60*60*24));
    }

    showPetName = (petId) =>{
        const { pets = [], setPets } = this.props;
        const petArray = pets.find(item => item.id === petId);
        return petArray.name+"";
    }

    componentWillMount() {
        const { setPets } = this.props;
        axios
            .get("/pet")
            .then(response => {
                setPets(response.data);
            });
    }

    submitForm = () => {
        axios
            .post(API_URL + "/order/", {
                transportation:"kerry",
                submitDate: this.startChosenDate,
                startDate:this.startChosenDate,
                endDate:this.endChosenDate,
                orderLines:this.orderLine,
                customerUsername:"tanapat",
                store:this.stores.id,
                orderStatus:1
                
            },
            {headers:{Authorization: this.token}}
            )
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
        
        this.setStoreDataToOrder();
        let orderL = [];
        orderL = [...this.orderLine];
        this.state.orderLine = orderL;
        let orderList = this.state.orderLine.map((data)=>{
            return  <ListItem avatar key={data.cage}>
                      <Left>
                      <Icon name='paw' />
                      </Left>
                      <Body>
                        <Text>กรง:{this.showCageName(data.cage)}</Text>
                        <Text>สัตว์เลี้ยง: {this.showPetName(data.pet)}</Text>
                        <Text>ราคาตลอดการฝาก: {this.showPriceDuringDeposit(data.cage)}</Text>
                      </Body>
                      <Right>
                      </Right>
                    </ListItem>
        });

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
                                        <Text>รายการฝาก : 
                                        </Text>
                                    </List>
                                </CardItem>
                                {orderList}
                                <CardItem>
                                    <Text note>
                                                วันที่ฝาก: {this.startChosenDate.toString().substr(4, 12)}
                                                - {this.endChosenDate.toString().substr(4, 12)}
                                    </Text>
                                </CardItem>
                                <CardItem>
                                    <Text note>
                                                ยอดชำระรวม: {this.state.totalPrice/2}
                                    </Text>
                                </CardItem>
                        </Card>
                    </Content>
                    <Footer style={{backgroundColors:'#A37E63'}}>
                        <Button full style={{flex:2,marginTop:1,backgroundColor:'#7A5032'}} onPress={this.sendOrderToStore}>
                            <Text style={{color:'white'}}>ส่งคำร้องเสร็จสิ้น</Text>
                        </Button>
                    </Footer>
                </Container>
            </View>
        )
    }

    sendOrderToStore = () =>{
        alert("ส่งคำร้องเสร็จสิ้น");
        this.submitForm();
    }
}



const mapStateToProps = state => {
    return { pets: state.pets };
  };
  
const mapDispatchToProps = dispatch => {
    return {
      setPets: pets => dispatch(setPets(pets)),
    };
  };
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Order);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
})