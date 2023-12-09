import {http} from "./index";
import {IAuth} from "../models/IAuth";
import {jwtDecode} from "jwt-decode";

interface IAuthResponse {
    token: string;
}

export const authRequest = async (requestData: IAuth)=> {
    const {email, password, endpoint, roleKey} = requestData
    const {data} =
        await http.post<IAuthResponse, Omit<IAuth, "endpoint">>("user/" + endpoint, {email, password, roleKey})
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token)
}