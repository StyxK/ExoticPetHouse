/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Container, Content, Button, Icon, ListItem, List, Text, Left, Body, Right } from 'native-base';
import { View, StyleSheet, Modal, Alert, TouchableHighlight, TextInput, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import axios from 'axios';
import Config from 'react-native-config';
import { Actions } from 'react-native-router-flux'


// type Props = {};
const API_URL = Config.API_URL;
const {width,height} = Dimensions.get('window')
const ASPECT_RATIO = width/height
const LATITUDE_DELTA = 0.922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO 

export default class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      stores: [],
      initialPoint: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      startPoint: {
        latitude: 0,
        longitude: 0
      },
      ModalVisible: false
    }
  }

  componentDidMount() {
    
    
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position)=>{
      lat = parseFloat(position.coords.latitude)
      long = parseFloat(position.coords.longitude)
      initialCoordinate = {
        latitude : lat,
        longitude : long,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
      this.setState({initialPoint:initialCoordinate})
      this.setState({
        startPoint:{
          latitude:lat,
          longitude:long
        }
      })
    })
    
    axios
      .get(API_URL + '/store/')
      .then(response => {
        this.setState({
          stores: response.data
        })
        console.log(JSON.stringify(response))
      }).then(error => console.log(error))
  }

  setModalVisible = (visible) => {
    this.setState({ ModalVisible: visible })
  }

  render() {
    const { stores, startPoint, initialPoint, ModalVisible } = this.state;
    let storeMarker = this.state.stores.map((data)=>{
      return <Marker key={data.id} coordinate={{
                latitude: data.address.latitude,
                longitude: data.address.longitude
              }} pinColor={"#7A5032"} title={data.name} onPress={() => { this.setModalVisible(true) }} />
    });

    let storeList = this.state.stores.map((data)=>{
      return  <ListItem avatar key={data.id} onPress={()=>this.goToStore(data.id)}>
                <Left>
                <Icon name='paw' />
                </Left>
                <Body>
                  <Text>{data.name}</Text>
                  <Text note>{data.descripion}</Text>
                </Body>
                <Right>
                  {(startPoint && data.address) ?
                    <Text note>distance 
                      {distance(startPoint.latitude, startPoint.longitude, data.address.latitude, data.address.longitude, "K").toFixed(2)} km.</Text>
                    : <Text note>N/A</Text>
                  }
                </Right>
              </ListItem>
    });

    return (
      <Container>
        <View style={styles.map}>
          <MapView style={styles.map} initialRegion={initialPoint}>
            <Marker coordinate={startPoint}/>
            {storeMarker}
          </MapView>
        </View>
        <View style={styles.container}>
          <TextInput
            style={{ height: 40, width: "90%", borderColor: 'gray', backgroundColor: "white", borderRadius: 10, margin: 20, borderWidth: 1 }}
            editable={true}
            placeholder="Search"
            onChangeText={this.onSearchTextChange}
          />
          <Button style={{ marginBottom:19, borderRadius: 20, height: 35, alignSelf: "center" }}
            onPress={() => { this.setModalVisible(true) }}
            visible={!ModalVisible}>
          <Text>รายการร้านใกล้เคียง</Text>
          </Button>
          <Modal animationType="slide" transparent={true} visible={ModalVisible}
            onRequestClose={() => {
              Alert.alert('Modal Closed')
            }}>
            <View style={styles.modalContainer}>
              <Content style={styles.modal}>
                <TouchableHighlight onPress={() => { this.setModalVisible(!ModalVisible) }} style={{ alignItems: 'center' }}>
                  <Text style={{ marginTop: 7 }}>ซ่อนรายการร้าน</Text>
                </TouchableHighlight>
                <List>{storeList}</List>
              </Content>
            </View>
          </Modal>
        </View>
      </Container>
    );
  }

  onSearchTextChange = (text) => {
    console.log(text)
  }
  goToStore= (storeID) =>{
    this.setModalVisible(false)
    console.log(storeID)
    Actions.store({id:storeID});
  }
}


distance = (lat1, lon1, lat2, lon2, unit) =>{
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "column",
    justifyContent: "space-between"
  },
  map: {
    marginTop: 1.5,
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    height: 500
  },
  modal: {
    borderRadius: 10,
    borderWidth: 5,
    borderColor: 'grey',
    marginBottom: 65,
    backgroundColor: 'white',
    opacity: 0.99,
    width: '85%',
    marginTop: 40
  }
  
})
