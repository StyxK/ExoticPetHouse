import io from 'socket.io-client'
import axios from 'axios';
import moment from 'moment-timezone'
const socket = io.connect('http://10.0.3.2:4001').emit('shop')


export const shopReply = (message,order) => async dispatch => {
    await socket.emit('shop',{message:message,order:order,role:0,time: moment().unix()})
    await console.log(moment().unix(),'mili')
    await socket.once('shopSend',async data=>{
        await dispatch( { type : "CHAT/SHOP_REPLY" , payload: data} )
        await console.log(data,'shopSend')
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

export const getMessage = (order) => dispatch => {
    axios.post('chat/getMessageInRoom',
            {
                order : order 
            }
        ).then(
            result => {
                dispatch( {type : "CHAT/GET_MESSAGE" ,payload : result.data })
                console.log(result.data,"data")
            }
        )
}