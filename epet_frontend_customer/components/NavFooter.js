import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { Actions } from 'react-native-router-flux'

export default class NavFooter extends Component {
    render() {
        return (
            <Footer>
                <FooterTab style={{ backgroundColor: '#7A5032' }}>
                    <Button Badge vertical onPress={this.goToHome}>
                        <Icon name='search' style={{ color: 'white' }} />
                        <Text style={{ fontSize: 8, color: 'white' }}>search</Text>
                    </Button>
                    <Button Badge vertical onPress={this.goToMyPet}>
                        <Icon name='paw' style={{ color: 'white' }} />
                        <Text style={{ fontSize: 8, color: 'white' }}>my pets</Text>
                    </Button>
                    <Button Badge vertical>
                        <Icon name='chatbubbles' style={{ color: 'white' }} />
                        <Text style={{ fontSize: 8, color: 'white' }}>chat</Text>
                    </Button>
                    <Button Badge vertical>
                        <Icon name='list' style={{ color: 'white' }} />
                        <Text style={{ fontSize: 8, color: 'white' }}>history</Text>
                    </Button>
                    <Button Badge vertical>
                        <Icon name='person' style={{ color: 'white' }} />
                        <Text style={{ fontSize: 8, color: 'white' }}>profile</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }

    goToHome = () => {
        Actions.home()
    }

    goToMyPet = () => {
        Actions.myPet()
    }
}