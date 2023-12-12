import {createAsyncThunk} from "@reduxjs/toolkit";
import {requestBasket} from "../../../requestAPI/basketAPI";

export const getBasket = createAsyncThunk(
    "basketPage/getBasket",
    async (basketId: string, thunkAPI) => {
        try {
            return await requestBasket(basketId)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

