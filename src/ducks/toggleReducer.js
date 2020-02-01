

const initialState = {
    logged_in: false
}




const LOGGED_IN = 'LOGGED_IN'; 
export const toggle = boolean => {
    return {
        type: LOGGED_IN, 
        payload: boolean
    }
}


export default function toggleReducer(state=initialState, action) {
    switch(action.type) {
        case LOGGED_IN : {
            return {...state, logged_in: action.payload }
        }
        default: return state
    }
}