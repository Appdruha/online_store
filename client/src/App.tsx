import React, {useEffect} from "react";
import styles from "./app.module.css"
import RootRouter from "./components/rootRouter";
import Navbar from "./components/navbar/navbar";
import {useAppDispatch} from "./hooks/redux-hooks";
import {userSlice} from "./store/reducers/UserSlice";

function App() {

    const dispatch = useAppDispatch()
    const {checkAuth} = userSlice.actions

    useEffect(() => {
        dispatch(checkAuth())
    }, []);

    return (
        <div className={styles.appBody}>
            <header className={styles.header}>
                <button>Выйти</button>
            </header>
            <main className={styles.main}>
                <Navbar/>
                <RootRouter/>
            </main>
        </div>
    );
}

export default App;
