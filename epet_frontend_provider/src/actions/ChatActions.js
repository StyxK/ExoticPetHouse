import io from 'socket.io-client'
const socket = io.connect('http://localhost:4001')
let initReciver

export const shopReply = (message,user,token) => dispatch => {
    socket.emit('shop',{shop:message, customer:user, shop:token})
    dispatch( { type : "CHAT/SHOP_REPLY" , payload: { shop : message} } )
}

export const userReply = () => dispatch => {
    console.log("hello")
    initReciver = socket.on('customer', async data=>{
        dispatch( { type : "CHAT/USER_REPLY" ,payload: { user : await data.message }} )
    })
}