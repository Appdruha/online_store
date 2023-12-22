import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {setDeviceRating} from "../../store/reducers/thunks/devicesThunks";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux-hooks";

type Input = { rating: number }
const SetDeviceRatingModal = (props: {isRated: boolean}) => {

    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<Input>()

    const {id} = useParams()

    const onSubmit: SubmitHandler<Input> = async (data) => {
        if (id) {
            dispatch(setDeviceRating({deviceId: id, rate: data.rating, isRated: props.isRated}))
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {props.isRated ? <h2>Изменить рейтинг</h2> : <h2>Выставть рейтинг</h2>}

            <div>
                <input type="number" placeholder=" " {...register("rating", {
                    required: "Поле не заполнено",
                    max: {value: 10, message: "Максимальная оценка 10"},
                    min: {value: 0, message: "Минимальная оценка 0"}
                })}/>
                <p>{errors?.rating?.message}</p>
            </div>

            <button type="submit">Принять</button>
        </form>
    );
};

export default SetDeviceRatingModal;