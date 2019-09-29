import React,{Component} from 'react'
import { Button, View, Label } from 'native-base'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'

export default class orderButton extends Component{

    constructor(props){
        super(props)
    }

    button = (orderStatus) => {
        let list = []
        if(orderStatus ==  1){
            list.push(
                <Button full
                    style={{ backgroundColor: "#7A5032",flex: 1,borderRadius: 10}} 
                    onPress={()=>{this.acceptOrder()}}>
                    <Label>ยอมรับคำสั่งฝาก</Label>
                </Button>
            )
            list.push(
                <Button full
                    style={{ backgroundColor: "#7A5032",flex: 1,borderRadius: 10}} 
                    onPress={()=>{this.denyOrder()}}>
                    <Label>ปฏิเสธคำสั่งฝาก</Label>
                </Button>
            )
        }
        else if(orderStatus ==  2){
            list.push(
                <Button full
                    style={{ backgroundColor: "#7A5032",flex: 1,borderRadius: 10}} 
                    onPress={()=>{this.cancelOrder()}}>
                    <Label>ยกเลิกคำสั่งฝาก</Label>
                </Button>
            )
        }
        else if(orderStatus ==  6){
            list.push(
                <Button full
                    style={{ backgroundColor: "#7A5032",flex: 1,borderRadius: 10}} 
                    onPress={()=>{ this.payment() }}>
                    <Label>ชำระค่าบริการ</Label>
                </Button>
            )
        }
        else if(orderStatus == 9){
            list.push(
                <Button full
                    style={{ backgroundColor: "#7A5032",flex: 1,borderRadius: 10}} 
                    onPress={()=>{ this.getPetsBack() }}>
                    <Label>ร้านส่งสัตว์เลี้ยงคืนแล้ว</Label>
                </Button>
            )
        }
        return list    
    }

    render(){
        return(
            <View style={{flex:1}}>
                <Label style={{textAlign:'center'}}> ตัวเลือกออร์เดอร์ </Label>
                <Label/>
                {this.button(this.props.orderStatus)}
            </View>
        )
    }

    //orderManage
    acceptOrder = () => {
        axios.put('/order/storeAccept/'+this.props.item.id).then( () => Actions.jump('orderList') )
    }
    
    denyOrder = () => {
        axios.put('/order/denyByStore/'+this.props.item.id).then( () => Actions.jump('orderList') )
    }
    
    returnPets = () => {
        axios.put('/order/returnPets/'+this.props.item.id).then( () => Actions.jump('orderList') )
    }
}
