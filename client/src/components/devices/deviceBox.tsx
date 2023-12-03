import {IDevice} from "../../models/IDevice";
import styles from "./devices.module.css"

const DeviceBox = (props: IDevice) => {
    return (
        <div className={styles.deviceBox}>
            <div className={styles.deviceBox_header}>
                <div>{props.name}</div>
                <div>{props.brandId}</div>
                <div>{props.typeId}</div>
            </div>
            <div className={styles.deviceBox_img}>
                <img src="" alt="#"/>
            </div>
            <div className={styles.deviceBox_footer}>
                <div>{props.rating}</div>
                <div>{props.price}</div>
            </div>
        </div>
    )
}

export default DeviceBox