import { combineReducers } from 'redux'
import { createUser, getUsers } from './Users'

export default combineReducers({
    createUser,
    getUsers,
})