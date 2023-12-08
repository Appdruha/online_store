import {IUser} from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login} from "./thunks/userThunks";
import {IAuthResponse} from "../../models/IAuth";

interface IUserState extends IUser {
    isFetching: boolean;
    error: string;
}

const initialState: IUserState = {
    id: undefined,
    role: undefined,
    isAuth: false,
    isFetching: false,
    error: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        checkAuth (state) {
            if (localStorage.getItem("token")) {
                state.isAuth = true
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled,
                (state, action: PayloadAction<IAuthResponse>) => {
                    state.isFetching = false
                    localStorage.setItem("token", action.payload.token)
                    state.isAuth = true
                })
            .addCase(login.pending, (state) => {
                state.isFetching = true
            })
            .addCase(login.rejected.type,
                (state, action: PayloadAction<string>) => {
                state.isFetching = false
                state.error = action.payload
            })
    }
})

export default userSlice.reducer




















