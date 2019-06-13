import React,{Component} from 'react'
import { Container, Text , Header , Left , Right , Body, Form , Item, Label, Textarea, ListItem, View, Button, Input, Icon, FooterTab, Content, Footer} from 'native-base'
import { Field,reduxForm,reset} from 'redux-form'
import { Actions } from 'react-native-router-flux'
import {DispatchProp} from 'react-redux'
import axios from 'axios'

class CreateStore extends Component{

    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return(
            <Container>
                <Header style={{ backgroundColor: "#7A5032" }}>
                    <Left style={{ flex: 2 }} >
                        <Icon name='arrow-back' style={{marginLeft:10,color:'white'}} onPress={ () => { goToProfile()}}/>
                    </Left>
                    <Body style={{ flex: 2.5 }}>
                        <Text style={{ color: "white" }}>ตั้งร้านเพิ่ม</Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                {storeForm(this.props)}
            </Container>
        )
    }
}

renderInput = ({input,label,type,meta:{ touched,error,warning}})=>{
    switch(input.name){
        case 'phoneNumber':
        case 'maxOfDeposit':
        case 'postcode' :
        case 'latitude':
        case 'longitude':
        return(
            <View style={{marginVertical:5 , paddingHorizontal:10}}>
                <Text style={{marginHorizontal:15,marginVertical:2}}>{label} 
                    <Text>{"     "}</Text>
                    {touched && (error ? <Text note style={{color:'red'}}>{error}</Text>:<Text/>)}
                </Text>
                <Item bordered rounded>
                    <Input keyboardType='number-pad' {...input}/>
                </Item>
            </View>
        )
        default : 
    }
    return(
        <View style={{marginVertical:5 , paddingHorizontal:10}}>
            <Text style={{marginHorizontal:15,marginVertical:2}}>{label}
                <Text>{"     "}</Text>
                {touched && (error ? <Text note style={{color:'red'}}>{error}</Text>:<Text/>)}
            </Text>
            <Item bordered rounded>
                <Input keyboardType='default' {...input}/>
            </Item>
        </View>
    )
}

const storeForm = props =>{
    const {handleSubmit} = props
    return(
        <Content>
            <Form>
                <ListItem style={{backgroundColor:'#7A5032'}} itemDivider>
                    <Text style={{color:'white'}}>ข้อมูลทั่วไปของร้าน</Text>
                </ListItem>
                    <Field name = 'name' component={renderInput} label='ชื่อร้าน' />
                    <Field name = 'phoneNumber' component={renderInput} label='เบอร์ติดต่อร้าน' />
                    <Field name = 'description' component={renderInput} label='คำอธิบายร้าน'/>
                    <Field name = 'maxOfDeposit' component={renderInput} label='จำนวนรับฝากสูงสุด'/>
                <ListItem style={{backgroundColor:'#7A5032'}} itemDivider>
                    <Text style={{color:'white'}}>ตำแหน่งที่ตั้งของร้าน</Text>
                </ListItem>
                <Field name = 'street' component={renderInput} label='ถนน'/>
                <Field name = 'district' component={renderInput} label='เขต / อำเภอ'/>
                <Field name = 'province' component={renderInput} label='จังหวัด'/>
                <Field name = 'postcode' component={renderInput} label='รหัสไปรษณีย์'/>
                <Field name = 'latitude' component={renderInput} label='ละติจูด'/>
                <Field name = 'longitude' component={renderInput} label='ลองจิจูด'/>
            </Form>
            <Footer>
                <FooterTab style={{backgroundColor:'none'}}>
                    <Button style={{backgroundColor:'green'}} full onPress={handleSubmit(submit)}> 
                        <Text> ลงทะเบียนร้านรับฝาก </Text> 
                    </Button>
                </FooterTab>
            </Footer>
        </Content>
    )
}

const validate = (value) =>{
    const error = {};
    error.name = '';
    error.phoneNumber = '';
    error.description = '';
    error.maxOfDeposit = '';
    error.district = '';
    error.province = '';
    error.postcode = '';
    let {name,phoneNumber,description,maxOfDeposit,street,district,province,postcode,latitude,longitude} = value
    if(name == undefined){
        error.name = 'กรุณาใส่ชื่อร้าน'
    }
    if(phoneNumber == undefined){
        error.phoneNumber = 'กรุณาใส่เบอร์ติดต่อร้าน'
    }
    if(description == undefined){
        description = '-'
    }
    if(maxOfDeposit == undefined){
        error.maxOfDeposit = 'กรุณาระบุจำนวน'
    }
    if(street == undefined){
        error.description = 'กรุณาระบุรายละเอียด'
    }
    if(district == undefined){
        error.district = 'กรุณาระบุเขต / อำเภอ'
    }
    if(province == undefined){
        error.province = 'กรุณาระบุจังหวัด'
    }
    if(postcode == undefined || postcode.length != 5){
        error.postcode = 'กรุณากรอกรหัส 5 หลัก'
    }
    if(latitude == undefined){
        error.latitude = 'กรุณากรอกละติจูด'
    }
    if(longitude == undefined){
        error.longitude = 'กรุณากรอกลองจิจูด'
    }
    return error
}

submit = (value)=>{
    let {name,phoneNumber,description,maxOfDeposit,street,district,province,postcode,latitude,longitude} = value
    let storeDetail = {name,phoneNumber,description,maxOfDeposit,rating:0}
    let address = {street,district,province,postcode,latitude,longitude}
    let data = {...storeDetail,address}
    axios.post('/store',data).then( response =>{
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