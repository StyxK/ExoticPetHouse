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
        <Button
          full
          style={{ backgroundColor: "#7A5032", flex: 1, borderRadius: 10 }}
          onPress={() => {
            this.cancelOrder();
          }}
        >
          <Label>ยกเลิกคำสั่งฝาก</Label>
        </Button>
      );
    } else if (orderStatus == 2) {
      list.push(
        <Button
          full
          style={{ backgroundColor: "#7A5032", flex: 1, borderRadius: 10 }}
          onPress={() => {
            this.cancelOrder();
          }}
        >
          <Label>ยกเลิกคำสั่งฝาก</Label>
        </Button>
      );
    } else if (orderStatus == 6) {
      list.push(
        <Button
          full
          style={{ backgroundColor: "#7A5032", flex: 1, borderRadius: 10 }}
          onPress={() => {
            this.payment();
          }}
        >
          <Label>ชำระค่าบริการ</Label>
        </Button>
      );
    } else if (orderStatus == 9) {
      list.push(
        <Button
          full
          style={{ backgroundColor: "#7A5032", flex: 1, borderRadius: 10 }}
          onPress={() => {
            this.getPetsBack();
          }}
        >
          <Label>ร้านส่งสัตว์เลี้ยงคืนแล้ว</Label>
        </Button>
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
