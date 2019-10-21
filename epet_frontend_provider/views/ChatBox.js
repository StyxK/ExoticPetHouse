import React,{Component} from 'react'
import { View } from 'react-native'
import { Container, Content, Text, Header, Left, Right, Body, Icon, Input, Footer, Button, Card, Label } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { duration } from 'moment-timezone'
import AutoScroll from 'react-native-auto-scroll'
import theme from "../theme";
import axios from 'axios';
import moment from 'moment-timezone'
import Config from 'react-native-config'
import io from 'socket.io-client'
const socket = io.connect(Config.SOCKET_URL).emit('shop')

class ChatBox extends Component{

    constructor(props){
        super(props)
        this.state = {
            message : '',
            messageList : []
        }
    }
    
    componentDidMount(){
        this.fetchMessage()
    }

    componentWillUpdate(){
        socket.on('customerSend', data=> {
            console.log(data,'from server')
            this.fetchMessage()
        })
    }

    fetchMessage = () => {
        console.log('wow js')
        axios.post('chat/getMessageInRoom',
            {
                customer : this.props.customer ,
                store : this.props.store.storeId
            }
        ).then(
            result => {
                console.log(result.data)
                this.setState({
                    messageList: result.data
                })
            }
        )
    }
    
    shopReply = (message,customer,store) => {
        socket.emit('shop',{message:message,customerUsername:customer,store:store,role:0,time: moment().unix()})
        console.log(moment().unix(),'mili')
        socket.once('shopSend',async data=>{
            this.fetchMessage()
        })
    }
    
    messageDialog = () => {
        let list = []
        this.state.messageList.map( data =>{
            list.push(
                data.role == 0 ?
                    <View key={data.id}>
                        <View style={{flexDirection:"row-reverse",padding:5}}>
                            <Card style={{borderRadius:5,backgroundColor:'blue',padding:7}}>
                                <Label style={{color:'white'}}>
                                    {data.message}
                                </Label>
                            </Card>
                            <View style={{marginRight:4,justifyContent:'flex-end'}}>
                                <Text note style={{alignSelf:'flex-end',fontSize: 12.5,color:'white'}}>
                                {
                                    (
                                        7+duration(parseInt(data.time),'seconds').hours() > 24 ? 
                                            '0'+(7+duration(parseInt(data.time),'seconds').hours() - 24) : 7+duration(parseInt(data.time),'seconds').hours() 
                                    )
                                    + ':' + 
                                    (
                                        duration(parseInt(data.time),'seconds').minutes() < 10 ?
                                            '0'+duration(parseInt(data.time),'seconds').minutes()
                                            :
                                            duration(parseInt(data.time),'seconds').minutes()
                                    )
                                }
                                </Text>
                            </View>
                        </View>
                    </View>
                    :
                    <View key={data.id}>
                        <View style={{flexDirection:"row",padding:5}}>
                            <View style={{borderRadius:5,backgroundColor:'green',padding:7}}>
                                <Text style={{color:'white'}}>
                                    {data.message}
                                </Text>
                            </View>
                            <View style={{marginRight:4,justifyContent:'flex-end'}}>
                                <Text note style={{alignSelf:'flex-end',fontSize: 12.5}}>
                                {
                                    (
                                        7+duration(parseInt(data.time),'seconds').hours() > 24 ? 
                                            '0'+(7+duration(parseInt(data.time),'seconds').hours() - 24) : 7+duration(parseInt(data.time),'seconds').hours() 
                                    )
                                    + ':' + 
                                    (
                                        duration(parseInt(data.time),'seconds').minutes() < 10 ?
                                            '0'+duration(parseInt(data.time),'seconds').minutes()
                                            :
                                            duration(parseInt(data.time),'seconds').minutes()
                                    )
                                }
                                </Text>
                            </View>
                        </View>
                    </View>
            )
        })
        return list
    }

    render(){
        return (
            <Container style={{backgroundColor:"rgba(128,128,128,.5)"}}>
                <Header style={{ backgroundColor: theme.primaryColor }}>
                    <Left style={{ flex: 1 }} >
                        <Icon style={{ color: 'white' }} onPress={() => { this.goToChat() }} name='ios-arrow-back' />
                    </Left>
                    <Body style={{ flex: 3 ,alignItems:'center'}}>
                        <Text style={{ color: "white" }}> {this.props.customer} </Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <AutoScroll>
                    {this.messageDialog()}
                </AutoScroll>
                <Footer style={{backgroundColor:'white'}}>
                    <Body style={{flex:3}}>
                        <Input onChangeText={e => {
                            this.setState({message : e})
                        }} placeholder='พิมพ์ข้อความ'/>
                    </Body>
                    <Right style={{flex:0.5}}>
                        <Button full onPress={()=>{ this.submitMessage() }} style={{alignItems:'center',marginRight:5}}>
                            <Icon name="md-send"/>
                        </Button>
                    </Right>
                </Footer>
            </Container>
        )
    }

    submitMessage = () => {
        this.shopReply(this.state.message,this.props.customer,this.props.store.storeId)
    }

    goToChat = () => {
        Actions.pop()
    }

}

const mapStateToProps = (chatbox) => {
    return {...chatbox}
}

export default connect(mapStateToProps)(ChatBox)