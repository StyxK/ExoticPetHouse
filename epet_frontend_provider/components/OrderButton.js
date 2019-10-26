import React,{Component} from 'react'
import { Button, View, Label, Content } from 'native-base'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import theme from "../theme";

export default class orderButton extends Component{

    constructor(props){
        super(props)
    }

    button = (orderStatus) => {
        let list = []
        if(orderStatus ==  1){
            list.push(
                <View key='ยอมรับคำสั่งฝาก' style={{ flex: 1,marginVertical:5}} >
                    <Button full
                        style={{ backgroundColor: theme.primaryColor,flex: 0.5,marginHorizontal:20,borderRadius: 10}} 
                        onPress={()=>{this.acceptOrder()}}>
                        <Label style={{color:'white'}}>ยอมรับคำสั่งฝาก</Label>
                    </Button>
                </View>
            )
            list.push(
                <View key='ปฏิเสธคำสั่งฝาก' style={{ flex: 1}} >
                    <Button full
                        style={{ backgroundColor: theme.primaryColor,flex: 0.5,marginHorizontal:20,borderRadius: 10}} 
                        onPress={()=>{this.denyOrder()}}>
                        <Label style={{color:'white'}}>ปฏิเสธคำสั่งฝาก</Label>
                    </Button>
                </View>
            )
        }
        else if(orderStatus == 4){
            list.push(
                <Label key='ผู้ฝากได้ทำการยกเลิกการฝากแล้ว' style={{textAlign:'center'}}> ผู้ฝากได้ทำการยกเลิกการฝากแล้ว </Label>
            )
        }
        else if(orderStatus == 2){
            list.push(
                <Label key='คำสั่งฝากอยู่ในขั้นตอนการตอบรับจากลูกค้า' style={{textAlign:'center'}}> คำสั่งฝากอยู่ในขั้นตอนการตอบรับจากลูกค้า </Label>
            )
        }
        else if(orderStatus == 9){
            list.push(
                <Button full key='ร้านยืนยันการคืนสัตว์เลี้ยง'
                    style={{ backgroundColor: theme.primaryColor,flex: 1,borderRadius: 10}} 
                    onPress={()=>{ this.returnPetsBack() }}>
                    <Label style={{color:'white'}}>ร้านยืนยันการคืนสัตว์เลี้ยง</Label>
                </Button>
            )
        }
        return list    
    }

    render(){
        return(
            <Content padder style={{flex:1}}>
                <Label style={{textAlign:'center'}}> ตัวเลือกออร์เดอร์ </Label>
                <Label/>
                {this.button(this.props.orderStatus)}
            </Content>
        )
    }

    //orderManage
    acceptOrder = () => {
        axios.put('/order/storeAccept/'+this.props.item.id).then( () => Actions.orderList() )
    }
    
    denyOrder = () => {
        axios.put('/order/denyByStore/'+this.props.item.id).then( () => Actions.orderList() )
    }
    
    returnPetsBack = () => {
        axios.put('/order/returnPets/'+this.props.item.id).then( () => Actions.orderList() )
    }
}
