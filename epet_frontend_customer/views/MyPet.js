import axios from "axios";
import {
  Container,
  Fab,
  Icon,
  List,
  ListItem,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  Footer
} from "native-base";
import React, { Component } from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import Config from "react-native-config";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { addPet, setPets } from "../actions";
import PetCard from "../components/PetCard";
import NavFooter from "../components/NavFooter";

const API_URL = Config.API_URL;

class MyPet extends Component {
  componentWillMount() {
    axios.get(API_URL + "/pet/u/" + "Vuttichai").then(response => {
      const { setPets } = this.props;
      setPets(response.data);
    });
  }

  render() {
    const { pets = [], setPets, addPet } = this.props;
    return (
      <Container>
        <Container>
          <Header style={{ backgroundColor: "#7A5032" }}>
            <Body style={{ flex: 1, alignItems: "center" }}>
              <Title style={{ color: "white", fontSize: 20 }}>My Pet</Title>
            </Body>
          </Header>

          <Content>
            {pets.map(pet => (
              <TouchableHighlight
                key={pet.id}
                onPress={this.goToPetDescription(pet)}
              >
                <PetCard pet={pet} />
              </TouchableHighlight>
            ))}
          </Content>

          <Fab position="bottomRight" onPress={this.goToAddPet}>
            <Icon name="add" />
          </Fab>
        </Container>
        <NavFooter />
      </Container>
    );
  }
  goToAddPet = () => {
    Actions.addPet();
  };

  goToPetDescription = pet => () => {
    Actions.petDescription({ pet });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});

const mapStateToProps = state => {
  return { pets: state.pets };
};

const mapDispatchToProps = dispatch => {
  return {
    setPets: pets => dispatch(setPets(pets)),
    addPet: pet => dispatch(addPet(pet))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPet);
