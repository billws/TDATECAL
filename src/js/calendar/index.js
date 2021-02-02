import React, { useState, useEffect } from "react";
import TDate from "./components/date";
import TMonth from "./components/month";
import TYear from "./components/year";
import { ViewType } from "./utils/calendar";
import PropTypes from "prop-types";

const today = new Date();

function DisplayTemplate (viewState, changeViewState, selectedDate, setSelectedDate) {
    switch (viewState.viewState) {
        case ViewType.Date:
            return <TDate viewState={viewState} changeViewState={changeViewState} selectedDate={selectedDate} setSelectedDate={setSelectedDate}></TDate>;
        case ViewType.Month:
            return <TMonth viewState={viewState} changeViewState={changeViewState} selectedDate={selectedDate}></TMonth>;
        case ViewType.Year:
            return <TYear viewState={viewState} changeViewState={changeViewState} selectedDate={selectedDate}></TYear>;
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



const TDATECAL = ({ date, onSelected, display }) => {
    const [viewState, setViewState] = useState({ viewState: ViewType.Date, month: (date || today).getMonth() + 1, year: (date || today).getFullYear() });
    const [selectedDate, setSelectedDate] = useState(null);
    
    useEffect(() => {
        if (onSelected && typeof onSelected === "function" && selectedDate && Object.prototype.toString.call(selectedDate) === '[object Date]') {
            onSelected(selectedDate);
        }
    }, [selectedDate]);

    return (display ? (
        <div className="calendar-wrapper">
            {DisplayTemplate(viewState, setViewState, (date || selectedDate), setSelectedDate)}
        </div>
    ) : null);
}

TDATECAL.propTypes = {
    date: PropTypes.instanceOf(Date),
    onSelected: PropTypes.func,
    display: PropTypes.bool,
}



export default TDATECAL;