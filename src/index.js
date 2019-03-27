import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import {BrowserRouter} from 'react-router-dom';
import "./style/reset.scss";
import "./style/general-css-classes.scss";
import axios from "axios";


ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.querySelector("#root")
);


axios.interceptors.request.use(config => {

    config.headers = {
        ...config.headers, ...{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':"*",
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        }
    };
    return config;
});