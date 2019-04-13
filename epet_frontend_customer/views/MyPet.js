import axios from "axios";
import { Container, Fab, Icon } from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Config from "react-native-config";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { addPet, setPets } from "../actions";
import PetCard from "../components/PetCard";

const API_URL = Config.API_URL;

class MyPet extends Component {
  componentWillMount() {
    axios.get(API_URL + "/pet/u/" + "nongnaem5").then(response => {
      const { setPets } = this.props;
      setPets(response.data);
    });
  }

  render() {
    const { pets = [], setPets, addPet } = this.props;
    return (
      <Container>
        <Fab position="bottomRight" onPress={this.goToAddPet}>
          <Icon name="add" />
        </Fab>
        {pets.map(pet => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </Container>
    );
  }
  goToAddPet = () => {
    Actions.addPet();
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
