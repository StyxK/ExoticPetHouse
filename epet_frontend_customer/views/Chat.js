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

    chatRooms = () => {
        let list = []
        this.state.chatList.map(data => {
            console.log(data.chats)
            let time
            data.chats.map( (chat,i) => {
                if(data.chats.length === i+1){
                    time = (
                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Left>      
                            <Text style={{ fontSize: 12.5 }}>
                                {
                                    (chat.role == 0 ? 'ร้าน :' : 'คุณ : ')+chat.message+"  "
                                }
                            </Text>
                        </Left>
                        <Right>
                            <Text style={{alignSelf:'flex-end',fontSize: 12.5}}>
                            {
                                console.log(duration(parseInt(chat.time),'seconds'),'duration')
                            }
                            {
                                7+duration(parseInt(chat.time),'seconds').hours() + ':' + 
                                (
                                    duration(parseInt(chat.time),'seconds').minutes() < 10 ?
                                        '0'+duration(parseInt(chat.time),'seconds').minutes()
                                        :
                                        duration(parseInt(chat.time),'seconds').minutes()
                                )
                            }
                            </Text>
                        </Right>
                    </View>
                    )
                }
            })
            if(data.chats.length == 0){
                console.log('lasttime')
                time = (
                    <Label style={{marginTop:5}}>
                        <Text style={{ fontSize: 12.5 }}>เริ่มต้นสนทนาได้เลย</Text>
                    </Label>
                )
            }
            list.push(
                    <ListItem key={data.id} onPress={() => this.goToChatBox(data.id)}>
                        <Left style={{ flex: 0.5 }}>
                            <Icon name="person" />
                        </Left>
                        <Body style={{ flex: 4 }}>
                            <Label>
                                {data.store.name}
                                <Text> {} </Text>
                                <Text note style={{ fontSize: 10 }}>
                                    order : {data.id}
                                </Text>
                            </Label>
                            {time}
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
                            <Text style={{ color: "white" }}> แชทกับลูกค้า </Text>
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

    goToChatBox = (order) => {
        Actions.chatbox({ order: order })
    }

}

const mapStateToProps = (state) => {
    return { ...state }
}

export default connect(mapStateToProps)(Chat)