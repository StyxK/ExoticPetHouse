import { Body, ListItem, Text, Icon, Right, View, Thumbnail, Button, Card, CardItem } from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import moment from "moment-timezone";
import { connect } from "react-redux"
import { Actions } from "react-native-router-flux"
import theme from "../theme";

const PIC_URI =
  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png";

class OrderCard extends Component {
  render() {
    const { item } = this.props;
    const { id } = item;
    let startDate = moment(item.startDate).tz("Asia/Bangkok").format("DD MMM YYYY HH:mm");
    let endDate = moment(item.endDate).tz("Asia/Bangkok").format("DD MMM YYYY HH:mm");
    return (
      <Card style={{marginLeft:10,marginRight:10,borderRadius:5}}>
        <CardItem button activeOpacity={0.8} style={{backgroundColor:theme.secondaryColor ,borderRadius:5}} onPress={() => this.orderDetail()}>
          <Body style={{ flex: 2 ,justifyContent:'center'}}>
            <Text numberOfLines={1} style={{ fontSize: 15,color:'white',fontWeight:"bold",width:250 }}>
              {" "}
              เลขคำสั่งฝาก : <Text style={{ fontSize: 15,color:theme.secondaryTextColor }}> {id} </Text>
            </Text>
            <Text style={{ fontSize: 15,color:'white',fontWeight:"bold" }}>
              {" "}
              ผู้ฝาก : <Text style={{ fontSize: 15,color:theme.secondaryTextColor }}> {item.customerUsername} </Text>
            </Text>
            <Text style={{ fontSize: 15,color:'white',fontWeight:"bold" }}>
              {" "}
              ฝากวันที่ : <Text style={{ fontSize: 15,color:theme.secondaryTextColor }}> {startDate} </Text>
            </Text>
            <Text style={{ fontSize: 15,color:'white',fontWeight:"bold" }}>
              {" "}
              ถึงวันที่ : <Text style={{ fontSize: 15,color:theme.secondaryTextColor }}> {endDate} </Text>
            </Text>
          </Body>
          <Right
              style={{
                flex: 0.5,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View style={{ flex: 1 }}>
                <Thumbnail
                  style={{ alignSelf: "center" }}
                  source={{ uri: PIC_URI }}
                />
                <Button
                  rounded
                  style={{
                    backgroundColor: theme.primaryColor,
                    alignSelf: "center",
                    height: 30,
                    marginTop: 10
                  }}
                  onPress={()=>{Actions.chatbox({customer:item.customerUsername})}}
                >
                  <Icon fontSize="15" name="ios-chatbubbles" />
                </Button>
              </View>
            </Right>
        </CardItem>
      </Card>
    );
  }

  orderDetail = () => {
    Actions.orderDetail({item:this.props.item})
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