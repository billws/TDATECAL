import React from "react";
import { ViewType, DaysOfWeek, MonthsOfYear, CombineDateForDateTemplate, GetPreviousMonth, GetNextMonth, MinYear, MaxYear } from "../utils/calendar";
import PropTypes from "prop-types";



const DisplayWeeks = (dayName) => {
    let className = `calendar-date-1`;
    let displayName = dayName.slice(0, 2);
    return (<li key={displayName} className={className}>{displayName}</li>);
}

DisplayWeeks.propTypes = {
    dayName: PropTypes.string
}


const DisplayDate = React.memo(function MyComponent({ date, month, year, index, isCurrent, isSelected, setSelectedDate, isToday }) {
    const clickSelectedDate = (e) => {
        e.stopPropagation();
        let newSelectedDate = new Date(year, month - 1, date);
        setSelectedDate(newSelectedDate);
    }

    let className = `calendar-date-${Math.floor(index / 7) + 1}`;
    if (!isCurrent) {
        className += " outside";
    } else if (isSelected) {
        className += " choose-date";
    } else if (isToday) {
        className += " today";
    }
    return (<li className={className} onClick={clickSelectedDate}>{date}</li>);
});

DisplayDate.propTypes = {
    date: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
    index: PropTypes.number,
    isCurrent: PropTypes.bool,
    isSelected: PropTypes.bool,
    isToday: PropTypes.bool,
    setSelectedDate: PropTypes.func
}



function MapDisplayDate(month, year, selectedDate, setSelectedDate) {
    let result = [];
    let today = new Date();
    let getCombineDays = CombineDateForDateTemplate(month, year);
    let totalCount = 7;
    let previousMonth = GetPreviousMonth(month, year);
    let nextMonth = GetNextMonth(month, year);
    for (let i = 0; i < getCombineDays.previous.length; i++) {
        let isSelected = false;
        let isToday = false;
        if (selectedDate && getCombineDays.previous[i] === selectedDate.getDate() && previousMonth.month === selectedDate.getMonth() + 1 && previousMonth.year === selectedDate.getFullYear()) {
            isSelected = true;
        } else if (getCombineDays.previous[i] === today.getDate() && previousMonth.month === today.getMonth() + 1 && previousMonth.year === today.getFullYear()) {
            isToday = true;
        }
        result.push(
            <DisplayDate
                key={`${getCombineDays.previous[i]}-${previousMonth.month}-${previousMonth.year}`}
                date={getCombineDays.previous[i]}
                month={previousMonth.month}
                year={previousMonth.year}
                index={totalCount}
                isCurrent={false}
                isSelected={isSelected}
                setSelectedDate={setSelectedDate}
                isToday={isToday}>

            </DisplayDate>
        );
        totalCount++;
    }
    for (let i = 0; i < getCombineDays.current.length; i++) {
        let isSelected = false;
        let isToday = false;
        if (selectedDate && getCombineDays.current[i] === selectedDate.getDate() && month === selectedDate.getMonth() + 1 && year === selectedDate.getFullYear()) {
            isSelected = true;
        } else if (getCombineDays.current[i] === today.getDate() && month === today.getMonth() + 1 && year === today.getFullYear()) {
            isToday = true;
        }
        result.push(
            <DisplayDate
                key={`${getCombineDays.current[i]}-${month}-${year}`}
                date={getCombineDays.current[i]}
                month={month}
                year={year}
                index={totalCount}
                isCurrent={true}
                isSelected={isSelected}
                setSelectedDate={setSelectedDate}
                isToday={isToday}>

            </DisplayDate>
        );
        totalCount++;
    }
    for (let i = 0; i < getCombineDays.next.length; i++) {
        let isSelected = false;
        let isToday = false;
        if (selectedDate && getCombineDays.next[i] === selectedDate.getDate() && nextMonth.month === selectedDate.getMonth() + 1 && nextMonth.year === selectedDate.getFullYear()) {
            isSelected = true;
        } else if (getCombineDays.next[i] === today.getDate() && nextMonth.month === today.getMonth() + 1 && nextMonth.year === today.getFullYear()) {
            isToday = true;
        }
        result.push(
            <DisplayDate
                key={`${getCombineDays.next[i]}-${nextMonth.month}-${nextMonth.year}`}
                date={getCombineDays.next[i]}
                month={nextMonth.month}
                year={nextMonth.year}
                index={totalCount}
                isCurrent={false}
                isSelected={isSelected}
                setSelectedDate={setSelectedDate}
                isToday={isToday}>

            </DisplayDate>
        );
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
        if (previousMonth.year < MinYear) {
            alert("Can not select below 1700s.");
            return;
        }
        changeViewState({ ...viewState, month: previousMonth.month, year: previousMonth.year });
    }
    const clickNextMonth = () => {
        let nextMonth = GetNextMonth(viewState.month, viewState.year);
        if (nextMonth.year > MaxYear) {
            alert("Can not select over 2199s.");
            return;
        }
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