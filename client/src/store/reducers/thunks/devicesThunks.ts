import axios from "axios";
import {IDevices} from "../../../models/IDevice";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {IBrand} from "../../../models/IBrand";
import {IType} from "../../../models/IType";

export const fetchDevices = createAsyncThunk(
    "shopPage/fetchAllDevices",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IDevices>('http://localhost:5000/api/device')
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при загрузке")
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














