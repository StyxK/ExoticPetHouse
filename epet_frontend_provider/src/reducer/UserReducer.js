const initialState = {
    userName:'anonymous',
    store:'st0005'
}

const userReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'LOGIN' :
            return { name : action.payload }
        case 'LOGOUT' :
            return { name : 'anonymous' }
        default :
            return state
    }
}

export default userReducer;