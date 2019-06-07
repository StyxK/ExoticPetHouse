import React,{Component} from 'react'
import {} from 'react-native'
import { Container, Text , Header , Left , Body , Right , Fab , Icon , Button} from 'native-base'

export default class StoreManager extends Component{

    constructor(props){
        super(props)
        this.state = {
            fabActivate : false
        }
    }

    render(){
        const { fabActivate } = this.state
        return (
            <Container>
                <Header style={{ backgroundColor: "#7A5032" }}>
                    <Left style={{ flex: 2 }} />
                    <Body style={{ flex: 2 }}>
                        <Text style={{ color: "white" }}>จัดการร้าน</Text>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                
                <Text>Hello world</Text>
                <Fab
                    active = {fabActivate}
                    direction = 'up'
                    position = 'bottomRight'
                    onPress = { ()=>{ this.setState({
                        fabActivate:!fabActivate
                    })} }
                >
                <Icon name='add'/>
                <Button style={{backgroundColor:'green'}}>
                    <Icon name='logo-whatsapp'/>
                </Button>
                </Fab>
            </Container>
        )
    }
}