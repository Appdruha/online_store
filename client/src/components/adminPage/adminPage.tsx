import React, {useState} from 'react';
import CreateTypeOrBrand from "../modals/createTypeOrBrand";
import Modal from "../modals/modal";
import {useAppSelector} from "../../hooks/redux-hooks";
import CreateDevice from "../modals/createDevice";
import Preloader from "../UI/preloader";
import styles from "./adminPage.module.scss"

const AdminPage = () => {

    const {role, isFetching} = useAppSelector(state => state.userReducer)
    const [isBrandModalActive, setIsBrandModalActive] = useState(false)
    const [isTypeModalActive, setIsTypeModalActive] = useState(false)
    const [isDeviceModalActive, setIsDeviceModalActive] = useState(false)

    const deactivateModals = () => {
        setIsBrandModalActive(false)
        setIsTypeModalActive(false)
        setIsDeviceModalActive(false)
    }

    const activateModal = (e: React.MouseEvent<HTMLElement>) => {
        if (e.currentTarget.id === "1") {
            setIsBrandModalActive(true)
        } else if (e.currentTarget.id === "2") {
            setIsTypeModalActive(true)
        } else if (e.currentTarget.id === "3") {
            setIsDeviceModalActive(true)
        }
    }

    if (role !== "ADMIN") {
        return <h2>Страница недоступна</h2>
    }

    return (
        <>
            {isFetching && <Preloader/>}
            <div className={styles.container}>
                <button id="1" className={styles.adminBtn}
                        onClick={(e) => {
                            activateModal(e)
                        }}>Создать брэнд
                </button>
                <button id="2" className={styles.adminBtn}
                        onClick={(e) => {
                            activateModal(e)
                        }}>Создать тип
                </button>
                <button id="3" className={styles.adminBtn}
                        onClick={(e) => {
                            activateModal(e)
                        }}>Создать девайс
                </button>

                <Modal isActive={isBrandModalActive}
                       deactivate={deactivateModals}
                       children={<CreateTypeOrBrand isBrandModal={true}/>}/>
                <Modal isActive={isTypeModalActive}
                       deactivate={deactivateModals}
                       children={<CreateTypeOrBrand isBrandModal={false}/>}/>
                <Modal isActive={isDeviceModalActive}
                       deactivate={deactivateModals}
                       children={<CreateDevice/>}/>
            </div>
        </>
    );
};


export default AdminPage;