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
import { View, StyleSheet, Modal, Alert, TouchableHighlight } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import NavFooter from '../components/NavFooter.js';
import axios from "axios";

// type Props = {};

export default class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      stores: [],
      initialPoint: {
        latitude: 13.5774781,
        longitude: 100.44130759,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      startPoint: {
        latitude: 13.5774781,
        longitude: 100.44130759
      },
      ModalVisible: false
    }
  }

  componentWillMount() {
    axios
      .get('http://192.168.31.178:3000/store/')
      .then(response => {
        this.setState({
          stores: response.data
        })
        console.log(JSON.stringify(response))
      })
  }

  setModalVisible = (visible) => {
    this.setState({ ModalVisible: visible })
  }

  render() {
    const { stores, startPoint, initialPoint, ModalVisible} = this.state;

    let storeMarker = [];
    let storeList = [];
    for (store of stores) {
      {
        store.address &&
          storeMarker.push(
            <Marker key={store.id} coordinate={{
              latitude: store.address.latitude,
              longitude: store.address.longitude
            }} pinColor={'#7A5032'} title={store.name} onPress={() => { this.setModalVisible(true) }} />
          )
      }
      storeList.push(
        <ListItem avatar key={store.id}>
          <Left>
            <Icon name='paw' />
          </Left>
          <Body>
            <Text>{store.name}</Text>
            <Text note>{store.descripion}</Text>
          </Body>
          <Right>
            {(startPoint && store.address) ? 
            <Text note>distance {distance(startPoint.latitude,startPoint.longitude,store.address.latitude,store.address.longitude,"K").toFixed(2)} km.</Text>
            : <Text note>N/A</Text>
            }
          </Right>
        </ListItem>
      )
    }

    return (
      <Container>
        <View style={styles.container}>
          <MapView style={styles.map} initialRegion={initialPoint}>
            <Marker coordinate={startPoint} />
            {storeMarker}
          </MapView>
            <View style={{alignSelf:"flex-end"}}>
              <Button style={{borderRadius:20,height:35}} 
                  onPress={()=>{this.setModalVisible(true)}}
                  visible={!ModalVisible}>
                <Text>Show Store List</Text>
              </Button>
            </View>
          <Modal animationType="slide" transparent={true} visible={ModalVisible} 
            onRequestClose={()=>{
              Alert.alert('Modal Closed')
          }}>
            <View style={styles.modalContainer}>
              <Content style={styles.modal}>
                <TouchableHighlight onPress={()=>{this.setModalVisible(!ModalVisible)}} style={{alignItems:'center'}}>
                  <Text style={{marginTop:7}}>Hide Modal</Text>
                </TouchableHighlight>
                <List>{storeList}</List>
              </Content>
            </View>
          </Modal>
        </View>
        
      <NavFooter/>
      </Container>
    );
  }
}


function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row"
  },
  map: {
    marginTop: 1.5,
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
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
