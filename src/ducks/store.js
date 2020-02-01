import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import reducer from './reducer'
import reducerPost from './reducer_post'; 
import toggleReducer from './toggleReducer'; 

const rootReducer = combineReducers({
    reducer, 
    reducerPost, 
    toggleReducer, 
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))