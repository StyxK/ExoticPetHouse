const INITIAL_STATE = []

export default (state = INITIAL_STATE,action) => {
    switch(action.type){
        case "CHAT/SHOP_REPLY" : {
            return [...state,action.payload]
        } 
        case "CHAT/USER_REPLY" : {
            return [...state,action.payload]
        }
        default : {
            return INITIAL_STATE
        }
    }
}