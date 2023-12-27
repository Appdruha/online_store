import React from 'react';
import {useForm, SubmitHandler} from "react-hook-form"
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import {authentification} from "../../store/reducers/thunks/userThunks";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import Preloader from "../UI/preloader";
import styles from "./auth.module.scss"

type Inputs = {
    email: string;
    password: string;
    confirmPassword: string;
    rememberMe: boolean;
    roleKey?: string;
}

const AuthPage = () => {

    const navigate = useNavigate()
    const {isFetching, isAuth, error} =
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
            await dispatch(authentification({...data, endpoint}))
        } catch (e: any) {
            alert(e.message)
        }
    }

    if (isFetching) {
        return <Preloader/>
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

                {isLogin ? <h2>Вход</h2> : <h2>Регистрация</h2>}

                <div className={styles.inputContainer}>
                    <input className={styles.input} placeholder=" " {...register("email", {
                        required: "Поле не зполнено",
                        pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, message: "Некорректный email"},
                    })}/>
                    <label htmlFor="email" className={`${styles.ph1} ${styles.placeholder}`}>e-mail</label>
                    <p>{errors?.email?.message}</p>
                    {error && <p>{error}</p>}
                </div>

                <div className={styles.inputContainer}>
                    <input className={styles.input} type="password" placeholder=" " {...register("password", {
                        required: "Поле не зполнено",
                        minLength: {value: 8, message: "Минимум 8 символов"}
                    })}/>
                    <label htmlFor="password" className={`${styles.ph2} ${styles.placeholder}`}>Пароль</label>
                    <p>{errors?.password?.message}</p>
                </div>

                {!isLogin ?
                    <>
                        <div className={styles.inputContainer}>
                            <input className={styles.input} type="password"
                                   placeholder=" " {...register("confirmPassword", {
                                required: "Поле не зполнено",
                                validate: (match) => {
                                    const password = getValues("password")
                                    return match === password || "Пароли не совпадают"
                                }
                            })}/>
                            <label htmlFor="password" className={`${styles.ph3} ${styles.placeholder}`}>Подтвердите
                                пароль</label>
                            <p>{errors?.confirmPassword?.message}</p>
                        </div>

                        <div className={styles.inputContainer}>
                            <input className={styles.input} placeholder=" " {...register("roleKey")}/>
                            <label htmlFor="roleKey" className={`${styles.ph4} ${styles.placeholder}`}>Ключ
                                администратора</label>
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

                <div>
                    <input type="checkbox" {...register("rememberMe")}/>
                    <label htmlFor="rememberMe">Запомнить меня</label>
                </div>

                <button type="submit">Принять</button>
            </form>
        </div>
    );
};

export default AuthPage;