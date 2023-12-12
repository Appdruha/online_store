import React, {useEffect} from "react";
import styles from "./app.module.css"
import RootRouter from "./components/rootRouter";
import Navbar from "./components/navbar/navbar";
import {useAppDispatch} from "./hooks/redux-hooks";
import Header from "./components/header/header";
import {reauthentication} from "./store/reducers/thunks/userThunks";
import Cookies from "universal-cookie";
import {jwtDecode} from "jwt-decode";
import {IDecodedToken} from "./models/IAuth";

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
