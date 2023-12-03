import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDevices} from "../../models/IDevice";
import {fetchDevices} from "./thunks/devicesThunks";

interface DevicesState extends IDevices {
    isFetching: boolean;
    error: string;
}

const initialState: DevicesState = {
    rows: [],
    count: 0,
    isFetching: false,
    error: ''
}

export const devicesSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchDevices.fulfilled.type]: (state, action: PayloadAction<IDevices>) => {
            state.isFetching = false
            state.error = ''
            state.rows = action.payload.rows
            state.count = action.payload.count
        },
        [fetchDevices.pending.type]: (state) => {
            state.isFetching = true
        },
        [fetchDevices.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isFetching = false
            state.error = action.payload
        },
    }
})

export default devicesSlice.reducer




















