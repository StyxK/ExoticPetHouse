import io from 'socket.io-client'
import axios from 'axios';
import moment from 'moment-timezone'
const socket = io.connect('http://172.20.10.3:4001')


export const shopReply = (message,user,token) => async dispatch => {
    await socket.emit('shop',{message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquet purus eget efficitur finibus. Integer id libero a velit semper consectetur id sed nisi. Mauris suscipit euismod purus, in commodo ante feugiat nec. Sed nec diam nunc. Morbi fringilla enim vitae posuere eleifend. Nullam est sem, consectetur a posuere in, posuere eu libero. Interdum et malesuada fames ac ante ipsum primis in faucibus.', customer:user, store:token,role:0,time: moment().unix()})
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