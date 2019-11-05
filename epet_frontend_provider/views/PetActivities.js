import React, { Component } from 'react'
import { Image } from 'react-native'
import { Content, Text, View, Header, Right, Left, Body, Icon, Container, Card, CardItem, Fab, Thumbnail, Label, Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import moment from 'moment-timezone'
import theme from "../theme";

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
                <CardItem style={{ backgroundColor: theme.primaryColor }}>
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
                <Header style={{ backgroundColor: theme.primaryColor }}>
                    <Left style={{ flex: 1 }} >
                        <Button transparent onPress={() => { goToPets() }}>
                            <Icon style={{ color: 'white' }} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body style={{ flex: 3 ,alignItems:'center'}}>
                        <Text style={{ color: theme.primaryTextColor }}>กิจกรรมระหว่างการฝาก</Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <Content style={{ backgroundColor: theme.backgroundColor }}>
                    <View style={{backgroundColor:theme.primaryColor,flexDirection:'row',marginBottom:5}}>
                        <Left style={{flex:1,alignItems:'center'}}>
                            {pet.image ?
                                <Thumbnail style={{ width: 80, height: 80 }} source={{ uri: pet.image }} />
                                :
                                <Thumbnail style={{ width: 80, height: 80 }} source={require('../assets/no_image_available.jpeg')} />
                            }
                        </Left>
                        <Body style={{flex:2,alignItems:'flex-start'}}>
                            <Label/>
                            <Label style={{color:theme.secondaryTextColor}}> น้อง <Label> {pet.name} </Label> </Label>
                            <Label style={{color:theme.secondaryTextColor}}> อายุ <Label> {pet.age} </Label> เดือน </Label>
                            <Label style={{color:theme.secondaryTextColor}}> เจ้าของสัตว์เลี้ยง : <Label> {pet.ownerUserName} </Label> </Label>
                            <Label/>
                        </Body>
                    </View>
                    {this.activitiesCard()}
                </Content>
                <Fab onPress={()=>goToPetPost(pet,storeId)} style={{backgroundColor:theme.primaryColor}}>
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