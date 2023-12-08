import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {fetchOneDevice} from "../../store/reducers/thunks/devicesThunks";
import {useParams} from "react-router-dom";
import {IDevice} from "../../models/IDevice";

const DevicePage = () => {

    const {id} = useParams()
    const dispatch = useAppDispatch()
    const {currentDevice, error, isFetching} =
        useAppSelector(state => state.devicesReducer)

    const getInfo = (device: IDevice | null) => {
        if (device !== null && device.info !== undefined && device.info.length !== 0) {
            return device.info[0]
        }
        return {title: "No info", description: "No info"}
    }

    useEffect(() => {
        if (id !== undefined)
            dispatch(fetchOneDevice(id))
    }, []);

    if (isFetching) {
        return <h1>Loading</h1>
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
        </div>
    );
};

export default DevicePage;