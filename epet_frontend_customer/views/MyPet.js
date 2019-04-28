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
import { addPet, setPets, updatePet } from "../actions";
import PetCard from "../components/PetCard";
import NavFooter from "../components/NavFooter";

const API_URL = Config.API_URL;

class MyPet extends Component {
  componentWillMount() {
    const { setPets, user } = this.props;
    axios.get("/pet").then(response => {
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
    const { addPet } = this.props;
    Actions.addPet({ addPet });
  };

  goToPetDescription = pet => () => {
    const { updatePet } = this.props;
    Actions.petDescription({ pet ,updatePet});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});

const mapStateToProps = state => {
  return { pets: state.pets, user: state.user };
};

const mapDispatchToProps = dispatch => {
  return {
    setPets: pets => dispatch(setPets(pets)),
    addPet: pet => dispatch(addPet(pet)),
    updatePet: pet =>dispatch(updatePet(pet))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPet);
