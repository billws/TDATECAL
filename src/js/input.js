import React, { useState, useEffect } from "react";
import TDATECAL from "./calendar/index";

const DateToIso = (dateObject) => {
    if (!dateObject || Object.prototype.toString.call(dateObject) !== '[object Date]') {
        return "";
    }
    function pad(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }
    return dateObject.getFullYear() +
        '-' + pad(dateObject.getMonth() + 1) +
        '-' + pad(dateObject.getDate());
}

const ValidIsoFormat = (isoString) => {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    return isoString.match(regEx) != null;
}

const Picker = () => {
    const [selectedDate, setSelectDate] = useState(new Date());
    const [inputValue, setInputValue] = useState("");
    const [displayCalendar, setDisplayCalendar] = useState(false);
    const onInputFocus = () => {
        if(!displayCalendar){
            setDisplayCalendar(displayCalendar => !displayCalendar);
        }
    }

    const handleChange = (event) => {
        setInputValue(event.target.value);
        if(displayCalendar){
            setDisplayCalendar(displayCalendar => !displayCalendar);
        }
    }
    const onSelectedCallBack = (newSelectedDate) => {
        setDisplayCalendar(displayCalendar => !displayCalendar);
        setSelectDate(newSelectedDate);
        setInputValue(DateToIso(newSelectedDate));
    }
    useEffect(() => {
        if(ValidIsoFormat(inputValue)){
            let yyyyMMdd = inputValue.split("-");
            let yyyy = parseInt(yyyyMMdd[0], 10) > 1700 && parseInt(yyyyMMdd[0], 10) < 2199 ? parseInt(yyyyMMdd[0], 10) : selectedDate.getFullYear();
            let mm = parseInt(yyyyMMdd[1], 10) > 0 && parseInt(yyyyMMdd[1], 10) < 13 ? parseInt(yyyyMMdd[1], 10)-1 : selectedDate.getMonth();
            let dd = parseInt(yyyyMMdd[2], 10) > 0 && parseInt(yyyyMMdd[2], 10) < 32 ? parseInt(yyyyMMdd[2], 10) : selectedDate.getDate();
            let newDate = new Date(yyyy, mm, dd);
            setSelectDate(newDate);
        }   
    }, [inputValue]);

    return (
        <div>
            <input type="text" onFocus={onInputFocus} value={inputValue} onChange={handleChange}></input>
            {displayCalendar ? <TDATECAL display={displayCalendar} date={selectedDate} onSelected={onSelectedCallBack} /> : null}
        </div>
    );
    
};




export default Picker;