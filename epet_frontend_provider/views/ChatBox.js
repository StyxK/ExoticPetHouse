import React,{Component} from 'react'
import { View } from 'react-native'
import { Container, Content, Text, Header, Left, Right, Body, Icon, Input, List, Footer, Button, Label } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { shopReply, userReply, getMessage } from '../src/actions/ChatActions'
import { connect } from 'react-redux'
import axios from  'axios'

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
        axios.post('chat/getMessageInRoom',
            {
                customer : "username",
                store : this.props.store.storeId
            }
        ).then(
            result => {
                this.setState({
                    messageList : result.data
                })
                console.log(result.data,"data")
            }
        )
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.chat != this.props.chat){
            this.setState({
                messageList : nextProps.chat
            })
            console.log(nextProps.chat,'changed')
        }
    }   

    messageDialog = () => {
        let list = []
        this.state.messageList.map( data =>{
            list.push(
                data.role == 0 ?
                    <View key={data.id} style={{flexDirection:"row-reverse",backgroundColor:'blue',marginVertical:10}}>
                        <Text>
                            {data.message}
                        </Text>
                    </View>
                    :
                    <View key={data.id} style={{backgroundColor:'orange',marginVertical:10}}>
                        <Text>
                            {data.message}
                        </Text>
                    </View>
            )
        })
        console.log(list,"list")
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
        this.props.shopReply(this.state.message,'user1','shopToken')
    }

    goToChat = () => {
        Actions.chat()
    }

}

const mapStateToProps = (chatbox) => {
    return {...chatbox}
}

export default connect(mapStateToProps,{shopReply,userReply,getMessage})(ChatBox)