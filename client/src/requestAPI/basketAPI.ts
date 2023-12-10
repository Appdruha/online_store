import {http} from "./index";
import {IDevices} from "../models/IDevice";

export const requestBasket = async (basketId: string) => {
    const {data} = await http.get<IDevices>("basket", {params:{basketId}})
    return data
}