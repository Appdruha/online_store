import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {
    fetchOneDevice,
    putDeviceToBasket,
    removeDevice,
    removeDeviceFromBasket
} from "../../store/reducers/thunks/devicesThunks";
import {useParams} from "react-router-dom";
import {IDevice} from "../../models/IDevice";
import Modal from "../modals/modal";
import SetDeviceRatingModal from "../modals/setDeviceRatingModal";
import Preloader from "../UI/preloader";

const DevicePage = () => {

    const {id} = useParams()
    const dispatch = useAppDispatch()
    const {currentDevice, error, isFetching, ratedDevicesID} =
        useAppSelector(state => state.devicesReducer)
    const {role} = useAppSelector(state => state.userReducer)
    const {rows} = useAppSelector(state => state.basketReducer)
    const [isRatingModalActive, setIsRatingModalActive] = useState(false)

    const toggleIsRatingModalActive = () => {
        setIsRatingModalActive(!isRatingModalActive)
    }

    const getInfo = (device: IDevice | null) => {
        if (device !== null && device.info !== undefined && device.info.length !== 0) {
            return device.info[0]
        }
        return {title: "No info", description: "No info"}
    }

    const checkIsRated = () => {
        let value = false
        if (id) {
            ratedDevicesID.map(deviceId => {
                if (`${deviceId}` === id) {
                    value = true
                }
            })
        }
        return value
    }

    useEffect(() => {
        if (id !== undefined)
            dispatch(fetchOneDevice(id))
    }, []);

    const addToBasket = (deviceId: number | string) => {
        dispatch(putDeviceToBasket(`${deviceId}`))
    }

    const removeFromBasket = (deviceId: number | string) => {
        dispatch(removeDeviceFromBasket(`${deviceId}`))
    }

    const removeDeviceCallback = (deviceId: number | string) => {
        dispatch(removeDevice(`${deviceId}`))
    }

    const checkIsDeviceInBasket = (deviceId: string) => {
        let value = false
        rows.map(row => {
            if (`${row.id}` === deviceId) {
                return value = true
            }
        })
        return value
    }

    if (isFetching) {
        return <Preloader/>
    }

    if (error || currentDevice === null) {
        return <h1>{error}</h1>
    }

    return (
            <div>
                <div>{currentDevice.name}</div>
                <div>{currentDevice.brandName}</div>
                <div>{currentDevice.typeName}</div>
                <div>{currentDevice.rating}</div>
                <div>{currentDevice.price}</div>
                <img style={{display: "block", width: "150px", height: "150px"}}
                     src={import.meta.env.VITE_REACT_APP_API_URL + currentDevice.img} alt="#"/>
                <div>{getInfo(currentDevice).title}</div>
                <div>{getInfo(currentDevice).description}</div>

                {checkIsRated() ?
                    <button onClick={toggleIsRatingModalActive}>
                        Изменить рейтинг
                    </button>
                    :
                    <button onClick={toggleIsRatingModalActive}>
                        Выставить рейтинг
                    </button>
                }

                {id && (checkIsDeviceInBasket(id) ?
                    <button onClick={() => removeFromBasket(id)}>Удалить из корзины</button>
                    :
                    <button onClick={() => addToBasket(id)}>Добавить в корзину</button>)
                }
                {id && role === "ADMIN" && <button onClick={() => removeDeviceCallback(id)}>Удалить девайс</button>}
                <Modal isActive={isRatingModalActive}
                       deactivate={toggleIsRatingModalActive}
                       children={<SetDeviceRatingModal isRated={checkIsRated()}/>}/>
            </div>
    );
};

export default DevicePage;