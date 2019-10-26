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
const PIC_URI =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfiuC5vvlmbrzuvAPJ1c6DHsmVnNeNvN8-791Tr5SpxS7Io3LLOg";

export default class PetCard extends Component {
  render() {
    const { pet } = this.props;
    return (
      <View>
        <Card>
          <CardItem style={{borderRadius:10}}>
            <Left>
              <Thumbnail
                source={{
                  uri: pet.image||PIC_URI
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
