import React, { Component } from "react";
import { Button, View, Label } from "native-base";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import { setPets } from "../actions";
import { connect } from "react-redux";

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
              backgroundColor: "#7A5032",
              flex: 0.5,
              marginHorizontal: 20,
              borderRadius: 10
            }}
            onPress={() => {
              this.cancelOrder();
            }}
          >
            <Label style={{ color: "white" }}>ยกเลิกคำสั่งฝาก</Label>
          </Button>
        </View>
      );
    } else if (orderStatus == 6 || orderStatus == 3) {
      list.push(
        <View style={{ flex: 1, marginVertical: 5 }}>
          <Button
            full
            style={{
              backgroundColor: "#7A5032",
              flex: 0.5,
              marginHorizontal: 20,
              borderRadius: 10
            }}
            onPress={() => {
              this.payment();
            }}
          >
            <Label style={{ color: "white" }}>ชำระค่าบริการ</Label>
          </Button>
        </View>
      );
    } else if (orderStatus == 2) {
      list.push(
        <View style={{ flex: 1, marginVertical: 5 }}>
          <Button
            full
            style={{
              backgroundColor: "#7A5032",
              flex: 0.5,
              marginHorizontal: 20,
              borderRadius: 10
            }}
            onPress={() => {
              this.orderBegin();
            }}
          >
            <Label style={{ color: "white" }}>เริ่มการฝาก</Label>
          </Button>
        </View>
      );
    } else if (orderStatus == 8) {
      list.push(
        <View style={{ flex: 1, marginVertical: 5 }}>
          <Button
            full
            style={{
              backgroundColor: "#7A5032",
              flex: 0.5,
              marginHorizontal: 20,
              borderRadius: 10
            }}
            onPress={() => {
              this.getPetsBack();
            }}
          >
            <Label style={{ color: "white" }}>ร้านส่งสัตว์เลี้ยงคืนแล้ว</Label>
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
      list.push(
        <View style={{ flex: 1, marginVertical: 5 }}>
          <Button
            full
            style={{
              backgroundColor: "#7A5032",
              flex: 0.5,
              marginHorizontal: 20,
              borderRadius: 10
            }}
          >
            <Label style={{ color: "white" }}>ให้คะแนนร้าน</Label>
          </Button>
        </View>
      );
    } else if (orderStatus == 9) {
      list.push(
        <Label style={{ textAlign: "center" }}>
          {" "}
          ชำระค่าบริการสำเร็จแล้ว{" "}
        </Label>
      );
    }
    return list;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Label style={{ textAlign: "center" }}> ตัวเลือกออร์เดอร์ </Label>
        <Label />
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
