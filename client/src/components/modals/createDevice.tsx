import React from 'react';
import {useAppSelector} from "../../hooks/redux-hooks";
import {useForm, Controller} from "react-hook-form";
import Select from "react-select/base";

interface ISelectFields {
    brand: {value: string, label: string};
    type: {value: string, label: string};
}

type Inputs = {
    name: string,
    price: string,
    title: string,
    description: string,
    img: string

}

const CreateDevice = () => {

    const {brands, types, error, isFetching} =
        useAppSelector(state => state.devicesReducer)

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<Inputs>()

    return (
        <form>
            <h2>Создать девайс</h2>

            <div>
                <label htmlFor="name">Название</label>
                <input type="text" placeholder=" " {...register("name", {
                    required: "Поле не заполнено",
                })}/>
                {errors.name && <p>{errors.name.message}</p>}
            </div>

        </form>
    );
};

export default CreateDevice;