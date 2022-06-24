import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import reportWebVitals from "./reportWebVitals";
import "./lux.min.css";
//import "./simplex.min.css";
//import "./ma3lsh.min.css";
import { Provider } from "react-redux";
import store from "./store";

axios.defaults.baseURL = "http://localhost:5000/";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
