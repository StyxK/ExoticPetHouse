import React,{Component} from 'react'
import { View, Container, Content, Icon, Header, Left, Right, Text, Body, Form, Item, Input, ListItem, Label } from 'native-base'
import { Actions } from 'react-native-router-flux'

export default class Cage extends Component{

    constructor(props){
        super(props)
    }

    render(){
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
                                <Input />
                            </Item>
                        </View>
                        <View style={{ marginVertical: 5, paddingHorizontal: 10 }}>
                            <Text style={{ marginHorizontal: 15, marginVertical: 2 }}>
                                ประเภท : 
                            </Text>
                            <Item rounded> 
                                <Input />
                            </Item>
                        </View>
                        <View style={{ marginVertical: 5, paddingHorizontal: 10 }}>
                            <Text style={{ marginHorizontal: 15, marginVertical: 2 }}>
                                คำอธิบายเพิ่มเติม : 
                            </Text>
                            <Item rounded> 
                                <Input />
                            </Item>
                        </View>
                        <View style={{ marginVertical: 5, paddingHorizontal: 10 }}>
                            <Text style={{ marginHorizontal: 15, marginVertical: 2 }}>
                                ราคา : 
                            </Text>
                            <Item style={{flexDirection:'row-reverse'}} rounded>
                                <Label style={{marginRight:5}}> บาท / วัน </Label> 
                                <Input/>
                            </Item>
                        </View>
                    </Form>
                    {console.log(this.props.store.id,'storeId')}
                </Content>
            </Container>
        )
    }
}
