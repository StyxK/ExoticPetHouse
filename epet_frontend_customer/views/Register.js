import React,{Component} from 'react'
import { Label, Form, Item, Input, Content, View, Button, Toast, Root } from 'native-base'
import axios from 'axios'
import { connect } from 'react-redux'
import { setUser, setPets } from "../actions";
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
            phoneNumber:undefined
        }
    }

    logIn = async () => {
        const { setUser, setPets } = this.props;
        try {
            const response = await axios.post("/customer/login", {
            userName: this.state.userName,
            password: this.state.password
            });
            const user = response.data;
            setUser(user);
            try {
            storage.save({
                key: "user",
                data: user
            });
            alert("success");
            } catch (e) {
            alert(JSON.stringify(e));
            }
            axios.get("/pet").then(response => {
            setPets(response.data);
            Actions.home();
            });
        } catch (error) {
            alert(JSON.stringify(error));
            this.setState({
            error: "ชื่อผู้ใช้ / รหัสผ่าน ของท่านไม่ถูกต้อง"
            });
            console.log(error);
        }
    };

    submit = async () => {
        try{
            const register = await axios.post('/customer/register',this.state)
            console.log(register.data.token,'register')
            await this.logIn()
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
                                <Item style={{marginBottom:10}}>
                                    <Label> มือถือ : </Label>
                                    <Input keyboardType='number-pad' onChangeText={e=>this.setState({phoneNumber:e})}/>
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

const mapDispatchToProps = dispatch => {
    return {
        setUser: user => dispatch(setUser(user)),
        setPets: pets => dispatch(setPets(pets))
    };
};

const mapStateToProps = state => {
    return { ...state };
}

export default connect(mapStateToProps,mapDispatchToProps)(Register)