import { CREATE_NEW_USER, CREATE_NEW_USER_FAILURE, RESET_CREATE_NEW_USER } from "../actions/createUser"
import { FETCH_USERS, FETCH_USERS_FAILURE, RESET_FETCH_USERS } from "../actions/getUsers"

const initialState = {
    usersData: null,
    errorMessage: "",
    user: null,
}


export const getUsers = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case FETCH_USERS:
            return {
                ...state, usersData: payload.data, errorMessage: ""
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state, usersData: null, errorMessage: payload.errorMessage
            }
        case RESET_FETCH_USERS:
            return {
                ...state, usersData: null, errorMessage: ""
            }
        default:
            return state
    }
}

export const createUser = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case CREATE_NEW_USER:
            return {
                ...state, user: payload.data, errorMessage: ""
            }
        case CREATE_NEW_USER_FAILURE:
            return {
                ...state, user: null, errorMessage: payload.errorMessage
            }
        case RESET_CREATE_NEW_USER:
            return {
                ...state, user: null, errorMessage: ""
            }
        default:
            return state
    }
}