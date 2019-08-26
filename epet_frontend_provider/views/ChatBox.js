import React,{Component} from 'react'
import { Container, Content, Text, Header, Left, Right, Body, Icon, Input, FooterTab, Footer, Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { shopReply, userReply } from '../src/actions/ChatActions'
import { connect } from 'react-redux'

class ChatBox extends Component{

    constructor(props){
        super(props)
        this.state = {
            message : ''
        }
    }

    render(){
        const { message } = this.state
        return (
            <Container>
                <Content>
                    <Header style={{ backgroundColor: "#7A5032" }}>
                        <Left style={{ flex: 2 }} >
                            <Icon style={{ color: 'white' }} onPress={() => { this.goToChat() }} name='arrow-back' />
                        </Left>
                        <Body style={{ flex: 2.5 }}>
                            <Text style={{ color: "white" }}> แชทกับลูกค้า </Text>
                        </Body>
                        <Right style={{ flex: 1 }} />
                    </Header>
                    <Text>
                        Hello
                    </Text>
                </Content>
                <Footer>
                    <Input onChangeText={e => this.setState({massage:e})} placeholder='พิมพ์ข้อความในช่องนี้'/>
                    <Button onPress={()=>{this.submitMessage()}}>
                        <Text> submit </Text> 
                    </Button>
                </Footer>
            </Container>
        )
    }

    submitMessage = () => {
        this.props.shopReply(this.state.message,'user1','shopToken')
        // console.log(this.state.massage)
    }

    goToChat = () => {
        Actions.chat()
    }
}

const mapStateToProps = (chatbox) => {
    return {...chatbox}
}

export default connect(mapStateToProps,{shopReply,userReply})(ChatBox)