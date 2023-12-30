import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDevices} from "../../models/IDevice";
import {getBasket, getIsInBasket} from "./thunks/basketThunks";
import {IBoolRequestData} from "../../models/IRequestData";

interface IBasketState extends IDevices {
    basketId: number | undefined;
    isFetching: boolean;
    error: string;
    isInBasket: boolean;
}

const initialState: IBasketState = {
    basketId: undefined,
    rows: [],
    count: 0,
    isFetching: false,
    isInBasket: false,
    error: ""
}

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getBasket.fulfilled.type,
                (state, action: PayloadAction<IDevices>) => {
                    state.isFetching = false
                    state.rows = action.payload.rows
                    state.count = action.payload.count
                })
            .addCase(getBasket.pending, (state) => {
                state.isFetching = true
            })
            .addCase(getBasket.rejected.type,
                (state, action: PayloadAction<string>) => {
                    state.isFetching = false
                    state.error = action.payload
                })

            .addCase(getIsInBasket.fulfilled.type,
                (state, action: PayloadAction<IBoolRequestData>) => {
                    state.isFetching = false
                    state.isInBasket = action.payload.message
                })
            .addCase(getIsInBasket.pending, (state) => {
                state.isFetching = true
            })
            .addCase(getIsInBasket.rejected.type,
                (state, action: PayloadAction<string>) => {
                    state.isFetching = false
                    state.error = action.payload
                })
    }
})

export default basketSlice.reducer