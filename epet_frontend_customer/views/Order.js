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
  Label,
  Grid
} from "native-base";
import React, { Component } from "react";
import { StyleSheet, View, Alert } from "react-native";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { addPet, setPets, updatePet } from "../actions";
import Config from "react-native-config";
import theme from "../theme";
import { dimmerLoading } from '../components/Loading'

const API_URL = Config.API_URL;
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startChosenDate: new Date(),
      endChosenDate: new Date(),
      petIdTemp: "id",
      loading: false
    };
    console.log(this.props)
  }

  setStartDate = newDate => {
    this.setState({ startChosenDate: newDate });
  };

  setEndDate = newDate => {
    this.setState({ endChosenDate: newDate });
  };

  showCageName = cageId => {
    const cageArray = this.props.cageType.find(item => item.id === cageId);
    return cageArray.typeName;
  };

  showCagePrice = cageTypeId => {
    const cageArray = this.props.cageType.find(item => item.id === cageTypeId);
    return cageArray.price;
  };

  showPriceDuringDeposit = cageTypeId => {
    const cageArray = this.props.cageType.find(item => item.id === cageTypeId);
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
          onPress: () => { },
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
    this.setState({loading:true})
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
        this.setState({
          loading:false
        })
        if(response.data.status == 406){
          alert(response.data.message)
        } else {
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
      const price = this.showPriceDuringDeposit(data.cageType);
      totalPrice += price;
      return (
        <ListItem avatar key={data.cageType}>
          <Left>
            <Thumbnail source={{ uri: this.showPetPhoto(data.pet) }} />
          </Left>
          <Body>
            <Text>กรง:{this.showCageName(data.cageType)}</Text>
            <Text>สัตว์เลี้ยง: {this.showPetName(data.pet)}</Text>
            <Text>ราคาตลอดการฝาก: {price} บาท</Text>
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
              <Button transparent rounded onPress onPress={() => { Actions.pop() }} style={{justifyContent:'center',alignItems:'center'}}>
                <Icon name="arrow-back" style={{ color: theme.primaryTextColor, marginLeft: 10 }}/>
              </Button>
            </Left>
            <Body style={{ flex: 3 }}>
              <Title style={{ alignSelf: 'center', color: theme.primaryTextColor, fontSize: 20 }}>
                รายการคำสั่งฝาก
              </Title>
            </Body>
            <Right style={{ flex: 1 }} />
          </Header>
          <Container style={{backgroundColor:theme.primaryColor}}>
            <Container style={{ flex: 1 }}>
              <Content style={{backgroundColor:theme.primaryColor}}>
                <Grid>
                  <Body style={{flex:1,flexDirection:'column'}}>
                    <Row style={{flex:1,paddingVertical:5}}>
                      <Col style={{flex:4,paddingHorizontal:10}}>
                        <Label style={{fontSize:15,textAlign:'center',color:'white'}}>เริ่มการฝาก</Label>
                      </Col>
                      <Col style={{flex:2,paddingHorizontal:10}}/>
                      <Col style={{flex:4,paddingHorizontal:10}}>
                        <Label style={{fontSize:15,textAlign:'center',color:'white'}}>สิ้นสุดการฝาก</Label>
                      </Col>
                    </Row>
                    <Row style={{flex:1,paddingVertical:5}}>
                      <Col style={{flex:4,paddingHorizontal:10}}>
                        <DatePicker
                          defaultDate={new Date().getDate}
                          locale={"th"}
                          minimumDate={new Date()}
                          timeZoneOffsetInMinutes={undefined}
                          modalTransparent={false}
                          animationType={"slide"}
                          androidMode={"default"}
                          placeHolderText="ระบุวันที่"
                          textStyle={{ textAlign:'center',color: 'white', fontSize: 17,width:'100%', backgroundColor: theme.primaryColor3, borderRadius: 10 }}
                          placeHolderTextStyle={{ textAlign:'center',color: 'white', fontSize: 17, width:'100%', backgroundColor: theme.primaryColor3, borderRadius: 10 }}
                          onDateChange={this.setStartDate}
                          disabled={false}
                          style={{widht:'100%', backgroundColor: theme.primaryColor3, borderRadius: 10}}
                        />
                      </Col>
                      <Col style={{flex:2,paddingHorizontal:10,justifyContent:'center'}}>
                        <Label style={{fontSize:15,textAlign:'center',color:'white'}}>จนถึง</Label>
                      </Col>
                      <Col style={{flex:4,paddingHorizontal:10}}>
                        <DatePicker
                          defaultDate={new Date().getDate}
                          locale={"th"}
                          minimumDate={this.state.startChosenDate}
                          timeZoneOffsetInMinutes={undefined}
                          modalTransparent={false}
                          animationType={"slide"}
                          androidMode={"calendar"}
                          placeHolderText="ระบุวันที่"
                          textStyle={{ textAlign:'center',color: 'white', fontSize: 17, widht:'100%', backgroundColor: theme.primaryColor3, borderRadius: 10}}
                          placeHolderTextStyle={{ textAlign:'center',color: 'white', fontSize: 17, widht:'100%', backgroundColor: theme.primaryColor3, borderRadius: 10 }}
                          onDateChange={this.setEndDate}
                          disabled={false}
                        />
                      </Col>
                    </Row>
                    <Row style={{flex:1,paddingVertical:5}}>
                      <Col style={{flex:1,paddingHorizontal:10}}>
                        <Button style={{alignSelf:'center', backgroundColor:theme.primaryColor3,borderRadius:10,width:'100%'}} onPress={() => Actions.pop()}>
                          <Text>เพิ่มรายการฝาก</Text>
                        </Button>
                      </Col>
                      <Col style={{flex:1.5,paddingHorizontal:10}}>
                        <Button disabled style={{ justifyContent:'center',backgroundColor:theme.secondaryColor,borderRadius:10,width:'100%'}}>
                          <Text style={{textAlign:'center'}}>ยอดชำระรวม: {totalPrice} บาท</Text>
                        </Button>
                      </Col>
                    </Row>
                  </Body>
                </Grid>
              </Content>
            </Container>
            <Container style={{flex:2,borderTopLeftRadius:10,borderTopRightRadius:10}}>
              <Content>
                <Card transparent>
                  {orderList}
                </Card>
              </Content>
            </Container>
          </Container>
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
              <Text style={{ color: theme.primaryTextColor,fontSize:15 }}>ยืนยันคำสั่งฝาก</Text>
            </Button>
            {dimmerLoading(this.state.loading)}
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
