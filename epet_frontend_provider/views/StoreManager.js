import React,{Component} from 'react'
import {Image} from 'react-native'
import {Actions} from 'react-native-router-flux'
import { Container, Text , Header , Left , Body , Right , Fab , Icon , Button, ListItem, List, Label, Content, View} from 'native-base'
import axios from 'axios';

export default class StoreManager extends Component{

    getCages = ()=>{
        axios.get('/store/'+this.props.store.id).then(
            response => {
                let cagelist = response.data.cage
                this.setState({
                    cages : cagelist
                })
            }
        )
    }

    componentWillMount(){
        this.getCages()
    }

    constructor(props){
        super(props)
        this.state = {
            cages : [] ,
            createActivate : false
        }
    }

    render(){
        const { store } = this.props
        const { cages } = this.state

        let cagesList = cages.map( data => {
            return (
                <ListItem key={data.id}>
                    <Body>
                        <Text style={{color:'black'}}> {data.name}</Text>
                        {/* <Text> ประเภทกรง : {data.type}</Text>
                        <Text> รายละเอียดกรง : {data.description}</Text> */}
                        <Text> ราคาต่อวัน : {data.price}</Text>
                    </Body>
                    <Right>
                        <Button rounded onPress={ () => goToProfile()}> 
                                <Text style={{fontSize:10}}> จัดการ </Text> 
                        </Button>
                    </Right>
                </ListItem>
            )
        })

        return (
            <Container>
                <Header style={{ backgroundColor: "#7A5032" }}>
                    <Left style={{ flex: 2 }} >
                        <Icon name='ios-arrow-back' style={{marginLeft:10,color:'white'}} onPress={ () => { goToProfile()}}/>
                    </Left>
                    <Body style={{ flex: 2 }}>
                        <Text style={{ color: "white" }}>{store.name}</Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <View style={{flex:1,flexDirection:'row',backgroundColor:'#A78B45'}}>
                    <Left style={{flex:1,marginLeft:20}}>
                        <Image style={{width:100,height:100}} source={require('../assets/no_image_available.jpeg')}/>
                    </Left>
                    <Body style={{alignSelf:'center',flex:2,alignContent:'flex-end',justifyContent:'flex-start'}}>
                        <Text style={{color:'#84f542',alignSelf:'flex-start'}}> ชื่อร้าน : 
                            <Text style={{color:'white',alignSelf:'flex-start'}}> {store.name} </Text> 
                        </Text>
                        <Text style={{color:'#84f542',alignSelf:'flex-start'}}> เบอร์โทรศัพท์ :  
                            <Text style={{color:'white',alignSelf:'flex-start'}}> {store.phoneNumber} </Text>
                        </Text>
                        <Text style={{color:'#84f542',alignSelf:'flex-start'}}> คะแนนร้าน :  
                            <Text style={{color:'white',alignSelf:'flex-start'}}> {store.rating} </Text>
                        </Text>
                        <Text style={{color:'#84f542',alignSelf:'flex-start'}}> คำอธิบายร้าน :  
                            <Text style={{color:'white',alignSelf:'flex-start'}}> {store.description} </Text>
                        </Text>
                    </Body>
                </View>
                <View style={{flex:2}}>
                    <ListItem itemDivider>
                        <Label>
                            กรงภายในร้าน
                            {" "}{" "}{" "}{" "}
                        </Label>
                        <Button small rounded onPress={ ()=>{ goToCreateCage() }}><Text> เพิ่มกรง </Text></Button>
                    </ListItem>
                    <Content>
                        <List>
                            {cagesList}
                            {/* {createCage} */}
                        </List>
                    </Content>
                </View>
            </Container>
        )
    }
}

goToProfile = ()=>{
    Actions.profile()
}

goToCreateCage = ()=>{

}