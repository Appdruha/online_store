import React, {memo, useState} from "react";
import {IDevice} from "../../models/IDevice";
import styles from "../shopPage/shop.module.css"
import {useLocation, useNavigate} from "react-router-dom";
import {BASKET_ROUTE, DEVICE_ROUTE} from "../../utils/consts";
import {useAppDispatch} from "../../hooks/redux-hooks";
import {putDeviceToBasket, removeDeviceFromBasket} from "../../store/reducers/thunks/devicesThunks";

const DeviceBox = memo((props: IDevice) => {

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()
    const isBasket = location.pathname === BASKET_ROUTE
    const [isDeviceInBasket, setIsDeviceInBasket] = useState(isBasket)

    const redirect = () => {
        navigate(DEVICE_ROUTE + `/${props.id}`)
    }

    const addToBasket = (deviceId: number) => {
        dispatch(putDeviceToBasket(`${deviceId}`))
    }

    const removeFromBasket = async (deviceId: number) => {
        await dispatch(removeDeviceFromBasket(`${deviceId}`))
        setIsDeviceInBasket(!isDeviceInBasket)
    }

    return (
        <div className={styles.deviceBox}>
            <div className={styles.deviceBox_header}>
                <div onClick={redirect}>{props.name}</div>
                <div>{props.brandName}</div>
                <div>{props.typeName}</div>
            </div>
            <div className={styles.deviceBox_img}>
                <img style={{display: "block", width: "150px", height: "150px"}}
                     src={import.meta.env.VITE_REACT_APP_API_URL + props.img} alt="#"/>
            </div>
            <div className={styles.deviceBox_footer}>
                <div>{props.rating}</div>
                <div>{props.price}</div>
            </div>
            {isDeviceInBasket ?
                <button onClick={() => removeFromBasket(props.id)}>Удалить из корзины</button>
                :
                <button onClick={() => addToBasket(props.id)}>Добавить в корзину</button>
            }
        </div>
    )
})

export default DeviceBox