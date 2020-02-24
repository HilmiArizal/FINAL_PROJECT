const INITAL_STATE = {
    id : 0,
    username : null,
    email : '',
    role : ''
}

export default (state = INITAL_STATE, action) => {
    switch(action.type){
        case 'LOGIN':
            return{
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                role: action.payload.role
            }
        case 'LOGOUT':
            return INITAL_STATE
        default:
            return INITAL_STATE
    }
}