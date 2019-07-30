import React, { Component } from 'react'
import { Container, ListItem, Content, List, Body, Right, Text, Button, Icon, Header, Left } from 'native-base'
import axios from 'axios'
import {Actions} from 'react-native-router-flux'
import moment from 'moment-timezone'

export default class Pet extends Component {

    constructor(props) {
        super(props)
        this.state = {
            storeId : props.storeId,
            petList: []
        }
    }

    getPetList = async () => {
        try{
            let response = await axios.get('/pet/fromStore/'+this.state.storeId)
            let data = await response.data
            await this.setState({
                petList: data
            })
        }catch(err){
            alert(this.state.storeId)
        }
    }

    componentWillMount() {
        this.getPetList()
    }

    render() {
        const { petList } = this.state

        let petFlatList = petList.map(data => {
            return (
                <ListItem key={data.id}>
                    <Body>
                        <Text note> ชื่อ :  <Text note style={{ color: 'black' }}> {data.name} </Text> </Text>
                        <Text note> ประเภท :  <Text note style={{ color: 'black' }}> {data.typeOfPet} </Text> </Text>              
                        <Text note> กรง :  <Text note style={{ color: 'black' }}> {'cage'} </Text> </Text>
                        {
                            moment().unix() > moment(data.orderLines[0].order.endDate).unix() ?
                            <Text note> สถานะ : <Text note style={{ color : 'black'}}> หมดระยะเวลาฝาก </Text></Text>
                                :
                            <Text note> สถานะ : <Text note style={{ color : 'black'}}> กำลังฝาก </Text></Text>
                        }
                        {
                            console.log(data.orderLines[0].order.endDate,'now')
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
                    <List>
                        {petFlatList}
                    </List>
                </Content>
            </Container>
        )
    }
}

goToStore = ()=>{
    Actions.store()
}