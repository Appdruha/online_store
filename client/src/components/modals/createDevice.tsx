import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {useForm, FormProvider, SubmitHandler} from "react-hook-form";
import {IOption} from "../../models/ISelectOptions";
import ControlledSelect from "../UI/selects/controlledSelect";
import CreateDeviceFormInput from "../UI/createDevice.formInput";
import CreateDeviceTextarea from "../UI/createDevice.textarea";
import {createDevice} from "../../store/reducers/thunks/devicesThunks";
import {arrayToOptions} from "../../utils/transformArrayToOpions";
import {IDeviceInfo} from "../../models/IDevice";
import styles from "./modal.module.scss"
import Preloader from "../UI/preloader";
import CreateDeviceFileInput from "../UI/createDevice.fileInput";

type Inputs = {
    name: string,
    price: number,
    title: string,
    description: string,
    img: FileList,
    brand: IOption,
    type: IOption,
}

interface ICreateDeviceData {
    name: string;
    price: number;
    info: IDeviceInfo;
    img: File;
    brandId: number | string;
    typeId: number | string;
}

const CreateDevice = () => {

    const dispatch = useAppDispatch()
    const {brands, types, isFetching} =
        useAppSelector(state => state.devicesReducer)

    const methods = useForm<Inputs>()

    const {
        handleSubmit,
        formState: {errors}
    } = methods

    const createFormData = (obj: ICreateDeviceData): FormData => {
        const formData = new FormData()
        Object.entries(obj).forEach(([key, value]) => {
            if (typeof value === "string" || typeof value === "number") {
                formData.append(key, `${value}`)
            } else if (value instanceof File) {
                formData.append(key, value)
            } else if ("title" in value && "description" in value && Object.keys(value).length === 2) {
                formData.append(key, JSON.stringify(value))
            }
        })
        return formData
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const typeId = data.type.value
        const brandId = data.brand.value
        const img = data.img[0]
        const {name, price, title, description} = data
        const info = {title, description}
        dispatch(createDevice(createFormData({typeId, brandId, img, name, price, info})))
    }

    return (
        <FormProvider {...methods}>
            {isFetching && <Preloader/>}
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h2 className={styles.header}>Создать девайс</h2>

                <CreateDeviceFormInput name={"name"} label={"Название"} type={"text"}/>
                <p>{errors.name?.message}</p>

                <ControlledSelect name={"brand"} label={"Брэнд"} options={arrayToOptions(brands)}/>
                <p>{errors.brand?.message}</p>

                <ControlledSelect name={"type"} label={"Тип"} options={arrayToOptions(types)}/>
                <p>{errors.type?.message}</p>

                <CreateDeviceFormInput name={"price"} label={"Цена"} type={"number"}/>
                <p>{errors.price?.message}</p>

                <CreateDeviceTextarea name={"title"} label={"Заголовок"}/>
                <p>{errors.title?.message}</p>

                <CreateDeviceTextarea name={"description"} label={"Описание"}/>
                <p>{errors.description?.message}</p>

                <CreateDeviceFileInput name={"img"} id={"file"}/>
                <p>{errors.img?.message}</p>

                <button className={styles.submitButton} type="submit">Создать</button>
            </form>
        </FormProvider>
    );
};

export default CreateDevice;