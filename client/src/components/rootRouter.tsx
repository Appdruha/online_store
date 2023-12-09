import React from 'react';
import {Routes, Route} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import Shop from "./shopPage/shop";
import DevicePage from "./devicePage/devicePage";
import AuthPage from "./authPage/authPage";
import BasketPage from "./basketPage/basketPage";
import AdminPage from "./adminPage/adminPage";

const RootRouter = () => {
    return (
        <Routes>
            <Route path={LOGIN_ROUTE} element={<AuthPage/>}></Route>
            <Route path={REGISTRATION_ROUTE} element={<AuthPage/>}></Route>
            <Route path={SHOP_ROUTE} element={<Shop/>}></Route>
            <Route path={BASKET_ROUTE} element={<BasketPage/>}></Route>
            <Route path={ADMIN_ROUTE} element={<AdminPage/>}></Route>
            <Route path={DEVICE_ROUTE + '/:id'} element={<DevicePage/>}></Route>
        </Routes>
    );
};

export default RootRouter;



























