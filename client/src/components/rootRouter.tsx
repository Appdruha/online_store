import React from 'react';
import {Routes, Route} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";
import Shop from "./shopPage/shop";

const RootRouter = () => {
    return (
        <Routes>
            <Route path={SHOP_ROUTE} element={<Shop/>}></Route>
        </Routes>
    );
};

export default RootRouter;



























