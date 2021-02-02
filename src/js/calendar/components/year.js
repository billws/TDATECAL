import React from "react";
import PropTypes from "prop-types";


const TYear = ({viewState, changeViewState, selectedDate}) => {
    const titleClick = () =>{
        if(viewState || changeViewState || selectedDate){
            console.log("ha");
        }
    }
    return (
        <>
            <div className="cal-head">
                <span className="cal-head-arrow"><span className="head-arrow left-arrow"></span></span>
                <span className="cal-head-title" onClick={titleClick}>2020-2029</span>
                <span className="cal-head-arrow"><span className="head-arrow right-arrow"></span></span>
            </div>
            <ol className="calendar-year">
                <li className="calendar-month-1 outside">2019</li>
                <li className="calendar-month-1 choose-month">2020</li>
                <li className="calendar-month-1">2021</li>
                <li className="calendar-month-1">2022</li>
                <li className="calendar-month-2">2023</li>
                <li className="calendar-month-2">2024</li>
                <li className="calendar-month-2">2025</li>
                <li className="calendar-month-2">2026</li>
                <li className="calendar-month-3">2027</li>
                <li className="calendar-month-3">2028</li>
                <li className="calendar-month-3">2029</li>
                <li className="calendar-month-3 outside">2030</li>
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