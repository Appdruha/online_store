import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../../utils/consts";
import DeviceBox from "../common/deviceBox";
import {getBasket} from "../../store/reducers/thunks/basketThunks";

const BasketPage = () => {

    const {isAuth, id} = useAppSelector(state => state.userReducer)
    const {error, isFetching, rows} =
        useAppSelector(state => state.basketReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (id)
            dispatch(getBasket(`${id}`))
    }, [id]);

    if (!isAuth) {
        return <div>Чтобы просматривать корзину нужно <NavLink to={LOGIN_ROUTE}>авторизироваться</NavLink></div>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    if (isFetching) {
        return <h1>Loading</h1>
    }

    const deviceBoxes = rows.map(
        row => <DeviceBox
            key={row.id}
            id={row.id}
            name={row.name}
            price={row.price}
            rating={row.rating}
            brandId={row.brandId}
            typeId={row.typeId}
            img={row.img}
            brandName={row.brandName}
            typeName={row.typeName}
        />
    )

    return (
        <div>
            {deviceBoxes.length === 0 ? <h1>Корзина пуста</h1> : deviceBoxes}
        </div>
    );
};

export default BasketPage;