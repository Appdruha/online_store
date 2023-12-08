import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDevice, IDevices} from "../../models/IDevice";
import {fetchBrandsAndTypes, fetchAllDevices, fetchOneDevice} from "./thunks/devicesThunks";
import {IBrand, IType, ITypesAndBrands} from "../../models/ITypesAndBrands";

interface DevicesState extends IDevices{
    types: IType[];
    brands: IBrand[];
    currentDevice: null | IDevice;
    isFetching: boolean;
    error: string;
}

const initialState: DevicesState = {
    rows: [],
    count: 0,
    types: [],
    brands: [],
    currentDevice: null,
    isFetching: false,
    error: ''
}

export const devicesSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAllDevices.fulfilled.type]: (state, action: PayloadAction<IDevices>) => {
            state.isFetching = false
            state.error = ''
            state.rows = action.payload.rows
            state.count = action.payload.count
        },
        [fetchAllDevices.pending.type]: (state) => {
            state.isFetching = true
        },
        [fetchAllDevices.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isFetching = false
            state.error = action.payload
        },

        [fetchOneDevice.fulfilled.type]: (state, action: PayloadAction<IDevice>) => {
            state.isFetching = false
            state.error = ''
            state.currentDevice = action.payload
        },
        [fetchOneDevice.pending.type]: (state) => {
            state.isFetching = true
        },
        [fetchOneDevice.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isFetching = false
            state.error = action.payload
        },

        [fetchBrandsAndTypes.fulfilled.type]:
            (state, action: PayloadAction<ITypesAndBrands>) => {
            state.isFetching = false
            state.brands = action.payload.brands
            state.types = action.payload.types
            state.rows.map(row => {
                row.brandName = state.brands[row.brandId - 1].name
                row.typeName = state.brands[row.typeId - 1].name
            })
        },
        [fetchBrandsAndTypes.pending.type]: (state) => {
            state.isFetching = true
        },
        [fetchBrandsAndTypes.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isFetching = false
            console.log(action.payload)
        },
    }
})

export default devicesSlice.reducer




















