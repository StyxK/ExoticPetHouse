import React,{Component} from 'react'
import { Text, Container ,Left ,Body , Right , Header, Thumbnail, ListItem, List, Fab, Icon, Button} from 'native-base'
import {StyleSheet} from 'react-native'
import Axios from 'axios'
import Config from 'react-native-config'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ildpc3NhbnVwb25nIiwicGFzc3dvcmQiOiIkMmEkMTAkUHNpVGlhcFV1Y00ybDJBZ0o2T0RWT2FzNkIzM09zNy5tU0M3ZDllSnZSVmdOVzFyLnlkQS4iLCJpYXQiOjE1NTk4MzQyMjksImV4cCI6MTU2MjQyNjIyOX0.l7YlzVY4vrkUvWYsZi4iNy8xrOq-lPjoHvI02G59yVs'
const API_URL = Config.API_URL
const PIC_URI =
  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png";

export default class Profile extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            ownerProfile : {},
            fabActivate : false
        }
    }

    getProfile = () => {
        Axios.get(API_URL+'/storeowner/Wissanupong').then(
            response => {
                data = response.data
                this.setState(
                    {
                        ownerProfile : data
                    }
                )
            }
        )
    }

    componentWillMount(){
        this.getProfile();
    }

    render(){
        const { ownerProfile , fabActivate } = this.state
        return(
            <Container>
                <Header style={{ backgroundColor: "#7A5032" }}>
                    <Left style={{ flex: 2 }} />
                    <Body style={{ flex: 2.5 }}>
                        <Text style={{ color: "white" }}>ข้อมูลส่วนตัว</Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <List>
                    <ListItem>
                        <Left style={{flex:0.5}}>
                            <Thumbnail source={{uri:PIC_URI}}/>
                        </Left>
                        <Body style={{flex:2}}>
                            <Text>คุณ {ownerProfile.firstName} {ownerProfile.lastName}</Text>
                            <Text>e-mail : {ownerProfile.email}</Text>
                        </Body>
                    </ListItem>
                </List>
                <Fab
                    active = {fabActivate}
                    direction = 'up'
                    position = 'bottomRight'
                    onPress = { ()=>{ this.setState({
                        fabActivate:!fabActivate
                    })} }
                >
                <Icon name='add'/>
                <Button style={{backgroundColor:'green'}}>
                    <Icon name='logo-whatsapp'/>
                </Button>
                </Fab>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    modalContainer: {
      flex: 1,
      flexDirection: "column-reverse",
      justifyContent: "center",
      alignItems: "center",
      height: 500,
      backgroundColor: "rgba(52, 52, 52, 0.8)"
    },
    modal: {
      borderRadius: 10,
      marginBottom: 65,
      backgroundColor: "white",
      opacity: 0.99,
      width: "85%",
      marginTop: 40
    }
  });