import {http} from "./index";
import {IRequestDeviceData} from "../models/IRequestData";
import {IDevice, IDevices} from "../models/IDevice";
import {IBrand, IType} from "../models/ITypesAndBrands";

export const getDevices = async (requestData: IRequestDeviceData) => {
    const {page, limit, brandId, typeId} = requestData
    const {data} = await http.get<IDevices>("device", {params: {page, limit, brandId, typeId}})
    return data
}

export const getDevice = async (id: string) => {
    const {data} = await http.get<IDevice>(`device/${id}`)
    return data
}

export const getBrands = async () => {
    const {data} = await http.get<IBrand[]>(`brand`)
    return data
}

export const getTypes = async () => {
    const {data} = await http.get<IType[]>(`type`)
    return data
}

export const putToBasket = async (deviceId: string) => {
    await http.post<any, {deviceId: string}>("device/toBasket", {deviceId})
}

export const removeFromBasket = async (deviceId: string) => {
    await http.delete<any>(`device/${deviceId}/fromBasket`)
}

