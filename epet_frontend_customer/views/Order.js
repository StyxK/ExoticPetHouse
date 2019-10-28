import {
  Container,
  Icon,
  Left,
  Body,
  Header,
  Title,
  Right,
  Content,
  Text,
  Card,
  CardItem,
  List,
  ListItem,
  Button,
  Footer,
  DatePicker,
  Thumbnail,
  Row,
  Col,
  FooterTab,
  Label
} from "native-base";
import React, { Component } from "react";
import { StyleSheet, View, Alert } from "react-native";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { addPet, setPets, updatePet } from "../actions";
import Config from "react-native-config";
import theme from "../theme";

const API_URL = Config.API_URL;
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startChosenDate: new Date(),
      endChosenDate: new Date(),
      petIdTemp: "id"
    };
  }

  setStartDate = newDate => {
    this.setState({ startChosenDate: newDate });
  };

  setEndDate = newDate => {
    this.setState({ endChosenDate: newDate });
  };

  showCageName = cageId => {
    const cageArray = this.props.cage.find(item => item.id === cageId);
    return cageArray.name + " " + cageArray.price + "/คืน";
  };

  showPriceDuringDeposit = cageId => {
    const cageArray = this.props.cage.find(item => item.id === cageId);
    const totalPrice = this.showTotalPrice(cageArray.price);
    return totalPrice;
  };

  showTotalPrice(price) {
    let totalPrice = 0;
    const duration = this.calculateDate();
    totalPrice = price * duration;
    return totalPrice;
  }

  calculateDate() {
    const diffTime = Math.abs(
      this.state.endChosenDate.getTime() - this.state.startChosenDate.getTime()
    );
    let totalDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (totalDay == 0) {
      totalDay = 1;
    }
    return totalDay;
  }

  showPetName = petId => {
    const { pets = [], setPets } = this.props;
    const petArray = pets.find(item => item.id === petId);
    this.state.petIdTemp = petArray.id;
    return petArray.name + "";
  };

  showPetPhoto = petId => {
    const { pets = [], setPets } = this.props;
    const petArray = pets.find(item => item.id === petId);
    this.state.petIdTemp = petArray.id;
    return petArray.image;
  };

  removeOrderline = petId => {
    let confirm = 0;
    Alert.alert(
      "ลบรายการ",
      "คุณแน่ใจว่าต้องการลบหรือไม่",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        { text: "OK", onPress: () => remove() }
      ],
      { cancelable: false }
    );
    remove = () => {
      let orderLine = this.props.orderLine;
      for (let i = 0; i < orderLine.length; i++) {
        if (orderLine[i].pet == petId) {
          orderLine.splice(i, 1);
        }
      }
      this.props.orderLine = orderLine;
      Actions.refresh({});
    };
  };

  submitForm = () => {
    axios
      .post(API_URL + "/order/", {
        transportation: "kerry",
        submitDate: new Date(),
        startDate: this.state.startChosenDate,
        endDate: this.state.endChosenDate,
        orderLines: this.props.orderLine,
        storeId: this.props.stores.id
      })
      .then(response => {
        if(response.data.status == 406){
          alert(response.data.message)
        }else{
          alert('ส่งคำขอไปยังร้านสำเร็จ กรุณาติดตามคำขอของท่าน')
          Actions.history();
        }
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    let totalPrice = 0;
    let orderList = this.props.orderLine.map(data => {
      const price = this.showPriceDuringDeposit(data.cage);
      totalPrice += price;
      return (
        <ListItem avatar key={data.cage}>
          <Left>
            <Thumbnail source={{uri:this.showPetPhoto(data.pet)}} />
          </Left>
          <Body>
            <Text>กรง:{this.showCageName(data.cage)}</Text>
            <Text>สัตว์เลี้ยง: {this.showPetName(data.pet)}</Text>
            <Text>ราคาตลอดการฝาก: {price}</Text>
          </Body>
          <Right>
            <Icon
              type="FontAwesome"
              name="trash-o"
              onPress={() => {
                this.removeOrderline(data.pet);
              }}
            />
          </Right>
        </ListItem>
      );
    });

    return (
      <View style={styles.container}>
        <Container>
          <Header style={{ backgroundColor: theme.primaryColor }}>
            <Left style={{ flex: 1 }}>
              <Icon
                name="ios-arrow-back"
                onPress={() => {
                  Actions.pop();
                }}
                style={{ color: theme.primaryTextColor, marginLeft: 10 }}
              />
            </Left>
            <Body style={{ flex: 3 }}>
              <Title style={{ alignSelf:'center',color: theme.primaryTextColor, fontSize: 20 }}>
                รายการคำสั่งฝาก
              </Title>
            </Body>
            <Right style={{flex:1}}/>
          </Header>
          <Content>
              <ListItem itemDivider>
                <Left style={{flex:1}}>
                    <Text>ร้าน {this.props.stores.name}</Text>
                </Left>
                <Right style={{flex:1}}>
                  <Button rounded style={{alignSelf:'center', backgroundColor:theme.primaryColor}} onPress={() => Actions.pop()}>
                    <Text>เพิ่มรายการฝาก</Text>
                  </Button>
                </Right>
              </ListItem>
            <Card transparent>
              {orderList}
              <CardItem>
                <Text note>
                  วันที่ฝาก:{" "}
                  {this.state.startChosenDate.toString().substr(4, 12)}-{" "}
                  {this.state.endChosenDate.toString().substr(4, 12)}
                </Text>
              </CardItem>
              <CardItem>
                <Text note>ยอดชำระรวม: {totalPrice}</Text>
              </CardItem>
            </Card>
          </Content>
          <View style={{ flex:0.25,backgroundColor: theme.secondaryColor ,flexDirection:'row'}}>
            <Left
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View style={{flexDirection:'row'}}>
                <Body>
                  <Icon name='md-calendar' style={{ marginBottom:5, color: theme.secondaryTextColor }}/>
                </Body>
                <Body style={{flex:2,alignItems:'flex-start'}}>
                  <Label style={{ marginBottom:5, fontSize: 15, color: theme.secondaryTextColor }}>
                    เริ่มฝากตั้งแต่
                  </Label>
                </Body>
              </View>
              <DatePicker
                defaultDate={new Date().getDate}
                locale={"th"}
                minimumDate={new Date()}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"slide"}
                androidMode={"default"}
                placeHolderText="เลือกวัน"
                textStyle={{ color: 'white', fontSize: 17 ,backgroundColor:theme.secondaryTextColor, borderRadius:10 }}
                placeHolderTextStyle={{ color: 'white', fontSize: 17 ,backgroundColor:theme.secondaryTextColor, borderRadius:10 }}
                onDateChange={this.setStartDate}
                disabled={false}
              />
            </Left>
            <Left
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View style={{flexDirection:'row'}}>
                <Body>
                  <Icon name='md-calendar' style={{ marginBottom:5, color: theme.secondaryTextColor }}/>
                </Body>
                <Body style={{flex:2,alignItems:'flex-start'}}>
                  <Label style={{ marginBottom:5, fontSize: 15, color: theme.secondaryTextColor }}>
                    สิ้นสุดการฝาก
                  </Label>
                </Body>
              </View>
              <DatePicker
                defaultDate={new Date().getDate}
                locale={"th"}
                minimumDate={this.state.startChosenDate}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"slide"}
                androidMode={"calendar"}
                placeHolderText="เลือกวัน"
                textStyle={{ color: 'white', fontSize: 17 ,backgroundColor:theme.secondaryTextColor, borderRadius:10 }}
                placeHolderTextStyle={{ color: 'white', fontSize: 17 ,backgroundColor:theme.secondaryTextColor, borderRadius:10 }}
                onDateChange={this.setEndDate}
                disabled={false}
              />
            </Left>
          </View>
          <Footer>
            <FooterTab>
            <Button
              full
              style={{
                flex: 2,
                backgroundColor: theme.primaryColor
              }}
              onPress={this.sendOrderToStore}
            >
              <Text style={{ color: theme.primaryTextColor }}>ยืนยันคำสั่งฝาก</Text>
            </Button>
            </FooterTab>
          </Footer>
        </Container>
      </View>
    );
  }

  sendOrderToStore = () => {
    this.submitForm();
  };
}

const mapStateToProps = state => {
  return { pets: state.pets };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePet: pet => dispatch(updatePet(pet))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});
