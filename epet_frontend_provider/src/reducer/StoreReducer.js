const initialState = {
    storeId : '9cfdb7e5-d47e-4a9b-9d2a-433169532dd4'
}

const storeReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'STORE/SET' : return {storeId: action.payload}
        default : return state
    }
}

export default storeReducer