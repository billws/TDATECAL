import React, { useState } from "react";
import TDate from "./components/date";
import TMonth from "./components/month";
import TYear from "./components/year";
import { ViewType } from "./utils/calendar";
import PropTypes from "prop-types";

const today = new Date();

function DisplayTemplate(viewState, changeViewState, selectedDate, setSelectedDate) {
    switch (viewState.viewState) {
        case ViewType.Date:
            return <TDate viewState={viewState} changeViewState={changeViewState} selectedDate={selectedDate} setSelectedDate={setSelectedDate}></TDate>;
        case ViewType.Month:
            return <TMonth viewState={viewState} changeViewState={changeViewState} selectedDate={selectedDate}></TMonth>;
        case ViewType.Year:
            return <TYear viewState={viewState} selectedDate={selectedDate}></TYear>;
        default:
            return null;
    }
}


DisplayTemplate.propTypes = {
    viewState: PropTypes.object,
    changeViewState: PropTypes.func,
    selectedDate: PropTypes.instanceOf(Date),
    setSelectedDate: PropTypes.func
}


const TDATECAL = () => {
    const [viewState, setViewState] = useState({viewState: ViewType.Date, month: today.getMonth() + 1, year: today.getFullYear()});
    const [selectedDate, setSelectedDate] = useState(today);
    
    return (
        <div className="calendar-wrapper">
            {console.log("render")}
            {DisplayTemplate(viewState, setViewState, selectedDate, setSelectedDate)}
        </div>
    );
};




export default TDATECAL;