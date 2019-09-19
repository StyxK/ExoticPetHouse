export const setStore = (storeId) => dispatch => {
    dispatch( { type : "STORE/SET" , payload: storeId} )
}