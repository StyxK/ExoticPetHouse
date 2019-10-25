import React,{Component} from 'react'
import { Text , RefreshControl} from 'react-native'
import { Container, Content, Header, Left, Right, Body, Icon, List, ListItem, Label, View } from 'native-base'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import {connect} from 'react-redux'
import {duration} from 'moment-timezone'
import NavFooter from '../components/NavFooter'
import { loading } from '../components/Loading'
import theme from "../theme";

class Chat extends Component{

    constructor(props){
        super(props)
        this.state = {
            chatList : [],
            load : true,
            refreshing : false,
            setRefreshing : false,
            error: {
                message: undefined,
                status: false
            }
        }
    }

    getChat = () => {
        const store = this.props.store.storeId
        axios.get('/chat/storeChatRoom/' + store).then(
            result => {
                this.setState({
                    chatList:result.data,
                    load:false
                })
            }
        ).catch((err) => {
            if(err.message == 'Request failed with status code 500'){
                this.setState({error:{message:'ขออภัย ขณะนี้ไม่สามารถติดต่อระบบได้',status:true}})
            }
        })
    }

    componentDidMount(){
        this.getChat()
    }

    chatRooms = () =>{
        let list = []
        this.state.chatList.map( data => {
            list.push(
                <ListItem 
                    key={data.chat_id} 
                    onPress={() => this.goToChatBox(data.chat_customerUsername)}
                >
                    <Left style={{ flex : 0.5 }}>
                        <Icon name="person"/>
                    </Left>
                    <Body style={{flex : 3}}>
                        <Label>
                            {data.chat_customerUsername}
                            <Text> {  } </Text>
                        </Label>
                        <View style={{flexDirection:'row'}}>
                            <Left style={{flex:2}}>
                                <Text note style={{fontSize:15}}>
                                    {
                                        data.chat_role == 0 ? 'คุณ : ' : `${data.chat_customerUsername} : `
                                    }
                                    { data.chat_message }
                                </Text>
                            </Left>
                            <Right style={{flex:1}}>
                                <Text style={{alignSelf:'flex-end',fontSize: 12.5}}>
                                {
                                    (
                                        7+duration(parseInt(data.chat_time),'seconds').hours() > 24 ? 
                                            '0'+(7+duration(parseInt(data.chat_time),'seconds').hours() - 24) : 7+duration(parseInt(data.chat_time),'seconds').hours() 
                                    )
                                    + ':' + 
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

    render(){
        return(
            <Container>
                <Header style={{ backgroundColor: theme.primaryColor }}>
                    <Left style={{ flex: 2 }} />
                    <Body style={{ flex: 2.5 }}>
                        <Text style={{ color: "white" }}> แชทกับลูกค้า </Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <Content refreshControl={
                    <RefreshControl colors={[theme.primaryColor]} refreshing={this.state.refreshing} onRefresh={()=>{ this.getChat() }}/>
                }>
                    {
                        this.state.load ?
                        (
                            this.state.error.status ? 
                            <View style={{justifyContent:'center',alignItems:'center',marginTop:150}}>
                                <Label style={{color:theme.primaryColor}}> {this.state.error.message} </Label>
                            </View>
                            :
                            <View style={{justifyContent:'center',alignItems:'center',marginTop:150}}>
                                {loading()}
                                <Label style={{color:theme.primaryColor}}> กรุณารอสักครู่ </Label>
                            </View>
                        )
                         :
                        (
                            this.state.chatList.length !== 0 ?
                                <List>
                                    {this.chatRooms()}
                                </List>
                                :
                                <View style={{alignItems:'center',alignContent:'center',marginTop:50}}>
                                    <Text> 
                                        ไม่มีการพูดคุยกับลูกค้าในขณะนี้
                                    </Text>
                                </View>
                        )
                    }
                </Content>
                <NavFooter/>
            </Container>
        )
    }
    goToChatBox = (customer) => {
        Actions.chatbox({customer:customer})
    }

}

const mapStateToProps = (state)=>{
    return {...state}
}

export default connect(mapStateToProps)(Chat)