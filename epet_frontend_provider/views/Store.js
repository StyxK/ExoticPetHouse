import React, { Component } from 'react'
import { Container, ListItem, Content, List, Body, Right, Text, Button, Icon, Header, Left } from 'native-base'
import NavFooter from '../components/NavFooter'
import axios from 'axios'
import { Actions } from 'react-native-router-flux'

export default class Store extends Component {

    constructor(props) {
        super(props)
        this.state = {
            storeList: []
        }
    }

    getStoreList = async () => {
        let response = await axios.get('/store/list/owner')
        let data = await response.data
        await this.setState({
            storeList: data
        })
    }

    componentWillMount() {
        this.getStoreList()
    }

    render() {
        const { storeList } = this.state

        let storeFlatList = storeList.map(data => {
            return (
                <ListItem button onPress={()=>{goToPetInStore(data.id)}} key={data.id}>
                    <Left style={{maxWidth:10}}>
                        <Icon name="home"/>
                    </Left>
                    <Body>
                        <Text note> ชื่อร้าน : <Text note style={{ color: 'black' }}> {data.name} </Text> </Text>
                    </Body>
                    <Right>
                        <Icon name='ios-arrow-forward' color='black' fontSize='20' />
                    </Right>
                </ListItem>
            )
        })

        return (
            <Container>
                <Content>
                    <Header style={{ backgroundColor: "#7A5032" }}>
                        <Left style={{ flex: 2 }} />
                        <Body style={{ flex: 2.5 }}>
                            <Text style={{ color: "white" }}>รายการร้าน</Text>
                        </Body>
                        <Right style={{ flex: 1 }} />
                    </Header>
                    <List>
                        {storeFlatList}
                    </List>
                </Content>
                <NavFooter />
            </Container>
        )
    }
}

goToPetInStore = (storeId) => {
    Actions.pet({storeId})
}