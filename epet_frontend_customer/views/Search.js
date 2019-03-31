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

// const store = [
//   {
//     name: 'ดำรงค์สัตว์แพทย์',
//     latitude: 10.5774781,
//     longitude: 101.44130759,
//   },
//   {
//     name: 'นุนิสัตว์แปลกน่ารัก',
//     latitude: 12.5774781,
//     longitude: 105.44130759,
//   },
//   {
//     name: 'DogePetHouse',
//     latitude: 15.5774781,
//     longitude: 102.44130759,
//   },
//   {
//     name: 'นุนิสัตว์แปลกน่ารัก',
//     latitude: 12.5774781,
//     longitude: 105.44130759,
//   },
//   {
//     name: 'นุนิสัตว์แปลกน่ารัก',
//     latitude: 12.5774781,
//     longitude: 105.44130759,
//   },
//   {
//     name: 'นุนิสัตว์แปลกน่ารัก',
//     latitude: 12.5774781,
//     longitude: 105.44130759,
//   },
//   {
//     name: 'นุนิสัตว์แปลกน่ารัก',
//     latitude: 12.5774781,
//     longitude: 105.44130759,
//   },
// ]

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
    const { stores } = this.state;
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
            <Text note>distance 7.7 km.</Text>
          </Right>
        </ListItem>
      )
    }

    return (
      <Container>
        <View style={styles.container}>
          <MapView style={styles.map} initialRegion={this.state.initialPoint}>
            <Marker coordinate={this.state.startPoint} />
            {storeMarker}
          </MapView>
          <TouchableHighlight onPress={() => { this.setModalVisible(true) }}>
            <Text>Show Moal</Text>
          </TouchableHighlight>
        </View>
        <Modal animationType="slide" transparent={true} visible={this.state.ModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal Closed')
          }}>
          <View style={styles.modalContainer}>
            <Content style={styles.modal}>
              <TouchableHighlight onPress={() => { this.setModalVisible(!this.state.ModalVisible) }} style={{ alignItems: 'center' }}>
                <Text style={{ marginTop: 7 }}>Hide Modal</Text>
              </TouchableHighlight>
              <List>{storeList}</List>
            </Content>
          </View>
        </Modal>
        <NavFooter />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
