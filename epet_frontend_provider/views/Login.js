import React,{Component} from 'react'
import { ImageBackground, Image } from 'react-native'
import { Input, Item, Label, View, Icon, Left, Body, Button, Header, Right, Container } from 'native-base'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import axios from 'axios'
import { login } from '../src/actions/UserActions';
import * as Animatable from 'react-native-animatable'
import Register from './Register'

class Login extends Component{

    constructor(props){
        super(props)
        this.state = {
            userName : undefined,
            password : undefined,
            error: undefined,
            login:true,
            submitRegister:false
        }
        view = React.createRef()
        loginComponent = React.createRef()
        registerComponent = React.createRef()
        registerForm = React.createRef()
    }

    logIn = async ()=>{
        try{
            const user = await axios.post('/storeowner/login',{
                userName:this.state.userName,
                password: this.state.password
            })
            await this.props.login(user.data.token)
            await view.current.fadeOut()
            Actions.profile()
        }catch(error){
            this.setState({
                error:'ชื่อผู้ใช้ / รหัสผ่าน ของท่านไม่ถูกต้อง'
            })
        }
    }

    register = async ()=>{
        await loginComponent.current.fadeOutLeft()
        await this.setState({ login : false , error : undefined})
    }

    backToLogin = async ()=>{
        await registerComponent.current.fadeOutRight()
        await this.setState({ login : true })
        await loginComponent.current.fadeInLeft()
    }

    render(){
        return(
            <Animatable.View ref={view} animation="fadeIn" style={{flex:1}}>
                <ImageBackground
                    source={{uri: 'https://media3.giphy.com/media/xT8qB5ItRMSfODfzJm/source.gif'}}  
                    style={{flex:1,resizeMode:'cover'}}
                >
                    {
                        this.state.login ? 
                    <Animatable.View ref={loginComponent} style={{flex:1}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:50}}>
                            <Image style={{width:210,height:110}} source={require('../assets/epet_logo.png')}/>
                        </View>
                        <View style={{flex:2}}>
                            <Item rounded style={{marginTop:10,marginRight:30,marginLeft:30,backgroundColor: "rgba(192,192,192, .4)"}}>
                                <Left style={{borderRightWidth:3,flex:1,alignItems:'center',borderColor:'white'}}>
                                    <Icon name='person' style={{color:'white'}}/>
                                </Left>
                                <Input style={{flex:5,marginLeft:20,color:'white'}} placeholder='ชื่อผู้ใช้' placeholderTextColor='white' onChangeText={e=>this.setState({userName:e})}/>
                            </Item>
                            <Item rounded style={{marginTop:10,marginRight:30,marginLeft:30,backgroundColor: "rgba(192,192,192, .4)"}}>
                                <Left style={{borderRightWidth:3,alignItems:'center',borderColor:'white'}}>
                                    <Icon name='key' style={{color:'white'}}/>
                                </Left>
                                <Input secureTextEntry style={{flex:5,marginLeft:20,color:'white'}} placeholder='รหัสผ่าน' placeholderTextColor='white' onChangeText={e=>this.setState({password:e})}/>
                            </Item>
                            <View style={{flexDirection:'row',flex:1,justifyContent:'center',marginTop:10}}>
                                <Button rounded style={{flex:1,marginHorizontal:30,backgroundColor: "#7A5032"}}
                                    onPress={ ()=> this.logIn()  }
                                >
                                    <Label style={{color:'white'}}>
                                        ลงชื่อเข้าใช้
                                    </Label>
                                </Button>
                            </View>
                            <View style={{flexDirection:'row',flex:1,justifyContent:'center',marginTop:10}}>
                                <Button rounded style={{flex:1,marginHorizontal:30,backgroundColor: "#7A5032"}}
                                    onPress={ ()=> this.register()  }
                                >
                                    <Label style={{color:'white'}}>
                                        สมัครสมาชิก
                                    </Label>
                                </Button>
                            </View>
                            <View style={{flexDirection:'row',flex:2.5,justifyContent:'center'}}>
                                <Label style={{color:'red',marginTop:20}}>
                                    {this.state.error}
                                </Label>
                            </View>
                        </View>
                    </Animatable.View>
                    :
                    <Animatable.View ref={registerComponent} animation='fadeInRight' style={{flex:1}}>
                        <View style={{flex:1.5,flexDirection:'row'}}>
                            <Left style={{marginLeft:30}}>
                                <Icon name='ios-arrow-back' style={{color:'white'}} onPress={()=>this.backToLogin()}/>
                            </Left>
                            <Body style={{flex:3,justifyContent:'center'}}>
                                <Label style={{color:'white',fontSize:25}}> สมัครสมาชิก </Label>
                            </Body>
                            <Right style={{flex:1.5}}/>
                        </View>
                        <View style={{flex:8}}>
                            <Register ref={registerForm} register={this.state.submitRegister}/>
                        </View>
                    </Animatable.View>
                }
                </ImageBackground>
            </Animatable.View>
        )
    }
}

const mapStateToProps = state => {
    return {...state}
}

export default connect(mapStateToProps,{login})(Login)