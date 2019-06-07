const initialState = {
    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ildpc3NhbnVwb25nIiwicGFzc3dvcmQiOiIkMmEkMTAkUHNpVGlhcFV1Y00ybDJBZ0o2T0RWT2FzNkIzM09zNy5tU0M3ZDllSnZSVmdOVzFyLnlkQS4iLCJpYXQiOjE1NTk4MzQyMjksImV4cCI6MTU2MjQyNjIyOX0.l7YlzVY4vrkUvWYsZi4iNy8xrOq-lPjoHvI02G59yVs'
}

const userReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'LOGIN' :
            return { name : action.payload }
        case 'LOGOUT' :
            return { name : 'anonymous' }
        default :
            return state
    }
}

export default userReducer;