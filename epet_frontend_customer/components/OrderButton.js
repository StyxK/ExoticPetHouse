import React, { Component } from "react";
import { Button, View, Label } from "native-base";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import { setPets } from "../actions";
import { connect } from "react-redux";
import theme from "../theme";

class orderButton extends Component {
  constructor(props) {
    super(props);
  }

  button = orderStatus => {
    let list = [];
    if (orderStatus == 1) {
      list.push(
        <View style={{ flex: 1, marginVertical: 5 }}>
          <Button
            full
            style={{
              backgroundColor: 'red',
              flex: 0.5,
              marginHorizontal: 20,
              borderRadius: 10
            }}
            onPress={() => {
              this.cancelOrder();
            }}
          >
            <Label style={{ color: theme.primaryTextColor }}>ยกเลิกคำสั่งฝาก</Label>
          </Button>
        </View>
      );
    } else if (orderStatus == 6 || orderStatus == 3) {
      list.push(
        <View style={{ flex: 1, marginVertical: 5 }}>
          <Button
            full
            style={{
              backgroundColor: theme.primaryColor3,
              flex: 0.5,
              marginHorizontal: 20,
              borderRadius: 10
            }}
            onPress={() => {
              this.payment();
            }}
          >
            <Label style={{ color: theme.primaryTextColor }}>ชำระค่าบริการ</Label>
          </Button>
        </View>
      );
    } else if (orderStatus == 2) {
      list.push(
        <View style={{ flex: 1, marginVertical: 5 }}>
          <Button
            full
            style={{
              backgroundColor: theme.primaryColor3,
              flex: 0.5,
              marginHorizontal: 20,
              borderRadius: 10
            }}
            onPress={() => {
              this.orderBegin();
            }}
          >
            <Label style={{ color: theme.primaryTextColor }}>เริ่มการฝาก</Label>
          </Button>
        </View>
      );
    } else if (orderStatus == 8) {
      list.push(
        <View style={{ flex: 1, marginVertical: 5 }}>
          <Button
            full
            style={{
              backgroundColor: theme.primaryColor3,
              flex: 0.5,
              marginHorizontal: 20,
              borderRadius: 10
            }}
            onPress={() => {
              this.getPetsBack();
            }}
          >
            <Label style={{ color: theme.primaryTextColor }}>ลูกค้ายืนยันการรับสัตว์เลี้ยงคืน</Label>
          </Button>
        </View>
      );
    } else if (orderStatus == 4) {
      list.push(
        <Label style={{ textAlign: "center" }}>
          {" "}
          คุณได้ทำการยกเลิกการฝากแล้ว{" "}
        </Label>
      );
    } else if (orderStatus == 5) {
      list.push(
        <Label style={{ textAlign: "center" }}> ร้านปฏิเสธการรับฝาก </Label>
      );
    } else if (orderStatus == 7) {
      if (this.props.item.wasFeedBack != true) {
        list.push(
          <View style={{ flex: 1, marginVertical: 5 }}>
            <Button
              full
              style={{
                backgroundColor: theme.primaryColor3,
                flex: 0.5,
                marginHorizontal: 20,
                borderRadius: 10
              }}
              onPress={() => {
                Actions.feedback(this.props.item);
              }}
            >
              <Label style={{ color: theme.primaryTextColor }}>ให้คะแนนร้าน</Label>
            </Button>
          </View>
        );
      } else if (this.props.item.wasFeedBack == true) {
        list.push(
          <View style={{ flex: 1, marginVertical: 5 }}>
            <Button
              full
              style={{
                backgroundColor: theme.primaryColor3,
                flex: 0.5,
                marginHorizontal: 20,
                borderRadius: 10
              }}
              onPress={() => {
                Actions.editReview(this.props.item);
              }}
            >
              <Label style={{ color: theme.primaryTextColor }}>ดูรีวิว</Label>
            </Button>
          </View>
        );
      }
    } else if (orderStatus == 9) {
      list.push(
        <Label style={{ textAlign: "center" }}> ชำระค่าบริการสำเร็จแล้ว </Label>
      );
    }
    return list;
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {this.button(this.props.orderStatus)}
      </View>
    );
  }

  //orderManage
  payment = () => {
    Actions.payment({
      item: this.props.item,
      price: this.props.item.totalPrice,
      order: this.props.item.id
    });
  };

  orderBegin = () => {
    axios.put("/order/orderBegin/" + this.props.item.id).then(() => {
      const { setPets } = this.props;
      axios.get("/pet").then(response => {
        setPets(response.data);
        Actions.history();
      });
    });
  };

  getPetsBack = () => {
    axios.put("/order/getPetsBack/" + this.props.item.id).then(() => {
      const { setPets } = this.props;
      axios.get("/pet").then(response => {
        setPets(response.data);
        Actions.history();
      });
    });
  };

  cancelOrder = () => {
    axios.put("/order/denyByCustomer/" + this.props.item.id).then(() => {
      const { setPets } = this.props;
      axios.get("/pet").then(response => {
        setPets(response.data);
        Actions.history();
      });
    });
  };
}
const mapDispatchToProps = dispatch => {
  return {
    setPets: pets => dispatch(setPets(pets))
  };
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(orderButton);
