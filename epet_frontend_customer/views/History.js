import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  ListItem,
  List,
  Content,
  Text,
  View
} from "native-base";
import React, { Component } from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import Config from "react-native-config";
import axios from "axios";
import { connect } from "react-redux";
import moment from "moment-timezone";
import { Actions } from "react-native-router-flux";
import SegmentedControlTab from "react-native-segmented-control-tab";
import NavFooter from "../components/NavFooter";
import HistoryList from "../components/HistoryList";
import SegmentControl from "react-native-segment-control";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";

const API_URL = Config.API_URL;

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: [],
      selectedIndex: 0,
      history: [],
      statuses: []
    };
  }

  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index
    });
  };

  componentWillMount() {
    this.refresh();
  }

  refresh = () => {
    axios.get("/order/").then(response => {
      this.setState({ history: response.data });
    });
    axios.get("/order/statuses").then(response => {
      this.setState({ statuses: response.data });
    });
  };

  showSegment() {
    const { history, selectedIndex } = this.state;

    return (
      <View>
        {history
          .filter(item => item.orderStatus.id - 1 == selectedIndex)
          .map(item => {
            return (
              <HistoryList
                key={item.id}
                item={item}
                onPress={this.goToHistoryDetail(item)}
              />
            );
          })}
      </View>
    );
  }

  goToHistoryDetail = item => () => {
    Actions.historyDetail({ item , refresh:this.refresh});
  };

  render() {
    const { page, statuses } = this.state;
    return (
      <Container style={{ display: "flex", height: "100%" }}>
        <Header style={{ backgroundColor: "#7A5032" }}>
          <Left style={{ flex: 1 }}>
            <Icon
              name="ios-arrow-back"
              onPress={() => Actions.home()}
              style={{ color: "white", marginLeft: 10 }}
            />
          </Left>
          <Body style={{ flex: 1, alignItems: "center" }}>
            <Title style={{ color: "white", fontSize: 20 }}>My Order</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ flex: 1 }}>
          {statuses.length > 0 && (
            // <SegmentControl
            //   style={{ height: "100%" }}
            //   segments={this.getSegments()}
            // />
            <ScrollableTabView renderTabBar={() => <ScrollableTabBar />}>
              {this.getSegments()}
            </ScrollableTabView>
          )}
        </View>
        <NavFooter />
      </Container>
    );
  }

  getSegments = () => {
    const { history, statuses } = this.state;

    const segments = statuses.map(status => (
      <View key={status.id} tabLabel={status.status}>
        {history
          .filter(item => item.orderStatus.id === status.id)
          .map(item => {
            return (
              <HistoryList
                key={item.id}
                item={item}
                onPress={this.goToHistoryDetail(item)}
              />
            );
          })}
      </View>
    ));
    return segments;
  };
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
