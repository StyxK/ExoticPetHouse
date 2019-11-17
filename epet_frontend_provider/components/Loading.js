import React,{Component} from 'react'
import {ActivityIndicator,View,Image,ImageBackground} from 'react-native'
import theme from "../theme";

export const initialLoad = () => {
    return(
        <ImageBackground
            source={require('../assets/background.jpg')}  
            style={{flex:1,resizeMode:'cover'}}
        >
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Image style={{width:210,height:110}} source={require('../assets/epet_logo.png')}/>
                <ActivityIndicator style={{marginTop:50}} size={100} />
            </View>
        </ImageBackground>
    )
}

export const loading = () => {
    return(
        <ActivityIndicator color={theme.primaryColor} size={100}/>
    )
}