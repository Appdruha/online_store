import {http} from "./index";
import {IRequestDeviceData} from "../models/IRequestData";
import {IDevices} from "../models/IDevice";

export const fetchDevices = async (requestData: IRequestDeviceData) => {
    const {page, limit, brandId, typeId} = requestData
    const {data} = await http.get<IDevices>("device", {params: {page, limit, brandId, typeId}})
    return data
}