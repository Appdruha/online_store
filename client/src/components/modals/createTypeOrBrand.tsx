import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {IBrand, IType} from "../../models/ITypesAndBrands";
import {addTypeOrBrand} from "../../store/reducers/thunks/devicesThunks";
import styles from "./modal.module.scss"

type Input = { value: string }

const CreateTypeOrBrand = (props: { isBrandModal: boolean }) => {

    const {brands, types} =
        useAppSelector(state => state.devicesReducer)
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<Input>()

    const onSubmit: SubmitHandler<Input> = async (data) => {
        dispatch(addTypeOrBrand({name: data.value, isBrandRequest: props.isBrandModal}))
    }

    const checkIsNameExists = (array: IBrand[] | IType[], name: string) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i].name === name) {
                return true
            }
        }
        return false
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={styles.header}>{`Создать ${props.isBrandModal ? "Брэнд" : "Тип"}`}</h2>

                <input className={styles.input} type="text" placeholder="Название" {...register("value", {
                    required: "Поле не заполнено",
                    validate: (match) => {
                        if (props.isBrandModal) {
                            return !checkIsNameExists(brands, match) || "Такой брэнд уже существует"
                        } else {
                            return !checkIsNameExists(types, match) || "Такой тип уже существует"
                        }
                    }
                })}/>
                {errors.value && <p>{errors.value.message}</p>}

            <button className={styles.submitButton} type="submit">Создать</button>
        </form>
    );
};

export default CreateTypeOrBrand;