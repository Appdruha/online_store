import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {useEffect} from "react";
import {fetchAllDevices} from "../../store/reducers/thunks/devicesThunks";
import DeviceBox from "../UI/deviceBox";
import styles from "./shop.module.css";
import Select, {SingleValue} from "react-select";
import {arrayToOptions} from "../../utils/transformArrayToOpions";
import {IOption} from "../../models/ISelectOptions";

function Shop() {
    const {rows, isFetching, error, brands, types, count}
        = useAppSelector(state => state.devicesReducer)
    const dispatch = useAppDispatch()

    const [selectedBrand, setSelectedBrand] =
        useState<IOption | null>(null)
    const [selectedType, setSelectedType] =
        useState<IOption | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(9)

    const brandChangeHandler = (newValue: SingleValue<IOption>) => {
        setSelectedBrand(newValue)
    }

    const typeChangeHandler = (newValue: SingleValue<IOption>) => {
        setSelectedType(newValue)
    }

    const clickHandler = () => {
        dispatch(fetchAllDevices(
            {page: currentPage, limit: limit, typeId: selectedType?.value, brandId: selectedBrand?.value}
        ))
    }

    const changePageHandler = (e: React.MouseEvent<HTMLElement>) => {
        if (e.currentTarget.id === "1") {
            setCurrentPage(currentPage - 1)
            dispatch(fetchAllDevices(
                {page: currentPage - 1, limit: limit, typeId: selectedType?.value, brandId: selectedBrand?.value}
            ))
        }
        if (e.currentTarget.id === "2") {
            setCurrentPage(currentPage + 1)
            dispatch(fetchAllDevices(
                {page: currentPage + 1, limit: limit, typeId: selectedType?.value, brandId: selectedBrand?.value}
            ))
        }
    }

    useEffect(() => {
        dispatch(fetchAllDevices({page: currentPage, limit: limit}))
    }, []);

    const deviceBoxes = rows.map(
        row => <DeviceBox
            key={row.id}
            id={row.id}
            name={row.name}
            price={row.price}
            rating={row.rating}
            brandId={row.brandId}
            typeId={row.typeId}
            img={row.img}
            brandName={row.brandName}
            typeName={row.typeName}
        />
    )

    return (
        <div className={styles.container}>
            {error && <h1>{error}</h1>}
            {isFetching && <h1>Loading</h1>}
            <div>
                <Select options={arrayToOptions(brands)} value={selectedBrand} onChange={brandChangeHandler}/>
                <Select options={arrayToOptions(types)} value={selectedType} onChange={typeChangeHandler}/>
                <button onClick={clickHandler}>Поиск</button>
            </div>
            {deviceBoxes}
            <div>
                <button id="1"
                        onClick={(e) => changePageHandler(e)}
                        style={currentPage === 1 ? {display: "none"} : {display: "block"}}>
                    Назад
                </button>
                <button id="2"
                        onClick={(e) => changePageHandler(e)}
                        style={count / limit >= currentPage ? {display: "block"} : {display: "none"}}>
                    Далее
                </button>
            </div>
        </div>
    );
}

export default Shop;
