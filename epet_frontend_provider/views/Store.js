import React, { Component } from 'react'
import { Container, ListItem, Content, List, ActionSheet , Body, Right, Text, Button, Icon, Header, Left, Root } from 'native-base'
import NavFooter from '../components/NavFooter'
import axios from 'axios'
import { connect } from 'react-redux'
import { shopReply, userReply, getMessage } from '../src/actions/ChatActions'
import { Actions } from 'react-native-router-flux'

class Store extends Component {

    constructor(props) {
        super(props)
        this.state = {
            storeList: [],
        }
        this.props.userReply()
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

    componentDidMount() {
        this.getStoreList()
        console.log('mounted !')
    }

    render() {
        const { storeList} = this.state

        let storeFlatList = storeList.map(data => {
            return (
                <ListItem style={{borderTopColor:'black',borderBottomColor:'black',borderRadius:10}} button onPress={()=>{ this.showMenu(data.name,data.id) }} key={data.id}>
                    <Left style={{maxWidth:10,paddingLeft:5}}>
                        <Icon name="home" style={{ color : 'white' }}/>
                    </Left>
                    <Body>
                        <Text note style={{ color: 'white' }}> {data.name} </Text>
                    </Body>
                    <Right>
                        <Icon name='ios-arrow-forward' style={{ color : 'white',fontSize : 20 }}/>
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
                        <List style={{backgroundColor:'#A78B45'}}>
                            {storeFlatList}
                        </List>
                    </Content>
                    <NavFooter />
                </Container>
            </Root>
        )
    }
}

const mapStateProps = (chat) => {
    return {...chat}
}

goToPetInStore = (storeId) => {
    Actions.pet({storeId})
}

goToOrderList = (storeId) => {
    Actions.orderList({storeId})
}

export default connect(mapStateProps,{shopReply,userReply,getMessage})(Store)