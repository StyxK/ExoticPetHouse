import React, { Component } from 'react'
import { Container, Header, Left, Right, Text, Body, Icon, Label, Form, Item, Input, Content, Button,FooterTab,Fab } from 'native-base'
import { Image, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import ImagePicker from 'react-native-image-picker'
import options from '../image-option.json'

export default class PetPost extends Component {

    constructor(props) {
        super(props)
        this.state = {
            imageSource : {},
            topic : '',
            description : '',
        }
    }

    selectImageFromGallery = () => {
        ImagePicker.showImagePicker(options,response=>{
            if(response.didCancel)
                alert('cancel')
            else if(response.error)
                alert('error')
            else
                this.setState({
                    imageSource : {uri : 'data:image/jpeg;base64,'+ response.data}
                })
        })
    }

    componentDidMount(){
        
    }

    render() {
        const {topic,description,imageSource} = this.state
        return (
            <Container>
                {console.log(this.props.pet,this.props.storeId)}
                {console.log(options)}
                <Header style={{ backgroundColor: "#7A5032" }}>
                    <Left style={{ flex: 2 }} >
                        <Icon style={{ color: 'white' }} onPress={() => { goToPetActivities(this.props.pet,this.props.storeId) }} name='arrow-back' />
                    </Left>
                    <Body style={{ flex: 3.5 }}>
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
                        <Image source={imageSource} style={{width:300,height:300}}/>
                    </View>
                </Content>
                <View>
                    <Fab onPress={()=> this.selectImageFromGallery()}>
                        <Icon name='camera'/>
                    </Fab>
                </View>
                <FooterTab style={{maxHeight : 50}}>
                    <Button full onPress={()=>{ console.log(topic,description)}}>
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