import {createAsyncThunk} from "@reduxjs/toolkit";
import {IRequestDeviceData} from "../../../models/IRequestData";
import {
    addBrandRequest, addTypeRequest, changeRatingRequest, createDeviceRequest, deleteDevice,
    getBrands,
    getDevice,
    getDevices, getRatedDevicesRequest,
    getTypes,
    putToBasket,
    removeFromBasket, setRatingRequest
} from "../../../requestAPI/deviceAPI";

export const createDevice = createAsyncThunk(
    "adminPage/createDevice",
    async (requestData: FormData, thunkAPI) => {
        try {
            return await createDeviceRequest(requestData)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchAllDevices = createAsyncThunk(
    "shopPage/fetchAllDevices",
    async (requestData: IRequestDeviceData, thunkAPI) => {
        try {
            return await getDevices(requestData)
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при загрузке")
        }
    }
)

export const getRatedDevices = createAsyncThunk(
    "shopPage/getRatedDevices",
    async (_, thunkAPI) => {
        try {
            return await getRatedDevicesRequest()
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при загрузке")
        }
    }
)

export const fetchOneDevice = createAsyncThunk(
    "devicePage/fetchOneDevice",
    async (id: string, thunkAPI) => {
        try {
            return await getDevice(id)
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при загрузке товара")
        }
    }
)

export const removeDevice = createAsyncThunk(
    "devicePage/removeDevice",
    async (id: string, thunkAPI) => {
        try {
            return await deleteDevice(id)
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при далении товара")
        }
    }
)

export const setDeviceRating = createAsyncThunk(
    "devicePage/setDeviceRating",
    async (data: { deviceId: string, rate: number, isRated: boolean },
           thunkAPI) => {
        try {
            const {deviceId, rate} = data
            if (data.isRated) {
                return await changeRatingRequest({deviceId, rate})
            } else {
                return await setRatingRequest({deviceId, rate})
            }
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при выставлении рейтинга")
        }
    }
)

export const fetchBrandsAndTypes = createAsyncThunk(
    "shopPage/fetchAllBrandsAndTypes",
    async (_, thunkAPI) => {
        try {
            const brands = await getBrands()
            const types = await getTypes()
            return {brands, types}
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при загрузке брендов")
        }
    }
)

export const putDeviceToBasket = createAsyncThunk(
    "basketPage/putDeviceToBasket",
    async (deviceId: string, thunkAPI) => {
        try {
            await putToBasket(deviceId)
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при добавлении в корзину")
        }
    }
)

export const removeDeviceFromBasket = createAsyncThunk(
    "basketPage/removeDeviceFromBasket",
    async (deviceId: string, thunkAPI) => {
        try {
            await removeFromBasket(deviceId)
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при удалении из корзины")
        }
    }
)

export const addTypeOrBrand = createAsyncThunk(
    "aminPage/addTypeOrBrand",
    async (data: { name: string, isBrandRequest: boolean },
           thunkAPI) => {
        try {
            if (data.isBrandRequest) {
                await addBrandRequest(data.name)
            } else {
                await addTypeRequest(data.name)
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)














