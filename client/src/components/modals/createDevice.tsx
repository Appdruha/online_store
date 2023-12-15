import React from 'react';
import {useAppSelector} from "../../hooks/redux-hooks";
import {useForm, FormProvider, SubmitHandler} from "react-hook-form";
import {IBrand, IType} from "../../models/ITypesAndBrands";
import {IOption} from "../../models/ISelectOptions";
import ControlledSelect from "../UI/controlledSelect";
import CreateDeviceFormInput from "../UI/createDevice.formInput";


type Inputs = {
    name: string,
    price: string,
    title: string,
    description: string,
    img: FileList,
    brand: IOption,
    type: IOption,
}

const CreateDevice = () => {

    const {brands, types, error, isFetching} =
        useAppSelector(state => state.devicesReducer)

    const arrayToOptions = (array: IType[] | IBrand[]): IOption[] => {
        return array.map(el => ({value: el.id, label: el.name}))
    }

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
        console.log({typeId, brandId, name, price, title, description, img})
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

                <CreateDeviceFormInput name={"price"} label={"Цена"} type={"text"}/>
                <p>{errors.price?.message}</p>

                <CreateDeviceFormInput name={"img"} label={"Изображение"} type={"file"}/>
                <p>{errors.price?.message}</p>

                <button type="submit">Создать</button>

            </form>
        </FormProvider>
    );
};

export default CreateDevice;