import {NavLink, Route, Routes} from "react-router-dom";
import styles from "./app.module.css"
import Devices from "./components/devices/devices";

function App() {

    return (
        <div className={styles.appBody}>
            <header className={styles.header}>
                <nav>
                    <ol>
                        <li><NavLink to="/devices">Главная</NavLink></li>
                        <li>Корзина</li>
                    </ol>
                </nav>
                <button>Выйти</button>
            </header>
            <main>
                <Routes>
                    <Route path="/devices" element={<Devices/>}></Route>
                </Routes>
            </main>
        </div>
    );
}

export default App;
