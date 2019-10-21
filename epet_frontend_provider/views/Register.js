import React,{Component} from 'react'
import { Label, Form, Item, Input, Container, Content, View, Button, Toast, Root } from 'native-base'
import axios from 'axios'
import { connect } from 'react-redux'
import { login } from '../src/actions/UserActions'
import { Actions } from 'react-native-router-flux'
import theme from "../theme";

class Register extends Component{

    constructor(props){
        super(props)
        this.state = {
            userName:undefined,
            password:undefined,
            confirmPassword:undefined,
            firstName:undefined,
            lastName:undefined,
            email:undefined,
        }
    }

    submit = async () => {
        try{
            const register = await axios.post('/storeowner/register',this.state)
            console.log(register.data.token,'register')
            await this.props.login(register.data.token)
            Actions.profile()
        }catch(error){
            console.log(error)
            Toast.show({
                position:'center',
                text:'ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง',
                textStyle:{textAlign:'center'}
            })
        }
    }

    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:10,marginHorizontal:20,borderRadius:8,backgroundColor:'rgba(192,192,192, .8)'}}>
                    <Content>
                        <Root>
                            <Form style={{marginRight:15,marginTop:20}}>
                                <Item style={{marginBottom:10}}>
                                    <Label> ชื่อผู้ใช้ : </Label>
                                    <Input onChangeText={e=>this.setState({userName:e})}/>
                                </Item>
                                <Item style={{marginBottom:10}}>
                                    <Label> รหัสผ่าน : </Label>
                                    <Input secureTextEntry onChangeText={e=>this.setState({password:e})}/>
                                </Item>
                                <Item style={{marginBottom:10}}>
                                    <Label> ยืนยันรหัสผ่าน : </Label>
                                    <Input secureTextEntry onChangeText={e=>this.setState({confirmPassword:e})}/>
                                </Item>
                                <Item style={{marginBottom:10}}>
                                    <Label> ชื่อจริง : </Label>
                                    <Input onChangeText={e=>this.setState({firstName:e})}/>
                                </Item>
                                <Item style={{marginBottom:10}}>
                                    <Label> นามสกุล : </Label>
                                    <Input onChangeText={e=>this.setState({lastName:e})}/>
                                </Item>
                                <Item style={{marginBottom:10}}>
                                    <Label> email : </Label>
                                    <Input keyboardType='email-address' onChangeText={e=>this.setState({email:e})}/>
                                </Item>
                            </Form>
                        </Root>
                    </Content>
                </View>
                <View style={{flexDirection:'row',flex:1.5,justifyContent:'center',marginTop:10}}>
                    <Button rounded style={{flex:1,marginHorizontal:30,backgroundColor: theme.primaryColor}}
                        onPress={ ()=> this.submit() }
                    >
                        <Label style={{color:'white'}}>
                            สมัครสมาชิก
                        </Label>
                    </Button>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {user:state.user}
}

export default connect(mapStateToProps,{login})(Register)