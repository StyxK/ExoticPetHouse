import { Text, Container, Button, ListItem, List } from "native-base";
import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import PetCard from "../components/PetCard";
import { Provider, Subscribe } from "unstated";
import CounterContainer from "../states/CounterContainer";
import MyPetState from "../states/MyPetState";

export default class MyPet extends Component {
  render() {
    return (
      <Container>
        {/* <PetCard /> */}
        <Subscribe to={[MyPetState]}>
          {petState => (
            <ScrollView style={styles.container}>
              {petState.state.pets.map(pet => (
                <PetCard pet={pet} />
              ))}
              <Button onPress={() => petState.add(1)}>
                <Text>+</Text>
              </Button>
            </ScrollView>
          )}
        </Subscribe>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});
