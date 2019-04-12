import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Router, Scene, Actions } from "react-native-router-flux";
import {
  Container,
  Card,
  CardItem,
  Body,
  Text,
  Left,
  Thumbnail
} from "native-base";

const API_URL = Config.API_URL;

export default class PetCard extends Component {
  // componentWillMount() {
  //   axios
  //   .get(API_URL + '/pet/u/'+'nongnaem5')
  //   .then(response => {
  //     this.setState({
        
  //     })  
  //   }
  // }
  render() {
    const { pet } = this.props;
    return (
      <View style={styles.container}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail
                source={{
                  uri:
                    "https://steoates.gallerycdn.vsassets.io/extensions/steoates/autoimport/1.5.3/1509707628747/Microsoft.VisualStudio.Services.Icons.Default"
                }}
              />
              <Body>
                <Text>{pet.name}</Text>
                <Text note>GeekyAnts</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  }
});
