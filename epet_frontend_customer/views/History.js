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
    Actions.historyDetail({ item });
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
        {/* <Content>
          <SegmentedControlTab
            values={["รอร้านตอบรับ", "กำลังฝาก", "ยกเลิก", "สำเร็จ"]}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange}
            borderRadius={0}
            tabsContainerStyle={{
              height: 40,
              backgroundColor: "white",
              borderRadius: 10
            }}
            tabStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
            activeTabStyle={{
              backgroundColor: "white",
              borderBottomWidth: 4,
              borderColor: "#a26c46"
            }}
            tabTextStyle={{
              color: "#a8a8a8",
              fontSize: 13,
              fontWeight: "500"
            }}
            activeTabTextStyle={{
              color: "#7A5032",
              fontSize: 13,
              fontWeight: "500"
            }}
          />
          {this.showSegment()}
          {page}
        </Content> */}
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
