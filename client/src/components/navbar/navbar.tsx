import React from 'react';
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import styles from "./navbar.module.css";

const Navbar = () => {
    return (
        <nav className={styles.menu}>
            <ol>
                <li><NavLink to={SHOP_ROUTE}>Главная</NavLink></li>
                <li><NavLink to={BASKET_ROUTE}>Корзина</NavLink></li>
                <li><NavLink to={ADMIN_ROUTE}>Панель администратора</NavLink></li>
            </ol>
        </nav>
    );
};

export default Navbar;