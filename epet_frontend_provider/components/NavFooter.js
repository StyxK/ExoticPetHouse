import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { Actions } from 'react-native-router-flux'

export default class NavFooter extends Component {
    render() {
        return (
            <Footer>
                <FooterTab style={{ backgroundColor: '#7A5032' }}>
                    <Button Badge vertical onPress={this.goToStore}>
                        <Icon name='home' style={{ color: 'white' }} />
                        <Text style={{ fontSize: 7, color: 'white' }}>หน้าร้าน</Text>
                    </Button>
                    <Button Badge vertical>
                        <Icon name='chatbubbles' style={{ color: 'white' }} />
                        <Text style={{ fontSize: 7, color: 'white' }}>แชท</Text>
                    </Button>
                    <Button Badge vertical onPress={this.goToProfile}>
                        <Icon name='person' style={{ color: 'white' }} />
                        <Text style={{ fontSize: 8, color: 'white' }}>โปรไฟล์</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }

    goToHome = () => {
        Actions.home()
    }

    goToProfile = () => {
        Actions.profile()
    }

    goToStore = () => {
        Actions.store()
    }

}