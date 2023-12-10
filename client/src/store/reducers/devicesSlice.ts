import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDevice, IDevices} from "../../models/IDevice";
import {
    fetchBrandsAndTypes,
    fetchAllDevices,
    fetchOneDevice,
    putDeviceToBasket,
    removeDeviceFromBasket
} from "./thunks/devicesThunks";
import {IBrand, IType, ITypesAndBrands} from "../../models/ITypesAndBrands";

interface DevicesState extends IDevices {
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllDevices.fulfilled,
                (state, action: PayloadAction<IDevices>) => {
                    state.isFetching = false
                    state.error = ''
                    state.rows = action.payload.rows
                    state.count = action.payload.count
                })
            .addCase(fetchAllDevices.pending, (state) => {
                state.isFetching = true
            })
            .addCase(fetchAllDevices.rejected.type,
                (state, action: PayloadAction<string>) => {
                    state.isFetching = false
                    state.error = action.payload
                })

            .addCase(fetchOneDevice.fulfilled.type,
                (state, action: PayloadAction<IDevice>) => {
                    state.isFetching = false
                    state.error = ''
                    state.currentDevice = action.payload
                })
            .addCase(fetchOneDevice.pending.type, (state) => {
                state.isFetching = true
            })
            .addCase(fetchOneDevice.rejected.type,
                (state, action: PayloadAction<string>) => {
                    state.isFetching = false
                    state.error = action.payload
                })

            .addCase(fetchBrandsAndTypes.fulfilled.type,
                (state, action: PayloadAction<ITypesAndBrands>) => {
                    state.isFetching = false
                    state.brands = action.payload.brands
                    state.types = action.payload.types
                    state.rows.map(row => {
                        row.brandName = state.brands[row.brandId - 1].name
                        row.typeName = state.brands[row.typeId - 1].name
                    })
                })
            .addCase(fetchBrandsAndTypes.pending, (state) => {
                state.isFetching = true
            })
            .addCase(fetchBrandsAndTypes.rejected.type,
                (state, action: PayloadAction<string>) => {
                    state.isFetching = false
                    state.error = action.payload
                })

            .addCase(putDeviceToBasket.fulfilled, (state) => {
                state.isFetching = false
            })
            .addCase(putDeviceToBasket.pending, (state) => {
                state.isFetching = true
            })
            .addCase(putDeviceToBasket.rejected.type,
                (state, action: PayloadAction<string>) => {
                    state.isFetching = false
                    state.error = action.payload
                })

            .addCase(removeDeviceFromBasket.fulfilled, (state) => {
                state.isFetching = false
            })
            .addCase(removeDeviceFromBasket.pending, (state) => {
                state.isFetching = true
            })
            .addCase(removeDeviceFromBasket.rejected.type,
                (state, action: PayloadAction<string>) => {
                    state.isFetching = false
                    state.error = action.payload
                })
    }
})

export default devicesSlice.reducer




















