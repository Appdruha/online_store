import React, {memo, useState} from "react";
import {IDevice} from "../../../models/IDevice";
import styles from "./deviceBox.module.scss"
import {useLocation, useNavigate} from "react-router-dom";
import {BASKET_ROUTE, DEVICE_ROUTE} from "../../../utils/consts";
import {useAppDispatch} from "../../../hooks/redux-hooks";
import {putDeviceToBasket, removeDeviceFromBasket} from "../../../store/reducers/thunks/devicesThunks";
import icon from "../../../assets/electronics.png"

const DeviceBox = memo((props: IDevice) => {

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()
    const isBasket = location.pathname === BASKET_ROUTE
    const [isDeviceInBasket, setIsDeviceInBasket] = useState(isBasket)

    const redirect = () => {
        navigate(DEVICE_ROUTE + `/${props.id}`)
    }

    const getImg = () => {
        return import.meta.env.VITE_REACT_APP_API_URL + props.img
    }

    const imageOnErrorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = icon;
    };
    const addToBasket = async (deviceId: number) => {
        await dispatch(putDeviceToBasket(`${deviceId}`))
        setIsDeviceInBasket(!isDeviceInBasket)
    }

    const removeFromBasket = async (deviceId: number) => {
        await dispatch(removeDeviceFromBasket(`${deviceId}`))
        setIsDeviceInBasket(!isDeviceInBasket)
    }

    return (
        <div className={styles.deviceBox}>
            <div className={styles.deviceBox_header}>
                <div className={styles.name} onClick={redirect}>{props.name}</div>
                <div>
                    <div className={styles.brand}>{props.brandName}</div>
                    <div className={styles.type}>{props.typeName}</div>
                </div>
            </div>
            <div className={styles.deviceBox_img}>
                <img onError={imageOnErrorHandler} className="w-full h-full" src={getImg()}
                     alt="#"/>
            </div>
            <div className={styles.deviceBox_footer}>
                <div className={styles.info}>rating {props.rating}</div>
                <div className={styles.info}>{props.price}$</div>
            </div>
            {isDeviceInBasket ?
                <button className={styles.button} onClick={() => removeFromBasket(props.id)}>Удалить из корзины</button>
                :
                <button className={styles.button} onClick={() => addToBasket(props.id)}>Добавить в корзину</button>
            }
        </div>
    )
})

export default DeviceBox