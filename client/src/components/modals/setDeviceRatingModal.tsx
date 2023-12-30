import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {getIsDeviceRated, setDeviceRating} from "../../store/reducers/thunks/devicesThunks";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import styles from "./modal.module.scss"

type Input = { rating: number }
const SetDeviceRatingModal = (props: { isRated: boolean }) => {

    const dispatch = useAppDispatch()
    const {isFetching} = useAppSelector(state => state.devicesReducer)

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<Input>()

    const {id} = useParams()

    const onSubmit: SubmitHandler<Input> = async (data) => {
        if (id) {
            await dispatch(setDeviceRating({deviceId: id, rate: data.rating, isRated: props.isRated}))
            dispatch(getIsDeviceRated(parseInt(id)))
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {props.isRated ? <h2 className={styles.header}>Изменить рейтинг</h2> : <h2>Выставть рейтинг</h2>}

            <input className={`${styles.input} ${errors.rating && styles.inputError}`} type="number"
                   placeholder=" " {...register("rating", {
                required: "Поле не заполнено",
                max: {value: 10, message: "Максимальная оценка 10"},
                min: {value: 0, message: "Минимальная оценка 0"}
            })}/>
            <p>{errors?.rating?.message}</p>

            <button className={styles.submitButton} disabled={isFetching} type="submit">Принять</button>
        </form>
    );
};

export default SetDeviceRatingModal;