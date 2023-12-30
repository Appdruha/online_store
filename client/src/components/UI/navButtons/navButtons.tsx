import React from 'react';
import styles from "./navButtons.module.scss";
import {useAppSelector} from "../../../hooks/redux-hooks";

const NavButtons = (props: {
    currentPage: number,
    setCurrentPage: (arg: number) => void,
    count: number,
    limit: number
}) => {

    const {isFetching} = useAppSelector(state => state.userReducer)

    return (
        <div className={styles.paginationBox}>
            <button disabled={isFetching} onClick={() => props.setCurrentPage(props.currentPage - 1)}
                    className={props.currentPage === 1 ? "hidden" : styles.paginationButton}>
                Назад
            </button>
            <button disabled={isFetching} onClick={() => props.setCurrentPage(props.currentPage + 1)}
                    className={props.count / props.limit > props.currentPage ? styles.paginationButton : "hidden"}>
                Далее
            </button>
        </div>
    );
};

export default NavButtons;