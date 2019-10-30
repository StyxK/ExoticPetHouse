import {
  Body,
  Container,
  Content,
  Header,
  Title,
  View,
  Card,
  Text,
  Right,
  Button,
  Icon,
  Left,
  Thumbnail,
  Label,
  Badge
} from "native-base";
import React, { Component } from "react";
import { StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment-timezone";
import { Actions } from "react-native-router-flux";
import OrderButton from "../components/OrderButton";
import theme from "../theme";

class HistoryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: {},
      statusId: null,
      status:null
    };
  }

  componentDidMount() {
    axios.get("/order/" + this.props.item.id).then(response => {
      this.setState({
        history: response.data,
        statusId: response.data.orderStatus.id,
        status:response.data.orderStatus.status
      });
    });
  }

  render() {
    const { history } = this.state;
    const { id, orderStatus, orderLines = [], store = {} } = history;
    let startDate = moment(history.startDate)
      .tz("Asia/Bangkok")
      .format("DD MMM YYYY HH:mm");
    let endDate = moment(history.endDate)
      .tz("Asia/Bangkok")
      .format("DD MMM YYYY HH:mm");
    let submitDate = moment(history.submitDate)
      .tz("Asia/Bangkok")
      .format("DD MMM YYYY HH:mm");
    return (
      <Container>
        <Container style={{ height:'25%',flex:0.47 }}>
          <Header style={{ backgroundColor: theme.primaryColor }}>
            <Left style={{ flex: 1 }}>
              <Icon
                name="ios-arrow-back"
                onPress={() => Actions.history()}
                style={{ color: theme.primaryTextColor, marginLeft: 10 }}
              />
            </Left>
            <Body style={{ flex: 1, alignItems: "center" }}>
              <Title style={{ color: theme.primaryTextColor, fontSize: 20 }}>
                History Detail
              </Title>
            </Body>
            <Right />
          </Header>
          <View padder style={{backgroundColor:theme.primaryColor,borderBottomLeftRadius:25,borderBottomRightRadius:25}}>
            <Text style={{ fontSize: 15 ,color:theme.infoTextColor}}>
              {console.log(store.name, "store")}
              ร้านที่ส่งฝาก : <Text note style={{ color:theme.accentTextColor }}> {store.name} </Text>
            </Text>
            <Text style={{ fontSize: 15 ,color:theme.infoTextColor}}>
              วันที่ส่งคำขอ : <Text note style={{ color:theme.accentTextColor }}> {submitDate} </Text>
            </Text>
            <Text style={{ fontSize: 15 ,color:theme.infoTextColor}}>
              ช่วงเวลาฝาก : <Text note style={{ color:theme.accentTextColor }}> {startDate} - {endDate} </Text>
            </Text>
            <Text style={{ fontSize: 15 ,color:theme.infoTextColor}}>
              สถานะ : <Text note style={{ color:theme.accentTextColor }}> {this.state.status} </Text>
            </Text>
            <Text style={{ marginTop:10,fontSize: 10 ,alignSelf:'center',color:theme.infoTextColor}}>
              รหัสการฝาก : <Text note style={{ color:theme.accentTextColor,fontSize:10 }}> {id} </Text>
            </Text>
          </View>
          </Container>
          <Content style={{backgroundColor:theme.secondaryColor}}>
            <Content padder style={{backgroundColor:'white'}}>
              {orderLines.map(orderLine => {
                const { pet, cage } = orderLine;
                return (
                  <Card transparent
                    key={pet.id}
                    style={{ display: "flex", flexDirection: "row" ,justifyContent:'center'}}
                  >
                      <Left style={{ display: "flex", flexDirection: "row" }}>
                        <Left style={{flex:1.5}}>
                          <Thumbnail source={{uri:pet.image}}/>
                        </Left>
                        <Left style={{flex:3}}>
                          <View style={{flex:1,flexDirection:'row'}}>
                            <Left style={{flex:0.5}}>
                              <Text style={{ fontSize:15,backgroundColor:theme.primaryColor,padding:3,borderRadius:10,color:theme.infoTextColor}}>สัตว์เลี้ยง</Text>
                            </Left>
                            <Left style={{flex:0.5}}>
                              <Text> {pet.name} </Text>
                            </Left>
                          </View>
                          {/* <View style={{flex:1,flexDirection:'row'}}>
                            <Left style={{flex:0.5}}>
                              <Text style={{ fontSize:15,backgroundColor:theme.primaryColor,padding:2,borderRadius:10,color:theme.infoTextColor}}>ชนิดกรง</Text>
                            </Left>
                            <Left style={{flex:0.5}}>
                              <Text> {cage.name} </Text>
                            </Left>
                          </View> */}
                        </Left>
                      </Left>
                    <Right style={{flex:0.5}}>
                      <Button
                        style={{
                          backgroundColor: theme.primaryColor,
                          borderRadius: 10,flex:1
                        }}
                        onPress={this.goToPetActivity(orderLine)}
                      >
                          <Icon name='paw'>
                            <Label style={{marginLeft:10,color:'white'}}>activity</Label>
                          </Icon>
                      </Button>
                    </Right>
                  </Card>
                );
              })}
            </Content>
            <Content padder style={{borderBottomLeftRadius:25,borderBottomRightRadius:25,backgroundColor:'black'}}>
              <Text style={{color:'white',textAlign:'center'}}>ค่าบริการทั้งหมด : {history.totalPrice} บาท</Text>
            </Content>
            <View style={{ display: "flex", flexDirection: "row", margin: 15 ,justifyContent:'center'}}>
              <OrderButton item={history} orderStatus={this.state.statusId} />
            </View>
          </Content>
      </Container>
    );
  }

  confirmCancelOrder = () => {
    const { item } = this.props;
    if (item.orderStatus.id == 1 || item.orderStatus.id == 2) {
      Alert.alert(
        "ยกเลิกออเดอร์",
        "คุณแน่ใจว่าต้องการยกเลิกออเดอร์หรือไม่",
        [
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel"
          },
          { text: "OK", onPress: () => this.cancelOrder() }
        ],
        { cancelable: false }
      );
    } else {
      alert("ออร์เดอร์นี้ไม่สามารถยกเลิกได้");
    }
  };

  cancelOrder = () => {
    const { item, refresh } = this.props;
    if (item.orderStatus.id == 1 || item.orderStatus.id == 2) {
      axios
        .put("/order/denyByCustomer/" + item.id)
        .then(response => {
          alert("ยกเลิกออร์เดอร์สำเร็จ");
          refresh && refresh();
          Actions.pop();
        })
        .catch(error => {
          alert("error" + error);
          console.log(error);
        });
    } else {
      alert("ออร์เดอร์นี้ไม่สามารถยกเลิกได้");
    }
  };

  goToPetActivity = orderLine => () => {
    Actions.petActivity({ orderLine });
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
)(HistoryDetail);
