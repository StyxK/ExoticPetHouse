import io from 'socket.io-client'
const socket = io.connect('http://10.5.13.216:4001')

export const shopReply = (message,user,token) => dispatch => {
    socket.emit('shop',{message:message, customer:user, shop:token})
    console.log(message)
    dispatch( { type : "CHAT/SHOP_REPLY" , payload: { shop : message} } )
}

export const userReply = () => dispatch => {
    socket.on('customer', data=> {
        console.log(data,'from server')
        dispatch( { type : "CHAT/USER_REPLY" ,payload: { user : data }} )
    })
}

export const getMessage = () => dispatch => {
    dispatch( {type : "CHAT/GET_MESSAGE"} )
}