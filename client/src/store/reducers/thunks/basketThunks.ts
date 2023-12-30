import {createAsyncThunk} from "@reduxjs/toolkit";
import {requestBasket, requestIsDeviceInBasket} from "../../../requestAPI/basketAPI";
import {IRequestDeviceData} from "../../../models/IRequestData";

export const getBasket = createAsyncThunk(
    "basketPage/getBasket",
    async (data: IRequestDeviceData, thunkAPI) => {
        try {
            return await requestBasket(data)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const getIsInBasket = createAsyncThunk(
    "basketPage/getIsInBasket",
    async (id: number, thunkAPI) => {
        try {
            return await requestIsDeviceInBasket(id)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

