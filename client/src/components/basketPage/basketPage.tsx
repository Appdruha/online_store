import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../../utils/consts";
import {getBasket} from "../../store/reducers/thunks/basketThunks";
import styles from "./basket.module.css"
import DeviceBoxesBlock from "../UI/deviceBoxesBlock";
import Preloader from "../UI/preloader";

const BasketPage = () => {

    const {isAuth, id} = useAppSelector(state => state.userReducer)
    const {error, isFetching, rows} =
        useAppSelector(state => state.basketReducer)
    const {brands, types} = useAppSelector(state => state.devicesReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (id)
            dispatch(getBasket(`${id}`))
    }, [id]);

    if (!isAuth || error) {
        return <div>Чтобы просматривать корзину нужно <NavLink to={LOGIN_ROUTE}>авторизироваться</NavLink></div>
    }

    if (isFetching) {
        return <Preloader/>
    }

    return (
        <div className={styles.container}>
            {
                rows.length === 0 ? <h1>Корзина пуста</h1>
                :
                <DeviceBoxesBlock rows={rows} types={types} brands={brands}/>
            }
        </div>
    );
};

export default BasketPage;