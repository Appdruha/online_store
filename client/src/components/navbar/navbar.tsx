import React from 'react';
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import styles from "./navbar.module.scss";
import {useAppSelector} from "../../hooks/redux-hooks";

const Navbar = () => {

    const {role} = useAppSelector(state => state.userReducer)

    const getMenuPartWidth = (userRole) => {
        if (userRole === "ADMIN") {
            return "w-1/3"
        }
        return "w-1/2"
    }

    return (
        <nav className={styles.menu}>
            <ol>
                <li className={getMenuPartWidth(role)}><NavLink to={SHOP_ROUTE}>Главная</NavLink></li>
                <li className={getMenuPartWidth(role)}><NavLink to={BASKET_ROUTE}>Корзина</NavLink></li>
                {role === "ADMIN" &&
                    <li className={getMenuPartWidth(role)}><NavLink to={ADMIN_ROUTE}>Панель администратора</NavLink>
                    </li>}
            </ol>
        </nav>
    );
};

export default Navbar;