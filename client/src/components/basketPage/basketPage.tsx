import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../../utils/consts";
import {getBasket} from "../../store/reducers/thunks/basketThunks";
import DeviceBoxesBlock from "../UI/deviceBox/deviceBoxesBlock";
import Preloader from "../UI/preloader";
import NavButtons from "../UI/navButtons/navButtons";

const BasketPage = () => {

    const {isAuth, id} = useAppSelector(state => state.userReducer)
    const {error, isFetching, rows, count} =
        useAppSelector(state => state.basketReducer)
    const {brands, types} = useAppSelector(state => state.devicesReducer)
    const dispatch = useAppDispatch()
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        if (id)
            dispatch(getBasket({basketId: id, page: currentPage, limit: 9}))
    }, [id, currentPage]);

    if (!isAuth || error) {
        return <div className="small-font mt-20">Чтобы просматривать корзину нужно <NavLink
            to={LOGIN_ROUTE}>авторизироваться</NavLink></div>
    }

    return (
        <>
            {isFetching && <Preloader/>}
            <div className="flex flex-wrap justify-center">
                {
                    rows.length === 0 ? <h2 className="big-font mt-20">Корзина пуста</h2>
                        :
                        <>
                            <DeviceBoxesBlock rows={rows} types={types} brands={brands}/>
                            <NavButtons count={count} limit={9} currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}/></>
                }
            </div>
        </>
    );
};

export default BasketPage;