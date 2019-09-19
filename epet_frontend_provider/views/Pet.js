import React, { Component } from 'react'
import { Image } from 'react-native' 
import { Container, ListItem, Content, List, Body, Right, Text, Button, Icon, Header, Left, View } from 'native-base'
import axios from 'axios'
import { Actions } from 'react-native-router-flux'
import moment from 'moment-timezone'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import {connect} from 'react-redux'
import NavFooter from '../components/NavFooter'

class Pet extends Component {

    constructor(props) {
        super(props)
        this.state = {
            storeId: props.storeId,
            selectedIndex: 0,
            depositingPet: [],
            expiredPet: []
        }
    }

    getPetList = async () => {
        try {
            let response = await axios.get('/pet/fromStore/' + this.props.store.storeId)
            let data = await response.data
            let depositing, expired = []
            await data.map(data => {
                moment().unix() <= moment(data.orderLines[0].order.endDate).unix() ?
                    depositing.push(data)
                    :
                    expired.push(data)

            })
            await this.setState({
                depositingPet: depositing,
                expiredPet: expired
            })
            await console.log(data,'pet')
        } catch (err) {
            alert(this.props.store.storeId)
        }
    }

    componentDidMount() {
        this.getPetList()
    }

    handleIndexChange = index => {
        this.setState({
            selectedIndex: index
        })
    }



    petCard = (petList) => {
        let list = []
        petList !== undefined ?
            petList.map(data => {
                list.push(
                    <List key={data.id} style={{backgroundColor:'#A78B45',borderColor:'#7A5032',marginBottom:10,borderWidth:2,borderRadius:10,marginLeft:10,marginRight:10}}>
                        <ListItem onPress={()=>{goToPetActivities(data,this.props.store.storeId)}}>
                            <Left style={{flex:1}}>
                                {data.image ? 
                                    <Image style={{width:100,height:100}} source={data.image}/> 
                                    :
                                    <Image style={{width:100,height:100}} source={require('../assets/no_image_available.jpeg')}/>
                                }
                            </Left>
                            <Body style={{flex:2}}>
                                <Text note style={{color:'#84f542'}}> ชื่อ :  <Text note style={{ color: 'white' }}> {data.name} </Text> </Text>
                                <Text note style={{color:'#84f542'}}> ประเภท :  <Text note style={{ color: 'white' }}> {data.typeOfPet} </Text> </Text>
                                <Text note style={{color:'#84f542'}}> กรง :  <Text note style={{ color: 'white' }}> {'cage'} </Text> </Text>
                                {
                                    moment().unix() <= moment(data.orderLines[0].order.endDate).unix() ?
                                        <Text note style={{color:'#84f542'}}> สถานะ : <Text note style={{ color: 'white' }}> กำลังฝาก </Text></Text>
                                        :
                                        <Text note style={{color:'#84f542'}}> สถานะ : <Text note style={{ color: 'white' }}> หมดระยะเวลาฝาก </Text></Text>
                                }
                            </Body>
                        </ListItem>
                    </List>
                )
            })
            :
            list.push(
                <View key={list.values} style={{alignItems:'center',alignContent:'center'}}>
                        <Text key={"null"}> 
                            ไม่มีสัตว์เลี้ยงที่อยู่ในระยะเวลาการฝากขณะนี้ 
                        </Text>
                </View>
            )
        return list
    }

    render() {
        const { depositingPet, expiredPet, selectedIndex } = this.state
        return (
            <Container>
                <Header style={{ backgroundColor: "#7A5032" }}>
                    <Left style={{ flex: 2 }} />
                    <Body style={{ flex: 2.5 }}>
                        <Text style={{ color: "white" }}>รายการสัตว์เลี้ยง</Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <View style={{ margin: 10 }}>
                    <SegmentedControlTab
                        tabStyle={{borderColor:'#7A5032'}}
                        tabTextStyle={{color:'#7A5032'}}
                        activeTabStyle={{backgroundColor:'#7A5032'}}
                        values={['อยู่ระหว่างการฝาก', 'หมดระยะเวลาฝาก']}
                        selectedIndex={selectedIndex}
                        onTabPress={this.handleIndexChange}
                    />
                </View>
                <Content>
                    {
                        selectedIndex == 0 ?
                            this.petCard(depositingPet)
                            :
                            this.petCard(expiredPet)
                    }
                </Content>
                <NavFooter/>
            </Container>
        )
    }

    goToPetActivities = (pet,storeId) => {
        Actions.petActivities({pet,storeId})
    }
    
    goToStore = () => {
        Actions.store()
    }
 
}

const mapStateToProps = (store) => {
    return {...store}
}

export default connect(mapStateToProps)(Pet)
