import React, { Component } from 'react'
import { Container, ListItem, Content, List, ActionSheet , Body, Right, Text, Button, Icon, Header, Left, Root } from 'native-base'
import NavFooter from '../components/NavFooter'
import axios from 'axios'
import { Actions } from 'react-native-router-flux'

export default class Store extends Component {

    constructor(props) {
        super(props)
        this.state = {
            storeList: [],
        }
    }

    getStoreList = async () => {
        let response = await axios.get('/store/list/owner')
        let data = await response.data
        await this.setState({
            storeList: data
        })
    }

    showMenu = (storeName,storeId)=>{
        ActionSheet.show({
            options : [{text:'สัตว์เลี้ยงในร้าน'},{text:'รายการฝากของร้าน'},{text:'กลับ'}],
            cancelButtonIndex : 0,
            title : storeName
        },onSelected => {
            if(onSelected == 0){
                goToPetInStore(storeId)
            }
            else if(onSelected == 1){
                goToOrderList(storeId)
            }
        })
    }

    componentWillMount() {
        this.getStoreList()
    }

    render() {
        const { storeList} = this.state

        let storeFlatList = storeList.map(data => {
            return (
                <ListItem button onPress={()=>{ this.showMenu(data.name,data.id) }} key={data.id}>
                    <Left style={{maxWidth:10}}>
                        <Icon name="home"/>
                    </Left>
                    <Body>
                        <Text note> ชื่อร้าน : <Text note style={{ color: 'black' }}> {data.name} </Text> </Text>
                    </Body>
                    <Right>
                        <Icon name='ios-arrow-forward' fontSize='20' />
                    </Right>
                </ListItem>
            )
        })

        return (
            <Root>
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
            </Root>
        )
    }
}

goToPetInStore = (storeId) => {
    Actions.pet({storeId})
}

goToOrderList = (storeId) => {
    Actions.orderList({storeId})
}