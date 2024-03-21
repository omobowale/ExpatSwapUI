import { GENERIC_ERROR } from "../constants/errors"
import { RESOURCE_FETCHED } from "../constants/texts"
import * as UsersService from "../services/users"


export const FETCH_USERS = "FETCH_USERS"
export const RESET_FETCH_USERS = "RESET_FETCH_USERS"
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE"



export const getUsers = (data) => async (dispatch) => {
    return UsersService.getUsers(data).then(response => {
        if (response.status == RESOURCE_FETCHED) {
            dispatch({
                type: FETCH_USERS,
                payload: {
                    data: response.data.data,
                }
            })

            return Promise.resolve({ error: null, data: response.data })
        } else {
            dispatch({
                type: FETCH_USERS_FAILURE,
                payload: {
                    data: null,
                    errorMessage: response.data.errors
                }
            })
            return Promise.reject({ error: response.data.errors, data: null })
        }
    }).catch(err => {
        let error_response = err.response.data.errors ?? GENERIC_ERROR
        dispatch({
            type: FETCH_USERS_FAILURE,
            payload: {
                data: null,
                errorMessage: error_response
            }
        })
        return Promise.reject({ error: error_response, data: null })
    })
}