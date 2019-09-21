import axios from "axios";
import { Body, Button, Card, CardItem, Container, Content, Header, Icon, Left, List, ListItem, Right, Text, Title, Thumbnail } from "native-base";
import React, { Component } from "react";
import { Alert, Modal, StyleSheet, TouchableHighlight, View } from "react-native";
import Config from "react-native-config";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import PetCard from "../components/PetCard";

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
    if(orderLineTemp.length >0){
      for (i = 0; i < orderLineTemp.length; i++){
        if(orderLineTemp[i].pet==petId){
          return true;
        }
      }
    }
    else{
      return false;
    }
  };

  chooseCageFromStorePage = cageId => {
    this.setModalVisible(true);
    this.setState({ cageTemp: cageId });
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

    axios.get(API_URL + "/");
  }

  render() {
    const { pets = [], setPets, addPet } = this.props;
    let cageList = this.state.cage.map(data => {
      return (
        <ListItem
          avatar
          key={data.id}
          onPress={() => {
            this.chooseCageFromStorePage(data.id);
          }}
        >
          <Left>
            <Icon name="paw" />
          </Left>
          <Body>
            <Text>{data.name}</Text>
            <Text note>ประเภท: {data.type}</Text>
            <Text style={{ color: "#7A5032" }}>{data.price} บาท/คืน</Text>
          </Body>
          <Right>
          </Right>
        </ListItem>
      );
    });

    let selectPet = pets.map(pet => {
      if (pet.wasDeposit == false&&this.petWasSelectedInOrder(pet.id)!=true) {
        return (
          <TouchableHighlight
            key={pet.id}
            onPress={() => {
              this.goToOrder(
                pet.id,
                this.state.cageTemp
              );
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
                <Text>{this.petWasSelectedInOrder(pet.id)+""}</Text>

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
          <Header style={{ backgroundColor: "#7A5032" }}>
            <Left style={{ flex: 1 }}>
              <Icon
                name="ios-arrow-back"
                onPress={() => {
                  Actions.home();
                }}
                style={{ color: "white", marginLeft: 10 }}
              />
            </Left>
            <Body style={{ flex: 1, alignItems: "center" }}>
              <Title style={{ color: "white", fontSize: 20 }}>
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
                    <Text style={{ color: "#7A5032" }}>{stores.rating}</Text>
                  </Text>
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text>ที่อยู่</Text>
                  <Text note style={{ color: "#7A5032" }}>
                    ถนน {address.street}, อำเภอ/เขต {address.district} จังหวัด{" "}
                    {address.province} {address.postcode}
                  </Text>
                </Left>
              </CardItem>
              <CardItem>
                <Left>
                  <Text>ติดต่อ</Text>
                  <Text note style={{ color: "#7A5032" }}>
                    {stores.phoneNumber}
                  </Text>
                </Left>
              </CardItem>
              <CardItem>
                <Left>
                  <Text>รายละเอียดร้านค้า</Text>
                  <Text note style={{ color: "#7A5032" }}>
                    {stores.description}
                  </Text>
                </Left>
              </CardItem>
              <CardItem>
                <Left>
                  <Text>กรงทั้งหมด</Text>
                  <Text note style={{ color: "#7A5032" }}>
                    {stores.maxOfDeposit} กรง
                  </Text>
                </Left>
              </CardItem>
              <Content>
                <List>{cageList}</List>
              </Content>
              <CardItem>
                <Text note>
                  *** กรุณากดที่กรงและเลือกสัตว์เลี้ยงที่จะฝาก
                </Text>
                <Text />
              </CardItem>
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
                      backgroundColor: "#7A5032"
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
  return {
  };
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
    width: "85%",
    marginTop: 40,
    marginLeft:35
  }
});
