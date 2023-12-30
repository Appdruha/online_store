import React from 'react';
import styles from "./modal.module.scss"
import {useAppSelector} from "../../hooks/redux-hooks";
import Preloader from "../UI/preloader";

const Modal = (props: { isActive: boolean, deactivate: () => void, children: React.ReactNode }) => {

    const {error, isFetching} =
        useAppSelector(state => state.devicesReducer)

    if (isFetching) {
        return <Preloader/>
    }

    return (
        <div className={props.isActive ? `${styles.modal} ${styles.active}` : styles.modal}>
            <div className={styles.modal_content}>
                {props.children}
                <button className={styles.modal_closeBtn} onClick={props.deactivate}>Закрыть</button>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default Modal;