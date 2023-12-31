import React from 'react';
import styles from "./header.module.scss"
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {useNavigate} from "react-router-dom";
import {userSlice} from "../../store/reducers/UserSlice";
import {LOGIN_ROUTE} from "../../utils/consts";

const Header = (props: { toggleMenuIsOpen: (arg: boolean) => void, menuIsOpen: boolean }) => {

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
            <div className={`${styles.burgerMenu} ${props.menuIsOpen && "!border-0"}`}
                 onClick={() => props.toggleMenuIsOpen(!props.menuIsOpen)}>
                <div className={`${props.menuIsOpen ? styles.burgerMenu_active : styles.burgerMenu_notActive}`}>+</div>
            </div>
            {isAuth ? <button className={styles.button} onClick={() =>
                    clickHandler(isAuth)}>Выйти</button> :
                <button className={styles.button} onClick={() => clickHandler(isAuth)}>Войти</button>}
        </header>
    );
};

export default Header;