import React from "react";
import { ViewType, DaysOfWeek, MonthsOfYear, CombineDateForDateTemplate, GetPreviousMonth, GetNextMonth } from "../utils/calendar";
import PropTypes from "prop-types";



const DisplayWeeks = (dayName) => {
    let className = `calendar-date-1`;
    let displayName = dayName.slice(0, 2);
    return (<li key={displayName} className={className}>{displayName}</li>);
}

DisplayWeeks.propTypes = {
    dayName: PropTypes.string
}



const DisplayDate = ({ date, month, year, index, isCurrent, selectedDate, today }) => {
    let className = `calendar-date-${Math.floor(index / 7) + 1}`;
    if (!isCurrent) {
        className += " outside";
    } else if (date === selectedDate.getDate() && month === selectedDate.getMonth() + 1 && year === selectedDate.getFullYear()) {
        className += " choose-date";
    } else if (date === today.getDate() && month === today.getMonth() + 1 && year === today.getFullYear()) {
        className += " today";
    }
    return (<li key={`${date}-${month}-${year}`} className={className}>{date}</li>);
}

DisplayDate.propTypes = {
    date: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
    index: PropTypes.number,
    isCurrent: PropTypes.bool,
    selectedDate: PropTypes.instanceOf(Date),
    today: PropTypes.instanceOf(Date)
}



function MapDisplayDate(month, year, selectedDate) {
    let result = [];
    let today = new Date();
    let getCombineDays = CombineDateForDateTemplate(month, year);
    let totalCount = 7;
    let previousMonth = GetPreviousMonth(month, year);
    let nextMonth = GetNextMonth(month, year);
    for (let i = 0; i < getCombineDays.previous.length; i++) {
        result.push(<DisplayDate date={getCombineDays.previous[i]} month={previousMonth.month} year={previousMonth.year} index={totalCount} isCurrent={false} selectedDate={selectedDate} today={today}></DisplayDate>);
        totalCount++;
    }
    for (let i = 0; i < getCombineDays.current.length; i++) {
        result.push(<DisplayDate date={getCombineDays.current[i]} month={month} year={year} index={totalCount} isCurrent={true} selectedDate={selectedDate} today={today}></DisplayDate>);
        totalCount++;
    }
    for (let i = 0; i < getCombineDays.next.length; i++) {
        result.push(<DisplayDate date={getCombineDays.next[i]} month={nextMonth.month} year={nextMonth.year} index={totalCount} isCurrent={false} selectedDate={selectedDate} today={today}></DisplayDate>);
        totalCount++;
    }
    return result;
}



const TDate = ({ viewState, changeViewState, selectedDate, setSelectedDate }) => {

    const titleClick = () => {
        changeViewState({ ...viewState, viewState: ViewType.Month });
    }

    const clickPreviousMonth = () => {
        let previousMonth = GetPreviousMonth(viewState.month, viewState.year);
        changeViewState({ ...viewState, month: previousMonth.month, year: previousMonth.year });
    }
    const clickNextMonth = () => {
        let nextMonth = GetNextMonth(viewState.month, viewState.year);
        changeViewState({ ...viewState, month: nextMonth.month, year: nextMonth.year });
    }

    return (
        <>
            <div className="cal-head">
                <span className="cal-head-arrow" onClick={clickPreviousMonth}><span className="head-arrow left-arrow"></span></span>
                <span className="cal-head-title" onClick={titleClick}>{MonthsOfYear[viewState.month - 1]} {viewState.year}</span>
                <span className="cal-head-arrow" onClick={clickNextMonth}><span className="head-arrow right-arrow"></span></span>
            </div>
            <ol className="calendar-date">
                {Object.keys(DaysOfWeek).map((dayName) => DisplayWeeks(dayName))}
                {MapDisplayDate(viewState.month, viewState.year, selectedDate, setSelectedDate)}
            </ol>
        </>
    );
};


TDate.propTypes = {
    viewState: PropTypes.object,
    changeViewState: PropTypes.func,
    selectedDate: PropTypes.instanceOf(Date),
    setSelectedDate: PropTypes.func
}



export default TDate;