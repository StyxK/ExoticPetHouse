import React,{Component} from 'react';
import {Container,Header,Title,Button,Left,Right,Body,Icon} from 'native-base';

export default class NavHeader extends Component{
    render(){
        return(
                <Header style={{backgroundColor:'#7A5032'}}>
                    <Body style={{alignItems:'center'}}>
                        <Title>MY PETS</Title>
                    </Body>
                </Header>
        )
    }
}