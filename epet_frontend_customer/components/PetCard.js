import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Router, Scene, Actions } from "react-native-router-flux";
import { Container, Card, CardItem, Body, Text, Left, Thumbnail} from "native-base";

export default class PetCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: "https://steoates.gallerycdn.vsassets.io/extensions/steoates/autoimport/1.5.3/1509707628747/Microsoft.VisualStudio.Services.Icons.Default" }} />
              <Body>
                <Text>NativeBase</Text>
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
    flex: 1,
    flexDirection: "column",
    margin: 10
  }
});
