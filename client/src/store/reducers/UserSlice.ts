import {IUser} from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authentification, reauthentication} from "./thunks/userThunks";
import {IDecodedToken} from "../../models/IAuth";

interface IUserState extends IUser {
    isFetching: boolean;
    error: string;
    errorType: string;
}

interface AuthError {
    [index: string]: string;
}

const initialState: IUserState = {
    id: undefined,
    role: undefined,
    isAuth: false,
    isFetching: false,
    error: "",
    authErrorType: ""
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
            state.error = ""
        },
        removeErrors (state) {
            state.error = ""
            state.authErrorType = ""
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
                    state.error = ""
                    state.authErrorType = ""
                })
            .addCase(authentification.pending, (state) => {
                state.isFetching = true
            })
            .addCase(authentification.rejected.type,
                (state, action: PayloadAction<string | AuthError>) => {
                state.isFetching = false
                if (typeof action.payload === "string") {
                    state.error = action.payload
                } else {
                    state.authErrorType = Object.keys(action.payload)[0]
                    state.error = Object.values(action.payload)[0]
                }
            })

            .addCase(reauthentication.fulfilled.type,
                (state, action: PayloadAction<IDecodedToken>) => {
                    state.isFetching = false
                    state.id = action.payload.id
                    state.role = action.payload.role
                    state.isAuth = true
                    state.error = ""
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




















