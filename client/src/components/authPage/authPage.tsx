import React from 'react';
import {useForm, SubmitHandler} from "react-hook-form"

type Inputs = {
    email: string;
    password: string;
}

const AuthPage = () => {

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" placeholder=" " {...register("email", {
                required: "Поле не зполнено",
                pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, message: "Некорректный email"}
            })}/>
            {errors.email && <p>{errors.email.message}</p>}

            <input placeholder=" " {...register("password", {required: "Поле не зполнено"})}/>
            {errors.password && <p>{errors.password.message}</p>}

            <button type="submit">Принять</button>
        </form>
    );
};

export default AuthPage;