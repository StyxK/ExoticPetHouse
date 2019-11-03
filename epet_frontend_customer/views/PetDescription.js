import axios from "axios";
import { Body, Button, Card, CardItem, Container, Content, Header, Icon, Left, Right, Text, Title, View, Thumbnail, Row, Grid, Col, Label } from "native-base";
import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import Config from "react-native-config";
import { Actions } from "react-native-router-flux";
import theme from "../theme";

const API_URL = Config.API_URL;

export default class PetDescription extends Component {
  state = {};

  componentWillMount() {}

  render() {
    const { pet, updatePet } = this.props;
    return (
      <Container>
        <Container style={{flex:1,backgroundColor:'black'}}>
          <Header transparent>
            <Left style={{ flex: 1 }}>
              <Button badge rounded onPress={() => Actions.pop({ refresh: {} })} transparent>
                <Icon
                  name="arrow-back"
                  style={{ color: theme.primaryColor3,fontSize:theme.arrowSize }}
                />
              </Button>
            </Left>
            <Right>
              <Button badge rounded onPress={this.removePet} transparent>
                <Icon
                  name="delete" type='AntDesign'
                  style={{ color: theme.primaryTextColor,fontSize:theme.arrowSize }}
                />
              </Button>
            </Right>
          </Header>
          <Grid style={{paddingVertical:30,justifyContent:'flex-end'}}>
            <Row>
              <Col style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                <Thumbnail large source={{uri:pet.image}}/>
              </Col>
              <Col style={{flex:3,alignItems:'flex-start'}}>
                <Row style={{alignItems:'flex-end',paddingBottom:10}}>
                  <Label style={{color:theme.infoTextColor,fontSize:25}}> น้อง{pet.name}</Label>
                </Row>
                <Row style={{alignItems:'center',paddingBottom:10}}>
                  <Label style={{color:theme.infoTextColor,fontSize:15}}> {pet.typeOfPet}</Label>
                </Row>
                <Row style={{alignItems:'flex-start'}}>
                  {
                    pet.wasDeposit ? 
                      <Label style={{color:theme.infoTextColor,fontSize:15,padding:5,borderRadius:10,backgroundColor:theme.successColor}}>อยู่ระหว่างการฝาก</Label>
                      :
                      <Label style={{color:theme.infoTextColor,fontSize:15,padding:5,borderRadius:10,backgroundColor:'grey'}}>ยังไม่ถูกฝาก</Label>
                  }
                </Row>
              </Col>
              <Col style={{flex:1.5,justifyContent:'center',alignItems:'center'}}>
                <Button badge rounded onPress={() => Actions.addPet({ pet: pet, updatePet })} transparent>
                  <Icon
                    name="edit" type='AntDesign'
                    style={{ color: theme.primaryTextColor,fontSize:theme.arrowSize }}
                  />
                </Button>
              </Col>
            </Row>
          </Grid>
        </Container>
        <Container style={{flex:2}}>
          <Content style={{backgroundColor:theme.primaryColor}}>
            <Card transparent>
              <CardItem style={{backgroundColor:'rgba(0,0,0,0)'}}>
                <View style={{flexDirection:'row',backgroundColor:theme.primaryColor3,padding:10,borderRadius:5}}>
                  <Left>
                    <Text style={{color:'white'}}>อายุ</Text>
                  </Left>
                  <Right style={{alignItems:'flex-start'}}>
                    <Text style={{color:'white'}}>{pet.age} เดือน</Text>
                  </Right>
                </View>
              </CardItem>
              <CardItem style={{backgroundColor:'rgba(0,0,0,0)'}}>
                <View style={{flexDirection:'row',backgroundColor:theme.primaryColor3,padding:10,borderRadius:5}}>
                  <Left>
                    <Text style={{color:'white'}}>เพศ</Text>
                  </Left>
                  <Right style={{alignItems:'flex-start'}}>
                    <Text style={{color:'white'}}>{pet.gender == "male" ? "เพศผู้" : "เพศเมีย"}</Text>
                  </Right>
                </View>
              </CardItem>
              {
                pet.congenitalDisease != null ?
                <CardItem style={{backgroundColor:'rgba(0,0,0,0)'}}>
                    <View style={{flexDirection:'row',backgroundColor:theme.primaryColor3,padding:10,borderRadius:5}}>
                    <Left>
                      <Text style={{color:'white'}}>โรคประจำตัว</Text>
                    </Left>
                    <Right style={{alignItems:'flex-start'}}>
                      <Text style={{color:'white'}}>{pet.congenitalDisease}</Text>
                    </Right>
                  </View>
                </CardItem>
                :
                null  
              }
              {
                pet.allergicFoods != null ?
                <CardItem style={{backgroundColor:'rgba(0,0,0,0)'}}>
                  <View style={{flexDirection:'row',backgroundColor:theme.primaryColor3,padding:10,borderRadius:5}}>
                    <Left>
                      <Text style={{color:'white'}}>อาหารที่แพ้</Text>
                    </Left>
                    <Right style={{alignItems:'flex-start'}}>
                      <Text style={{color:'white'}}>{pet.allergicFoods}</Text>
                    </Right>
                  </View>
                </CardItem>
                :
                null  
              }
              {
                pet.favThing != null ?
                <CardItem style={{backgroundColor:'rgba(0,0,0,0)'}}>
                  <View style={{flexDirection:'row',backgroundColor:theme.primaryColor3,padding:10,borderRadius:5}}>
                    <Left>
                      <Text style={{color:'white'}}>สิ่งที่ชอบ</Text>
                    </Left>
                    <Right style={{alignItems:'flex-start'}}>
                      <Text style={{color:'white'}}>{pet.favThing}</Text>
                    </Right>
                  </View>
                </CardItem>
                :
                null  
              }
              {
                pet.hateThing != null ?
                <CardItem style={{backgroundColor:'rgba(0,0,0,0)'}}>
                  <View style={{flexDirection:'row',backgroundColor:theme.primaryColor3,padding:10,borderRadius:5}}>
                    <Left>
                      <Text style={{color:'white'}}>สิ่งที่ไม่ชอบ</Text>
                    </Left>
                    <Right style={{alignItems:'flex-start'}}>
                      <Text style={{color:'white'}}>{pet.hateThing}</Text>
                    </Right>
                  </View>
                </CardItem>
                :
                null  
              }
            </Card>
          </Content>
        </Container>
      </Container>
    );
  }
  removePet = () => {
    const { pet, removePet } = this.props;
    if (!pet.wasDeposit) {
      axios
        .delete(API_URL + "/pet/" + pet.id)
        .then(response => {
          if (response.data.delete) {
            alert("success");
            removePet(pet);
            Actions.pop({ refresh: {} });
          }
        })
        .catch(error => {
          alert("error" + error);
          console.log(error);
        });
    } else {
      return alert("Pet was Deposit");
    }
  };
}

const styles = StyleSheet.create({
  container: {
    color: theme.primaryColor,
    borderColor: theme.primaryColor,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: "50%",
    textAlign: "center",
    fontWeight: "bold"
  }
});
