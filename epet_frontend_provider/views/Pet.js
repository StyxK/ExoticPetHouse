import React, { Component } from 'react'
import { Container, Content, Body, Right, Text, Thumbnail, Header, Left, View, Card, CardItem, Label } from 'native-base'
import axios from 'axios'
import { Actions } from 'react-native-router-flux'
import moment from 'moment-timezone'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import { connect } from 'react-redux'
import NavFooter from '../components/NavFooter'
import { loading } from '../components/Loading'

class Pet extends Component {

    constructor(props) {
        super(props)
        this.state = {
            storeId: props.storeId,
            selectedIndex: 0,
            depositingPet: [],
            expiredPet: [],
            load: true
        }
    }

    getPetList = async () => {
        try {
            let response = await axios.get('/pet/fromStore/' + this.props.store.storeId)
            let data = await response.data
            let depositing = []
            let expired = []
            await data.map(data => {
                moment().unix() <= moment(data.orderLines[0].order.endDate).unix() ?
                    depositing.push(data)
                    :
                    expired.push(data)

            })
            await this.setState({
                depositingPet: depositing,
                expiredPet: expired,
                load: false
            })
        } catch (err) { }
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
                        <CardItem button activeOpacity={0.8} style={{ backgroundColor: '#A78B45', borderRadius: 5 }} onPress={() => { goToPetActivities(data, this.props.store.storeId) }}>
                            <Left style={{ flex: 1 }}>
                                {data.image ?
                                    <Thumbnail style={{ width: 80, height: 80 }} source={{ uri: data.image }} />
                                    :
                                    <Thumbnail style={{ width: 80, height: 80 }} source={require('../assets/no_image_available.jpeg')} />
                                }
                            </Left>
                            <Body style={{ flex: 2 }}>
                                <Text note style={{ color: '#84f542' }}> ชื่อ :  <Text note style={{ color: 'white' }}> {data.name} </Text> </Text>
                                <Text note style={{ color: '#84f542' }}> ประเภท :  <Text note style={{ color: 'white' }}> {data.typeOfPet} </Text> </Text>
                                <Text note style={{ color: '#84f542' }}> กรง :  <Text note style={{ color: 'white' }}> {data.orderLines[0].cage.name} </Text> </Text>
                                {
                                    moment().unix() <= moment(data.orderLines[0].order.endDate).unix() ?
                                        <Text note style={{ color: '#84f542' }}> สถานะ : <Text note style={{ color: 'white' }}> กำลังฝาก </Text></Text>
                                        :
                                        <Text note style={{ color: '#84f542' }}> สถานะ : <Text note style={{ color: 'white' }}> หมดระยะเวลาฝาก </Text></Text>
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
                <Header style={{ backgroundColor: "#7A5032" }}>
                    <Left style={{ flex: 1 }} />
                    <Body style={{ flex: 3, alignItems: 'center' }}>
                        <Text style={{ color: "white" }}>รายการสัตว์เลี้ยง</Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <View style={{ backgroundColor: '#7A5032' }}>
                    <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                        <SegmentedControlTab
                            tabStyle={{ borderColor: '#A78B45' }}
                            tabTextStyle={{ color: '#A78B45' }}
                            activeTabStyle={{ backgroundColor: '#A78B45' }}
                            values={['อยู่ระหว่างการฝาก', 'หมดระยะเวลาฝาก']}
                            selectedIndex={selectedIndex}
                            onTabPress={this.handleIndexChange}
                        />
                    </View>
                </View>
                <Content>
                    {
                        load ?
                            <View style={{justifyContent:'center',alignItems:'center',marginTop:150}}>
                                {loading()}
                                <Label style={{color:"#7A5032"}}> กรุณารอสักครู่ </Label>
                            </View> :
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
