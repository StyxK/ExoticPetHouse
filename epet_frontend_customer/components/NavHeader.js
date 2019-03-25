import React,{Component} from 'react';
import {Container,Header,Title,Button,Left,Right,Body,Icon} from 'native-base';

export default class NavHeader extends Component{
    render(){
        return(
                <Header style={{backgroundColor:'#7A5032'}}>
                    <Left>
                        <Button transparent>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Exotic PetHouse</Title>
                    </Body>
                    <Right/>
                </Header>
        )
    }
}