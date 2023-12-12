import {IUser} from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authentification, reauthentication} from "./thunks/userThunks";
import {IDecodedToken} from "../../models/IAuth";

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
        logout (state) {
            localStorage.removeItem("token")
            state.id = undefined
            state.role = undefined
            state.isAuth = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authentification.fulfilled.type,
                (state, action: PayloadAction<IDecodedToken>) => {
                    state.isFetching = false
                    state.id = action.payload.id
                    state.role = action.payload.role
                    state.isAuth = true
                })
            .addCase(authentification.pending, (state) => {
                state.isFetching = true
            })
            .addCase(authentification.rejected.type,
                (state, action: PayloadAction<string>) => {
                state.isFetching = false
                state.error = action.payload
            })

            .addCase(reauthentication.fulfilled.type,
                (state, action: PayloadAction<IDecodedToken>) => {
                    state.isFetching = false
                    state.id = action.payload.id
                    state.role = action.payload.role
                    state.isAuth = true
                })
            .addCase(reauthentication.pending, (state) => {
                state.isFetching = true
            })
            .addCase(reauthentication.rejected.type,
                (state, action: PayloadAction<string>) => {
                    state.isFetching = false
                    state.error = action.payload
                })
    }
})

export default userSlice.reducer




















