import React from "react";
import styles from "./app.module.css"
import RootRouter from "./components/rootRouter";
import Navbar from "./components/navbar/navbar";

function App() {

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
