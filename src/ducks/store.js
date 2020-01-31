import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import reducer from './reducer'
import reducerPost from './reducer_post'; 

const rootReducer = combineReducers({
    reducer, 
    reducerPost
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))