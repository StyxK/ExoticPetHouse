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
      <View style={styles.container}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail
                source={{
                  uri: pet.image||PIC_URI
                }}
              />
              <Body style={{marginLeft: 15,width: "100%"}}>
                <Text>{pet.name}</Text>
                <Text style={{width: "100%"}} note>{pet.typeOfPet}</Text>
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
