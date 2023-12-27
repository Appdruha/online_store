import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import App from "./App";
import {setupStore} from "./store/store";
import {BrowserRouter} from "react-router-dom";
import './index.css'

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
