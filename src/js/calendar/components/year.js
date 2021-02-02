import React, { useState } from "react";
import { ViewType, MinYear, MaxYear, DecadeNumber } from "../utils/calendar";
import PropTypes from "prop-types";


const SelectYear = ({ index, viewState, changeViewState, currentYear, selectedDate, isOutside }) => {
    let className = `calendar-month-${Math.floor(index / 4) + 1}`;
    if (isOutside) {
        className += " outside";
    } else if (selectedDate && currentYear === selectedDate.getFullYear()) {
        className += " choose-month";
    }

    const yearClick = () => {
        if (currentYear < MinYear || currentYear > MaxYear) {
            return;
        }
        changeViewState({ ...viewState, viewState: ViewType.Month, year: currentYear });
    }
    return (<li className={className} key={index} onClick={yearClick}>{currentYear}</li>);
}


SelectYear.propTypes = {
    selectedDate: PropTypes.instanceOf(Date),
    viewState: PropTypes.object,
    changeViewState: PropTypes.func,
    currentYear: PropTypes.number,
    index: PropTypes.number,
    isOutside: PropTypes.bool
}

const GetDecadeRange = currentYear => Math.floor(currentYear / DecadeNumber);

function MapDisplayYear(currentYear, viewState, changeViewState, selectedDate) {
    let result = [];

    let decade = GetDecadeRange(currentYear);
    result.push(<SelectYear index={0} viewState={viewState} changeViewState={changeViewState} currentYear={(decade * DecadeNumber - 1)} selectedDate={selectedDate} isOutside={true}></SelectYear>);
    for (let i = 0; i < DecadeNumber; i++) {
        result.push(<SelectYear index={i + 1} viewState={viewState} changeViewState={changeViewState} currentYear={(decade * DecadeNumber + i)} selectedDate={selectedDate} isOutside={false}></SelectYear>);
    }
    result.push(<SelectYear index={11} viewState={viewState} changeViewState={changeViewState} currentYear={(decade * DecadeNumber + 10)} selectedDate={selectedDate} isOutside={true}></SelectYear>);
    return result;
}

const TYear = ({ viewState, changeViewState, selectedDate }) => {
    const [currentYear, setCurrentYear] = useState(viewState.year);
    const previousDecade = () => {
        if (currentYear - 10 < MinYear) {
            alert("Can not select below 1700s.");
            return;
        }
        setCurrentYear(currentYear => currentYear - 10);
    }
    const nextDecade = () => {
        if (currentYear + 10 > MaxYear) {
            alert("Can not select over 2199s.");
            return;
        }
        setCurrentYear(currentYear => currentYear + 10);
    }
    const displayTitle = () => {
        let decade = GetDecadeRange(currentYear);
        return `${decade}0-${decade}9`;
    }

    return (
        <>
            <div className="cal-head">
                <span className="cal-head-arrow" onClick={previousDecade}><span className="head-arrow left-arrow"></span></span>
                <span className="cal-head-title">{displayTitle()}</span>
                <span className="cal-head-arrow" onClick={nextDecade}><span className="head-arrow right-arrow"></span></span>
            </div>
            <ol className="calendar-year">
                {MapDisplayYear(currentYear, viewState, changeViewState, selectedDate)}
            </ol>
        </>
    );
};



TYear.propTypes = {
    selectedDate: PropTypes.instanceOf(Date),
    viewState: PropTypes.object,
    changeViewState: PropTypes.func
}

export default TYear;