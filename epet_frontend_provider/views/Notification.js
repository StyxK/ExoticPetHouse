import React,{Component} from 'react'
import { Container, Text, Header,Left,Body,Right,Icon, Content, ListItem, Label, List } from 'native-base'
import {connect} from 'react-redux'
import NavFooter from '../components/NavFooter'
import moment from 'moment-timezone'
import theme from "../theme";
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

class Notification extends Component{

    constructor(props){
        super(props)
        this.state = {
            notificationList:[]
        }
    }

    componentDidMount(){
        this.getNotification()
    }

    getNotification = async () => {
        const response = await axios.get(`/notification/store/${this.props.store.storeId}`)
        const data = response.data
        this.setState({notificationList:data})
    }

    renderList = () => {
        let list = []
        this.state.notificationList.map(data=>{
            const message = JSON.parse(data.message)
            list.push(
                <ListItem key={data.id}>
                    <Label>{data.id}</Label>
                    <Label>รายการของ {message.customerUsername} อยู่ในสถานะ</Label>
                    <Label>{data.millisec}</Label>
                </ListItem>
            )
        })
        return list
    }

    render(){
        return(
            <Container>
                <Header style={{ backgroundColor: theme.primaryColor }}>
                    <Left style={{ flex: 1 }} />
                    <Body style={{ flex: 3 ,alignItems:'center'}}>
                        <Text style={{ color: "white" }}> การแจ้งเตือน </Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <Content>
                    <List>
                        {this.renderList()}
                    </List>
                </Content>
                <NavFooter/>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {...state}
}

export default connect(mapStateToProps)(Notification)