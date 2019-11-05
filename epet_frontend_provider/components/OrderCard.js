import { Body, ListItem, Text, Icon, Right, View, Thumbnail, Button, Card, CardItem } from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import moment from "moment-timezone";
import { connect } from "react-redux"
import { Actions } from "react-native-router-flux"
import theme from "../theme";

class OrderCard extends Component {
  render() {
    const { item } = this.props;
    const { id } = item;
    let startDate = moment(item.startDate).tz("Asia/Bangkok").format("DD MMM YYYY HH:mm");
    let endDate = moment(item.endDate).tz("Asia/Bangkok").format("DD MMM YYYY HH:mm");
    return (
      <Card transparent style={{flex:1}}>
        <CardItem button style={{borderRadius:10}} onPress={() => this.orderDetail()}>
          <Body style={{ flex: 3 ,justifyContent:'center'}}>
            <Text style={{ fontSize: 15,color:'white',fontWeight:"bold" }}>
              <Text> {item.customerUsername} </Text>
            </Text>
            <Text style={{ paddingVertical:5 }}>
              <Icon name='md-calendar' style={{color:theme.secondaryColor}}/> <Text note> {startDate} - {endDate} </Text>
            </Text>
          </Body>
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