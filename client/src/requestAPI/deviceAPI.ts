import {host, authHost} from "./index";
import {IRequestDeviceData} from "../models/IRequestData";
import {IDevices} from "../models/IDevice";

export const fetchDevices = async (requestData: IRequestDeviceData) => {
    const {page, limit, brandId, typeId} = requestData
    const {data} = await host.get<IDevices>(`device?page=${page}&limit=${limit}&brandId=${brandId}`)
    return data
}