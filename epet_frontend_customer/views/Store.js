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
  Thumbnail
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
      feedBack: []
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

  componentWillMount() {
    this.setStoreId();
    const { setPets } = this.props;
    axios
      .get(API_URL + "/store/" + this.storeId)
      .then(response => {
        this.setState({
          stores: response.data,
          address: JSON.parse(JSON.stringify(response.data.address)),
          cage: JSON.parse(JSON.stringify(response.data.cage))
        });
        console.log(JSON.stringify(response));
      })
      .then(error => console.log(error));
    axios
      .get(API_URL + "/feedback/")
      .then(response => { this.setState({ feedBack: JSON.parse(JSON.stringify(response.data)) }) })
      .then(error => console.log(error));
    axios.get(API_URL + "/");
  }

  render() {
    const { pets = [], setPets, addPet } = this.props;
    let cageList = this.state.cage.map(data => {
      return (
        <Card avatar key={data.id} style={{ backgroundColor: theme.secondaryColor }}>
          <CardItem
            button
            onPress={() => this.chooseCageFromStorePage(data.id)}
            style={{ backgroundColor: theme.primaryColor }}
          >
            <Left>
              <Icon name="paw" />
            </Left>
            <Body>
              <Text style={{ color: theme.primaryTextColor }}>{data.name}</Text>
              <Text style={{ color: theme.primaryTextColor }}>ประเภท: {data.type}</Text>
              <Text style={{ color: theme.primaryTextColor, borderColor: theme.primaryTextColor }}>
                {data.price} บาท/คืน
              </Text>
            </Body>
            <Right></Right>
          </CardItem>
        </Card>
      );
    });

    let feedBackList = this.state.feedBack.slice(0, 2).map(data => {
      if (this.countFeedBack != 0) {
        return (
          <List avatar key={data.id}  >
            <CardItem>
              <Left>
                <Thumbnail />
                <Text>{data.customerUserName}</Text>
              </Left>
            </CardItem>
            <CardItem>
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
            </CardItem>
            <CardItem bordered>
              <Text>{data.comment}</Text>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Text note>{moment(data.submitDate).tz("Asia/Bangkok").format("DD MMM YYYY")}</Text>
              </Left>
            </CardItem>
          </List>
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
          <TouchableHighlight
            key={pet.id}
            onPress={() => {
              this.goToOrder(pet.id, this.state.cageTemp);
            }}
          >
            <Card>
              <Body>
                <Left>
                  <Thumbnail
                    source={{
                      uri: pet.image
                    }}
                  />
                </Left>
                <Text>{pet.name}</Text>
                <Text note>{pet.typeOfPet}</Text>
              </Body>
            </Card>
          </TouchableHighlight>
        );
      }
      return;
    });

    const { stores, address } = this.state;
    return (
      <View style={styles.container}>
        <Container>
          <Header style={{ backgroundColor: theme.primaryColor }}>
            <Left style={{ flex: 1 }}>
              <Icon
                name="ios-arrow-back"
                onPress={() => {
                  Actions.home();
                }}
                style={{ color: theme.primaryTextColor, marginLeft: 10 }}
              />
            </Left>
            <Body style={{ flex: 1, alignItems: "center" }}>
              <Title style={{ color: theme.primaryTextColor, fontSize: 20 }}>
                {stores.name}
              </Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <Card style={{ flex: 0 }}>
              <CardItem header>
                <Text style={{ fontSize: 25 }}> {stores.name} </Text>
                <Right>
                  <Text note>
                    Rating :
                    <Text style={{ color: theme.primaryColor }}>
                      {stores.rating}
                    </Text>
                  </Text>
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text>ที่อยู่</Text>
                  <Text note style={{ color: theme.primaryColor }}>
                    ถนน {address.street}, อำเภอ/เขต {address.district} จังหวัด{" "}
                    {address.province} {address.postcode}
                  </Text>
                </Left>
              </CardItem>
              <CardItem>
                <Left>
                  <Text>ติดต่อ</Text>
                  <Text note style={{ color: theme.primaryColor }}>
                    {stores.phoneNumber}
                  </Text>
                </Left>
              </CardItem>
              <CardItem>
                <Left>
                  <Text>รายละเอียดร้านค้า</Text>
                  <Text note style={{ color: theme.primaryColor }}>
                    {stores.description}
                  </Text>
                </Left>
              </CardItem>
              <CardItem>
                <Left>
                  <Text>กรงทั้งหมด</Text>
                  <Text note style={{ color: theme.primaryColor }}>
                    {stores.maxOfDeposit} กรง
                  </Text>
                </Left>
              </CardItem>
              <Content>{cageList}</Content>
              <CardItem>
                <Text note>*** กรุณากดที่กรงและเลือกสัตว์เลี้ยงที่จะฝาก</Text>
                <Text />
              </CardItem>
            </Card>
            <Card>
              <CardItem bordered>
                <Left>
                  <Text>รีวิวการให้บริการ</Text>
                  <Text style={{ color: theme.primaryColor }}>{this.countFeedBack()} </Text>
                  <Text>รีวิว</Text>
                </Left>
                <Right>
                  <Text style={{ color: theme.primaryColor }}
                    button onPress={() => { Actions.review(this.state) }}>
                    ดูทั้งหมด->
                  </Text>

                </Right>
              </CardItem>
              {feedBackList}
            </Card>

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
                  <Content style={styles.modal} padder>
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
    borderRadius: 10,
    marginBottom: 65,
    backgroundColor: "white",
    opacity: 0.99,
    marginTop: 40
  }
});
