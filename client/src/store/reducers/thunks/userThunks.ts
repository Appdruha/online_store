import {createAsyncThunk} from "@reduxjs/toolkit";
import {IAuth} from "../../../models/IAuth";
import {loginRequest} from "../../../requestAPI/userAPI";


export const login = createAsyncThunk(
    "authPage/login",
    async (formData: IAuth, thunkAPI) => {
        try {
            return await loginRequest(formData)
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при обработке запроса")
        }
    }
)