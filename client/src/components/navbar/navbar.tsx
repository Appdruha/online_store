import React from 'react';
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import styles from "./navbar.module.css";

const Navbar = () => {
    return (
        <nav className={styles.menu}>
            <ol>
                <li><NavLink to={SHOP_ROUTE}>Главная</NavLink></li>
                <li><NavLink to={LOGIN_ROUTE}>войти</NavLink></li>
                <li>Корзина</li>
            </ol>
        </nav>
    );
};

export default Navbar;