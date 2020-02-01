import axios from 'axios'; 
const initialState = {
    post: {
        title: '', 
        img: '',
        content: ''
    }
}


const NEW_POST = 'NEW_POST'; 
export const post = (id, post) => {
    let postData = axios.post(`/api/post/${id}`, post).then(res=>res.data); 
    return {
        type: NEW_POST, 
        payload: postData
    }
}





export default function reducerPost(state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case NEW_POST + '_PENDING':
            return {post: payload}
        case NEW_POST + '_FULFILLED':
            return {...state.post, post: payload}
        case NEW_POST + '_REJECTED':
            return {...state.post}
        default:
            return state
    }
}