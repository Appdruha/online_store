import React from 'react';
import {useForm, SubmitHandler} from "react-hook-form"
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import {authentification} from "../../store/reducers/thunks/userThunks";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import Preloader from "../UI/preloader";
import styles from "./auth.module.scss"
import {userSlice} from "../../store/reducers/UserSlice";

type Inputs = {
    email: string;
    password: string;
    confirmPassword: string;
    rememberMe: boolean;
    roleKey?: string;
}

const AuthPage = () => {

    const navigate = useNavigate()
    const {isFetching, isAuth, error, authErrorType} =
        useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const {removeErrors} = userSlice.actions
    const {pathname} = useLocation()
    const isLogin: boolean = pathname === LOGIN_ROUTE

    if (isAuth) {
        navigate(SHOP_ROUTE)
    }

    const {
        register,
        handleSubmit,
        getValues,
        clearErrors,
        formState: {errors},
    } = useForm<Inputs>({mode: "onBlur"})

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        let endpoint: string
        isLogin ? endpoint = "login" : endpoint = "registration"
        try {
            await dispatch(authentification({...data, endpoint}))
        } catch (e: any) {
            console.log(e.message)
        }
    }

    const clearInputErrors = (name: string) => {
        dispatch(removeErrors())
        clearErrors(name)
    }

    const isDisabled = (errors) => {
        return error || errors.email || errors.password || errors.confirmPassword
    }

    return (
        <>
            {isFetching && Preloader}
            <div className={styles.container}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

                    {isLogin ? <h2>Вход</h2> : <h2>Регистрация</h2>}

                    <div className={styles.inputContainer}>
                        <input onClick={() => clearInputErrors("email")}
                               className={`${styles.input} 
                               ${(authErrorType === "emailError" || errors.email) && styles.error}`}
                               placeholder=" " {...register("email", {
                            required: "Поле не зполнено",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                                message: "Некорректный email"
                            },
                        })}/>
                        <label htmlFor="email" className={`${styles.ph} ${styles.placeholder}`}>e-mail</label>
                    </div>
                    <p>{errors.email?.message}</p>
                    {authErrorType === "emailError" && <p>{error}</p>}

                    <div className={styles.inputContainer}>
                        <input onClick={() => clearInputErrors("password")}
                               className={`${styles.input} 
                               ${(authErrorType === "passwordError" || errors.password) && styles.error}`}
                               type="password" placeholder=" " {...register("password", {
                            required: "Поле не зполнено",
                            minLength: {value: 8, message: "Минимум 8 символов"}
                        })}/>
                        <label htmlFor="password" className={`${styles.ph} ${styles.placeholder}`}>Пароль</label>
                    </div>
                    <p>{errors.password?.message}</p>
                    {authErrorType === "passwordError" && <p>{error}</p>}

                    {!isLogin ?
                        <>
                            <div className={styles.inputContainer}>
                                <input onClick={() => clearInputErrors("confirmPassword")}
                                       className={`${styles.input} ${errors.confirmPassword && styles.error}`}
                                       type="password" placeholder=" " {...register("confirmPassword", {
                                    required: "Поле не зполнено",
                                    validate: (match) => {
                                        const password = getValues("password")
                                        return match === password || "Пароли не совпадают"
                                    }
                                })}/>
                                <label htmlFor="password" className={`${styles.ph} ${styles.placeholder}`}>Подтвердите
                                    пароль</label>
                            </div>
                            <p>{errors.confirmPassword?.message}</p>

                            <div className={styles.inputContainer}>
                                <input className={styles.input} placeholder=" " {...register("roleKey")}/>
                                <label htmlFor="roleKey" className={`${styles.ph} ${styles.placeholder}`}>Ключ
                                    администратора</label>
                            </div>
                        </>
                        : null
                    }

                    <div className={styles.checkboxContainer}>
                        <input type="checkbox" {...register("rememberMe")}/>
                        <label htmlFor="rememberMe">Запомнить меня</label>
                    </div>

                    <button type="submit" className={styles.button} disabled={isDisabled(errors)}>Принять</button>

                    {isLogin ?
                        <div className={styles.chooseFormText}>
                            Нет аккаунта? <NavLink onClick={clearInputErrors}
                                                   to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                        </div>
                        :
                        <div className={styles.chooseFormText}>
                            Есть аккаунт? <NavLink onClick={clearInputErrors} to={LOGIN_ROUTE}>Войдите!</NavLink>
                        </div>
                    }
                </form>
            </div>
        </>
    );
};

export default AuthPage;