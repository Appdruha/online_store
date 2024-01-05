import React, {useEffect, useState} from "react";
import styles from "./app.module.scss"
import RootRouter from "./components/rootRouter";
import Navbar from "./components/navbar/navbar";
import {useAppDispatch} from "./hooks/redux-hooks";
import Header from "./components/header/header";
import {reauthentication} from "./store/reducers/thunks/userThunks";
import Cookies from "universal-cookie";
import {jwtDecode} from "jwt-decode";
import {IDecodedToken} from "./models/IAuth";
import {fetchBrandsAndTypes} from "./store/reducers/thunks/devicesThunks";

function App() {

    const dispatch = useAppDispatch()

    const checkExpirationDate = () => {
        try {
            const token = localStorage.getItem("token")
            if (!token) {
                return
            }

            const decodedToken: IDecodedToken = jwtDecode(token)

            if (decodedToken.exp <= Date.now() / 1000) {
                const cookies = new Cookies()
                const refreshToken: string | undefined = cookies.get("refreshToken")
                if (!refreshToken) {
                    return
                }
                return dispatch(reauthentication(refreshToken))
            } else {
                return dispatch(reauthentication())
            }
        } catch (e: any) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        checkExpirationDate()
        dispatch(fetchBrandsAndTypes())
    }, []);

    const [menuIsOpen, setMenuIsOpen] = useState(false)

    return (
        <div className={styles.appBody}>
            <Header toggleMenuIsOpen={setMenuIsOpen} menuIsOpen={menuIsOpen}/>
            <main className={styles.main}>
                <Navbar menuIsOpen={menuIsOpen}/>
                <RootRouter/>
            </main>
        </div>
    );
}

export default App;
