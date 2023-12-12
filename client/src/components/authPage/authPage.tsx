import React from 'react';
import {useForm, SubmitHandler} from "react-hook-form"
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import {authentification} from "../../store/reducers/thunks/userThunks";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";

type Inputs = {
    email: string;
    password: string;
    confirmPassword: string;
    rememberMe: boolean;
    roleKey?: string;
}

const AuthPage = () => {

    const navigate = useNavigate()
    const {isFetching, isAuth} =
        useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const {pathname} = useLocation()
    const isLogin: boolean = pathname === LOGIN_ROUTE

    if (isAuth) {
        navigate(SHOP_ROUTE)
    }

    const {
        register,
        handleSubmit,
        getValues,
        formState: {errors}
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        let endpoint: string
        isLogin ? endpoint = "login" : endpoint = "registration"
        try {
            const {email, password, rememberMe, roleKey} = data
            await dispatch(authentification({email, password, endpoint, rememberMe, roleKey}))
        } catch (e: any) {
            alert(e.message)
        }
    }

    if (isFetching) {
        return <h1>Loading</h1>
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {isLogin ? <h2>Вход</h2> : <h2>Регистрация</h2>}

            <div>
                <input placeholder=" " {...register("email", {
                    required: "Поле не зполнено",
                    pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, message: "Некорректный email"}
                })}/>
                {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
                <input type="password" placeholder=" " {...register("password", {
                    required: "Поле не зполнено",
                    minLength: {value: 8, message: "Минимум 8 символов"}
                })}/>
                {errors.password && <p>{errors.password.message}</p>}
            </div>

            {!isLogin ?
                <>
                    <div>
                        <input type="password" placeholder=" " {...register("confirmPassword", {
                            required: "Поле не зполнено",
                            validate: (match) => {
                                const password = getValues("password")
                                return match === password || "Пароли не совпадают"
                            }
                        })}/>
                        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                    </div>

                    <div>
                        <input placeholder=" " {...register("roleKey")}/>
                    </div>
                </>
                : null
            }

            {isLogin ?
                <div>
                    Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегисрируйтесь!</NavLink>
                </div>
                :
                <div>
                    Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                </div>
            }

            <input type="checkbox" {...register("rememberMe")}/>

            <button type="submit">Принять</button>
        </form>
    );
};

export default AuthPage;