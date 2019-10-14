import React,{Component} from 'react'
import {ActivityIndicator,View} from 'react-native'
import {Label} from 'native-base'
import theme from "../theme";

export const initialLoad = () => {
    return(
        <View style={{backgroundColor:theme.primaryColor,flex:1,justifyContent:'center'}}>
            <ActivityIndicator color='white' size={100}/>
            <Label style={{marginTop:20,textAlign:'center',color:'white'}}> กำลังเรียกข้อมูลจากแอปพลิเคชัน กรุณารอสักครู่ </Label>
        </View>
    )
}

export const loading = () => {
    return(
        <ActivityIndicator color={theme.primaryColor} size={100}/>
    )
}