import React from 'react';
import styles from "./modal.module.css"
import {useAppSelector} from "../../hooks/redux-hooks";

const Modal = (props: { isActive: boolean, deactivate: () => void, children: React.ReactNode }) => {

    const {error, isFetching} =
        useAppSelector(state => state.devicesReducer)

    if (isFetching) {
        return <h2>{isFetching}</h2>
    }

    return (
        <div className={props.isActive ? `${styles.modal} ${styles.active}` : styles.modal}>
            <div className={styles.modal_content}>
                {props.children}
                <button onClick={props.deactivate}>Закрыть</button>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default Modal;