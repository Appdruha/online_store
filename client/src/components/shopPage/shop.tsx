import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {useEffect} from "react";
import {fetchAllDevices} from "../../store/reducers/thunks/devicesThunks";
import styles from "./shop.module.scss";
import Select, {OnChangeValue, SingleValue} from "react-select";
import {arrayToOptions} from "../../utils/transformArrayToOpions";
import {IOption} from "../../models/ISelectOptions";
import DeviceBoxesBlock from "../UI/deviceBox/deviceBoxesBlock";
import Preloader from "../UI/preloader";
import NavButtons from "../UI/navButtons/navButtons";

const Shop = () => {
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

    const setNewDevices = () => {
        dispatch(fetchAllDevices(
            {page: currentPage, limit: limit.value, typeId: selectedType?.value, brandId: selectedBrand?.value}
        ))
    }

    useEffect(() => {
        dispatch(fetchAllDevices(
            {page: currentPage, limit: limit.value, typeId: selectedType?.value, brandId: selectedBrand?.value}))
    }, [currentPage]);

    return (
        <div className={styles.container}>
            {error && <h1>{error}</h1>}
            {isFetching && <Preloader/>}
            <div className={styles.selectBox}>
                <Select className={styles.select} options={arrayToOptions(brands)} value={selectedBrand}
                        onChange={brandChangeHandler}/>
                <Select className={styles.select} options={arrayToOptions(types)} value={selectedType}
                        onChange={typeChangeHandler}/>
                <Select className={styles.select} options={limitOptions}
                        value={limit}
                        onChange={limitChangeHandler}/>
                <button disabled={isFetching} className={styles.selectButton} onClick={setNewDevices}>Поиск</button>
            </div>
            <DeviceBoxesBlock rows={rows} types={types} brands={brands}/>
            <NavButtons count={count} limit={limit.value} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
    );
}

export default Shop;
