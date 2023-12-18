import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {useEffect} from "react";
import {fetchAllDevices} from "../../store/reducers/thunks/devicesThunks";
import DeviceBox from "../UI/deviceBox";
import styles from "./shop.module.css";
import Select, {OnChangeValue, SingleValue} from "react-select";
import {arrayToOptions} from "../../utils/transformArrayToOpions";
import {IOption} from "../../models/ISelectOptions";

function Shop() {
    const {rows, isFetching, error, brands, types, count}
        = useAppSelector(state => state.devicesReducer)
    const dispatch = useAppDispatch()

    const limitOptions: IOption[] = [{value: 18, label: "18"}, {value: 9, label: "9"}]

    const [selectedBrand, setSelectedBrand] =
        useState<IOption | null>(null)
    const [selectedType, setSelectedType] =
        useState<IOption | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState<IOption>(limitOptions[1])

    const brandChangeHandler = (newValue: SingleValue<IOption>) => {
        setSelectedBrand(newValue)
    }

    const typeChangeHandler = (newValue: SingleValue<IOption>) => {
        setSelectedType(newValue)
    }

    const limitChangeHandler = (newValue: OnChangeValue<IOption, any>) => {
        setLimit(newValue as IOption)
    }

    const clickHandler = () => {
        dispatch(fetchAllDevices(
            {page: currentPage, limit: limit.value, typeId: selectedType?.value, brandId: selectedBrand?.value}
        ))
    }

    const changePageHandler = (e: React.MouseEvent<HTMLElement>) => {
        if (e.currentTarget.id === "1") {
            setCurrentPage(currentPage - 1)
            dispatch(fetchAllDevices(
                {
                    page: currentPage - 1, limit: limit.value,
                    typeId: selectedType?.value, brandId: selectedBrand?.value
                }
            ))
        }
        if (e.currentTarget.id === "2") {
            setCurrentPage(currentPage + 1)
            dispatch(fetchAllDevices(
                {
                    page: currentPage + 1, limit: limit.value,
                    typeId: selectedType?.value, brandId: selectedBrand?.value
                }
            ))
        }
    }

    useEffect(() => {
        dispatch(fetchAllDevices({page: currentPage, limit: limit.value}))
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
            <div style={{display: "flex", width: "100%", height: "fit-content"}}>
                <Select options={arrayToOptions(brands)} value={selectedBrand} onChange={brandChangeHandler}/>
                <Select options={arrayToOptions(types)} value={selectedType} onChange={typeChangeHandler}/>
                <Select options={limitOptions}
                        value={limit}
                        onChange={limitChangeHandler}/>
                <button onClick={clickHandler}>Поиск</button>
            </div>
            {deviceBoxes}
            <div style={{display: "flex", width: "100%", height: "fit-content"}}>
                <button id="1"
                        onClick={(e) => changePageHandler(e)}
                        style={currentPage === 1 ? {display: "none"} : {display: "block"}}>
                    Назад
                </button>
                <button id="2"
                        onClick={(e) => changePageHandler(e)}
                        style={count / limit.value >= currentPage ? {display: "block"} : {display: "none"}}>
                    Далее
                </button>
            </div>
        </div>
    );
}

export default Shop;
