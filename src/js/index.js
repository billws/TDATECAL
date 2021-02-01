import React from "react";
import ReactDOM from "react-dom";
import "../scss/index.scss";
import TDATECAL from "./calendar/index";

ReactDOM.render(
    <React.StrictMode>
        <TDATECAL />
    </React.StrictMode>,
    document.getElementById("Calendar")
);