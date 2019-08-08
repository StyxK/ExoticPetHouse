import React, { Component } from 'react'
import { Container, Header, Left, Right, Text, Body, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'

export default class PetPost extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container>
                {console.log(this.props.pet,this.props.storeId)}
                <Header style={{ backgroundColor: "#7A5032" }}>
                    <Left style={{ flex: 2 }} >
                        <Icon style={{ color: 'white' }} onPress={() => { goToPetActivities(this.props.pet,this.props.storeId) }} name='arrow-back' />
                    </Left>
                    <Body style={{ flex: 3.5 }}>
                        <Text style={{ color: "white" }}>อัปเดตความเคลื่อนไหว</Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
            </Container>
        )
    }
}

goToPetActivities = (pet, storeId) => {
    Actions.petActivities({ pet, storeId })
}