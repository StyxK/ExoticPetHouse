import React, { Component } from 'react'
import { Container, Header, Left, Right, Text, Body, Icon, Label, Form, Item, Input, Content, Button,FooterTab,Fab } from 'native-base'
import { Image, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import ImagePicker from 'react-native-image-picker'
import options from '../image-option.json'
import axios from 'axios'
import theme from "../theme";


export default class PetPost extends Component {

    constructor(props) {
        super(props)
        this.state = {
            picture : {},
            topic : '',
            description : '',
        }
    }

    selectImageFromGallery = () => {
        ImagePicker.showImagePicker(options,response=>{
            if(response.didCancel)
                null
            else if(response.error)
                console.log('error')
            else
                this.setState({
                    picture : {uri : 'data:image/jpeg;base64,'+ response.data}
                })
        })
    }

    uploadActivity = async () => {
        const {topic,picture,description} = await this.state
        console.log(topic,description)
        const data = await {topic,description,picture:picture.uri,orderLine:this.props.pet.orderLines[0].id}
        const upload = await axios.post('/petactivity',data)
        await goToPetActivities(this.props.pet,this.props.storeId)
    }

    componentDidMount(){
        
    }

    render() {
        const {topic,description,picture} = this.state
        return (
            <Container>
                <Header style={{ backgroundColor: theme.primaryColor }}>
                    <Left style={{ flex: 1 }} >
                        <Button rounded transparent onPress={() => { goToPetActivities(this.props.pet,this.props.storeId) }}>
                            <Icon style={{ color: 'white' }} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body style={{ flex: 3 ,alignItems:'center'}}>
                        <Text style={{ color: "white" }}>อัปเดตความเคลื่อนไหว</Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>
                                กิจกรรม
                            </Label>
                            <Input multiline onChangeText={input => this.setState({ topic : input })}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>
                                รายละเอียด
                            </Label>
                            <Input multiline onChangeText={input => this.setState({ description : input })}/>
                        </Item>
                    </Form>
                    <View style={{justifyContent:"center",alignItems:"center",marginVertical:10}}>
                        <Image source={picture} style={{width:300,height:300}}/>
                    </View>
                </Content>
                <View>
                    <Fab onPress={()=> this.selectImageFromGallery()}>
                        <Icon name='camera'/>
                    </Fab>
                </View>
                <FooterTab style={{maxHeight : 50}}>
                    <Button full onPress={()=>{ this.uploadActivity() }}>
                        <Text> โพสต์ </Text>
                    </Button>
                </FooterTab>
            </Container>
        )
    }
}

goToPetActivities = (pet, storeId) => {
    Actions.petActivities({ pet, storeId })
}