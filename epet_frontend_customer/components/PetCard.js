import React, { Component } from "react";
import { StyleSheet, View,Image } from "react-native";
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
  Button,
  DeckSwiper,
  Label,
  Badge
} from "native-base";
const PIC_URI =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfiuC5vvlmbrzuvAPJ1c6DHsmVnNeNvN8-791Tr5SpxS7Io3LLOg";

export default class PetCard extends Component {

  render() {
    const { pet } = this.props;
    return (
          <View style={{flexDirection:'column',alignItems:'center'}}>
            <Button badge disabled transparent>
              <Thumbnail source={{uri:pet.image}}/>
              {
                pet.wasDeposit ?
                <Badge success style={{position:'absolute',bottom:0,right:0,width:15,height:15}}/>
                :
                null
              }
            </Button>
            <Label style={{marginTop:5,fontSize:15}}> {pet.name} </Label>
          </View>
        )
  }

}
