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
  Title,
} from "native-base";
import { View } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import NavFooter from '../components/NavFooter'
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view"
import theme from "../theme";
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

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    axios.get("/order/store/" + this.props.store.storeId).then(response => {
      this.setState({ history: response.data });
    });
    axios.get("/order/statuses").then(response => {
      this.setState({ statuses: response.data,load: false });
    })
  };

  render() {
    const { statuses } = this.state
    return (
      <Container>
        <Header style={{ backgroundColor: theme.primaryColor }}>
          <Left style={{ flex: 1 }} />
          <Body style={{ flex: 5, alignItems: 'center' }}>
            <Title style={{ color: theme.primaryTextColor }}>รายการคำขอฝากสัตว์เลี้ยง</Title>
          </Body>
          <Right/>
        </Header>
        <View style={{ flex: 1 }}>
          {
            this.state.load ? 
              <View style={{flex:1,backgroundColor:theme.backgroundColor,justifyContent:'center',alignItems:'center'}}>
                {loading()}
              </View>
              :
              (statuses.length > 0 && (
                <ScrollableTabView  style={{backgroundColor:theme.backgroundColor}}
                  renderTabBar={() => <ScrollableTabBar underlineStyle={{backgroundColor:theme.secondaryColor}} textStyle={{color:'white'}} backgroundColor={theme.primaryColor}/>}
                >
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
      <Content padder key={status.id} tabLabel={status.status} style={{ marginTop: 5, marginBottom: 5 }}>
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
    return segments
  };
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps
)(OrderList);
