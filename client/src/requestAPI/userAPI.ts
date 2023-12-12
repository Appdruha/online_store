import {http} from "./index";
import {IAuth} from "../models/IAuth";
import {jwtDecode} from "jwt-decode";

interface IAuthResponse {
    token: string;
}

export const authRequest = async (requestData: IAuth)=> {
    const {email, password, endpoint, rememberMe, roleKey} = requestData
    const {data} =
        await http.post<IAuthResponse, Omit<IAuth, "endpoint">>("user/" + endpoint,
            {email, password, rememberMe, roleKey})
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token)
}

export const reauthRequest = async (refreshToken?: string) => {
    const {data} = await http.post<IAuthResponse,
        {refreshToken?: string}>("user/auth", {refreshToken})
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token)
}