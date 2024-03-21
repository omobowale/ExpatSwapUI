import { thunk } from 'redux-thunk'
import rootReducer from "../reducers/index"
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'


const store = createStore(rootReducer, applyMiddleware(thunk))

export default store