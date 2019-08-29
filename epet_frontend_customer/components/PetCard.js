import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  Container,
  Card,
  CardItem,
  Body,
  Text,
  Left,
  Thumbnail,
  Right,
  Button
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
            <Right>
              
            </Right>
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
