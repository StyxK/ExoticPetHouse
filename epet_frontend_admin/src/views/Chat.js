import React,{useState,useEffect} from 'react'
import io from 'socket.io-client'
import {Container, Input, Grid, Label, Button} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import '../styles/Chat.css'
import moment from 'moment'
const socket = io('http://localhost:4001').emit('customer')

export const Chat = (props)=>{

    const [reply,setReply] = useState('')
    const [chats,setChats] = useState([])

    const renderChat = () => {
        let list = []
        chats.map(data=>{
            list.push(
                data.role == 1?
                    <Grid.Row key={data.id} className='customer'>
                        <Label>{data.message}</Label>
                    </Grid.Row>
                    :
                    <Grid.Row key={data.id}>
                        <Label>{data.message}</Label>
                    </Grid.Row>
            )
        })
        return list
    }

    const fetchChat = async() => {
        const response = await fetch(`${process.env.REACT_APP_URL}/chat/getMessageInRoom`,
            {
                method: 'POST',
                body: JSON.stringify({
                    customer : 'tanapat',
                    store : '9cfdb7e5-d47e-4a9b-9d2a-433169532dd4'
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        const data = await response.json()
        setChats(data)
    }
    
    const replyAction = () => {
        socket.emit('customer',{message:reply,customerUsername:'tanapat',store:'9cfdb7e5-d47e-4a9b-9d2a-433169532dd4',role:1,time: moment().unix()})
        socket.once('customerSend',async data=>{
            setChats([...chats,data])
        })
    }

    useEffect(()=>{
        fetchChat()
    },[])

    useEffect(()=>{
        socket.on('shopSend',data=>fetchChat())
    },[])

    return(
        <Grid>
            <Grid.Row>
                <Container className='Chat' fluid>
                    {renderChat()}
                </Container>
            </Grid.Row>
            <Grid.Row>
                <Container fluid>
                    <Input onChange={(e,target)=>{setReply(target.value)}}/>
                    <Button onClick={()=>{replyAction()}}>ส่ง</Button>
                </Container>
            </Grid.Row>
        </Grid>
    )
}