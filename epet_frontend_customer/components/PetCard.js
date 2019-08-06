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
              <Button
                style={{
                  backgroundColor: "#7A5032",
                  flex: 1,
                  borderRadius: 10,
                  marginTop: 5,
                  marginBottom: 5
                }}
                onPress={this.goToPetActivity}
              >
                <Text style={{ fontSize: 10 }}>pet activity</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </View>
    );
  }
  goToPetActivity = () => {
    Actions.petActivity({});
  };
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  }
});
