const initialState = {}

const storeReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'STORE/SET' : return {storeId: action.payload}
        default : return state
    }
}

export default storeReducer