import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import AppRoutes from "./routes/AppRoutes";

import * as serviceWorker from "./serviceWorker";
import configureStore from "./redux/store";

const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppRoutes />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
