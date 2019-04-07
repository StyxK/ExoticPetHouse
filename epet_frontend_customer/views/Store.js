import { Container, Content, Card, CardItem, Text, Button, Icon, Left, Body, Right, ListItem, List, Radio} from 'native-base';
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
          cage:[],
          cageSelected: "cageId"
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
                address:JSON.parse(JSON.stringify(response.data.address)),
                cage:JSON.parse(JSON.stringify(response.data.cage))
            })
            console.log(JSON.stringify(response))
          }).then(error => console.log(error))
        axios
            .get(API_URL+ '/')
    }

    
    
    render() {
        let storeList = this.state.cage.map((data)=>{
            return  <ListItem avatar key={data.id} onPress={() => this.setState({ cageSelected:data.id })}>
                      <Left>
                      <Icon name='paw' />
                      </Left>
                      <Body>
                        <Text>{data.name}</Text>
                        <Text note>ประเภท: {data.type}</Text>
                        <Text style={{color:'#7A5032'}}>{data.price} บาท/คืน</Text>
                      </Body>
                      <Right>
                        <Radio
                                color={"#f0ad4e"}
                                selectedColor={"#5cb85c"}
                                selected={this.state.cageSelected == data.id}
                                
                            />
                      </Right>
                    </ListItem>
        });

        const {stores,address,cage} = this.state;
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
                            <List>{storeList}</List>
                            
                            
                        </Card>
                        
                        <Text>{this.state.cageSelected}</Text>
                        
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
