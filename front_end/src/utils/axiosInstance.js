import axios from 'axios'

const backendURL = process.env.REACT_APP_BACKEND_URL;


export default function axiosInstance(url, method, data, token) {

    axios.interceptors.request.use(config => {
        config.timeout = 5000; // Wait for 5 seconds before timing out
        return config;
    });

    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
                console.log('Request timed out');
            }
            return Promise.reject(error);
        }
    );

    return axios({
        url: backendURL + url,
        method: method,
        data: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
}