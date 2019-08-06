import React, { Component } from 'react'
import { Container, ListItem, Content, List, Body, Right, Text, Button, Icon, Header, Left } from 'native-base'
import axios from 'axios'
import {Actions} from 'react-native-router-flux'
import moment from 'moment-timezone'
import SegmentedControlTab from 'react-native-segmented-control-tab'

export default class Pet extends Component {

    constructor(props) {
        super(props)
        this.state = {
            storeId : props.storeId,
            selectedIndex : 0,
            depositingPet : [],
            expiredPet : []
        }
    }

    getPetList = async () => {
        try{
            let response = await axios.get('/pet/fromStore/'+this.state.storeId)
            let data = await response.data
            let depositing,expired = []
            await data.map(data=>{
                moment().unix() <= moment(data.orderLines[0].order.endDate).unix() ? 
                    depositing.push(data)
                :
                    expired.push(data)
                
            })
            await this.setState({
                depositingPet : depositing,
                expiredPet : expired
            })
        }catch(err){
            alert(this.state.storeId)
        }
    }

    componentWillMount() {
        this.getPetList()
    }

    handleIndexChange = index =>{
        this.setState({
            selectedIndex : index
        })
    }

    petCard =  (petList) => {
        let list = []
        console.log(petList)
        petList !== undefined ?  
        petList.map(data => {
            list.push  (
                <ListItem key={data.id}>
                    <Body>
                        <Text note> ชื่อ :  <Text note style={{ color: 'black' }}> {data.name} </Text> </Text>
                        <Text note> ประเภท :  <Text note style={{ color: 'black' }}> {data.typeOfPet} </Text> </Text>              
                        <Text note> กรง :  <Text note style={{ color: 'black' }}> {'cage'} </Text> </Text>
                        {
                            moment().unix() <= moment(data.orderLines[0].order.endDate).unix()?
                            <Text note> สถานะ : <Text note style={{ color : 'black'}}> กำลังฝาก </Text></Text>
                                :
                            <Text note> สถานะ : <Text note style={{ color : 'black'}}> หมดระยะเวลาฝาก </Text></Text>
                            
                        }
                    </Body>
                    <Right>
                        <Button rounded>
                            <Icon name='arrow-back' style={{ fontSize: 10 }} />
                        </Button>
                    </Right>
                </ListItem>
            )
        })
        :
        null

        return list
    }

    render() {
        const { depositingPet,expiredPet,selectedIndex } = this.state
        console.log(expiredPet)
        return (
            <Container>
                <Content>
                    <Header style={{ backgroundColor: "#7A5032" }}>
                        <Left style={{ flex: 2 }} >
                            <Icon style={{color:'white'}} onPress={()=>{ goToStore() }} name='arrow-back'/>
                        </Left>
                        <Body style={{ flex: 2.5 }}>
                            <Text style={{ color: "white" }}>รายการสัตว์เลี้ยง</Text>
                        </Body>
                        <Right style={{ flex: 1 }} />
                    </Header>
                    <Content style={{margin:10}}>
                    <SegmentedControlTab
                        values={['อยู่ระหว่างการฝาก','หมดระยะเวลาฝาก']}
                        selectedIndex={selectedIndex}
                        onTabPress={this.handleIndexChange}
                    />
                    </Content>
                    <List>
                        {
                            selectedIndex == 0 ? 
                            this.petCard(depositingPet)
                            :
                            this.petCard(expiredPet)
                        }
                    </List>
                </Content>
            </Container>
        )
    }
}

goToStore = ()=>{
    Actions.store()
}