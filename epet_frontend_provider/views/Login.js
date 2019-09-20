import React,{Component} from 'react'
import { ImageBackground, Image } from 'react-native'
import { Container, Content, Form, Input, Item, Label, View, Icon, Left, Body, Button } from 'native-base'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
class Login extends Component{
    render(){
        return(
            <ImageBackground
                source={{uri: 'https://media3.giphy.com/media/xT8qB5ItRMSfODfzJm/source.gif'}}  
                style={{flex:1,resizeMode:'cover'}}
            >
                <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:50}}>
                    <Image style={{width:210,height:110}} source={require('../assets/epet_logo.png')}/>
                </View>
                <View style={{flex:2}}>
                    <Item rounded style={{marginTop:10,marginRight:30,marginLeft:30,backgroundColor: "rgba(192,192,192, .4)"}}>
                        <Left style={{borderRightWidth:3,flex:1,alignItems:'center',borderColor:'white'}}>
                            <Icon name='person' style={{color:'white'}}/>
                        </Left>
                        <Input style={{flex:5,marginLeft:20,color:'white'}} placeholder='ชื่อผู้ใช้' placeholderTextColor='white'/>
                    </Item>
                    <Item rounded style={{marginTop:10,marginRight:30,marginLeft:30,backgroundColor: "rgba(192,192,192, .4)"}}>
                        <Left style={{borderRightWidth:3,alignItems:'center',borderColor:'white'}}>
                            <Icon name='key' style={{color:'white'}}/>
                        </Left>
                        <Input style={{flex:5,marginLeft:20,color:'white'}} placeholder='รหัสผ่าน' placeholderTextColor='white'/>
                    </Item>
                    <View style={{flexDirection:'row',flex:1,justifyContent:'center',marginTop:10}}>
                        <Button rounded style={{flex:1,marginHorizontal:30,backgroundColor: "#7A5032"}}>
                            <Label style={{color:'white'}}>
                                ลงชื่อเข้าใช้
                            </Label>
                        </Button>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = state => {
    return {...state}
}

export default connect(mapStateToProps)(Login)