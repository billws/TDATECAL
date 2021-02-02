import React from "react";
import ReactDOM from "react-dom";
import "../scss/index.scss";
import TDATECAL from "./calendar/index";
import Picker from "./input";

ReactDOM.render(
    <React.StrictMode>
        <TDATECAL display={true}/>
    </React.StrictMode>,
    document.getElementById("Calendar")
);



ReactDOM.render(
    <React.StrictMode>
        <Picker />
    </React.StrictMode>,
    document.getElementById("CalendarInput")
);