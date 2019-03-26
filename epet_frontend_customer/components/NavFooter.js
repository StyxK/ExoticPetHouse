import React,{Component} from 'react';
import {Footer,FooterTab,Button,Icon,Text} from 'native-base';

export default class NavFooter extends Component{
    render(){
        return(
            <Footer>
                <FooterTab style={{backgroundColor:'#7A5032'}}>
                    <Button Badge vertical>
                        <Icon name='search' style={{color:'white'}}/>
                        <Text style={{fontSize:10,color:'white'}}>search</Text>
                    </Button>
                    <Button Badge vertical>
                        <Icon name='paw' style={{color:'white'}}/>
                        <Text style={{fontSize:10,color:'white'}}>my pets</Text>
                    </Button>
                    <Button Badge vertical>
                        <Icon name='chatbubbles' style={{color:'white'}}/>
                        <Text style={{fontSize:10,color:'white'}}>chat</Text>
                    </Button>
                    <Button Badge vertical>
                        <Icon name='list' style={{color:'white'}}/>
                        <Text style={{fontSize:10,color:'white'}}>history</Text>
                    </Button>
                    <Button Badge vertical>
                        <Icon name='person' style={{color:'white'}}/>
                        <Text style={{fontSize:10,color:'white'}}>profile</Text>
                    </Button>
                </FooterTab>
            </Footer>    
        )
    }
}