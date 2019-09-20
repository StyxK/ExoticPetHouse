import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text, Label } from 'native-base';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';

class NavFooter extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <Footer>
                <FooterTab style={{ backgroundColor: '#7A5032' }}>
                    <Button Badge vertical onPress={()=>this.goToPage('pet')}>
                        <Icon name='paw' style={{ color: 'white' }} />
                        <Label style={{ fontSize: 7, color: 'white' }}>สัตว์เลี้ยงที่อยู่ในการฝาก</Label>
                    </Button>
                    <Button Badge vertical onPress={()=>this.goToPage('orderList')}>
                        <Icon name='list' style={{ color: 'white' }} />
                        <Label style={{ fontSize: 7, color: 'white' }}>รายการฝาก</Label>
                    </Button>
                    <Button Badge vertical onPress={()=>this.goToPage('chat')}>
                        <Icon name='chatbubbles' style={{ color: 'white' }} />
                        <Label style={{ fontSize: 7, color: 'white' }}>แชท</Label>
                    </Button>
                    <Button Badge vertical onPress={()=>this.goToPage('profile')}>
                        <Icon name='person' style={{ color: 'white' }} />
                        <Label style={{ fontSize: 8, color: 'white' }}>โปรไฟล์</Label>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }

    goToPage = async (page) => {
        try{
            if(page != 'profile'){
                if(!this.props.store.storeId){
                    throw new Error('กรุณาเลือกร้านก่อนทำรายการอื่นๆ')
                }
                await Actions.reset(page)
            }
            else
                await Actions.reset(page)
        }catch(error){
            alert(error.message)
        }
    }

}

const mapStateToProps = state => {
    return {...state}
}

export default connect(mapStateToProps)(NavFooter)
