import axios from "axios";
import {
  Body,
  Container,
  Content,
  Header,
  Left,
  Right,
  Title,
  View,
  Icon,
  Text,
  Badge,
  Button
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
import { loading } from '../components/Loading'

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: [],
      selectedIndex: 0,
      history: [],
      statuses: [],
      loading:true,
      segment:[]
    };
  }

  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index
    });
  };

  componentDidMount() {
    this.refresh()
  }

  refresh = async () => {
    await axios.get("/order/").then(response => {
      this.setState({ history: response.data });
    });
    await axios.get("/order/statuses").then(response => {
      this.setState({ statuses: response.data,loading:false });
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
    Actions.historyDetail({ item, refresh: this.refresh });
  };

  render() {
    const { page, statuses } = this.state;
    return (
      <Container style={{ display: "flex", height: "100%"}}>
        <Container>
          <Header style={{ backgroundColor: theme.primaryColor }}>
            <Left style={{ flex: 1 }}></Left>
            <Body style={{ flex: 1, alignItems: "center" }}>
              <Title style={{ color: theme.primaryTextColor, fontSize: 20 }}>My Order</Title>
            </Body>
            <Right>
            <Button onPress={()=>{Actions.notification()}} transparent badge>
                <Icon  name='notifications' style={{color:'white',fontSize:30}} />
            </Button>
            </Right>
          </Header>
          <View style={{ flex: 1 }}>
            {
              this.state.loading ?
              <View style={{flex:1,backgroundColor:theme.backgroundColor,justifyContent:'center',alignItems:'center'}}>
                {loading()}
              </View>
              :
              ( statuses.length > 0 && (
                <ScrollableTabView style={{backgroundColor:theme.backgroundColor}} renderTabBar={() => <ScrollableTabBar underlineStyle={{backgroundColor:theme.secondaryColor}} textStyle={{color:'white'}} backgroundColor={theme.primaryColor} />}>
                  {this.getSegments()}
                </ScrollableTabView>
              ))
            }
          </View>
        </Container>
        <NavFooter />
      </Container>
    );
  }

  getSegments = () => {
    const { statuses,history } = this.state;
    const segments = statuses.map(status => (
      <Content padder key={status.id} tabLabel={status.status}>
        {history
          .filter(item => item.orderStatus.id === status.id)
          .map(item => {
            console.log(item,'item')
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
    return segments
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
