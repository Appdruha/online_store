import React from "react";
import {IDevice} from "../../models/IDevice";
import styles from "./shop.module.css"
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../../utils/consts";

const DeviceBox = (props: IDevice) => {

    const navigate = useNavigate()
    const redirect = () => {
        navigate(DEVICE_ROUTE + `/${props.id}`)
    }

    return (
        <div className={styles.deviceBox} onClick={redirect}>
            <div className={styles.deviceBox_header}>
                <div>{props.name}</div>
                <div>{props.brandName}</div>
                <div>{props.typeName}</div>
            </div>
            <div className={styles.deviceBox_img}>
                <img src={import.meta.env.REACT_APP_API_URL} alt="#"/>
            </div>
            <div className={styles.deviceBox_footer}>
                <div>{props.rating}</div>
                <div>{props.price}</div>
            </div>
        </div>
    )
}

export default DeviceBox