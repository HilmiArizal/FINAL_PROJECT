const INITAL_STATE = {
    id : 0,
    username : null,
    email : '',
    role : '',
    status : '',
    gender: 0
}

export default (state = INITAL_STATE, action) => {
    switch(action.type){
        case 'LOGIN':
            // console.log({gender: action.payload.genderId})
            return{
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                role: action.payload.role,
                status: action.payload.verified,
                gender: action.payload.genderId,
            }
        case 'LOGOUT':
            return INITAL_STATE
        default:
            return state
    }
}