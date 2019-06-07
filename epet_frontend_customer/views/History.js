import { Body, Container, Content, Header, Title } from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Config from "react-native-config";
import { connect } from "react-redux";
import NavFooter from "../components/NavFooter";

const API_URL = Config.API_URL;

class History extends Component {
  render() {
    return (
      <Container>
        <Container>
          <Header style={{ backgroundColor: "#7A5032" }}>
            <Body style={{ flex: 1, alignItems: "center" }}>
              <Title style={{ color: "white", fontSize: 20 }}>History</Title>
            </Body>
          </Header>

          <Content />
        </Container>
        <NavFooter />
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
