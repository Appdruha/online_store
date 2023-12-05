import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {fetchOneDevice} from "../../store/reducers/thunks/devicesThunks";
import {useParams} from "react-router-dom";

const DevicePage = () => {

    const {id} = useParams()
    const dispatch = useAppDispatch()
    const {currentDevice, error, isFetching} =
        useAppSelector(state => state.devicesReducer)

    useEffect(() => {
        if (id !== undefined)
            dispatch(fetchOneDevice(id))
    }, []);

    return (
        <>
            {error && <h1>{error}</h1>}
            {isFetching && <h1>Loading</h1>}
            {currentDevice !== null && currentDevice.info !== undefined &&
                currentDevice.info[0] && <div>{currentDevice.info[0].title}</div> || <h1>No info</h1>}
        </>
    );
};

export default DevicePage;