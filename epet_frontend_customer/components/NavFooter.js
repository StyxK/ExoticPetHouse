import React,{Component} from 'react';
import {Footer,FooterTab,Button,Icon,Text,Badge} from 'native-base';

export default class NavFooter extends Component{
    render(){
        return(
            <Footer>
                <FooterTab style={{backgroundColor:'#7A5032'}}>
                    <Button Badge vertical>
                        <Icon name='search'/>
                        <Text style={{fontSize:10}}>search</Text>
                    </Button>
                    <Button Badge vertical>
                        <Icon name='paw'/>
                        <Text style={{fontSize:10}}>my pets</Text>
                    </Button>
                    <Button Badge vertical>
                        <Icon name='chatbubbles'/>
                        <Text style={{fontSize:10}}>chat</Text>
                    </Button>
                    <Button Badge vertical>
                        <Icon name='list'/>
                        <Text style={{fontSize:10}}>history</Text>
                    </Button>
                    <Button Badge vertical>
                        <Icon name='person'/>
                        <Text style={{fontSize:10}}>profile</Text>
                    </Button>
                </FooterTab>
            </Footer>    
        )
    }
}