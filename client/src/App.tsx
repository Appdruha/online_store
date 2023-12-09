import React, {useEffect} from "react";
import styles from "./app.module.css"
import RootRouter from "./components/rootRouter";
import Navbar from "./components/navbar/navbar";
import {useAppDispatch} from "./hooks/redux-hooks";
import {userSlice} from "./store/reducers/UserSlice";
import Header from "./components/header/header";

function App() {

    const dispatch = useAppDispatch()
    const {checkAuth} = userSlice.actions

    useEffect(() => {
        dispatch(checkAuth())
    }, []);

    return (
        <div className={styles.appBody}>
            <Header/>
            <main className={styles.main}>
                <Navbar/>
                <RootRouter/>
            </main>
        </div>
    );
}

export default App;
