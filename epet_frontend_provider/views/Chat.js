import React,{Component} from 'react'
import { Text } from 'react-native'
import { Container, Content, Header, Left, Right, Body, Icon, List, ListItem, Label } from 'native-base'
import { Actions } from 'react-native-router-flux'

export default class Chat extends Component{

    render(){
        return(
            <Container>
                <Content>
                    <Header style={{ backgroundColor: "#7A5032" }}>
                        <Left style={{ flex: 2 }} >
                            <Icon style={{ color: 'white' }} onPress={() => { this.goToStore() }} name='arrow-back' />
                        </Left>
                        <Body style={{ flex: 2.5 }}>
                            <Text style={{ color: "white" }}> แชทกับลูกค้า </Text>
                        </Body>
                        <Right style={{ flex: 1 }} />
                    </Header>
                    <List>
                        <ListItem onPress={() => this.goToChatBox()}>
                            <Left style={{ flex : 0.5}}>
                                <Icon name="person"/>
                            </Left>
                            <Body style={{flex : 1.5}}>
                                <Text>
                                    user 1
                                </Text>
                                <Label>
                                    hello
                                </Label>
                            </Body>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }

    goToStore = () => {
        Actions.store()
    }

    goToChatBox = () => {
        Actions.chatbox()
    }

}
