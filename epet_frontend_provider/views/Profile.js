import React, { Component } from 'react'
import { Text, Container, Left, Body, Right, Header, Thumbnail, ListItem, List, Fab, Icon, Button, Content, Label, Card, CardItem, View, FooterTab, Title } from 'native-base'
import axios from 'axios'
import { Alert ,Image,ImageBackground} from 'react-native'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { setStore,resetStore } from '../src/actions/StoreAction'
import { logout } from '../src/actions/UserActions'
import NavFooter from '../components/NavFooter'
import { persistor } from '../src/configStore'
import theme from "../theme";
import Corousel from 'react-native-snap-carousel'
import Rating from 'react-native-star-rating'
import { initialLoad } from '../components/Loading'

const PIC_URI =
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png";

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ownerProfile: {},
            storeList: [],
            fabActivate: false,
            load:true
        }
    }

    getProfile = () => {
        axios.get('/storeowner/Me').then(
            response => {
                data = response.data
                this.setState(
                    {
                        load:false,
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
                console.log(data)
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

    renderItem = ({item}) => {
        let image
        item.image == null ?
            image = require('../assets/no_image_available.jpeg')
            :
            image = {uri:item.image}
        return (
            <Card style={{flex:5,borderRadius:10}}>
                <ImageBackground
                    source={image}
                    imageStyle={{borderRadius:10}}
                    style={{flex:1,resizeMode:'cover',borderRadius:10}}
                >
                    <CardItem style={{justifyContent:'flex-end',alignContent:'center',flex:3,borderTopLeftRadius:10,borderTopRightRadius:10,backgroundColor:'rgba(0,0,0,0)'}}>
                        <Right style={{flexDirection:'column-reverse'}}>
                            <Button style={{ backgroundColor:theme.primaryColor3,margin:5}} rounded onPress={() => goToStoreManager(item)}>
                                <Icon style={{fontSize:20}} name='edit' type='AntDesign'/>
                            </Button>
                            {
                                item.id == this.props.store.storeId ?
                                    <Button disabled rounded style={{margin:5}}>
                                        <Icon style={{fontSize:20}} name='home' type='AntDesign'/>
                                    </Button>
                                    :
                                    <Button style={{ backgroundColor:theme.primaryColor,margin:5}} rounded onPress={() => { this.props.setStore(item.id); Actions.reset('profile') }}>
                                        <Icon style={{fontSize:20}} name='check' type='AntDesign'/>
                                    </Button>
                            }
                        </Right>
                    </CardItem>
                    <CardItem style={{flex:2,backgroundColor:'rgba(0,0,0,0)'}}/>
                    <CardItem header style={{flex:2,borderBottomLeftRadius:10,borderBottomRightRadius:10,backgroundColor:'rgba(0,0,0,0.5)',flexDirection:'column'}}>
                        <Body style={{flex:2}}>
                            <Title style={{ fontSize:20,color: 'white'}}> {item.name} </Title>
                        </Body>
                        <Body style={{flex:1}}>
                            <Rating
                                disabled={true}
                                emptyStar={"ios-star-outline"}
                                fullStar={"ios-star"}
                                halfStar={"ios-star-half"}
                                iconSet={"Ionicons"}
                                maxStars={5}
                                rating={item.rating}
                                fullStarColor={"orange"}
                                starSize={25}
                            />
                        </Body>
                    </CardItem>
                </ImageBackground>
            </Card>
        )
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
        const { load , ownerProfile, storeList } = this.state

        return (
            load ?
                initialLoad()
                :
                <Container>
                    <Header style={{ backgroundColor: theme.primaryColor}}>
                        <Left style={{ flex: 1 }} />
                        <Body style={{ flex: 3 , alignItems:'center' }}>
                            <Text style={{ color: "white" }}>โปรไฟล์</Text>
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
                    </List>
                    <ListItem noBorder itemDivider style={{backgroundColor: theme.primaryColor,height:50}}>
                        <Body>
                            <Text style={{color:'white'}}> การจัดการร้านรับฝาก </Text>
                        </Body>
                        <Button small rounded style={{backgroundColor:theme.primaryColor3}} onPress={() => { this.goToCreateStore() }}>
                            <Text> ตั้งร้านเพิ่ม </Text>
                        </Button>
                    </ListItem>
                    <View style={{flex:1,padding:5,justifyContent:'center',alignItems:'center',backgroundColor:theme.backgroundColor}}>
                        <Corousel
                            data={storeList}
                            renderItem={this.renderItem}
                            sliderWidth={500}
                            itemWidth={300}
                        />
                    </View>
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