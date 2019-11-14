import React, { Component } from 'react'
import { Text, Container, Left, Body, Right, Header, Thumbnail, ListItem, List, Fab, Icon, Button, Content, Label } from 'native-base'
import axios from 'axios'
import { Alert } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { setStore,resetStore } from '../src/actions/StoreAction'
import { logout } from '../src/actions/UserActions'
import NavFooter from '../components/NavFooter'
import { persistor } from '../src/configStore'
import theme from "../theme";

const PIC_URI =
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png";

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ownerProfile: {},
            storeList: [],
            fabActivate: false
        }
    }

    getProfile = () => {
        axios.get('/storeowner/Me').then(
            response => {
                data = response.data
                this.setState(
                    {
                        ownerProfile: data
                    }
                )
            }
        )
    }

    getStoreList = () => {
        axios.get('/store/list/owner').then(
            response => {
                data = response.data
                this.setState({
                    storeList: data
                })
            }
        )
    }

    logout = async () => {
        Alert.alert('','ยืนยันการออกจากระบบ',[
            {
                text:'ยืนยัน',
                onPress:async ()=>{
                    await persistor.purge()
                    await Actions.reset('login')
                },
            },
            {
                text:'ยกเลิก',
                style:'cancel'
            }
        ])
    }
    
    goToCreateStore = () => {
        this.props.user.approved ? Actions.createStore() : alert('กรุณาติดต่อบริษัทเพื่ออนุมัติการตั้งร้าน')
    }

    componentWillMount() {
        axios.defaults.headers.common['Authorization'] = this.props.user.token;
        this.getProfile()
        this.getStoreList()
    }

    render() {
        const { ownerProfile, storeList } = this.state

        let storeFlatList = storeList.map(data => {
            return (
                <List key={data.id}>
                    <ListItem noBorder>
                        <Body style={{ flex: 3 }}>
                            <Text note> ชื่อร้าน : <Text note style={{ color: 'black' }}> {data.name} </Text> </Text>
                            <Text note> เบอร์โทรศัพท์ : <Text note style={{ color: 'black' }}> {data.phoneNumber} </Text> </Text>
                            <Text note> คะแนนร้าน : <Text note style={{ color: 'black' }}> {data.rating} </Text> </Text>
                        </Body>
                        <Right style={{ flex: 2, flexDirection: 'row-reverse' }}>
                            <Button style={{ flex: 1 , backgroundColor:theme.primaryColor3}} rounded onPress={() => goToStoreManager(data)}>
                                <Label style={{ fontSize: 10, color: 'white' }}> จัดการ </Label>
                            </Button>
                            {
                                data.id == this.props.store.storeId ?
                                    <Button style={{ flex: 2, marginRight: 5 }} disabled rounded>
                                        <Label style={{ fontSize: 10, color: 'white' }}> เลือกร้านนี้อยู่ </Label>
                                    </Button>
                                    :
                                    <Button style={{ flex: 2, marginRight: 5 ,backgroundColor:theme.primaryColor}} rounded onPress={() => { this.props.setStore(data.id) }}>
                                        <Label style={{ fontSize: 10, color: 'white' }}> เลือกร้าน </Label>
                                    </Button>
                            }
                        </Right>
                    </ListItem>
                </List>
            )
        })

        return (
            <Container>
                <Header style={{ backgroundColor: theme.primaryColor}}>
                    <Left style={{ flex: 1 }} />
                    <Body style={{ flex: 3 , alignItems:'center' }}>
                        <Text style={{ color: "white" }}>สวัสดี</Text>
                    </Body>
                    <Right style={{ flex: 1 }} >
                        <Icon name='exit' style={{color:'white'}} onPress={()=>this.logout()}/>
                    </Right>
                </Header>
                <List>
                    <ListItem noBorder>
                        <Left style={{ flex: 0.5 }}>
                            <Thumbnail source={{ uri: PIC_URI }} />
                        </Left>
                        <Body style={{ flex: 2 }}>
                            <Text>คุณ {ownerProfile.firstName} {ownerProfile.lastName}</Text>
                            <Text/>
                            <Text>ID : {ownerProfile.userName}</Text>
                        </Body>
                    </ListItem>
                </List>
                <ListItem noBorder itemDivider style={{backgroundColor: theme.primaryColor}}>
                    <Text style={{color:'white'}}> การจัดการร้านรับฝาก </Text>
                    <Button small rounded style={{backgroundColor:theme.primaryColor3}} onPress={() => { this.goToCreateStore() }}>
                        <Text> ตั้งร้านเพิ่ม </Text>
                    </Button>
                </ListItem>
                <Content>
                    {storeFlatList}
                </Content>
                <NavFooter />
            </Container>
        )
    }
}

goToStoreManager = (store) => {
    Actions.storeManager({ store })
}


const mapStateToProps = (store) => {
    return { ...store }
}

export default connect(mapStateToProps, { setStore,resetStore,logout })(Profile)