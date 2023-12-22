import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDevice, IDevices} from "../../models/IDevice";
import {
    fetchBrandsAndTypes,
    fetchAllDevices,
    fetchOneDevice,
    putDeviceToBasket,
    removeDeviceFromBasket, addTypeOrBrand, createDevice, removeDevice, setDeviceRating, getRatedDevices
} from "./thunks/devicesThunks";
import {IBrand, IType, ITypesAndBrands} from "../../models/ITypesAndBrands";

interface DevicesState extends IDevices {
    types: IType[];
    brands: IBrand[];
    currentDevice: null | IDevice;
    isFetching: boolean;
    error: string;
    ratedDevicesID: number[];
}

const initialState: DevicesState = {
    rows: [],
    count: 0,
    types: [],
    brands: [],
    currentDevice: null,
    isFetching: false,
    ratedDevicesID: [],
    error: ''
}

export const devicesSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createDevice.fulfilled.type,
                (state) => {
                    state.isFetching = false
                    state.error = ''
                })
            .addCase(createDevice.pending, (state) => {
                state.isFetching = true
            })
            .addCase(createDevice.rejected.type,
                (state, action: PayloadAction<string>) => {
                    state.isFetching = false
                    state.error = action.payload
                })

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

            .addCase(getRatedDevices.fulfilled,
                (state, action: PayloadAction<{deviceId: number}[]>) => {
                    state.isFetching = false
                    state.ratedDevicesID = action.payload.map(el => el.deviceId)
                    state.error = ''
                })
            .addCase(getRatedDevices.pending, (state) => {
                state.isFetching = true
            })
            .addCase(getRatedDevices.rejected.type,
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

            .addCase(removeDevice.fulfilled.type,
                (state) => {
                    state.isFetching = false
                    state.error = ''
                })
            .addCase(removeDevice.pending.type, (state) => {
                state.isFetching = true
            })
            .addCase(removeDevice.rejected.type,
                (state, action: PayloadAction<string>) => {
                    state.isFetching = false
                    state.error = action.payload
                })

            .addCase(setDeviceRating.fulfilled.type,
                (state) => {
                    state.isFetching = false
                    state.error = ''
                })
            .addCase(setDeviceRating.pending.type, (state) => {
                state.isFetching = true
            })
            .addCase(setDeviceRating.rejected.type,
                (state, action: PayloadAction<string>) => {
                    state.isFetching = false
                    state.error = action.payload
                })

            .addCase(fetchBrandsAndTypes.fulfilled.type,
                (state, action: PayloadAction<ITypesAndBrands>) => {
                    state.isFetching = false
                    state.brands = action.payload.brands
                    state.types = action.payload.types
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

            .addCase(addTypeOrBrand.fulfilled, (state) => {
                state.isFetching = false
            })
            .addCase(addTypeOrBrand.pending, (state) => {
                state.isFetching = true
            })
            .addCase(addTypeOrBrand.rejected.type,
                (state, action: PayloadAction<string>) => {
                    state.isFetching = false
                    state.error = action.payload
                })
    }
})

export default devicesSlice.reducer




















