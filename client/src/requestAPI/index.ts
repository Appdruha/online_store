import axios, {InternalAxiosRequestConfig} from "axios";
import {IRequestDeviceData} from "../models/IRequestData";

const host = axios.create({
    baseURL: import.meta.env.REACT_APP_API_URL
})

const authHost = axios.create({
    baseURL: import.meta.env.REACT_APP_API_URL
})

const authInterceptor = (config : InternalAxiosRequestConfig) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

authHost.interceptors.request.use(authInterceptor)

export {
    host,
    authHost
}