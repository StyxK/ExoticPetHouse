import React,{Component} from 'react'
import { Container, Text , Header , Left , Right , Body, Form , Item, Label, Textarea, ListItem, View} from 'native-base'
import Config from 'react-native-config'
import { Action } from 'react-native-router-flux'
import Axios from 'axios'

const API_URL = Config.API_URL

export default class CreateStore extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <Container>
                <Header style={{ backgroundColor: "#7A5032" }}>
                    <Left style={{ flex: 2 }} />
                    <Body style={{ flex: 2.5 }}>
                        <Text style={{ color: "white" }}>ตั้งร้านเพิ่ม</Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <Form>
                    <ListItem itemDivider>
                        <Text>ข้อมูลทั่วไปของร้าน</Text>
                    </ListItem>
                    <Item stackedLabel>
                        <Label> ชื่อร้าน </Label>
                    </Item>
                    <Item stackedLabel>
                        <Label> เบอร์โทรศัพท์ </Label>
                    </Item>
                    <Item stackedLabel>
                        <Label> คำอธิบาย </Label>
                    </Item>
                    <Item stackedLabel style={{marginBottom:5}}>
                        <Label> จำนวนรับฝากสูงสุด </Label>
                    </Item>
                    <ListItem itemDivider>
                        <Text>ตำแหน่งที่ตั้งของร้าน</Text>
                    </ListItem>
                    <View style={{paddingHorizontal:10}}>
                        <Textarea  bordered  placeholder='รายละเอียดที่อยู่'/>
                    </View>
                    <Item stackedLabel> 
                        <Label> ละติจูด </Label>
                    </Item>
                    <Item stackedLabel>
                        <Label> ลองจิจูด </Label>
                    </Item>
                </Form>
            </Container>
        )
    }

    createStore = ()=>{
        Actions.Profile()
    }
}