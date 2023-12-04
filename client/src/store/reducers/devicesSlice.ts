import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDevices} from "../../models/IDevice";
import {fetchBrands, fetchDevices, fetchTypes} from "./thunks/devicesThunks";

interface DevicesState extends IDevices {
    isFetching: boolean;
    error: string;
}

const initialState: DevicesState = {
    rows: [],
    count: 0,
    types: [],
    brands: [],
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

        [fetchBrands.fulfilled.type]: (state, action: PayloadAction<string[]>) => {
            state.isFetching = false
            state.brands = action.payload
            state.rows.map(row => row.brandName = state.brands[row.brandId - 1])
        },
        [fetchBrands.pending.type]: (state) => {
            state.isFetching = true
        },
        [fetchBrands.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isFetching = false
            console.log(action.payload)
        },

        [fetchTypes.fulfilled.type]: (state, action: PayloadAction<string[]>) => {
            state.isFetching = false
            state.types = action.payload
            state.rows.map(row => row.brandName = state.types[row.typeId - 1])
        },
        [fetchTypes.pending.type]: (state) => {
            state.isFetching = true
        },
        [fetchTypes.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isFetching = false
            console.log(action.payload)
        },
    }
})

export default devicesSlice.reducer



















