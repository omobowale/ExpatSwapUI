import axiosInstance from "../utils/axiosInstance";


export const getUsers = async (data) => {
    return axiosInstance(`/users?${data}`, "GET", data).then(response => {
        return response;
    })
}

export const createUser = async (data) => {
    return axiosInstance(`/users`, "POST", data).then(response => {
        return response;
    })
}