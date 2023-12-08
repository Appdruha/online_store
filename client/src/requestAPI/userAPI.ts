import {http} from "./index";
import {IAuth, IAuthResponse} from "../models/IAuth";

export const loginRequest = async (formData: IAuth)=> {
    const {email, password} = formData
    const {data} = await http.post<IAuthResponse, IAuth>("user/login", {email, password})
    return data
}