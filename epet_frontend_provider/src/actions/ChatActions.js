import io from 'socket.io-client'
import axios from 'axios';
import {store} from 'react-redux'
const socket = io.connect('http://10.0.110.181:4001')


export const shopReply = (message,user,token) => dispatch => {
    socket.emit('shop',{message:message, customer:user, store:token,role:0})
    socket.once('shopSend',data=>{
        dispatch( { type : "CHAT/SHOP_REPLY" , payload: data} )
        console.log(data,'shopSend')
    })
}


export const userReply = () => dispatch => {
    socket.on('customer', data=> {
        console.log(data,'from server')
        dispatch( { type : "CHAT/USER_REPLY" ,payload: { user : data }} )
    })
}

export const refreshChat = () => dispatch => {
    dispatch({type : "CHAT/REFRESH_CHAT"})
}

export const getMessage = (storeId,customer) => dispatch => {
    axios.post('chat/getMessageInRoom',
            {
                customer : customer,
                store : storeId
            }
        ).then(
            result => {
                dispatch( {type : "CHAT/GET_MESSAGE" ,payload : result.data })
                console.log(result.data,"data")
            }
        )
}