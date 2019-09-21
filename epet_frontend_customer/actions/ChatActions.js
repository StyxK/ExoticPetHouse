import io from 'socket.io-client'
import axios from 'axios';
import moment from 'moment-timezone'
import Config from 'react-native-config'

const socket = io.connect(Config.SOCKET_URL).emit('customer')


export const userReply = (message,customer,store) => async dispatch => {
    await socket.emit('customer',{message:message,customerUsername:customer,store:store,role:1,time: moment().unix()})
    await console.log(moment().unix(),'mili')
    await socket.once('customerSend',async data=>{
        await dispatch( { type : "CHAT/USER_REPLY" , payload: data} )
        await console.log(data,'customerSend')
    })
}


export const shopReply = () => dispatch => {
    socket.on('customer', data=> {
        console.log(data,'from server')
        dispatch( { type : "CHAT/SHOP_REPLY" ,payload: { user : data }} )
    })
}

export const refreshChat = () => dispatch => {
    dispatch({type : "CHAT/REFRESH_CHAT"})
}

export const getMessage = (customer,store) => dispatch => {
    axios.post('chat/getMessageInRoom',
            {
                customer : customer ,
                store : store 
            }
        ).then(
            result => {
                dispatch( {type : "CHAT/GET_MESSAGE" ,payload : result.data })
                console.log(result.data,"data")
            }
        )
}