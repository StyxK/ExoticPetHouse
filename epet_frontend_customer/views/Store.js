import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import NavHeader from '../components/NavHeader'

const API_URL = Config.API_URL;
export default class Store extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
          stores: [],
          address:{},
        }
    }

    setStoreId(){
        this.storeId = this.props.id
    }

    componentWillMount() {
        this.setStoreId();
        axios
          .get(API_URL + '/store/'+this.storeId)
          .then(response => {
            this.setState({
              stores: response.data,
              address:JSON.parse(JSON.stringify(response.data.address))
            })
            console.log(JSON.stringify(response))
          }).then(error => console.log(error))
        axios
            .get(API_URL+ '/')
    }

    render() {
        const {stores,address} = this.state;
        return (
            <View style={styles.container}>          
                <Container>
                    <NavHeader/>
                    <Content>
                        <Card style={{flex: 0}}>
                            <CardItem header>
                                <Text style={{fontSize:25}}> {stores.name} </Text>
                                <Right>
                                    <Text note>Rating : 
                                        <Text style={{color:'#7A5032'}}>{stores.rating}</Text>
                                    </Text>
                                </Right>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Text>ที่อยู่</Text>
                                    <Text note style={{color:'#7A5032'}}>
                                        ถนน {address.street}, อำเภอ/เขต {address.district} จังหวัด {address.province} {address.postcode} 
                                    </Text>
                                </Left>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Text>Tel</Text>
                                    <Text note style={{color:'#7A5032'}}>{stores.phoneNumber}</Text>
                                </Left>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Text>รายละเอียดร้านค้า</Text>
                                    <Text note style={{color:'#7A5032'}}>{stores.description}</Text>
                                </Left>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Text>Total Cage</Text>
                                    <Text note style={{color:'#7A5032'}}>{stores.maxOfDeposit}</Text>
                                </Left>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
})
