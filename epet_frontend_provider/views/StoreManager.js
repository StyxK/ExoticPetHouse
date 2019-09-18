import React,{Component} from 'react'
import {Image,Alert} from 'react-native'
import {Actions} from 'react-native-router-flux'
import { Container, Text , Header , Left , Body , Right , Fab , Icon , Button, ListItem, List, Label, Content, View} from 'native-base'
import axios from 'axios';

export default class StoreManager extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            cages : [] ,
            createActivate : false
        }
    }

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


    render(){
        const { store } = this.props
        const { cages } = this.state

        let cagesList = cages.map( data => {
            return (
                <ListItem key={data.id}>
                    <Body>
                        <Text style={{color:'black'}}> {data.name}</Text>
                        <Text> ราคาต่อวัน : {data.price}</Text>
                    </Body>
                    <Right style={{flexDirection:'row',flex:1}}>
                        <Button style={{flex:0.5,marginRight:10,backgroundColor:'red',justifyContent:'center'}} rounded onPress={ () => this.deleteCage(data)}> 
                            <Label style={{fontSize:14,textAlign:'center',color:'white'}}> ลบ </Label> 
                        </Button>
                        <Button style={{flex:1,justifyContent:'center'}} rounded onPress={ () => this.goToEditCage(data)}> 
                            <Label style={{fontSize:14,textAlign:'center',color:'white'}}> แก้ไขข้อมูล </Label> 
                        </Button>
                    </Right>
                </ListItem>
            )
        })

        return (
            <Container>
                <Header style={{ backgroundColor: "#7A5032" }}>
                    <Left style={{ flex: 2 }} >
                        <Icon name='ios-arrow-back' style={{marginLeft:10,color:'white'}} onPress={ () => { this.goToProfile()}}/>
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
                        <Button small rounded onPress={ ()=>{ this.goToCreateCage() }}><Text> เพิ่มกรง </Text></Button>
                    </ListItem>
                    <Content>
                        <List>
                            {cagesList}
                        </List>
                    </Content>
                </View>
            </Container>
        )
    }

    deleteCage = async (data) => {
        Alert.alert(`ยืนยันการลบกรง`,`ต้องการลบ ${data.name} หรือไม่ ?`,
            [
                { text:'ยืนยัน',onPress: 
                    ()=>{ 
                        axios.delete('/cage/'+data.id)
                        .then(alert(`ทำรายการเสร็จสิ้น`))
                        .then(this.getCages())
                        .catch(err=> {
                            console.log(err)
                            alert('ไม่สามารถทำรายการได้ กรุณาตรวจสอบว่ามีการรับฝากในกรงนี้อยู่หรือไม่ แล้วทำรายการอีกครั้ง')
                        }) 
                    } 
                },
                { text:'ยกเลิก',style:'cancel'}
            ],
            {cancelable:true}
        )
    }

    goToEditCage = (data) => {
        Actions.cage({store:this.props.store,cage:data})
    }

    goToCreateCage = ()=>{
        Actions.cage({store:this.props.store})
    }

    goToProfile = ()=>{
        Actions.profile()
    }
}

