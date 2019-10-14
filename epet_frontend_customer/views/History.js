import axios from "axios";
import {
  Body,
  Container,
  Content,
  Header,
  Left,
  Right,
  Title,
  View
} from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Config from "react-native-config";
import { Actions } from "react-native-router-flux";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import { connect } from "react-redux";
import HistoryList from "../components/HistoryList";
import NavFooter from "../components/NavFooter";
import theme from "../theme";

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

  // cancelOrder = async order => {
  //   if (order.orderStatus.id == 1 || order.orderStatus.id == 2) {
  //     return axios
  //       .put("/order/" + order.id, {
  //         orderStatus: {
  //           id: 4
  //         }
  //       })
  //       .then(response => {
  //         this.refresh();
  //         return response;
  //       });
  //   } else {
  //     return Promise.reject("ไม่สามรถยกเลิกได้");
  //   }
  // };

  goToHistoryDetail = item => () => {
    Actions.historyDetail({ item, refresh: this.refresh });
  };

  render() {
    const { page, statuses } = this.state;
    return (
      <Container style={{ display: "flex", height: "100%" }}>
        <Container>
          <Header style={{ backgroundColor: theme.primaryColor }}>
            <Left style={{ flex: 1 }}></Left>
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
        </Container>
        <NavFooter />
      </Container>
    );
  }

  getSegments = () => {
    const { history, statuses } = this.state;

    const segments = statuses.map(status => (
      <Content key={status.id} tabLabel={status.status}>
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
      </Content>
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
