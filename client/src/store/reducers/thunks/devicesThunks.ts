import axios from "axios";
import {IDevice, IDevices} from "../../../models/IDevice";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {IBrand} from "../../../models/IBrand";
import {IType} from "../../../models/IType";

interface requestData {
    page: string;
    limit: string;
}

export const fetchDevices = createAsyncThunk(
    "shopPage/fetchAllDevices",
    async (requestData: requestData, thunkAPI) => {
        const {page, limit} = requestData
        try {
            const response =
                await axios.get<IDevices>(`http://localhost:5000/api/device?page=${page}&limit=${limit}`)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при загрузке")
        }
    }
)

export const fetchOneDevice = createAsyncThunk(
    "devicePage/fetchOneDevice",
    async (id: string, thunkAPI) => {
        try {
            const response =
                await axios.get<IDevice>('http://localhost:5000/api/device/' + id)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при загрузке товара")
        }
    }
)

export const fetchBrands = createAsyncThunk(
    "shopPage/fetchAllBrands",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IBrand[]>('http://localhost:5000/api/brand')
            return response.data.map(obj => obj.name)
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при загрузке брендов")
        }
    }
)

export const fetchTypes = createAsyncThunk(
    "shopPage/fetchAllTypes",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IType[]>('http://localhost:5000/api/brand')
            return response.data.map(obj => obj.name)
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при загрузке типов")
        }
    }
)














