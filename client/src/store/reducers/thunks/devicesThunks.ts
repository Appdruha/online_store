import axios from "axios";
import {IDevices} from "../../../models/IDevice";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchDevices = createAsyncThunk(
    "devices/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IDevices>('http://localhost:5000/api/device')
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при загрузке")
        }
    }
)














