const initialState = {
    storeId : undefined
}

const storeReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'STORE/SET' : return {storeId: action.payload}
        case 'STORE/RESET' : return {storeId : undefined}
        default : return state
    }
}

export default storeReducer