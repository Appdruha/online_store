import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {useForm, FormProvider, SubmitHandler} from "react-hook-form";
import {IBrand, IType} from "../../models/ITypesAndBrands";
import {IOption} from "../../models/ISelectOptions";
import ControlledSelect from "../UI/controlledSelect";
import CreateDeviceFormInput from "../UI/createDevice.formInput";
import CreateDeviceTextarea from "../UI/createDevice.textarea";
import {createDevice} from "../../store/reducers/thunks/devicesThunks";
import {arrayToOptions} from "../../utils/transformArrayToOpions";

type Inputs = {
    name: string,
    price: number,
    title: string,
    description: string,
    img: FileList,
    brand: IOption,
    type: IOption,
}

const CreateDevice = () => {

    const dispatch = useAppDispatch()
    const {brands, types, error, isFetching} =
        useAppSelector(state => state.devicesReducer)

    const methods = useForm<Inputs>()

    const {
        handleSubmit,
        formState: {errors}
    } = methods

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const typeId = data.type.value
        const brandId = data.brand.value
        const img = data.img[0]
        const {name, price, title, description} = data
        const info = {title, description}
        const formData = new FormData()
        formData.append("typeId", `${typeId}`)
        formData.append("brandId", `${brandId}`)
        formData.append("price", `${price}`)
        formData.append("name", name)
        formData.append("info", JSON.stringify(info))
        formData.append("img", img)
        dispatch(createDevice(formData))
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Создать девайс</h2>

                <CreateDeviceFormInput name={"name"} label={"Название"} type={"text"}/>
                <p>{errors.name?.message}</p>

                <ControlledSelect name={"brand"} options={arrayToOptions(brands)}/>
                <p>{errors.brand?.message}</p>

                <ControlledSelect name={"type"} options={arrayToOptions(types)}/>
                <p>{errors.type?.message}</p>

                <CreateDeviceFormInput name={"price"} label={"Цена"} type={"number"}/>
                <p>{errors.price?.message}</p>

                <CreateDeviceFormInput name={"img"} label={"Изображение"} type={"file"}/>
                <p>{errors.price?.message}</p>

                <CreateDeviceTextarea name={"title"} label={"Заголовок"}/>
                <p>{errors.title?.message}</p>

                <CreateDeviceTextarea name={"description"} label={"Описание"}/>
                <p>{errors.description?.message}</p>

                <button type="submit">Создать</button>
            </form>
        </FormProvider>
    );
};

export default CreateDevice;