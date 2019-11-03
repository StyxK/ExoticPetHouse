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
  Badge,
  Grid,
  Col,
  Row
} from "native-base";
import React, { Component } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  View
} from "react-native";
import Config from "react-native-config";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import theme from "../theme";
import StarRating from "react-native-star-rating";
import moment from "moment-timezone";
import NavFooter from '../components/NavFooter'
import { SliderBox } from 'react-native-image-slider-box';
import { TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";

const API_URL = Config.API_URL;
class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      address: {},
      cageType: [],
      orderLine: [],
      modalVisible: false,
      cageTemp: "cage",
      petTemp: [],
      feedBack: [],
      banned: undefined,
      images: [],
      imageProfile: undefined,
      imageModalVisible: false
    };
  }

  checkedCageIdForCheckBox = dataId => { };

  setStoreId = () => {
    this.storeId = this.props.id;
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  setPetAndCageSelected = (petId, cageTypeId) => {
    let order = { pet: petId, cageType: cageTypeId };
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

  chooseCageFromStorePage = cageTypeId => {
    this.setModalVisible(true);
    this.setState({ cageTemp: cageTypeId });
  };

  countFeedBack = () => {
    return this.state.feedBack.length;
  };

  calculateRating = () => {
    let sumScore = 0;
    this.state.feedBack.map(data => {
      sumScore = sumScore + data.score || 0;
    });
    let average = sumScore / this.state.feedBack.length;
    return average;
  };

  componentWillMount() {
    this.setStoreId();
    const { setPets } = this.props;
    axios
      .get(API_URL + "/store/" + this.storeId)
      .then(response => {
        this.setState({
          stores: response.data,
          address: JSON.parse(JSON.stringify(response.data.address)),
          cageType: JSON.parse(JSON.stringify(response.data.cage)),
          banned: response.data.banned,
          images: response.data.storeImages.map(storeImage => storeImage.image),
          imageProfile : response.data.image
        });
        console.log(response, "response");
      })
      .then(error => console.log(error));
    axios
      .get(API_URL + "/feedback/" + this.storeId)
      .then(response => {
        this.setState({ feedBack: JSON.parse(JSON.stringify(response.data)) });
      })
      .then(error => console.log(error));
    axios.get(API_URL + "/");
  }

  render() {
    const { pets = [], setPets, addPet } = this.props;
    let cageList = this.state.cageType.map(data => {
      return (
        <Card transparent key={data.id}>
          <CardItem
            button
            onPress={() => this.chooseCageFromStorePage(data.id)}
            style={{ borderBottomWidth: 0.5, borderColor: 'grey', paddingHorizontal: 10, backgroundColor: 'rgba(0, 0, 0, 0)' }}
          >
            <Left style={{ flex: 1 }}>
              <Icon name="paw" style={{ color: theme.secondaryColor }} type='FontAwesome5' />
            </Left>
            <Body style={{ flex: 6 }}>
              <Text style={{ color: 'black' }}>{data.typeName}</Text>
              <Text note>{data.description}</Text>
              <Text style={{ color: theme.successColor }}>
                {data.price} บาท/คืน
              </Text>
            </Body>
          </CardItem>
        </Card>
      );
    });

    let HeaderFeedback = () => {
      if (this.countFeedBack() == 0) {
        return (
          <ListItem itemDivider style={{ height: 30, borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: theme.secondaryColor }}>
            <Left style={{ flex: 2 }}>
              <Text>รีวิวการให้บริการ</Text>
              <Text style={{ color: theme.primaryColor }}> {this.countFeedBack()} </Text>
              <Text>รีวิว</Text>
            </Left>
            <Right style={{ flex: 0.5 }}>
            </Right>
          </ListItem>
        )
      } else {
        return (
          <ListItem itemDivider style={{ height: 30, borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: theme.secondaryColor }}>
            <Left style={{ flex: 2 }}>
              <Text>รีวิวการให้บริการ</Text>
              <Text style={{ color: theme.primaryColor }}> {this.countFeedBack()} </Text>
              <Text>รีวิว</Text>
            </Left>
            <Right style={{ flex: 0.5 }}>
              <Button full transparent rounded button onPress={() => { Actions.review(this.state) }}>
                <Label style={{ color: theme.primaryColor, fontSize: 15 }}>
                  ดูทั้งหมด
                  </Label>
              </Button>
            </Right>
          </ListItem>
        );
      }
    }

    let selectPet = pets.map(pet => {
      if (
        pet.wasDeposit == false &&
        this.petWasSelectedInOrder(pet.id) != true
      ) {
        return (
          <Card transparent key={pet.id}>
            <CardItem
              cardBody
              button
              onPress={() => {
                this.goToOrder(pet.id, this.state.cageTemp);
              }}
            >
              <Left style={{ flex: 1.5, alignItems: "center" }}>
                <Thumbnail source={{ uri: pet.image }} />
              </Left>
              <Body style={{ flex: 3 }}>
                <Text>{pet.name}</Text>
                <Text note>{pet.typeOfPet}</Text>
              </Body>
              <Right style={{ flex: 1, alignItems: "center" }}>
                <Icon style={{ fontSize: 20, color: "green" }} name="md-add" />
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
          <View style={{ flex:0.45,backgroundColor: theme.primaryColor, justifyContent: 'center' }}>
            <Body style={{ flex: 4, justifyContent: 'center', height: '85%', padding: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Left>
                  <Text style={{ fontSize: 20, color: "white" }}>
                    {stores.name}
                  </Text>
                </Left>
                <Right>
                  <Button rounded style={{backgroundColor:theme.secondaryColor}} onPress={()=>{this.setState({imageModalVisible:true})}}>
                    <Icon style={{fontSize:20}} name='md-image'/>
                  </Button>
                </Right>
              </View>
              <Text note style={{ color: "white",alignSelf:'flex-start' }}>
                {stores.description}
              </Text>
              <View style={{ backgroundColor: theme.primaryColor3, flexDirection: 'row', padding: 3, borderRadius: 10, marginTop: 5 }}>
                <Left style={{ flex: 0.35, justifyContent: 'center', alignItems: 'center' }}>
                  <Icon name="md-pin" style={{ color: theme.secondaryColor, fontSize: 20 }} />
                </Left>
                <Left style={{ flex: 4 }}>
                  <Label style={{ color: 'white', fontSize: 12 }}>
                    ถนน {address.street} อำเภอ/เขต {address.district} จังหวัด{" "}
                    {address.province} {address.postcode}
                  </Label>
                </Left>
              </View>
              <View style={{ flexDirection: 'row'}}>
                <View style={{ flex:1,backgroundColor: theme.primaryColor3, flexDirection: 'row', padding: 3, borderRadius: 10, marginTop: 10 }}>
                  <Left style={{ flex: 0.35, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name="md-contact" style={{ color: theme.secondaryColor, fontSize: 20 }} />
                  </Left>
                  <Left style={{ flex: 1.7 }}>
                    <Label style={{ color: 'white', fontSize: 12 }}>
                      {stores.phoneNumber}
                    </Label>
                  </Left>
                </View>
                <View style={{ flex:1,padding: 3, borderRadius: 10, marginTop: 10,flexDirection:'row-reverse' }}>
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
                </View>
              </View>
            </Body>
          </View>
          <Container style={{ backgroundColor: theme.primaryColor }}>
            <Content style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: 'white' }}>
              <View>
              </View>
              <Label style={{ color: 'black', fontSize: 15, textAlign: 'left', paddingTop: 10, paddingHorizontal: 20 }}>
                กรงที่ให้บริการภายในร้าน
                </Label>
              {this.state.banned ? (
                <Content padder>
                  <View
                    style={{
                      borderRadius: 20,
                      backgroundColor: "orange",
                      flexDirection: "row",
                      height: 60
                    }}
                  >
                    <Left
                      style={{
                        flex: 0.5,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Icon
                        name="warning"
                        style={{ color: "white", fontSize: 40 }}
                      />
                    </Left>
                    <Body style={{ flex: 1 }}>
                      <Label style={{ color: "white", fontSize: 15 }}>
                        {" "}
                        ขณะนี้ร้านไม่สามารถให้บริการได้{" "}
                      </Label>
                      <Label style={{ color: "white", fontSize: 15 }}>
                        {" "}
                        ขออภัยในความไม่สะดวก{" "}
                      </Label>
                    </Body>
                    <Right style={{ flex: 0.2 }} />
                  </View>
                </Content>
              ) : (
                  <Content padder>{cageList}</Content>
                )}
            </Content>
          </Container>
          {HeaderFeedback()}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
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
                      backgroundColor: theme.primaryColor
                    }}
                    onPress={() => this.setModalVisible(false)}
                  >
                    <Text>ปิดรายการ</Text>
                  </Button>
                </Header>
                <Content padder>{selectPet}</Content>
              </Container>
            </View>
          </Modal>
          <Modal animationType='fade' visible={this.state.imageModalVisible} transparent={true}>
              <Button style={styles.modalContainer} onPress={()=>this.setState({imageModalVisible:false})}>
                <Container style={{flex:0.5,backgroundColor: "rgba(0, 0, 0, 0.0)"}}>
                  <SliderBox
                    images={this.state.images}
                    sliderBoxHeight={250}
                    dotColor="#FFEE58"
                    inactiveDotColor="#90A4AE"
                  />
                </Container>
              </Button>
          </Modal>
          <NavFooter />
        </Container>
      </View>
    );
  }
  goToOrder = (petId, cageTypeId) => {
    this.setPetAndCageSelected(petId, cageTypeId);
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
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 65,
    backgroundColor: "white",
    opacity: 0.99,
    marginTop: 40
  }
});
