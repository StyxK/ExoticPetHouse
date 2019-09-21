import React, { Component } from 'react'
import { Image } from 'react-native'
import { Content, Text, View, Header, Right, Left, Body, Icon, Container, Card, CardItem, Fab } from 'native-base'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import moment from 'moment-timezone'

const PIC_URL = 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Welchcorgipembroke.JPG'

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
            <Card key={data.id} style={{marginHorizontal:4}}>
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
        console.log('petactivity mounted !')
        this.getPetDetails()
        this.getActivities()
    }

    render() {
        const { pet,storeId } = this.state
        return (
            <Container>
                <Header style={{ backgroundColor: "#7A5032" }}>
                    <Left style={{ flex: 1 }} >
                        <Icon style={{ color: 'white' }} onPress={() => { goToPets(storeId) }} name='ios-arrow-back' />
                    </Left>
                    <Body style={{ flex: 3 ,alignItems:'center'}}>
                        <Text style={{ color: "white" }}>กิจกรรมระหว่างการฝาก</Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <Content style={{ backgroundColor: 'grey' }}>
                    <View style={{backgroundColor:'black',alignItems:'center'}}>
                        <Icon style={{color:'white' , fontSize:100}} name='person'/>
                        <Text style={{color:'white'}}> {pet.name} </Text>
                    </View>
                    {this.activitiesCard()}
                </Content>
                <Fab onPress={()=>goToPetPost(pet,storeId)} style={{backgroundColor:'green'}}>
                    <Icon name='person'/>
                </Fab>
            </Container>
        )
    }
}

goToPets = (storeId) => {
    Actions.pet({ storeId })
}

goToPetPost = (pet,storeId) => {
    Actions.petPost({pet,storeId})
}