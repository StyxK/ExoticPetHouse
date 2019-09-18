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

    componentDidMount(){
        if(this.props.cage){
            const cage = this.props.cage
            this.setState({
                name:cage.name,
                type:cage.type,
                description:cage.description,
                price:cage.price+''
            })
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
                                <Input keyboardType='numeric' value={price} onChangeText={e=>this.setState({ price : e})} />
                            </Item>
                        </View>
                    </Form>
                    {console.log(this.props.store.id,'storeId')}
                </Content>
                <Footer>
                    <FooterTab style={{ backgroundColor: "none" }}>
                    {
                        this.props.cage ? 
                            <Button
                                style={{ backgroundColor: "green" }}
                                full
                                onPress={ ()=> this.handleSubmit_Edit() }
                            >
                                <Text> ยืนยันการแก้ไขข้อมูลกรง </Text>
                            </Button>
                            :
                            <Button
                                style={{ backgroundColor: "green" }}
                                full
                                onPress={ ()=> this.handleSubmit_Create() }
                            >
                                <Text> ยืนยันการเพิ่มกรง </Text>
                            </Button>
                    }
                    </FooterTab>
                </Footer>
            </Container>
        )
    }

    handleSubmit_Edit = async () =>{
        try{
            await console.log(this.state,'state')
            await axios.put('/cage/'+this.props.cage.id,this.state)
            await alert('แก้ไขข้อมูลกรงสำเร็จ')
            Actions.storeManager({store:this.props.store})
        }catch(err){
            await console.log(err)
            await alert('กรุณาตรวจสอบข้อมูล แล้วทำรายการใหม่อีกครั้ง')
        }
    }

    handleSubmit_Create = async () =>{
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
