import {createAsyncThunk} from "@reduxjs/toolkit";
import {IAuth} from "../../../models/IAuth";
import {authRequest, reauthRequest} from "../../../requestAPI/userAPI";

export const authentification = createAsyncThunk(
    "authPage/authentification",
    async (requestData: IAuth, thunkAPI) => {
        try {
            return await authRequest(requestData)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const reauthentication = createAsyncThunk(
    "authPage/reauthentication",
    async (refreshToken: string | undefined, thunkAPI) => {
        try {
            return await reauthRequest(refreshToken)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)