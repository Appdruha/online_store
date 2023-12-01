import {IUser} from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: IUser = {
    id: undefined,
    role: undefined,
    isAuth: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        AC(state, action: PayloadAction<boolean>){
            state.isAuth = action.payload
        }
    }
})

export default userSlice.reducer




















