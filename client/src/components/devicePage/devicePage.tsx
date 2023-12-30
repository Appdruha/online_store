import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {
    fetchOneDevice, getIsDeviceRated,
    putDeviceToBasket,
    removeDevice,
    removeDeviceFromBasket
} from "../../store/reducers/thunks/devicesThunks";
import {useParams} from "react-router-dom";
import {IDevice} from "../../models/IDevice";
import Modal from "../modals/modal";
import SetDeviceRatingModal from "../modals/setDeviceRatingModal";
import Preloader from "../UI/preloader";
import {getImg, imageOnErrorHandler} from "../../utils/imageCallbacks";
import styles from "./devicePage.module.scss";
import {IBrand, IType} from "../../models/ITypesAndBrands";
import {getIsInBasket} from "../../store/reducers/thunks/basketThunks";

const DevicePage = () => {

    const {id} = useParams()
    const dispatch = useAppDispatch()
    const {currentDevice, error, isFetching, isRated, brands, types} =
        useAppSelector(state => state.devicesReducer)
    const {isInBasket} = useAppSelector(state => state.basketReducer)
    const {role} = useAppSelector(state => state.userReducer)
    const [isRatingModalActive, setIsRatingModalActive] = useState(false)
    const [isDeviceInBasket, setIsDeviceInBasket] = useState(isInBasket)
    const [isDeviceRated, setIsDeviceRated] = useState(isRated)

    const toggleIsRatingModalActive = () => {
        setIsRatingModalActive(!isRatingModalActive)
    }

    const toggleIsDeviceInBasket = () => {
        setIsDeviceInBasket(!isDeviceInBasket)
    }

    const getInfo = (device: IDevice | null) => {
        if (device !== null && device.info !== undefined && device.info.length !== 0) {
            return device.info[0]
        }
        return {title: "No info", description: "No info"}
    }

    useEffect(() => {
        if (id) {
            dispatch(fetchOneDevice(id))
            dispatch(getIsInBasket(parseInt(id)))
            dispatch(getIsDeviceRated(parseInt(id)))
        }
    }, []);

    useEffect(() => {
        setIsDeviceInBasket(isInBasket)
    }, [isInBasket]);

    useEffect(() => {
        setIsDeviceRated(isRated)
    }, [isRated]);

    const addToBasket = (deviceId: number | string) => {
        dispatch(putDeviceToBasket(`${deviceId}`))
        toggleIsDeviceInBasket()
    }

    const removeFromBasket = (deviceId: number | string) => {
        dispatch(removeDeviceFromBasket(`${deviceId}`))
        toggleIsDeviceInBasket()
    }

    const removeDeviceCallback = (deviceId: number | string) => {
        dispatch(removeDevice(`${deviceId}`))
    }

    const getTypeOrBrandName = (arr: IType[] | IBrand[], id: number) => {
        if (arr.length > 0)
            return arr[id - 1].name
    }

    if (error || currentDevice === null) {
        return <h1>{error}</h1>
    }

    return (
        <>
            {isFetching && <Preloader/>}
            <div className={styles.container}>
                <div className={styles.header}>{currentDevice.name}</div>
                <div className={styles.main}>
                    <div className={styles.main_left}>
                        <img onError={imageOnErrorHandler}
                             src={getImg(currentDevice.img)} alt="#"/>
                        <div className={styles.main_left_rating}>
                            <p>Рейтинг: {currentDevice.rating}</p>
                            <button disabled={isFetching} className={styles.ratingBtn}
                                    onClick={toggleIsRatingModalActive}>
                                {isDeviceRated ? "Изменить рейтинг" : "Выставить рейтинг"}
                            </button>
                        </div>
                        <div className="text-gray-800 font-bold mt-2">Цена: {currentDevice.price}$</div>
                    </div>
                    <div className={styles.main_right}>
                        <div className="small-font mt-6">Тип: {getTypeOrBrandName(types, currentDevice.typeId)}</div>
                        <div
                            className="small-font mt-4">Брэнд: {getTypeOrBrandName(brands, currentDevice.brandId)}</div>
                        <div className={styles.descriptionBox}>
                            <div className={styles.descriptionBox_title}>{getInfo(currentDevice).title}</div>
                            <div
                                className={styles.descriptionBox_description}>{getInfo(currentDevice).description}</div>
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    {id && (isDeviceInBasket ?
                        <button disabled={isFetching} onClick={() => removeFromBasket(id)}>Удалить из корзины</button>
                        :
                        <button disabled={isFetching} onClick={() => addToBasket(id)}>Добавить в корзину</button>)
                    }
                    {id && role === "ADMIN" &&
                        <button disabled={isFetching} onClick={() => removeDeviceCallback(id)}>Удалить девайс</button>}
                </div>
                <Modal isActive={isRatingModalActive}
                       deactivate={toggleIsRatingModalActive}
                       children={<SetDeviceRatingModal isRated={isDeviceRated}/>}/>
            </div>
        </>
    );
};

export default DevicePage;