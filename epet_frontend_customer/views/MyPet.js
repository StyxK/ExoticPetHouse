import {
  Container,
  Fab,
  Icon,
  CardItem,
  Header,
  Body,
  Title,
  Content,
  Card,
  Grid,
  Col,
  Row,
  DeckSwiper
} from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Config from "react-native-config";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { addPet, setPets, updatePet, removePet } from "../actions";
import PetCard from "../components/PetCard";
import NavFooter from "../components/NavFooter";
import theme from "../theme";
import { loading } from '../components/Loading'

class MyPet extends Component {

  constructor(props){
    super(props)
    this.state={
      loading:true,
      pets:[]
    }
  }

  componentDidMount(){
    this.setState({
      pets:this.renderGrid()
    })
  }

  renderGrid = () => {
    const {pets} = this.props
    let list = []
    console.log(pets)
    for(let i=0;i <= parseInt(pets.length/3) ;i++){
      list.push(
        <Row style={{ height: 120 }}>
          {pets.map((pet,index) => {
            if(i*3 <= index && index < (i+1)*3){
              return (
                  <Col style={{ height: 115 ,width: 105,margin:10}}>
                    <Card style={{flex:1,borderRadius:30,justifyContent:'center'}}>
                      <CardItem button onPress={this.goToPetDescription(pet)} style={{borderRadius:30,justifyContent:'center'}}>
                        <PetCard pet={pet}/>
                      </CardItem>
                    </Card>
                  </Col>
              )
            }
            }
          )}
        </Row>
      )
    }
    this.setState({loading:false})
    return list
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
          <Content padder style={{backgroundColor:theme.primaryColor}}>
            {
              this.state.loading ?
                loading()
              :
                <Grid style={{justifyContent:'center',alignItems:'center'}}>
                  {this.state.pets}
                </Grid>
            }
          </Content>

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

  goToPetDescription = pet => () => {
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
