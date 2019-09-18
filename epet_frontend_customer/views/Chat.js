import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, Content, Header, Left, Right, Body, Icon, List, ListItem, Label } from 'native-base'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import { connect } from 'react-redux'
import NavFooter from '../components/NavFooter';
import moment,{duration} from 'moment'

class Chat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            chatList: []
        }
    }

    componentDidMount() {
        const user = this.props.user.username
        axios.get('/chat/customerChatRoom/' + user).then(
            result => {
                this.setState({
                    chatList: result.data
                })
            }
        )
    }

    chatRooms = () =>{
        let list = []
        this.state.chatList.map( data => {
            list.push(
                <ListItem key={data.chat_id} onPress={() => this.goToChatBox(data.chat_customerUsername,data.chat_storeId)}>
                    <Left style={{ flex : 0.5}}>
                        <Icon name="person"/>
                    </Left>
                    <Body style={{flex : 3}}>
                        <Label>
                            {data.store_name}
                            <Text> {  } </Text>
                        </Label>
                        <View style={{flexDirection:'row'}}>
                            <Left style={{flex:2}}>
                                <Text note style={{fontSize:15}}>
                                    {
                                        data.chat_role == 1 ? 'คุณ : ' : `ร้าน : `
                                    }
                                    { data.chat_message }
                                </Text>
                            </Left>
                            <Right style={{flex:1}}>
                                <Text style={{alignSelf:'flex-end',fontSize: 12.5}}>
                                {
                                    console.log(duration(parseInt(data.chat_time),'seconds'),'duration')
                                }
                                {
                                    7+duration(parseInt(data.chat_time),'seconds').hours() + ':' + 
                                    (
                                        duration(parseInt(data.chat_time),'seconds').minutes() < 10 ?
                                            '0'+duration(parseInt(data.chat_time),'seconds').minutes()
                                            :
                                            duration(parseInt(data.chat_time),'seconds').minutes()
                                    )
                                }
                                </Text>
                            </Right>
                        </View>
                    </Body>
                </ListItem>
            )
        })
        return list
    }

    render() {
        return (
            <Container>
                <Content>
                    <Header style={{ backgroundColor: "#7A5032" }}>
                        <Left style={{ flex: 2 }} />
                        <Body style={{ flex: 2.5 }}>
                            <Text style={{ color: "white" }}> แชทกับร้านรับฝาก </Text>
                        </Body>
                        <Right style={{ flex: 1 }} />
                    </Header>
                    <List>
                        {this.chatRooms()}
                    </List>
                </Content>
                <NavFooter />
            </Container>
        )
    }

    goToChatBox = (customer,store) => {
        Actions.chatbox({customer:customer,storeId:store})
    }

}

const mapStateToProps = (state) => {
    return { ...state }
}

export default connect(mapStateToProps)(Chat)