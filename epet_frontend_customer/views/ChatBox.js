import React, { Component } from "react";
import { View } from "react-native";
import {
  Container,
  Content,
  Text,
  Header,
  Left,
  Right,
  Body,
  Icon,
  Input,
  Footer,
  Button
} from "native-base";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { duration } from "moment";
import theme from "../theme";
import axios from 'axios';
import moment from 'moment-timezone'
import AutoScroll from 'react-native-auto-scroll'
import Config from 'react-native-config'
import io from 'socket.io-client'
const socket = io.connect(Config.SOCKET_URL).emit('customer')

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messageList: []
    };
  }

  componentDidMount() {
    this.getMessage()
  }

  componentWillUpdate(){
    socket.on('shopSend', data=> {
      this.getMessage()
    })
  }

  getMessage = () =>{
    axios.post('chat/getMessageInRoom',
        {
            customer : this.props.user.userName ,
            store : this.props.storeId
        }
        ).then(
            result => {
              this.setState({
                messageList: result.data
              });
            }
        )
  }

  userReply = () => {
    socket.emit('customer',{message:this.state.message,customerUsername:this.props.user.userName,store:this.props.storeId,role:1,time: moment().unix()})
    socket.once('customerSend',async data=>{
        this.getMessage()
    })
  }

  messageDialog = () => {
    let list = [];
    this.state.messageList.map(data => {
      list.push(
        data.role == 1 ? (
          <View key={data.id}>
            <View style={{ flexDirection: "row-reverse", padding: 5 }}>
              <View
                style={{ borderRadius: 5, backgroundColor: "blue", padding: 7 }}
              >
                <Text style={{ color: "white" }}>{data.message}</Text>
              </View>
              <View style={{ marginRight: 4, justifyContent: "flex-end" }}>
                <Text note style={{ alignSelf: "flex-end", fontSize: 12.5 }}>
                  {console.log(
                    duration(parseInt(data.time), "seconds"),
                    "duration"
                  )}
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
        ) : (
            <View key={data.id}>
              <View style={{ flexDirection: "row", padding: 5 }}>
                <View
                  style={{
                    borderRadius: 5,
                    backgroundColor: "green",
                    padding: 7
                  }}
                >
                  <Text style={{ color: "white" }}>{data.message}</Text>
                </View>
                <View style={{ marginRight: 4, justifyContent: "flex-end" }}>
                  <Text note style={{ alignSelf: "flex-end", fontSize: 12.5 }}>
                    {console.log(
                      duration(parseInt(data.time), "seconds"),
                      "duration"
                    )}
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
      );
    });
    console.log(this.props,'ขอกินผักโขมอบชีสก่อน')
    return list;
  };

  render(){
    return (
      <Container>
        <Header style={{ backgroundColor: theme.primaryColor }}>
          <Left style={{ flex: 2 }}>
            <Button rounded transparent onPress={() => { this.goToChat() }}>
              <Icon
                style={{ color: theme.primaryTextColor }}
                name="arrow-back"
              />
            </Button>
          </Left>
          <Body style={{ flex: 2.5 }}>
            <Text style={{ color: theme.primaryTextColor }}> แชทกับร้าน </Text>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <AutoScroll>{this.messageDialog()}</AutoScroll>
        <Footer style={{justifyContent:'center',alignItems:'center'}}>
          <Left style={{padding:5,flex:6}}>
            <Input
              onChangeText={e => {
                this.setState({ message: e });
              }}
              value={this.state.message}
              placeholder="พิมพ์ข้อความในช่องนี้"
              style={{ backgroundColor: "white",borderRadius:10 ,width:'100%'}}
            />
          </Left>
          <Right style={{flex:1}}>
            <Button transparent
              onPress={() => {
                this.submitMessage();
              }}
              style={{justifyContent:'center'}}
            >
              <Icon name='md-send' style={{color:'white'}}/>
            </Button>
          </Right>
        </Footer>
      </Container>
    );
  }

  submitMessage = () => {
    this.userReply()
    this.setState({
      message: null
    });
  };

  goToChat = () => {
    Actions.chat();
  };
}

const mapStateToProps = chatbox => {
  return { ...chatbox };
};

export default connect(
  mapStateToProps
)(ChatBox);
