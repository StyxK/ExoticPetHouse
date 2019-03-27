/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Container,Content} from 'native-base';
import {View,StyleSheet,Modal,Alert,TouchableHighlight,Text} from 'react-native';
import MapView,{Marker} from 'react-native-maps'
import NavFooter from '../components/NavFooter.js';

// type Props = {};

const store = [
  {
    name:'ดำรงค์สัตว์แพทย์',
    latitude:10.5774781,
    longitude:101.44130759,
  },
  {
    name:'นุนิสัตว์แปลกน่ารัก',
    latitude:12.5774781,
    longitude:105.44130759,
  },
  {
    name:'DogePetHouse',
    latitude:15.5774781,
    longitude:102.44130759,
  }
]

export default class Search extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      initialPoint:{
        latitude:13.5774781,
        longitude:100.44130759,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      startPoint:{
        latitude:13.5774781,
        longitude:100.44130759
      },
      ModalVisible:false
    }
  }

  setModalVisible = (visible)=>{
    this.setState({ModalVisible:visible})
  }

  render() {

    let storeMarker =[];
    for(i in store){
      storeMarker.push(
        <Marker key={i} coordinate={{
          latitude:store[i].latitude,
          longitude:store[i].longitude
        }} pinColor={'#7A5032'} title={store[i].name} />
      )
    }

    return (
      <Container>
        <View style={styles.container}>
          <MapView style={styles.map} initialRegion={this.state.initialPoint}>
            <Marker coordinate={this.state.startPoint}/>
            {storeMarker}
          </MapView>
          <TouchableHighlight onPress={()=>{this.setModalVisible(true)}}>
            <Text>Show Moal</Text>
          </TouchableHighlight>
        </View>
        <Modal animationType="slide" transparent={true} visible={this.state.ModalVisible} 
            onRequestClose={()=>{
              Alert.alert('Modal Closed')
          }}>
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                <TouchableHighlight onPress={()=>{this.setModalVisible(!this.state.ModalVisible)}}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
      <NavFooter/>
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
  modalContainer:{
    flexDirection:'column-reverse',
    alignItems:'center',
    // justifyContent:'flex-end'
  },
  modal:{
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    opacity:0.99,
    width:'75%',
    height:'75%'
  }
})
