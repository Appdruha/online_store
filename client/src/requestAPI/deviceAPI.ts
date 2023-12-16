import {http} from "./index";
import {IRequestDeviceData} from "../models/IRequestData";
import {IDevice, IDevices} from "../models/IDevice";
import {IBrand, IType} from "../models/ITypesAndBrands";

export const createDeviceRequest = async (requestData: FormData) => {
    await  http.post<any, FormData>("device", requestData,
        {headers: {"Content-Type": "multipart/form-data"}})
}

export const getDevices = async (requestData: IRequestDeviceData) => {
    const {data} = await http.get<IDevices>("device", {params: {...requestData}})
    return data
}

export const getDevice = async (id: string) => {
    const {data} = await http.get<IDevice>(`device/${id}`)
    return data
}

export const deleteDevice = async (id: string) => {
    await http.delete<IDevice>(`device/${id}`)
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

export const addBrandRequest = async (name: string) => {
    await http.post<any, {name: string}>("brand", {name})
}

export const addTypeRequest = async (name: string) => {
    await http.post<any, {name: string}>("type", {name})
}

export const setRatingRequest = async (data: {deviceId: string, rate: number}) => {
    await http.post<any, {rate: number, deviceId: string}>(`device/rating`, {...data})
}

export const getRatedDevicesRequest = async () => {
    const {data} = await http.get<{deviceId: number}[]>(`device/rating`)
    return data
}

export const changeRatingRequest = async (data: {deviceId: string, rate: number}) => {
    await http.put<any, {rate: number, deviceId: string}>(`device/rating`, {...data})
}

