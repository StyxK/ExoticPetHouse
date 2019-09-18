import React,{Component} from 'react'
import { View, Container, Content, Icon, Header, Left, Right, Text, Body, Form, Item, Input, Footer, Label, FooterTab, Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'

export default class Cage extends Component{

    constructor(props){
        super(props)
        this.state = {
            name:undefined,
            type:undefined,
            description:undefined,
            price:undefined
        }
    }

    render(){
        const {name,type,description,price} = this.state
        return(
            <Container>
                <Header style={{ backgroundColor: "#7A5032" }}>
                    <Left style={{ flex: 2 }} >
                        <Icon name="ios-arrow-back" style={{color:'white'}} onPress={ ()=> Actions.storeManager({store:this.props.store}) }/>
                    </Left>
                    <Body style={{ flex: 2.5 }}>
                        <Text style={{ color: "white" }}> เพิ่มกรงในร้าน </Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <Content>
                    <Form>
                        <View style={{ marginVertical: 5, paddingHorizontal: 10 }}>
                            <Text style={{ marginHorizontal: 15, marginVertical: 2 }}>
                                ชื่อกรง : 
                            </Text>
                            <Item rounded> 
                                <Input value={name} onChangeText={e=>this.setState({ name : e})} />
                            </Item>
                        </View>
                        <View style={{ marginVertical: 5, paddingHorizontal: 10 }}>
                            <Text style={{ marginHorizontal: 15, marginVertical: 2 }}>
                                ประเภท : 
                            </Text>
                            <Item rounded> 
                                <Input value={type} onChangeText={e=>this.setState({ type : e})} />
                            </Item>
                        </View>
                        <View style={{ marginVertical: 5, paddingHorizontal: 10 }}>
                            <Text style={{ marginHorizontal: 15, marginVertical: 2 }}>
                                คำอธิบายเพิ่มเติม : 
                            </Text>
                            <Item rounded> 
                                <Input value={description} onChangeText={e=>this.setState({ description : e})} />
                            </Item>
                        </View>
                        <View style={{ marginVertical: 5, paddingHorizontal: 10 }}>
                            <Text style={{ marginHorizontal: 15, marginVertical: 2 }}>
                                ราคา : 
                            </Text>
                            <Item style={{flexDirection:'row-reverse'}} rounded>
                                <Label style={{marginRight:5}}> บาท / วัน </Label> 
                                <Input value={price} onChangeText={e=>this.setState({ price : e})} />
                            </Item>
                        </View>
                    </Form>
                    {console.log(this.props.store.id,'storeId')}
                </Content>
                <Footer>
                    <FooterTab style={{ backgroundColor: "none" }}>
                    <Button
                        style={{ backgroundColor: "green" }}
                        full
                        onPress={ ()=> this.handleSubmit() }
                    >
                        <Text> ลงทะเบียนร้านรับฝาก </Text>
                    </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }

    handleSubmit = async () =>{
        try{
            await console.log(this.state,'state')
            await axios.post('/cage/'+this.props.store.id,this.state)
            await alert('เพิ่มกรงสำเร็จ')
            Actions.storeManager({store:this.props.store})
        }catch(err){
            await console.log(err)
            await alert('กรุณาตรวจสอบข้อมูล แล้วทำรายการใหม่อีกครั้ง')
        }
    }
}
