import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice"
import devicesReducer from "./reducers/devicesSlice"
import basketReducer from "./reducers/basketSlice"

const rootReducer = combineReducers({
    userReducer,
    devicesReducer,
    basketReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    });
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
















