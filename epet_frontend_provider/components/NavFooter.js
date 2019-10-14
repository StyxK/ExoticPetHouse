import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Toast, Label, Root } from 'native-base';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';
import theme from "../theme";

class NavFooter extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <Footer>
                <Root>
                    <FooterTab style={{ backgroundColor: theme.primaryColor }}>
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
                </Root>
            </Footer>
        )
    }

    goToPage = (page) => {
        try{
            if(page != 'profile'){
                if(!this.props.store.storeId){
                    throw new Error('กรุณาเลือกร้านก่อนทำรายการอื่นๆ')
                }
                Actions.reset(page)
            }
            else
                Actions.reset(page)
        }catch(error){
            Toast.show({
                text: "กรุณาเลือกร้านก่อนทำรายการ",
                position:'bottom',
                buttonText: 'ตกลง'
            })
        }
    }

}

const mapStateToProps = state => {
    return {...state}
}

export default connect(mapStateToProps)(NavFooter)
