const initialState = {
    token: undefined
}

const userReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'LOGIN' :
            return { token : 'Epet '+action.payload }
        case 'LOGOUT' :
            return { token : undefined }
        default :
            return state
    }
}

export default userReducer;