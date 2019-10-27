const initialState = {
    token: undefined,approved:undefined
}

const userReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'LOGIN' :
            return { token : 'Epet '+action.payload.token ,approved : action.payload.approved}
        case 'LOGOUT' :
            return { token : undefined,approved:undefined }
        default :
            return state
    }
}

export default userReducer;