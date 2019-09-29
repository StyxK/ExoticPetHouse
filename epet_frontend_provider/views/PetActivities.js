import React, { Component } from 'react'
import { Image } from 'react-native'
import { Content, Text, View, Header, Right, Left, Body, Icon, Container, Card, CardItem, Fab, Thumbnail, Label } from 'native-base'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import moment from 'moment-timezone'

export default class PetActivities extends Component {

    constructor(props) {
        super(props)
        this.state = {
            storeId: props.storeId,
            pet: {},
            activities : []
        }
    }

    getPetDetails = ()=>{
        console.log(this.props.pet)
        this.setState({
            pet : this.props.pet
        })
    }

    getActivities = async ()=>{
        const activities = await axios.get('/petactivity/'+this.props.pet.orderLines[0].id)
        await this.setState({
            activities : await activities.data
        })
    }

    activitiesCard = ()=>{
        let card = []
        this.state.activities.map( data => {
            card.push( 
            <Card key={data.id} style={{marginLeft:10,marginRight:10}}>
                <CardItem style={{ backgroundColor: "#7A5032" }}>
                    <Left>
                        <Text style={{color:'white'}}>{data.topic}</Text>
                    </Left>
                    <Right>
                        <Text style={{color:'white'}}> {moment(data.date).fromNow()} </Text>
                    </Right>
                </CardItem>
                {
                    data.picture ? 
                        <CardItem cardBody>
                            <Image source={{uri:data.picture}} style={{height: 200, width: null, flex: 1}}/>
                        </CardItem>
                    :
                        null
                }
                <CardItem>
                    <Text>{data.description}</Text>
                </CardItem>
            </Card> )
        })
        return card
    }

    componentDidMount() {
        this.getPetDetails()
        this.getActivities()
    }

    render() {
        const { pet,storeId } = this.state
        return (
            <Container>
                <Header style={{ backgroundColor: "#7A5032" }}>
                    <Left style={{ flex: 1 }} >
                        <Icon style={{ color: 'white' }} onPress={() => { goToPets() }} name='ios-arrow-back' />
                    </Left>
                    <Body style={{ flex: 3 ,alignItems:'center'}}>
                        <Text style={{ color: "white" }}>กิจกรรมระหว่างการฝาก</Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <Content style={{ backgroundColor: 'grey' }}>
                    <View style={{backgroundColor:'#fff7a3',flexDirection:'row',marginBottom:5}}>
                        <Left style={{flex:1,alignItems:'center'}}>
                            {pet.image ?
                                <Thumbnail style={{ width: 80, height: 80 }} source={{ uri: pet.image }} />
                                :
                                <Thumbnail style={{ width: 80, height: 80 }} source={require('../assets/no_image_available.jpeg')} />
                            }
                        </Left>
                        <Body style={{flex:2,alignItems:'flex-start'}}>
                            <Label/>
                            <Label style={{color:'#7A5032'}}> น้อง <Label> {pet.name} </Label> </Label>
                            <Label style={{color:'#7A5032'}}> อายุ <Label> {pet.age} </Label> เดือน </Label>
                            <Label style={{color:'#7A5032'}}> เจ้าของสัตว์เลี้ยง : <Label> {pet.ownerUserName} </Label> </Label>
                            <Label/>
                        </Body>
                    </View>
                    {this.activitiesCard()}
                </Content>
                <Fab onPress={()=>goToPetPost(pet,storeId)} style={{backgroundColor:'green'}}>
                    <Icon name='add'/>
                </Fab>
            </Container>
        )
    }
}

goToPets = () => {
    Actions.popTo('pet')
}

goToPetPost = (pet,storeId) => {
    Actions.petPost({pet,storeId})
}