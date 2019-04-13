import axios from "axios";
import { Container, Fab, Icon, Header } from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Config from "react-native-config";
import { connect } from "react-redux";
import { addPet, setPets } from "../actions";
import PetCard from "../components/PetCard";

const API_URL = Config.API_URL;

class MyPet extends Component {
  componentWillMount() {}

  render() {
    const { pets = [], setPets, addPet } = this.props;
    return (
      <Container>
        <Header style={{ backgroundColor: "#7A5032" }} />
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
