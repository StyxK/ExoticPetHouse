import React,{Component} from 'react'
import { Button, View, Label } from 'native-base'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'

export default class orderButton extends Component{

    constructor(props){
        super(props)
    }

    button = (orderStatus) => {
        console.log(orderStatus)
        let list = []
        if(orderStatus ==  1){
            list.push(
                <View style={{ flex: 1,marginVertical:5}} >
                    <Button full
                        style={{ backgroundColor: "#7A5032",flex: 0.5,marginHorizontal:20,borderRadius: 10}} 
                        onPress={()=>{this.acceptOrder()}}>
                        <Label style={{color:'white'}}>ยอมรับคำสั่งฝาก</Label>
                    </Button>
                </View>
            )
            list.push(
                <View style={{ flex: 1}} >
                    <Button full
                        style={{ backgroundColor: "#7A5032",flex: 0.5,marginHorizontal:20,borderRadius: 10}} 
                        onPress={()=>{this.denyOrder()}}>
                        <Label style={{color:'white'}}>ปฏิเสธคำสั่งฝาก</Label>
                    </Button>
                </View>
            )
        }
        else if(orderStatus == 4){
            list.push(
                <Label style={{textAlign:'center'}}> ผู้ฝากได้ทำการยกเลิกการฝากแล้ว </Label>
            )
        }
        else if(orderStatus == 2){
            list.push(
                <Label style={{textAlign:'center'}}> คำสั่งฝากอยู่ในขั้นตอนการตอบรับจากลูกค้า </Label>
            )
        }
        else if(orderStatus == 8){
            list.push(
                <Button full
                    style={{ backgroundColor: "#7A5032",flex: 1,borderRadius: 10}} 
                    onPress={()=>{ this.getPetsBack() }}>
                    <Label>เจ้าของรับสัตว์เลี้ยงกลับแล้ว</Label>
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
                {/* <View style={{flex:0.5,backgroundColor:'red'}}> */}
                    {this.button(this.props.orderStatus)}
                {/* </View> */}
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
    
    getPetsBack = () => {
        axios.put('/order/getPetsBack/'+this.props.item.id).then( () => Actions.jump('orderList') )
    }
}
