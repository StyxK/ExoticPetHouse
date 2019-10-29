import axios from "axios";
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Title,
  Thumbnail,
  Label,
  Badge
} from "native-base";
import React, { Component } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  TouchableHighlight,
  View
} from "react-native";
import Config from "react-native-config";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import PetCard from "../components/PetCard";
import theme from "../theme";
import StarRating from "react-native-star-rating";
import moment from "moment-timezone";

const API_URL = Config.API_URL;
class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      address: {},
      cage: [],
      orderLine: [],
      modalVisible: false,
      cageTemp: "cage",
      petTemp: [],
      feedBack: [],
      banned:undefined
    };
  }

  checkedCageIdForCheckBox = dataId => { };

  setStoreId = () => {
    this.storeId = this.props.id;
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  setPetAndCageSelected = (petId, cageId) => {
    let order = { pet: petId, cage: cageId };
    this.state.orderLine.push(order);
    this.setModalVisible(false);
  };

  petWasSelectedInOrder = petId => {
    orderLineTemp = this.state.orderLine;
    if (orderLineTemp.length > 0) {
      for (i = 0; i < orderLineTemp.length; i++) {
        if (orderLineTemp[i].pet == petId) {
          return true;
        }
      }
    } else {
      return false;
    }
  };

  chooseCageFromStorePage = cageId => {
    this.setModalVisible(true);
    this.setState({ cageTemp: cageId });
  };

  countFeedBack = () => {
    return this.state.feedBack.length;
  };

  calculateRating=()=>{
    let sumScore = 0;
    this.state.feedBack.map(data =>{
      sumScore = sumScore+data.score;
    })
    let average = sumScore/this.state.feedBack.length;
    return average;
  }

  componentWillMount() {
    this.setStoreId();
    const { setPets } = this.props;
    axios
      .get(API_URL + "/store/" + this.storeId)
      .then(response => {
        this.setState({
          stores: response.data,
          address: JSON.parse(JSON.stringify(response.data.address)),
          cage: JSON.parse(JSON.stringify(response.data.cage)),
          banned: response.data.banned
        });
        console.log(JSON.stringify(response));
      })
      .then(error => console.log(error));
    axios
      .get(API_URL + "/feedback/" + this.storeId)
      .then(response => { this.setState({ feedBack: JSON.parse(JSON.stringify(response.data))}) })
      .then(error => console.log(error));
    axios.get(API_URL + "/");
  }

  render() {
    const { pets = [], setPets, addPet } = this.props;
    let cageList = this.state.cage.map(data => {
      console.log(data)
      return (
        <Card avatar key={data.id} style={{ borderRadius:30 }}>
          <CardItem
            button
            onPress={() => this.chooseCageFromStorePage(data.id)}
            style={{ backgroundColor: theme.primaryColor,borderRadius: 30 }}
          >
            <Left>
                <Icon name="paw" style={{color:'white'}} type='FontAwesome5' />
            </Left>
            <Body>
              <Text style={{ color: theme.primaryTextColor }}>{data.typeName}</Text>
              <Text style={{ color: theme.primaryTextColor}}>
                {data.price} บาท/คืน
              </Text>
            </Body>
            <Right>
                <Icon name='ios-arrow-forward' style={{ fontSize:30 }}/>
            </Right>
          </CardItem>
          <CardItem>
          <Text style={{ color: theme.primaryTextColor, borderColor: theme.primaryTextColor }}>{data.description}</Text>
          </CardItem>
        </Card>
      );
    });

    let HeaderFeedback = () => {
      if (this.countFeedBack() > 0) {
        return (
          <ListItem itemDivider style={{height:50}}>
              <Left style={{flex:2}}>
                  <Text>รีวิวการให้บริการ</Text>
                  <Text style={{ color: theme.primaryColor }}> {this.countFeedBack()} </Text>
                  <Text>รีวิว</Text>
              </Left>
              <Right style={{flex:0.5}}>
                <Button full transparent rounded button onPress={() => { Actions.review(this.state)}}>
                  <Label style={{ color: theme.primaryColor , fontSize:15 }}>
                    ดูทั้งหมด
                  </Label>
                </Button>
              </Right>
            </ListItem>
        );   
      }
    }

    let feedBackList = this.state.feedBack.slice(0, 2).map(data => {
      if (this.countFeedBack != 0) {
        return (
          <Card key={data.id} transparent>
            <CardItem header style={{flex:1,flexDirection:'column'}}>
              <Left style={{alignSelf:'flex-start'}}>
                <Thumbnail />
                <Text>{data.customerUserName}</Text>
              </Left>
              <Right style={{alignSelf:'flex-start',flexDirection:'row'}}>
                <Left style={{flex:1}}>
                  <StarRating
                    disabled={true}
                    emptyStar={"ios-star-outline"}
                    fullStar={"ios-star"}
                    halfStar={"ios-star-half"}
                    iconSet={"Ionicons"}
                    maxStars={5}
                    rating={data.score}
                    fullStarColor={"orange"}
                    starSize={20}
                  />
                </Left>
                <Left style={{flex:2}}>
                  <Text note>{moment(data.submitDate).tz("Asia/Bangkok").format("DD MMM YYYY")}</Text>
                </Left>
              </Right>
            </CardItem>
            <CardItem bordered>
              <Text>{data.comment}</Text>
              <Left>
              </Left>
            </CardItem>
          </Card>
        );
      } else {
        return;
      }
    });

    let selectPet = pets.map(pet => {
      if (
        pet.wasDeposit == false &&
        this.petWasSelectedInOrder(pet.id) != true
      ) {
        return (
            <Card transparent key={pet.id}>
              <CardItem cardBody button onPress={() => {
                this.goToOrder(pet.id, this.state.cageTemp);
              }}>
                <Left style={{flex:1.5,alignItems:'center'}}>
                  <Thumbnail source={{ uri: pet.image }}/>
                </Left>
                <Body style={{flex:3}}>
                  <Text>{pet.name}</Text>
                  <Text note>{pet.typeOfPet}</Text>
                </Body>
                <Right style={{flex:1,alignItems:'center'}}>
                  <Icon style={{fontSize:20,color:'green'}} name='md-add'/>
                </Right>
              </CardItem>
            </Card>
        );
      }
      return;
    });

    const { stores, address } = this.state;
    return (
      <View style={styles.container}>
        <Container>
          <Header transparent style={{ backgroundColor: theme.primaryColor }}>
            <Left>
              <Button transparent icon rounded small onPress={() => { Actions.home(); }}>
                <Icon
                  name="ios-arrow-back"
                  style={{ color: theme.primaryTextColor, marginLeft: 10 }}
                />
              </Button>
            </Left>
            <Body>
              <Text style={{ fontSize: 20 ,color:'white'}}> {stores.name} </Text>
            </Body>
            <Right>
              <StarRating
                disabled={true}
                emptyStar={"md-star-outline"}
                fullStar={"md-star"}
                halfStar={"md-star-half"}
                iconSet={"Ionicons"}
                maxStars={5}
                rating={this.calculateRating()}
                fullStarColor={"orange"}
                starSize={20}
              />
              <Label style={{marginHorizontal:5,color:'white',fontSize:15}}>{this.calculateRating()}</Label>
            </Right>
          </Header>
          <Content>
            <View style={{ backgroundColor: 'black' ,padding:10}}>
                <View style={{justifyContent:'flex-start',alignItems:'flex-start'}}>
                  <Text note style={{ color: 'white' }}> {stores.description} </Text>
                </View>
            </View>
            <Card transparent >
              <CardItem>
                <Left style={{flex:0.25}}>
                  <Icon name='md-pin' style={{color:'red'}}/>
                </Left>
                <Body style={{flex:2}}>
                  <Label style={{ color: theme.primaryColor ,fontSize:15}} >
                    ถนน {address.street} อำเภอ/เขต {address.district} จังหวัด {address.province} {address.postcode}
                  </Label>
                </Body>
              </CardItem>
              <CardItem>
                <Left style={{flex:0.25}}>
                  <Icon name='md-contact' style={{color:'red'}}/>
                </Left>
                <Body style={{flex:2}}>
                  <Label style={{ color: theme.primaryColor ,fontSize:15}} >
                    {stores.phoneNumber}
                  </Label>
                </Body>
              </CardItem>
                {this.state.banned ? 
                  <Content padder>
                    <View style={{borderRadius:20,backgroundColor:'orange',flexDirection:'row',height:60}}>
                      <Left style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
                        <Icon name='warning' style={{color:'white',fontSize:40}}/>
                      </Left>
                      <Body style={{flex:1}}>
                        <Label style={{color:'white',fontSize:15}}> ขณะนี้ร้านไม่สามารถให้บริการได้ </Label>
                        <Label style={{color:'white',fontSize:15}}> ขออภัยในความไม่สะดวก </Label>
                      </Body>
                      <Right style={{flex:0.2}}/>
                    </View>
                  </Content>
                    : 
                  <Content padder>
                    {cageList}
                  </Content>
                }
              <CardItem style={{justifyContent:'center'}}>
                  <Icon name='md-information-circle' style={{color:'green'}}/>
                  <Text note>กรุณากดที่กรงและเลือกสัตว์เลี้ยงที่จะฝาก</Text>
              </CardItem>
            </Card>
            {HeaderFeedback()}
            <Content padder style={{backgroundColor:'grey'}}>
              {feedBackList}
            </Content>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal Closed");
              }}
            >
              <View style={styles.modalContainer}>
                <Container style={styles.modal}>
                  <Header
                    translucent
                    style={{
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      backgroundColor: theme.primaryColor
                    }}
                  >
                    <Button
                      transparent
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#7A5032"
                      }}
                      onPress={() => this.setModalVisible(false)}
                    >
                      <Text>ปิดรายการ</Text>
                    </Button>
                  </Header>
                  <Content padder>
                    {selectPet}
                  </Content>
                </Container>
              </View>
            </Modal>
          </Content>
        </Container>
      </View>
    );
  }
  goToOrder = (petId, cageId) => {
    this.setPetAndCageSelected(petId, cageId);
    Actions.order(this.state);
  };
}

const mapStateToProps = state => {
  return { pets: state.pets };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Store);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  modalContainer: {
    flex: 1,
    flexDirection: "column-reverse",
    justifyContent: "center",
    alignItems: "center",
    height: 500,
    backgroundColor: "rgba(52, 52, 52, 0.8)"
  },
  modal: {
    marginHorizontal:20,
    borderRadius: 10,
    marginBottom: 65,
    backgroundColor: "white",
    opacity: 0.99,
    marginTop: 40
  }
});
