import React from 'react';
import styles from "../../app.module.css"
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {useNavigate} from "react-router-dom";
import {userSlice} from "../../store/reducers/UserSlice";
import {LOGIN_ROUTE} from "../../utils/consts";

const Header = () => {

    const {isAuth} = useAppSelector(state => state.userReducer)
    const {logout} = userSlice.actions
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const clickHandler = (isLogined: boolean) => {
        if (isLogined) {
            dispatch(logout())
            navigate(LOGIN_ROUTE)
        } else {
            navigate(LOGIN_ROUTE)
        }
    }

    return (
        <header className={styles.header}>
            {isAuth ? <button onClick={() =>
                clickHandler(isAuth)}>Выйти</button> : <button onClick={() => clickHandler(isAuth)}>Войти</button>}
        </header>
    );
};

export default Header;