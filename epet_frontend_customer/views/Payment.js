import React,{ Component } from 'react'
import Omise from 'omise-react-native'
import { View } from 'react-native';
import { ListItem, CheckBox, Body, Text, List, Right, Left, Container, Input, Form, Item, Label, DatePicker, FooterTab, Footer, Button, Picker } from 'native-base';

Omise.config('pkey_test_5h6bc0k9vn43x8y9mld', '2015-11-17');

export default class Payment extends Component {

    constructor(props){
        super(props)
        this.state = {
            number:undefined,
            name:undefined,
            expiration_month:undefined,
            expiration_year:undefined,
            cvv:undefined
        }
    }

    monthList = () => {
        let list = [<Picker.Item key='0' label='เดือน' />]
        for(let i=1;i<=12;i++){
            list.push(
                <Picker.Item key={i} label={i+''} value={i+''}/>
            )                           
        }
        return list
    }

    yearList = () => {
        const current = new Date().getFullYear()
        console.log(current)
        let list = [<Picker.Item key='0' label='ปี' />]
        for(let i=current;i<=current+10;i++){
            list.push(
                <Picker.Item key={i} label={i+''} value={i+''}/>
            )                           
        }
        return list
    }
    
    render(){
        return (
            <Container>
                <ListItem itemDivider>
                    <Text>ชำระค่าบริการผ่านบัตรเครดิต</Text>
                </ListItem>
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{flex:1,backgroundColor:'blue',flexDirection:'row'}}>
                        <Left style={{flex:0.5}}>
                            <CheckBox/>
                        </Left>
                        <Body style={{flex:3}}>
                            <Text> Visa </Text>
                        </Body>
                    </View>
                    <View style={{flex:1,backgroundColor:'orange',flexDirection:'row'}}>
                        <Left style={{flex:0.5}}>
                            <CheckBox/>
                        </Left>
                        <Body style={{flex:3}}>
                            <Text> Mastercard </Text>
                        </Body>
                    </View>
                </View>
                <Form style={{flex:10}}>
                    <Item stackedLabel>
                        <Label>หมายเลขบัตรเครดิต</Label>
                        <Input onChangeText={(e)=>{
                            this.setState({
                                number:e
                            })
                        }}/>
                    </Item>
                    <Item stackedLabel>
                        <Label>ชื่อบนบัตรเครดิต</Label>
                        <Input onChangeText={(e)=>{
                            this.setState({
                                name:e
                            })
                        }}/>
                    </Item>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:1}}>
                            <Item stackedLabel>
                                <Label>วันหมดอายุของบัตร</Label>
                                <View style={{flexDirection:'row'}}>
                                    <Picker note mode="dropdown"
                                        selectedValue={this.state.expiration_month}
                                        onValueChange={ (value) => this.setState({ expiration_month : value }) }
                                    >
                                        { this.monthList() }
                                    </Picker>
                                    <Picker note mode="dropdown"
                                        selectedValue={this.state.expiration_year}
                                        onValueChange={ (value) => this.setState({ expiration_year : value }) }
                                    >
                                        { this.yearList() }
                                    </Picker>
                                </View>
                            </Item>
                        </View>
                        <View style={{flex:0.7}}>
                            <Item stackedLabel style={{minHeight:76.25}}>
                                <Label>CVV</Label>
                                <Input onChangeText={(e)=>{
                                    this.setState({
                                        cvv:e
                                    })
                                }}/>
                            </Item>
                        </View>
                    </View>
                    <Body style={{justifyContent:'center',alignItems:'center'}}>
                        <Text>secure payment by Omise</Text>
                    </Body>
                    <View style={{flexDirection:"row",height:50,backgroundColor:'green',justifyContent:'center'}}>
                        <Left style={{justifyContent:'center'}}>
                            <Text style={{color:'white'}}> ค่าบริการทั้งหมด </Text>
                        </Left>
                        <Right style={{justifyContent:'center'}}>
                            <Text style={{color:'white'}}> 300 บาท </Text>
                        </Right>
                    </View>
                </Form>
                <Footer>
                    <FooterTab>
                        <Button onPress={()=>{ this.pay() }}>
                            <Text style={{color:'white',fontSize:15}}> ชำระค่าบริการ </Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }

    pay = () => {
        console.log(this.state,'ข้อมูลบัตร')
        Omise.createToken({
            'card' : 
                this.state
                // 'name' : name,
                // 'number': number,
                // 'expiration_month': exp_month,
                // 'expiration_year': exp_year,
                // 'security_code': cvv
        }).then(data => {
            console.log(data.id,"data")
            alert('token ของบัตรคุณคือ : '+data.id)
        })
    }
}
