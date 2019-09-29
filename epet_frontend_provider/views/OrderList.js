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
  Label
} from "native-base";
import { View } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import NavFooter from '../components/NavFooter'
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view"
import { loading } from '../components/Loading'

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: [],
      selectedIndex: 0,
      history: [],
      statuses: [],
      load: true
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
    axios.get("/order/store/" + this.props.store.storeId).then(response => {
      this.setState({ history: response.data });
    });
    axios.get("/order/statuses").then(response => {
      this.setState({ statuses: response.data });
    }).then(this.setState({ load: false }))
  };

  render() {
    const { statuses } = this.state
    return (
      <Container>
        <Header style={{ backgroundColor: "#7A5032" }}>
          <Left style={{ flex: 1 }} />
          <Body style={{ flex: 3, alignItems: 'center' }}>
            <Text style={{ color: "white" }}>รายการคำขอฝากสัตว์เลี้ยง</Text>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <View style={{ flex: 1 }}>
          {console.log(this.state.load,'load')}
          {
            (statuses.length > 0 && (
              <ScrollableTabView tabBarUnderlineStyle={{ backgroundColor: "#7A5032" }} tabBarActiveTextColor="#7A5032" renderTabBar={() => <ScrollableTabBar />}>
                {this.getSegments()}
              </ScrollableTabView>
            ))
          }
        </View>
        <NavFooter />
      </Container>
    );
  }

  getSegments = () => {
    const { history, statuses } = this.state;
    const segments = statuses.map(status => (
      <Content key={status.id} tabLabel={status.status} style={{ marginTop: 5, marginBottom: 5 }}>
        {history.filter(item => {
          return item.orderStatus.id === status.id
        }).map(item => {
          return (
            <OrderCard
              key={item.id}
              item={item}
            />
          );
        })
        }
      </Content>
    ));
    console.log(segments,'list')
    return segments
  };
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps
)(OrderList);
