import React,{Component} from 'react'
import { View } from 'react-native'
import { Container, Content, Text, Header, Left, Right, Body, Icon, Input, List, Footer, Button, Label } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { shopReply, userReply, getMessage, refreshChat} from '../src/actions/ChatActions'
import { connect } from 'react-redux'

class ChatBox extends Component{

    constructor(props){
        super(props)
        this.state = {
            message : '',
            messageList : []
        }
    }

    componentDidMount(){
        console.log(this.props.store.storeId,'props')
        this.props.getMessage(this.props.store.storeId,'username')
        this.setState({
            messageList: this.props.chat
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.chat != this.props.chat){
            this.setState({
                messageList : nextProps.chat
            })
        }
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
                        <Icon style={{ color: 'white' }} onPress={() => { this.goToChat() }} name='arrow-back' />
                    </Left>
                    <Body style={{ flex: 2.5 }}>
                        <Text style={{ color: "white" }}> แชทกับลูกค้า </Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <Content>
                    {this.messageDialog()}
                </Content>
                <Footer>
                    <Input onChangeText={e => {
                        this.setState({message : e})
                    }} placeholder='พิมพ์ข้อความในช่องนี้'/>
                    <Button onPress={()=>{this.submitMessage()}}>
                        <Text> submit </Text> 
                    </Button>
                </Footer>
            </Container>
        )
    }

    submitMessage = () => {
        this.props.shopReply(this.state.message,'username',this.props.store.storeId)
    }

    goToChat = () => {
        this.props.refreshChat()
        Actions.chat()
    }

}

const mapStateToProps = (chatbox) => {
    return {...chatbox}
}

export default connect(mapStateToProps,{shopReply,userReply,getMessage,refreshChat})(ChatBox)