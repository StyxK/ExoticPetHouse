import React,{Component} from 'react'
import { Container, Text , Header , Left , Right , Body, Form , Item, Label, Textarea, ListItem, View, Button, Input, Icon, FooterTab, Content, Footer} from 'native-base'
import Config from 'react-native-config'
import { Field,reduxForm} from 'redux-form'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'

class CreateStore extends Component{

    constructor(props){
        super(props)
        this.state = {
            storeRegistionDetail : {
                rating : 0
            },
            address : {}
        }
    }

    render(){

        const { storeRegistionDetail , address } = this.state

        return(
            <Container>
                <Header style={{ backgroundColor: "#7A5032" }}>
                    <Left style={{ flex: 2 }} >
                        <Icon name='arrow-back' style={{marginLeft:10,color:'white'}} onPress={ () => { createStore()}}/>
                    </Left>
                    <Body style={{ flex: 2.5 }}>
                        <Text style={{ color: "white" }}>ตั้งร้านเพิ่ม</Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <Content>
                    <Form>
                        <ListItem itemDivider>
                            <Text>ข้อมูลทั่วไปของร้าน</Text>
                        </ListItem>
                            <Field name = 'name' component={renderInput} />
                            <Field name = 'phoneNumber' component={renderInput} />
                            <Field name = 'description' component={renderInput} />
                            <Field name = 'maxOfDeposit' component={renderInput} />
                        <ListItem itemDivider>
                            <Text>ฟอร์มแบบเก่า (without redux-form)</Text>
                        </ListItem>
                        <Item stackedLabel>
                            <Label> ชื่อร้าน </Label>
                            <Input onChangeText = { ( name )=> {this.setState({
                                storeRegistionDetail : {
                                    ...storeRegistionDetail,name
                                }
                            })}} />
                        </Item>
                        <Item stackedLabel>
                            <Label> เบอร์โทรศัพท์ </Label>
                            <Input onChangeText = { ( phoneNumber )=> {this.setState({
                                storeRegistionDetail : {
                                    ...storeRegistionDetail,phoneNumber
                                }
                            })}} />
                        </Item>
                        <Item stackedLabel>
                            <Label> คำอธิบาย </Label>
                            <Input onChangeText = { ( description )=> {this.setState({
                                storeRegistionDetail : {
                                    ...storeRegistionDetail,description
                                }
                            })}} />
                        </Item>
                        <Item stackedLabel style={{marginBottom:5}}>
                            <Label> จำนวนรับฝากสูงสุด </Label>
                            <Input onChangeText = { ( maxOfDeposit )=> {this.setState({
                                storeRegistionDetail : {
                                    ...storeRegistionDetail,maxOfDeposit
                                }
                            })}} />
                        </Item>
                        <ListItem itemDivider>
                            <Text>ตำแหน่งที่ตั้งของร้าน</Text>
                        </ListItem>
                        <Item stackedLabel> 
                            <Label> ถนน </Label>
                            <Input onChangeText = { ( street )=> {this.setState({
                                address : {
                                    ...address,street
                                }
                            })}} />
                        </Item>
                        <Item stackedLabel> 
                            <Label> เขต / อำเภอ </Label>
                            <Input onChangeText = { ( district )=> {this.setState({
                                address : {
                                    ...address,district
                                }
                            })}} />
                        </Item>
                        <Item stackedLabel> 
                            <Label> จังหวัด </Label>
                            <Input onChangeText = { ( province )=> {this.setState({
                                address : {
                                    ...address,province
                                }
                            })}} />
                        </Item>
                        <Item stackedLabel> 
                            <Label> รหัสไปรษณีย์ </Label>
                            <Input onChangeText = { ( postcode )=> {this.setState({
                                address : {
                                    ...address,postcode
                                }
                            })}} />
                        </Item>
                        <Item stackedLabel> 
                            <Label> ละติจูด </Label>
                            <Input onChangeText = { ( latitude )=> {this.setState({
                                address : {
                                    ...address,latitude
                                }
                            })}} />
                        </Item>
                        <Item stackedLabel>
                            <Label> ลองจิจูด </Label>
                            <Input onChangeText = { ( longitude )=> {this.setState({
                                address : {
                                    ...address,longitude
                                }
                            })}} />
                        </Item>
                    </Form>
                </Content>
                <Footer>
                    <FooterTab style={{backgroundColor:'none'}}>
                        <Button style={{backgroundColor:'green'}} full onPress={ ()=>{ createStore({...storeRegistionDetail,address}) }}> 
                            <Text> ลงทะเบียนร้านรับฝาก </Text> 
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

renderInput = ({input,label,type,meta:{ touched,error,warning}})=>{
    let hashError = false;
    if(error != undefined){
        hashError = true
    }
    switch(input.name){
        case 'phoneNumber': 
        return(
            <Item stackedLabel error = {hashError}>
                <Input keyboardType='number-pad' {...input}/>
                {hashError ? <Text>{error}</Text>:<Text/>}
            </Item>
        )
        case 'maxOfDeposit': 
        return(
            <Item stackedLabel error = {hashError}>
                <Input keyboardType='number-pad' {...input}/>
                {hashError ? <Text>{error}</Text>:<Text/>}
            </Item>
        )
        default : 
    }
    return(
        <Item stackedLabel error = {hashError}>
            <Input keyboardType='default' {...input}/>
            {hashError ? <Text>{error}</Text>:<Text/>}
        </Item>
    )
}

const validate = (value) =>{
    const error = {};
    error.name = '';
    error.phoneNumber = '';
    error.description = '';
    error.maxOfDeposit = '';
    let {name,phoneNumber,description,maxOfDeposit} = value
    if(name == undefined){
        error.name = 'กรุณาใส่ชื่อร้าน'
    }
    if(phoneNumber == undefined){
        error.phoneNumber = 'กรุณาใส่เบอร์ติดต่อร้าน'
    }
    if(description == undefined){
        description = ''
    }
    if(maxOfDeposit == undefined){
        error.maxOfDeposit = 'กรุณาระบุจำนวนที่รับฝากได้สูงสุด'
    }
    return error
}

createStore = (storeDetail)=>{
    axios.post('/store',storeDetail).then( response =>{
        alert(response.data)
    })
    goToProfile()
}

goToProfile = ()=>{
    Actions.profile()
}

export default reduxForm({
    form :  'createStore',
    validate
})(CreateStore)