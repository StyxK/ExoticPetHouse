import React, { Component } from "react";
import { Image, Alert, Modal, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  Container,
  Text,
  Header,
  Left,
  Body,
  Right,
  Fab,
  Icon,
  Button,
  ListItem,
  List,
  Label,
  Content,
  View,
  Title,
  Item,
  Input
} from "native-base";
import axios from "axios";
import theme from "../theme";

export default class SubCage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cages: [],
      ModalVisible: false,
      cameraAddress: undefined
    };
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    const { cageType } = this.props;
    axios.get("/cage/types/" + cageType.id).then(response => {
      this.setState({ cages: response.data });
    });
  };

  setModalVisible = visible => {
    this.setState({ ModalVisible: visible });
  };

  addCamera = async (cage) => {
    const { cameraAddress } = this.state;
    if (!cameraAddress) {
      return alert("Plese Enter Camera Address");
    }

    axios
      .put("/cage/types/" + cage.id, {
        cameraAddress
      })
      .then(response => {
        alert("success");
        this.setModalVisible(false);
      })
      .catch(error => {
        alert("error" + error);
        console.log(error);
      });
  };

  render() {
    const { cages, ModalVisible, cameraAddress } = this.state;
    const { cageType } = this.props;
    let cagesList = cages.map(cage => {
      return (
        <List style={{ backgroundColor: theme.primaryColor }} key={cage.id}>
          <ListItem
            style={{
              backgroundColor: theme.secondaryColor,
              borderBottomWidth: 3,
              borderBottomColor: theme.primaryColor,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 5
            }}
          >
            <Body>
              <Text style={{ color: "white" }}> {cage.id}</Text>
              <Text />
            </Body>
            <Right style={{ flexDirection: "row", flex: 1 }}>
              <Button
                style={{
                  flex: 0.5,
                  marginRight: 10,
                  backgroundColor: theme.warningColor,
                  justifyContent: "center"
                }}
                rounded
                onPress={() => this.deleteSubCage(cage)}
              >
                <Label
                  style={{ fontSize: 14, textAlign: "center", color: "white" }}
                >
                  {" "}
                  ลบ{" "}
                </Label>
              </Button>
              {cageType.hasCamera ? (
                <Button
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    backgroundColor: theme.successColor
                  }}
                  rounded
                  onPress={() => {
                    this.setModalVisible(true);
                  }}
                >
                  <Label
                    style={{
                      fontSize: 14,
                      textAlign: "center",
                      color: theme.successTextColor
                    }}
                  >
                    {" "}
                    เพิ่มกล้อง{" "}
                  </Label>
                </Button>
              ) : (
                <></>
              )}
              <Modal
                animationType="fade"
                transparent={true}
                visible={ModalVisible}
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
                        onPress={() => {
                          this.setModalVisible(false);
                        }}
                      >
                        <Text
                          style={{
                            color: theme.primaryTextColor,
                            fontSize: 20
                          }}
                        >
                          ปิด
                        </Text>
                      </Button>
                    </Header>
                    <Content translucent>
                      <View
                        style={{
                          marginVertical: 5,
                          paddingHorizontal: 10,
                          flexDirection: "column"
                        }}
                      >
                        <Text
                          style={{ marginHorizontal: 15, marginVertical: 2 }}
                        >
                          Camera Address :
                        </Text>
                        <Item rounded>
                          <Input
                            value={cameraAddress}
                            onChangeText={e =>
                              this.setState({ cameraAddress: e })
                            }
                          />
                        </Item>
                        <Button
                          rounded
                          onPress={() => {
                            this.addCamera(cage);
                          }}
                          style={{
                            width: "100%",
                            backgroundColor: theme.primaryColor,
                            marginTop: "10%"
                          }}
                        >
                          <Text
                            style={{
                              color: theme.primaryTextColor,
                              width:"100%",
                              textAlign:"center"
                            }}
                          >
                            Add
                          </Text>
                        </Button>
                      </View>
                    </Content>
                  </Container>
                </View>
              </Modal>
            </Right>
          </ListItem>
        </List>
      );
    });

    return (
      <Container>
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
          <Header style={{ backgroundColor: theme.primaryColor }}>
            <Left style={{flex:1}}>
              <Button rounded transparent onPress={()=>Actions.pop()}>
                <Icon name='arrow-back'/>
              </Button>
            </Left>
            <Body style={{ flex: 3, alignItems: "center" }}>
              <Title style={{ color: theme.primaryTextColor, fontSize: 20 }}>
                กรงประเภท {cageType.typeName}
              </Title>
            </Body>
            <Right style={{flex:1}}/>
          </Header>
          <Content>{cagesList}</Content>
        </View>
      </Container>
    );
  }

  deleteSubCage = async cage => {
    Alert.alert(
      `ยืนยันการลบกรง`,
      `ต้องการลบ ${cage.id} หรือไม่ ?`,
      [
        {
          text: "ยืนยัน",
          onPress: () => {
            axios
              .delete("/cage/types/" + cage.id)
              .then(() => {
                alert(`ทำรายการเสร็จสิ้น`);
                this.refresh();
              })
              .catch(err => {
                console.log(err);
                alert(
                  "ไม่สามารถทำรายการได้ กรุณาตรวจสอบว่ามีการรับฝากในกรงนี้อยู่หรือไม่ แล้วทำรายการอีกครั้ง"
                );
              });
          }
        },
        { text: "ยกเลิก", style: "cancel" }
      ],
      { cancelable: true }
    );
  };
}
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
    backgroundColor: "rgba(52, 52, 52, 0.8)"
  },
  modal: {
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "white",
    opacity: 0.99
  }
});
