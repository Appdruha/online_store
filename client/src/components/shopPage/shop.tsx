import React from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {useEffect} from "react";
import {fetchBrands, fetchDevices, fetchTypes} from "../../store/reducers/thunks/devicesThunks";
import DeviceBox from "./deviceBox";
import styles from "./shop.module.css";

function Shop() {
    const {rows, isFetching, error}
        = useAppSelector(state => state.devicesReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchDevices({page: "2", limit: "9"}))
        dispatch(fetchBrands())
        dispatch(fetchTypes())
    }, []);

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
        <div className={styles.container}>
            {error && <h1>{error}</h1>}
            {isFetching && <h1>Loading</h1>}
            {deviceBoxes}
        </div>
    );
}

export default Shop;
