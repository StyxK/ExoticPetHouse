import React, { Component } from 'react'
import { Container, Content, Body, Right, Text, Thumbnail, Header, Left, View, Card, CardItem, Label } from 'native-base'
import axios from 'axios'
import { Actions } from 'react-native-router-flux'
import moment from 'moment-timezone'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import { connect } from 'react-redux'
import NavFooter from '../components/NavFooter'
import { loading } from '../components/Loading'
import theme from "../theme";

class Pet extends Component {

    constructor(props) {
        super(props)
        this.state = {
            storeId: props.storeId,
            selectedIndex: 0,
            depositingPet: [],
            expiredPet: [],
            load: true,
            error: {
                message : undefined,
                status : false
            },
        }
    }

    getPetList = async () => {
        try {
            let response = await axios.get('/pet/fromStore/' + this.props.store.storeId)
            let data = await response.data
            console.log(data)
            this.setState({
                depositingPet: data.depositing,
                expiredPet: data.endOfTime,
                load: false
            })
        } catch (err) { 
            if(err.message == 'Request failed with status code 500'){
                this.setState({error:{message:'ขออภัย ขณะนี้ไม่สามารถติดต่อระบบได้',status:true}})
            }
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
        petList.length !== 0 ?
            petList.map(data => {
                list.push(
                    <Card key={data.id} style={{ marginTop: 5, marginBottom: 5, marginLeft: 10, marginRight: 10, borderRadius: 5 }}>
                        <CardItem button activeOpacity={0.8} style={{ backgroundColor: 'white', borderRadius: 5 }} onPress={() => { goToPetActivities(data, this.props.store.storeId) }}>
                            <Left style={{ flex: 1 }}>
                                {data.image ?
                                    <Thumbnail style={{ width: 80, height: 80 }} source={{ uri: data.image }} />
                                    :
                                    <Thumbnail style={{ width: 80, height: 80 }} source={require('../assets/no_image_available.jpeg')} />
                                }
                            </Left>
                            <Body style={{ flex: 2 }}>
                                <Text note style={{ color: theme.secondaryTextColor }}> ชื่อ :  <Text note> {data.name} </Text> </Text>
                                <Text note style={{ color: theme.secondaryTextColor }}> ประเภท :  <Text note> {data.typeOfPet} </Text> </Text>
                                <Text note style={{ color: theme.secondaryTextColor }}> กรง :  <Text note> {data.orderLines[0].cage.cageType.typeName} </Text> </Text>
                                {
                                    moment().unix() <= moment(data.orderLines[0].order.endDate).unix() ?
                                        <Text note style={{ color: theme.secondaryTextColor }}> สถานะ : <Text note> กำลังฝาก </Text></Text>
                                        :
                                        <Text note style={{ color: theme.secondaryTextColor }}> สถานะ : <Text note> หมดระยะเวลาฝาก </Text></Text>
                                }
                            </Body>
                        </CardItem>
                    </Card>
                )
            })
            :
            list.push(
                <View key={list.values} style={{ alignItems: 'center', alignContent: 'center', marginTop: 50 }}>
                    <Text key={"null"}>
                        ไม่มีสัตว์เลี้ยงที่อยู่ในการฝากขณะนี้
                        </Text>
                </View>
            )
        return list
    }

    render() {
        const { depositingPet, expiredPet, selectedIndex, load } = this.state
        return (
            <Container>
                <Header style={{ backgroundColor: theme.primaryColor }}>
                    <Left style={{ flex: 1 }} />
                    <Body style={{ flex: 3, alignItems: 'center' }}>
                        <Text style={{ color: theme.primaryTextColor }}>รายการสัตว์เลี้ยง</Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <View style={{ backgroundColor: theme.primaryColor }}>
                    <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                        <SegmentedControlTab
                            tabStyle={{backgroundColor:theme.primaryColor,borderColor:theme.primaryColor}}
                            tabTextStyle={{ color: theme.primaryTextColor }}
                            activeTabStyle={{ borderBottomWidth:5, borderBottomColor: theme.secondaryColor,backgroundColor:theme.primaryColor}}
                            values={['อยู่ระหว่างการฝาก', 'หมดระยะเวลาฝาก']}
                            selectedIndex={selectedIndex}
                            onTabPress={this.handleIndexChange}
                        />
                    </View>
                </View>
                <Content style={{backgroundColor:'#e6e1de'}}>
                    {
                        load ?
                        (
                            this.state.error.status ? 
                            <View style={{justifyContent:'center',alignItems:'center',marginTop:150}}>
                                <Label style={{color:theme.primaryColor}}> {this.state.error.message} </Label>
                            </View>
                            :
                            <View style={{justifyContent:'center',alignItems:'center',marginTop:150}}>
                                {loading()}
                                <Label style={{color:theme.primaryColor}}> กรุณารอสักครู่ </Label>
                            </View>
                        )
                         :
                            selectedIndex == 0 ?
                                this.petCard(depositingPet)
                                :
                                this.petCard(expiredPet)
                    }
                </Content>
                <NavFooter />
            </Container>
        )
    }

    goToPetActivities = (pet, storeId) => {
        Actions.petActivities({ pet, storeId })
    }

    goToStore = () => {
        Actions.store()
    }

}

const mapStateToProps = (store) => {
    return { ...store }
}

export default connect(mapStateToProps)(Pet)
