/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import {
  Container,
  Content,
  Button,
  Icon,
  ListItem,
  List,
  Text,
  Left,
  Body,
  Right,
  CardItem,
  Card,
  Label
} from "native-base";
import {
  View,
  StyleSheet,
  Modal,
  Alert,
  TouchableHighlight,
  TextInput,
  Dimensions
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import Config from "react-native-config";
import NavFooter from "../components/NavFooter";
import { Actions } from "react-native-router-flux";
import theme from "../theme";

// type Props = {};
const API_URL = Config.API_URL;
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      searchText: "",
      searchStore: [],
      initialPoint: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      startPoint: {
        latitude: 0,
        longitude: 0
      },
      ModalVisible: false
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(position => {
      lat = parseFloat(position.coords.latitude);
      long = parseFloat(position.coords.longitude);
      initialCoordinate = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      };
      this.setState({ initialPoint: initialCoordinate });
      this.setState({
        startPoint: {
          latitude: lat,
          longitude: long
        }
      });
    });

    axios
      .get(API_URL + "/store/")
      .then(response => {
        this.setState({
          stores: response.data
        });
        if (this.state.searchText == "") {
          this.setState({
            searchStore: response.data
          });
        }
        console.log(JSON.stringify(response));
      })
      .then(error => console.log(error));
  }

  setModalVisible = visible => {
    this.setState({ ModalVisible: visible });
  };

  render() {
    const { stores, startPoint, initialPoint, ModalVisible } = this.state;
    let storeMarker = this.state.stores.map(data => {
      return (
        <Marker
          key={data.id}
          coordinate={{
            latitude: data.address.latitude,
            longitude: data.address.longitude
          }}
          pinColor={theme.primaryColor}
          title={data.name}
          onPress={() => {
            this.setModalVisible(true);
          }}
        />
      );
    });

    let storeList = this.state.searchStore.map(data => {
      return (
        <Card transparent key={data.id}>
          <CardItem button onPress={() => this.goToStore(data.id)} style={{borderRadius:10}}>
            <Body style={{flex:3,justifyContent:'center'}}>
              <Text>{data.name}</Text>
              <Text note style={{marginTop:10}}>
                {startPoint && data.address ? (
                  <Text note>
                    <Icon name='md-pin' style={{color:'red',fontSize:20}}/>{" "}
                    ร้านห่างจากคุณ{" "}
                    {distance(
                      startPoint.latitude,
                      startPoint.longitude,
                      data.address.latitude,
                      data.address.longitude,
                      "K"
                    ).toFixed(2)}{" "}
                    กิโลเมตร
                  </Text>
                ) : (
                null
                )}
              </Text>
            </Body>
            <Right style={{alignItems:'flex-end'}}>
              {
                data.banned ? 
                  <Label style={{fontSize:12,color:'white',backgroundColor:theme.warningColor,padding:4,borderRadius:5}}>
                    ปิดบริการ
                  </Label>
                  :
                  <Label style={{fontSize:12,color:'white',backgroundColor:theme.successColor,padding:4,borderRadius:5}}>
                    เปิดบริการ
                  </Label>
              }
            </Right>
          </CardItem>
        </Card>
      );
    });

    return (
      <Container>
        <View style={styles.map}>
          <MapView style={styles.map} initialRegion={initialPoint}>
            <Marker coordinate={startPoint} />
            {storeMarker}
          </MapView>
        </View>
        <View style={styles.container}>
          <View
            style={{
              height: 40,
              width: "90%",
              borderColor: "gray",
              backgroundColor: "white",
              borderRadius: 10,
              margin: 20,
              borderWidth: 1,
              flexDirection: "row"
            }}
          >
            <TextInput
              style={{
                flex: 1,
                height: "100%"
              }}
              editable={true}
              placeholder="Search"
              onChangeText={this.onSearchTextChange}
            />
            <Button
              transparent
              onPress={this.onSearchPress}
              style={{
                height: "100%"
              }}
            >
              <Icon name="search" style={{ color: "black" }} />
            </Button>
          </View>
          <Button
            style={{
              marginBottom: 19,
              borderRadius: 20,
              height: 35,
              alignSelf: "center",
              backgroundColor: theme.primaryColor3
              
            }}
            onPress={() => {
              this.setModalVisible(true);
            }}
            visible={!ModalVisible}
          >
            <Text style={{color:theme.primaryTextColor}} >รายการร้านใกล้เคียง</Text>
          </Button>
          <Modal
            animationType="slide"
            transparent={true}
            visible={ModalVisible}
            onRequestClose={() => {
              Alert.alert("Modal Closed");
            }}
          >
            <View style={styles.modalContainer}>
              <Container style={styles.modal}>
                <Button
                  full
                  onPress={() => {
                    this.setModalVisible(!ModalVisible);
                  }}
                  style={{ borderTopLeftRadius:5,borderTopRightRadius:5,alignItems: "center",backgroundColor: theme.primaryColor }}
                >
                  <Text style={{ color:'white' }}>ซ่อนรายการร้าน</Text>
                </Button>
                <Content padder style={{backgroundColor:theme.backgroundColor}}>
                  {storeList}
                </Content>
              </Container>
            </View>
          </Modal>
        </View>
        <NavFooter />
      </Container>
    );
  }

  onSearchTextChange = text => {
    console.log(text);
    this.setState({
      searchText: text
    });
    if (text.length == 0) {
      this.setState({
        searchStore: this.state.stores
      });
      return;
    }
  };

  onSearchPress = () => {
    if (this.state.searchText.length == 0) {
      return;
    }
    axios
      .get("/store/search/" + this.state.searchText)
      .then(response => {
        this.setState({
          searchStore: response.data
        });
        this.setModalVisible(true);
      })
      .catch(e => alert("error"));
  };
  goToStore = storeID => {
    this.setModalVisible(false);
    Actions.store({ id: storeID });
  };
}

distance = (lat1, lon1, lat2, lon2, unit) => {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  modal: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "white",
    opacity: 0.99,
    width: "100%",
    maxHeight:"85%",
    marginTop: 40
  }
});
