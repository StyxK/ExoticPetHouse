import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text, Label } from 'native-base';
import { Actions } from 'react-native-router-flux'

export default class NavFooter extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <Footer>
                <FooterTab style={{ backgroundColor: '#7A5032' }}>
                    <Button Badge vertical onPress={this.goToPet}>
                        <Icon name='paw' style={{ color: 'white' }} />
                        <Label style={{ fontSize: 7, color: 'white' }}>สัตว์เลี้ยงที่อยู่ในการฝาก</Label>
                    </Button>
                    <Button Badge vertical onPress={this.goToOrderList}>
                        <Icon name='list' style={{ color: 'white' }} />
                        <Label style={{ fontSize: 7, color: 'white' }}>รายการฝาก</Label>
                    </Button>
                    <Button Badge vertical onPress={this.goToChat}>
                        <Icon name='chatbubbles' style={{ color: 'white' }} />
                        <Label style={{ fontSize: 7, color: 'white' }}>แชท</Label>
                    </Button>
                    <Button Badge vertical onPress={this.goToProfile}>
                        <Icon name='person' style={{ color: 'white' }} />
                        <Label style={{ fontSize: 8, color: 'white' }}>โปรไฟล์</Label>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }

    goToPet = () => {
        Actions.reset('pet')
    }

    goToOrderList = () => {
        Actions.reset('orderList')
    }

    goToProfile = () => {
        Actions.reset('profile')
    }

    goToStore = () => {
        Actions.reset('store')
    }

    goToChat = () => {
        Actions.reset('chat')
    }

}
