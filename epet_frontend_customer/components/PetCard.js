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

export default class PetCard extends Component {
  render() {
    const { pet } = this.props;
    return (
      <View style={styles.container}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail
                source={{
                  uri: pet.image
                }}
              />
              <Body>
                <Text>{pet.name}</Text>
                <Text note>{pet.typeOfPet}</Text>
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
