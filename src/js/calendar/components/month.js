import React, { useState } from "react";
import { ViewType, MonthsOfYear, MinYear, MaxYear } from "../utils/calendar";
import PropTypes from "prop-types";

const SelectMonth = (month, index, viewState, changeViewState, currentYear, selectedDate) => {
    let className = `calendar-month-${Math.floor(index / 4) + 1}`;
    let displayMonth = month.slice(0, 3);
    if (selectedDate && index === selectedDate.getMonth() && currentYear === selectedDate.getFullYear()) {
        className += " choose-month";
    }
    const monthClick = () => {
        changeViewState({ ...viewState, viewState: ViewType.Date, month: index + 1, year: currentYear });
    }
    return (<li className={className} key={index} onClick={monthClick}>{displayMonth}</li>);
}


SelectMonth.propTypes = {
    month: PropTypes.string,
    selectedDate: PropTypes.instanceOf(Date),
    viewState: PropTypes.object,
    changeViewState: PropTypes.func,
    currentYear: PropTypes.number,
    index: PropTypes.number
}


const TMonth = ({ viewState, changeViewState, selectedDate }) => {
    const [currentYear, setCurrentYear] = useState(viewState.year);
    const titleClick = () => {
        changeViewState({ ...viewState, viewState: ViewType.Year });
    }
    const previousYear = () => {
        if (currentYear - 1 < MinYear) {
            alert("Can not select below 1700s.");
            return;
        }
        setCurrentYear(currentYear => currentYear - 1);
    }
    const nextYear = () => {
        if (currentYear + 1 > MaxYear) {
            alert("Can not select over 2199s.");
            return;
        }
        setCurrentYear(currentYear => currentYear + 1);
    }
    return (
        <>
            <div className="cal-head">
                <span className="cal-head-arrow" onClick={previousYear}><span className="head-arrow left-arrow"></span></span>
                <span className="cal-head-title" onClick={titleClick}>{currentYear}</span>
                <span className="cal-head-arrow" onClick={nextYear}><span className="head-arrow right-arrow"></span></span>
            </div>
            <ol className="calendar-month">
                {MonthsOfYear.map((month, index) => SelectMonth(month, index, viewState, changeViewState, currentYear, selectedDate))}
            </ol>
        </>
    );
};



TMonth.propTypes = {
    selectedDate: PropTypes.instanceOf(Date),
    viewState: PropTypes.object,
    changeViewState: PropTypes.func
}



export default TMonth;