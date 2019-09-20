import React,{Component} from 'react'
import { View } from 'react-native'
import { Container, Content, Text, Header, Left, Right, Body, Icon, Input, Footer, Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { shopReply, userReply, getMessage, refreshChat} from '../src/actions/ChatActions'
import { connect } from 'react-redux'
import { duration } from 'moment-timezone'

class ChatBox extends Component{

    constructor(props){
        super(props)
        this.state = {
            message : '',
            messageList : []
        }
        this.chatView = React.createRef()
    }

    componentDidUpdate(){
        this.scrollToBottom()
    }
    
    componentDidMount(){
        this.props.getMessage(this.props.customer,this.props.store.storeId)
        this.setState({
            messageList: this.props.chat
        })
    }

    async componentWillReceiveProps(nextProps){
        if(nextProps.chat != this.props.chat){
            await this.setState({
                messageList : nextProps.chat
            })
            await console.log("update")
            await this.scrollToBottom()
        }
    }   

    scrollToBottom = () => {
        this.chatView.current == null ? 
        console.log('my content component is null'): this.chatView.current._root.scrollToEnd()
    }

    messageDialog = () => {
        let list = []
        this.state.messageList.map( data =>{
            list.push(
                data.role == 0 ?
                    <View key={data.id}>
                        <View style={{flexDirection:"row-reverse",padding:5}}>
                            <View style={{borderRadius:5,backgroundColor:'blue',padding:7}}>
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
            <Container>
                <Header style={{ backgroundColor: "#7A5032" }}>
                    <Left style={{ flex: 2 }} >
                        <Icon style={{ color: 'white' }} onPress={() => { this.goToChat() }} name='ios-arrow-back' />
                    </Left>
                    <Body style={{ flex: 2.5 }}>
                        <Text style={{ color: "white" }}> แชทกับลูกค้า </Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <Content ref={this.chatView}>
                    {this.messageDialog()}
                </Content>
                <Footer>
                    <Input onChangeText={e => {
                        this.setState({message : e})
                    }} placeholder='พิมพ์ข้อความในช่องนี้'/>
                    <Button onPress={()=>{ this.submitMessage() }}>
                        <Text> submit </Text> 
                    </Button>
                </Footer>
            </Container>
        )
    }

    submitMessage = () => {
        this.props.shopReply(this.state.message,this.props.customer,this.props.store.storeId)
    }

    goToChat = () => {
        this.props.refreshChat()
        Actions.pop()
    }

}

const mapStateToProps = (chatbox) => {
    return {...chatbox}
}

export default connect(mapStateToProps,{shopReply,userReply,getMessage,refreshChat})(ChatBox)