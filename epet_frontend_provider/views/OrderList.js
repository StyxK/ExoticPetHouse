import React, { Component } from "react";
import OrderCard from '../components/OrderCard'
import {
  Container,
  Header,
  Body,
  Text,
  Left,
  Right,
  Content,
  ListItem,
  List,
  Icon,
  Button,
  Footer,
  FooterTab,
  Thumbnail
} from "native-base";
import { StyleSheet, View, Modal } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment-timezone";
import NavFooter from '../components/NavFooter'
import { Actions } from "react-native-router-flux";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view"

const PIC_URI =
  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: [],
      selectedIndex : 0,
      history : [],
      statuses: [],
    };
  }

  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index
    });
  };

  componentWillMount(){
    this.refresh();
  }

  refresh = () => {
    axios.get("/order/store/"+this.props.store.storeId).then(response => {
      this.setState({ history: response.data });
    });
    axios.get("/order/statuses").then(response => {
      this.setState({ statuses: response.data });
    });
  };

  render() {
    const { statuses } = this.state
    return (
      <Container>
        <Header style={{ backgroundColor: "#7A5032" }}>
          <Left style={{ flex: 1 }} />
          <Body style={{ flex: 3 , alignItems:'center' }}>
            <Text style={{ color: "white" }}>รายการคำขอฝากสัตว์เลี้ยง</Text>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <View style={{flex:1}}>
          {statuses.length > 0 && (
            <ScrollableTabView tabBarUnderlineStyle={{backgroundColor:"#7A5032"}} tabBarActiveTextColor="#7A5032" renderTabBar={() => <ScrollableTabBar />}>
                  {this.getSegments()}
            </ScrollableTabView>
          )}
        </View>
        <NavFooter/>
      </Container>
    );
  }

  getSegments = () => {
    const { history, statuses } = this.state;
    const segments = statuses.map(status => (
      <Content key={status.id} tabLabel={status.status} style={{marginTop:5,marginBottom:5}}>
        {history
          .filter(item => item.orderStatus.id === status.id)
          .map(item => {
            return (
              <OrderCard
                key={item.id}
                item={item}
              />
            );
          })}
      </Content>
    ));
    return segments;
  };
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps
)(OrderList);
