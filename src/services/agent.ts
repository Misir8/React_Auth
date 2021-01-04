import axios, {AxiosResponse} from "axios";
import {toast} from "react-toastify";

axios.defaults.baseURL = "https://localhost:5001/";

axios.interceptors.request.use(
    config => {
        const token = window.localStorage.getItem('jwt');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(undefined, error => {
    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network error - make sure API is running!');
    }
    const { status, data, config, headers } = error.response;

    if(status === 401){
        toast.error(data.errors);
    }

    if (status === 404) {
        toast.error('404');
    }
    if (status === 401 && headers['www-authenticate'] === 'Bearer error="invalid_token", error_description="The token is expired"') {
        window.localStorage.removeItem('jwt');
        toast.info('Your session has expired, please login again')
    }
    if (
        status === 400 &&
        config.method === 'get' &&
        data.errors.hasOwnProperty('id')
    ) {
    }
    if (status === 500) {
        toast.error('Server error - check the terminal for more info!');
    }
    throw error.response;
});

export const responseBody = (response: AxiosResponse) => response.data;

export const http = {
    get: (url: string) =>
        axios
            .get(url)
            .then(responseBody),
    post:  (url: string, body: {}) =>
        axios
            .post (url, body)
            .then(responseBody),
    put: (url: string, body: {}) =>
        axios
            .put(url, body)
            .then(responseBody),
    del: (url: string) =>
        axios
            .delete(url)
            .then(responseBody),
    postForm: (url: string, file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios
            .post(url, formData, {
                headers: { 'Content-type': 'multipart/form-data' }
            })
            .then(responseBody);
    }
};

export default axios;
