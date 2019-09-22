import React,{Component} from 'react'
import {ActivityIndicator} from 'react-native'
import {View, Label} from 'native-base'

export const initialLoad = () => {
    return(
        <View style={{backgroundColor:'#7A5032',flex:1,justifyContent:'center'}}>
            <ActivityIndicator size={100}/>
            <Label style={{marginTop:20,textAlign:'center',color:'white'}}> กำลังเรียกข้อมูลจากแอปพลิเคชัน กรุณารอสักครู่ </Label>
        </View>
    )
}

export const loading = () => {
    return(
        <ActivityIndicator size={100}/>
    )
}