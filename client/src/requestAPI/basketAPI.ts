import {http} from "./index";
import {IDevices} from "../models/IDevice";
import {IBoolRequestData, IRequestDeviceData} from "../models/IRequestData";

export const requestBasket = async (requestData: IRequestDeviceData) => {
    const {data} = await http.get<IDevices>("basket", {params:{...requestData}})
    return data
}

export const requestIsDeviceInBasket = async (deviceId: number) => {
    const {data} = await http.get<IBoolRequestData>("basket/isInBasket", {params:{deviceId}})
    return data
}