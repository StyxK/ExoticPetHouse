import React, { Component } from 'react'
import { Text, Container, Left, Body, Right, Header, Thumbnail, ListItem, List, Fab, Icon, Button, Content, Label } from 'native-base'
import { StyleSheet } from 'react-native'
import axios from 'axios'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { setStore,resetStore } from '../src/actions/StoreAction'
import { logout } from '../src/actions/UserActions'
import NavFooter from '../components/NavFooter'

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
        await this.props.logout()
        await this.props.resetStore()
        Actions.reset('login')
    }

    componentWillMount() {
        console.log(this.props.user.token, 'token')
        axios.defaults.headers.common['Authorization'] = this.props.user.token;
        this.getProfile()
        this.getStoreList()
    }

    render() {
        const { ownerProfile, storeList } = this.state

        let storeFlatList = storeList.map(data => {
            return (
                <ListItem key={data.id}>
                    <Body style={{ flex: 3 }}>
                        <Text note onPress={() => { alert(data.name) }}> ชื่อร้าน : <Text note style={{ color: 'black' }}> {data.name} </Text> </Text>
                        <Text note> เบอร์โทรศัพท์ : <Text note style={{ color: 'black' }}> {data.phoneNumber} </Text> </Text>
                        <Text note> คะแนนร้าน : <Text note style={{ color: 'black' }}> {data.rating} </Text> </Text>
                    </Body>
                    <Right style={{ flex: 2, flexDirection: 'row-reverse' }}>
                        <Button style={{ flex: 1 }} rounded onPress={() => goToStoreManager(data)}>
                            <Label style={{ fontSize: 10, color: 'white' }}> จัดการ </Label>
                        </Button>
                        {
                            data.id == this.props.store.storeId ?
                                <Button style={{ flex: 2, marginRight: 5 }} disabled rounded>
                                    <Label style={{ fontSize: 10, color: 'white' }}> เลือกร้านนี้อยู่ </Label>
                                </Button>
                                :
                                <Button style={{ flex: 2, marginRight: 5 }} rounded onPress={() => { this.props.setStore(data.id) }}>
                                    <Label style={{ fontSize: 10, color: 'white' }}> เลือกร้าน </Label>
                                </Button>
                        }
                    </Right>
                </ListItem>
            )
        })

        return (
            <Container>
                <Header style={{ backgroundColor: "#7A5032" }}>
                    <Left style={{ flex: 2 }} />
                    <Body style={{ flex: 2.5 }}>
                        <Text style={{ color: "white" }}>ข้อมูลส่วนตัว</Text>
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
                        </Body>
                    </ListItem>
                    <ListItem noBorder itemDivider >
                        <Text> การจัดการร้านรับฝาก </Text>
                        <Button small rounded onPress={() => { goToCreateStore() }}><Text> ตั้งร้านเพิ่ม </Text></Button>
                    </ListItem>
                </List>
                <Content>
                    <List>
                        {storeFlatList}
                    </List>
                </Content>
                <NavFooter />
            </Container>
        )
    }
}

goToStoreManager = (store) => {
    Actions.storeManager({ store })
}

goToCreateStore = () => {
    Actions.createStore()
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

const mapStateToProps = (store) => {
    return { ...store }
}

export default connect(mapStateToProps, { setStore,resetStore,logout })(Profile)