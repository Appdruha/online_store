import axios, {AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, AxiosInstance} from "axios";

const headers: Readonly<Record<string, string | boolean>> = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Credentials": true,
    "X-Requested-With": "XMLHttpRequest",
};

const injectToken = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    try {
        const token = localStorage.getItem("token")

        if (token !== null) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    } catch (e: any) {
        throw new Error(e)
    }
}

class Http {
    private instance: AxiosInstance | null = null

    private get http(): AxiosInstance {
        return this.instance != null ? this.instance : this.initHttp();
    }

    initHttp() {
        const http = axios.create({
            baseURL: import.meta.env.VITE_REACT_APP_API_URL + "api/",
            headers,
            withCredentials: false,
        })

        http.interceptors.request.use(injectToken, error => Promise.reject(error))

        http.interceptors.response.use(
            (response) => response,
            (error) => {
                const {response} = error
                return this.handleError(response)
            }
        )

        this.instance = http
        return http
    }

    get<T, R = AxiosResponse<T>>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.http.get<T, R>(url, config)
    }

    delete<T, R = AxiosResponse<T>>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.http.delete<T, R>(url, config)
    }

    post<T, D, R = AxiosResponse<T>>(
        url: string,
        data?: D,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.http.post<T, R>(url, data, config)
    }

    private handleError(error: any) {
        return Promise.reject(error.data)
    }
}

export const http = new Http()


