import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';

const API_URL = Config.API_URL;
const storeId = 'ID';
export default class Store extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
          stores: []
        }
    }

    setStoreId(){
        this.storeId = this.props.text;
    }

    componentWillMount() {
        this.setStoreId();
        axios
          .get(API_URL + '/store/'+this.storeId)
          .then(response => {
            this.setState({
              stores: response.data
            })
            console.log(JSON.stringify(response))
          }).then(error => console.log(error))
    }

    render() {
        const {stores} = this.state;
        return (
            <View style={styles.container}>          
                <Container>
                    <Header />
                    <Content>
                        <Card style={{flex: 0}}>
                            <CardItem>
                                <Left>
                                    <Body>
                                        <Text style={{fontSize:25}}>{stores.name}</Text>
                                        <Text note>ติดต่อ:</Text>
                                        <Text note>{stores.phoneNumber}</Text>
                                    </Body>
                                </Left>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Text style={{color:'#7A5032'}}>{stores.rating+'\n'}</Text>
                                        <Text note>Rating</Text>
                                    </Left>
                                    <Body>
                                        <Text style={{color:'#7A5032'}}>{stores.maxOfDeposit+'\n'}</Text> 
                                        <Text note>จำนวนกรงทั้งหมด</Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                <Body>
                                    <Text>
                                        รายละเอียดร้านค้า: {'\n'}
                                        {stores.description}
                                    </Text>
                                </Body>
                                </CardItem>
                                <CardItem>
                                <Left>
                                    <Text>ที่อยู่ : </Text>
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
