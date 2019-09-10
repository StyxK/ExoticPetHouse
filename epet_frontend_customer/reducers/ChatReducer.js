const INITIAL_STATE = []

export default (state = INITIAL_STATE,action) => {
    switch(action.type){
        case "CHAT/SHOP_REPLY" : {
            return [...state,action.payload]
        } 
        case "CHAT/USER_REPLY" : {
            return [...state,action.payload]
        }
        case "CHAT/GET_MESSAGE" : {
            return [...state,...action.payload]
        }
        case "CHAT/REFRESH_CHAT" : {
            console.log("refresh")
            return []
        }
        default : {
            return INITIAL_STATE
        }
    }
}