export const login = (data) => dispatch => {
    dispatch({type:'LOGIN',payload:{token:data.token,approved:data.approved}})
}

export const logout = () => dispatch => {
    dispatch({type:'LOGOUT'})
}