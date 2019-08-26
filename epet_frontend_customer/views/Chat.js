import React,{Component} from 'react'
import { View ,Text } from 'react-native'
import { Container } from 'native-base'

export default class Chat extends Component{

    render(){
        return(
            <Container>
                <View>
                    <Text>
                        customer Chat
                    </Text>
                </View>
            </Container>
        )
    }

}