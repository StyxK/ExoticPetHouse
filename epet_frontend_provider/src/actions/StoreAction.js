export const setStore = (storeId) => dispatch => {
    dispatch( { type : "STORE/SET" , payload: storeId} )
}

export const resetStore = () => dispatch => {
    dispatch({type : "STORE/RESET"})
}