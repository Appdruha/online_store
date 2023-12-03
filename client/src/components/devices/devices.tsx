import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {useEffect} from "react";
import {fetchDevices} from "../../store/reducers/thunks/devicesThunks";
import DeviceBox from "./deviceBox";

function Devices() {
    const {rows, isFetching, error}
        = useAppSelector(state => state.devicesReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchDevices())
    }, []);

    const deviceBoxes = rows.map(
        row => <DeviceBox
            id={row.id}
            name={row.name}
            price={row.price}
            rating={row.rating}
            typeId={row.typeId}
            brandId={row.brandId}
            img={row.img}
        />
    )

    return (
        <div>
            {error && <h1>{error}</h1>}
            {isFetching && <h1>Loading</h1>}
            {deviceBoxes}
        </div>
    );
}

export default Devices;
