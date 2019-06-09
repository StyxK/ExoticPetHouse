import React,{Component} from 'react'
import {} from 'react-native'
import { Container, Text , Header , Left , Body , Right , Fab , Icon , Button, ListItem, List} from 'native-base'
import Config from 'react-native-config';
import Axios from 'axios';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ildpc3NhbnVwb25nIiwicGFzc3dvcmQiOiIkMmEkMTAkUHNpVGlhcFV1Y00ybDJBZ0o2T0RWT2FzNkIzM09zNy5tU0M3ZDllSnZSVmdOVzFyLnlkQS4iLCJpYXQiOjE1NTk4MzQyMjksImV4cCI6MTU2MjQyNjIyOX0.l7YlzVY4vrkUvWYsZi4iNy8xrOq-lPjoHvI02G59yVs'
const API_URL = Config.API_URL

export default class StoreManager extends Component{

    getStoreList = ()=>{
    }

    componentWillMount(){
    }

    constructor(props){
        super(props)
        this.state = {
            fabActivate : false
        }
    }

    render(){
        const { store } = this.props
        return (
            <Container>
                <Header style={{ backgroundColor: "#7A5032" }}>
                    <Left style={{ flex: 2 }} />
                    <Body style={{ flex: 2 }}>
                        <Text style={{ color: "white" }}>จัดการร้าน</Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <Text> ชื่อร้าน : {store.name} </Text>
                <Text> ชื่อร้าน : {store.phoneNumber} </Text>
            </Container>
        )
    }
}