import React,{Component} from 'react'
import {Actions} from 'react-native-router-flux'
import { Container, Text , Header , Left , Body , Right , Fab , Icon , Button, ListItem, List, Label, Content} from 'native-base'
import axios from 'axios';

export default class StoreManager extends Component{

    getCages = ()=>{
        axios.get('/store/'+this.props.store.id).then(
            response => {
                let cagelist = response.data.cage
                this.setState({
                    cages : cagelist
                })
                alert(this.state.cages)
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
                        <Text> ชื่อกรง : {data.name}</Text>
                        <Text> ประเภทกรง : {data.type}</Text>
                        <Text> รายละเอียดกรง : {data.description}</Text>
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
                        <Icon name='arrow-back' style={{marginLeft:10,color:'white'}} onPress={ () => { goToProfile()}}/>
                    </Left>
                    <Body style={{ flex: 2 }}>
                        <Text style={{ color: "white" }}>จัดการร้าน</Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <Text> ID : {store.id} </Text>
                <Text> ชื่อร้าน : {store.name} </Text>
                <Text> เบอร์โทรศัพท์ : {store.phoneNumber} </Text>
                <Text> คะแนนร้าน : {store.rating} </Text>
                <Text> คำอธิบายร้าน : {store.description} </Text>
                <Text> จำนวนรับฝากสูงสุด : {store.maxOfDeposit} </Text>
                <Content>
                    <List>
                        <ListItem itemDivider>
                            <Label>
                                กรงภายในร้าน
                                {" "}{" "}{" "}{" "}
                            </Label>
                            <Button small rounded onPress={ ()=>{ goToCreateCage() }}><Text> เพิ่มกรง </Text></Button>
                        </ListItem>
                        {cagesList}
                        {/* {createCage} */}
                    </List>
                </Content>
            </Container>
        )
    }
}

goToProfile = ()=>{
    Actions.profile()
}

goToCreateCage = ()=>{

}