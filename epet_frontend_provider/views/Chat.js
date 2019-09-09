import React,{Component} from 'react'
import { Text , StyleSheet } from 'react-native'
import { Container, Content, Header, Left, Right, Body, Icon, List, ListItem, Label } from 'native-base'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import {connect} from 'react-redux'

class Chat extends Component{

    constructor(props){
        super(props)
        this.state = {
            chatList : []
        }
    }

    componentDidMount(){
        const store = this.props.store.storeId
        console.log(store)
        axios.get('/chat/chatRoom/' + store).then(
            result => {
                this.setState({
                    chatList:result.data
                })
                console.log(result.data,"chatList")
            }
        )
    }

    chatRooms = () =>{
        let list = []
        this.state.chatList.map( data => {
            list.push(
                <ListItem key={data.id} onPress={() => this.goToChatBox(data.id)}>
                    <Left style={{ flex : 0.5}}>
                        <Icon name="person"/>
                    </Left>
                    <Body style={{flex : 3}}>
                        <Label>
                            {data.customerUsername}
                            <Text> {  } </Text>
                            <Text note style={{fontSize:10}}>
                                order : {data.id}
                            </Text>
                        </Label>
                    </Body>
                </ListItem>
            )
        })
        return list
    }

    render(){
        return(
            <Container>
                <Content>
                    <Header style={{ backgroundColor: "#7A5032" }}>
                        <Left style={{ flex: 2 }} >
                            <Icon style={{ color: 'white' }} onPress={() => { this.goToStore() }} name='arrow-back' />
                        </Left>
                        <Body style={{ flex: 2.5 }}>
                            <Text style={{ color: "white" }}> แชทกับลูกค้า </Text>
                        </Body>
                        <Right style={{ flex: 1 }} />
                    </Header>
                    <List>
                        {this.chatRooms()}
                    </List>
                </Content>
            </Container>
        )
    }

    goToStore = () => {
        Actions.store()
    }

    goToChatBox = (order) => {
        Actions.chatbox({order:order})
    }

}

const mapStateToProps = (state)=>{
    return {...state}
}

export default connect(mapStateToProps)(Chat)