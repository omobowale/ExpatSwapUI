import { GENERIC_ERROR } from "../constants/errors"
import { RESOURCE_CREATED } from "../constants/texts"
import * as UsersService from "../services/users"


export const CREATE_NEW_USER = "CREATE_NEW_USER"
export const RESET_CREATE_NEW_USER = "RESET_CREATE_NEW_USER"
export const CREATE_NEW_USER_FAILURE = "CREATE_NEW_USER_FAILURE"


export const createUser = (data) => async (dispatch) => {
    return UsersService.createUser(data).then(response => {
        if (response.status == RESOURCE_CREATED) {
            dispatch({
                type: CREATE_NEW_USER,
                payload: {
                    data: response.data,
                }
            })

            return Promise.resolve({ error: null, data: response.data })
        } else {
            dispatch({
                type: CREATE_NEW_USER_FAILURE,
                payload: {
                    data: null,
                    errorMessage: response.data.errors
                }
            })
            return Promise.reject({ error: [...response.data.errors], data: null })
        }
    }).catch(err => {
        let error_response = err?.response?.data?.errors ?? GENERIC_ERROR
        dispatch({
            type: CREATE_NEW_USER_FAILURE,
            payload: {
                data: null,
                errorMessage: error_response
            }
        })
        return Promise.reject({ error: error_response ?? [GENERIC_ERROR], data: null })
    })
}