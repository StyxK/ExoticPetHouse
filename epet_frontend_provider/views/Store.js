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
        let response = await axios.get('/store')
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
                <ListItem key={data.id}>
                    <Body>
                        <Text note> ชื่อร้าน : <Text note style={{ color: 'black' }}> {data.name} </Text> </Text>
                    </Body>
                    <Right>
                        <Button rounded onPress={() => { goToPetInStore(data.id) }}>
                            <Icon name='arrow-back' style={{ fontSize: 10 }} />
                        </Button>
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
    alert("Go to pet")
    Actions.pet({storeId})
}