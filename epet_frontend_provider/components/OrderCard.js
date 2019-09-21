import { Body, ListItem, Text, Icon, Right, View, Thumbnail, Button } from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import moment from "moment-timezone";
import { connect } from "react-redux"
import { Actions } from "react-native-router-flux"

const PIC_URI =
  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png";

class OrderCard extends Component {
  render() {
    const { item } = this.props;
    const { id } = item;
    console.log(item,'item in historyList')
    let startDate = moment(item.startDate)
      .tz("Asia/Bangkok")
      .format("DD MMM YYYY HH:mm");
    let endDate = moment(item.endDate)
      .tz("Asia/Bangkok")
      .format("DD MMM YYYY HH:mm");
    let submitDate = moment(item.submitDate)
      .tz("Asia/Bangkok")
      .format("DD MMM YYYY HH:mm");
    return (
      <ListItem note>
        <Body style={{ flex: 2 }}>
          <Text style={{ fontSize: 15 }}>
            {" "}
            เลขคำสั่งฝาก : <Text note> {id} </Text>
          </Text>
          <Text style={{ fontSize: 15 }}>
            {" "}
            ฝากวันที่ : <Text note> {startDate} </Text>
          </Text>
          <Text style={{ fontSize: 15 }}>
            {" "}
            ถึงวันที่ : <Text note> {endDate} </Text>
          </Text>
        </Body>
        <Right
            style={{
              flex: 0.75,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View style={{ flex: 1 }}>
              <Thumbnail
                style={{ alignSelf: "center" }}
                source={{ uri: PIC_URI }}
              />
              <View style={{flexDirection:"row"}}>
                <Button
                  rounded
                  style={{
                    backgroundColor: "#7A5032",
                    alignSelf: "center",
                    height: 30,
                    marginTop: 10,
                    marginRight: 10
                  }}
                  // onPress={() => this.showOrderDetail(data)}
                >
                  <Icon fontSize="15" name="search" />
                </Button>
                <Button
                  rounded
                  style={{
                    backgroundColor: "#7A5032",
                    alignSelf: "center",
                    height: 30,
                    marginTop: 10
                  }}
                  onPress={()=>{Actions.chatbox({customer:item.customerUsername})}}
                >
                  <Icon fontSize="15" name="ios-chatbubbles" />
                </Button>
              </View>
            </View>
          </Right>
      </ListItem>
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
  return {user:state.user,store:state.store}
}

export default connect(mapStateToProps)(OrderCard)