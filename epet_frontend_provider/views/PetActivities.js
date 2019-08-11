import React, { Component } from 'react'
import { Image } from 'react-native'
import { Content, Text, View, Header, Right, Left, Body, Icon, Container, Card, CardItem, Fab } from 'native-base'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'

const PIC_URL = 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Welchcorgipembroke.JPG'

export default class PetActivities extends Component {

    constructor(props) {
        super(props)
        this.state = {
            storeId: props.storeId,
            pet: {}
        }
    }

    getPetDetails = ()=>{
        this.setState({
            pet : this.props.pet
        })
    }

    // getActivities = ()=>{
    //     axios.get('/petactivity/')
    // }

    componentDidMount() {
        this.getPetDetails()
    }

    render() {
        const { pet,storeId } = this.state
        return (
            <Container>
                <Header style={{ backgroundColor: "#7A5032" }}>
                    <Left style={{ flex: 2 }} >
                        <Icon style={{ color: 'white' }} onPress={() => { goToPets(storeId) }} name='arrow-back' />
                    </Left>
                    <Body style={{ flex: 2.5 }}>
                        <Text style={{ color: "white" }}>สัตว์เลี้ยงจ้า</Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <Content>
                    <View style={{backgroundColor:'black',alignItems:'center'}}>
                        <Icon style={{color:'white' , fontSize:100}} name='person'/>
                        <Text style={{color:'white'}}> {pet.name} </Text>
                    </View>
                    <Card>
                        <CardItem>
                            <Left>
                                <Text>สัตว์เลี้ยงจ้า</Text>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{uri:PIC_URL}} style={{height: 200, width: null, flex: 1}}/>
                        </CardItem>
                    </Card>
                </Content>
                <Fab onPress={()=>goToPetPost(pet,storeId)}>
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