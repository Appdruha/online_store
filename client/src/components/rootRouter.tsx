import React from 'react';
import {Routes, Route} from "react-router-dom";
import {DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import Shop from "./shopPage/shop";
import DevicePage from "./devicePage/devicePage";
import AuthPage from "./authPage/authPage";

const RootRouter = () => {
    return (
        <Routes>
            <Route path={LOGIN_ROUTE} element={<AuthPage/>}></Route>
            <Route path={REGISTRATION_ROUTE} element={<AuthPage/>}></Route>
            <Route path={SHOP_ROUTE} element={<Shop/>}></Route>
            <Route path={DEVICE_ROUTE + '/:id'} element={<DevicePage/>}></Route>
        </Routes>
    );
};

export default RootRouter;



























