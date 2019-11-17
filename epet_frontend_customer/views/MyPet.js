import {
  Container,
  Fab,
  Icon,
  CardItem,
  Header,
  Body,
  Title,
  Card,
  View,
  Label
} from "native-base";
import React, { Component } from "react";
import { StyleSheet ,ImageBackground,TouchableHighlight} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { addPet, updatePet, removePet } from "../actions";
import NavFooter from "../components/NavFooter";
import theme from "../theme";
import Carousel,{Pagination} from 'react-native-snap-carousel'

class MyPet extends Component {

  constructor(props){
    super(props)
    this.state = {
      activeSlide : 0
    }
  }

  renderItem = ({item}) => {
    let image
    item.image == null ?
        image = require('../assets/no_image_available.jpeg')
        :
        image = {uri:item.image}
    return (
        <TouchableHighlight style={{flex:1,borderRadius:10}} underlayColor='rgba(0,0,0,0)' onPress={()=>this.goToPetDescription(item)}>
          <Card style={{flex:5,borderRadius:10}}>
                <ImageBackground
                    source={image}
                    imageStyle={{borderRadius:10}}
                    style={{flex:1,resizeMode:'cover',borderRadius:10}}
                >
                    <CardItem style={{flex:0.2,backgroundColor:'rgba(0,0,0,0)',justifyContent:'flex-end'}}>
                      {
                        item.wasDeposit ? 
                          <Label style={{color:theme.infoTextColor,fontSize:15,padding:5,borderRadius:10,backgroundColor:theme.successColor}}>อยู่ระหว่างการฝาก</Label>
                          :
                          <Label style={{color:theme.infoTextColor,fontSize:15,padding:5,borderRadius:10,backgroundColor:'grey'}}>ยังไม่ถูกฝาก</Label>
                      }
                    </CardItem>
                    <CardItem style={{flex:1,backgroundColor:'rgba(0,0,0,0)'}}/>
                    <CardItem style={{flex:0.25,borderBottomLeftRadius:10,borderBottomRightRadius:10,backgroundColor:'rgba(0,0,0,0.8)',flexDirection:'column'}}>
                        <Title style={{fontSize:20,textAlign:'left'}}>
                          {item.name}
                        </Title>
                        <Title style={{fontSize:10}}>
                          {item.typeOfPet}
                        </Title>
                    </CardItem>
                </ImageBackground>
          </Card>
        </TouchableHighlight>
    )
  }

  render() {
    return (
      <Container>
        <Container>
          <Header style={{ backgroundColor: theme.primaryColor }}>
            <Body style={{ flex: 1, alignItems: "center" }}>
              <Title style={{ color: theme.primaryTextColor, fontSize: 20 }}>สัตว์เลี้ยงของฉัน</Title>
            </Body>
          </Header>
          <View padder style={{alignItems:'center',flex:1,backgroundColor:theme.primaryColor}}>
            <Carousel
              data={this.props.pets}
              renderItem={this.renderItem}
              sliderWidth={500}
              itemWidth={300}
              onSnapToItem={(index)=>{this.setState({activeSlide:index})}}
            />
            <Pagination
              dotsLength={this.props.pets.length}
              activeDotIndex={this.state.activeSlide}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View>
          <Fab
            style={{ backgroundColor: theme.secondaryColor }}
            position="bottomRight"
            onPress={this.goToAddPet}
          >
            <Icon name="add" />
          </Fab>
        </Container>
        <NavFooter />
      </Container>
    );
  }
  goToAddPet = () => {
    const { addPet } = this.props;
    Actions.addPet({ addPet });
  };

  goToPetDescription = pet => {
    const { updatePet, removePet } = this.props;
    Actions.petDescription({ pet, updatePet, removePet });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});

const mapStateToProps = state => {
  return { pets: state.pets, user: state.user };
};

const mapDispatchToProps = dispatch => {
  return {
    addPet: pet => dispatch(addPet(pet)),
    updatePet: pet => dispatch(updatePet(pet)),
    removePet: pet => dispatch(removePet(pet))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPet);
