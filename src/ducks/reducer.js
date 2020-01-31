
const initialState = {
    user: {
        id: '',
        username: '', 
        profile_pic: 'https://robohash.org/people', 
    }
}

const GET_USER = "GET_USER"
export const getUser = user => {
    return {
        type: GET_USER,
        payload: user
    }
}


export default function reducer (state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case GET_USER:
            return {...state, user: payload};
        default:
            return state
    }
}