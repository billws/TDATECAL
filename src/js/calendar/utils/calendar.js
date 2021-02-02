export const ViewType = { "Date": "Date", "Month": "Month", "Year": "Year" };

export const MonthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export const MinYear = 1700;
export const MaxYear = 2199;
export const DecadeNumber = 10;

export const DaysOfWeek = {
    "Sunday": "Sunday",
    "Monday": "Monday",
    "Tuesday": "Tuesday",
    "Wednesday": "Wednesday",
    "Thursday": "Thursday",
    "Friday": "Friday",
    "Saturday": "Saturday"
};

export const GetCentury = (year) => {
    return Math.floor(year / 100);
}

export const CenturiesTable = (century) => {
    switch (century) {
        case 17:
            return 4;
        case 18:
            return 2;
        case 19:
            return 0;
        case 20:
            return 6;
        case 21:
            return 4;
        default:
            return 0;
    }
};

export const MonthsTable = (month, year) => {
    switch (month) {
        case 1:
            return IsLeapYear(year) ? 6 : 0;
        case 2:
            return IsLeapYear(year) ? 2 : 3;
        case 3:
            return 3;
        case 4:
            return 6;
        case 5:
            return 1;
        case 6:
            return 4;
        case 7:
            return 6;
        case 8:
            return 2;
        case 9:
            return 5;
        case 10:
            return 0;
        case 11:
            return 3;
        case 12:
            return 5;
        default:
            return 0;
    }
};


export const DaysOfMonthsTable = (month, year) => {
    switch (month) {
        case 1:
            return 31;
        case 2:
            return IsLeapYear(year) ? 29 : 28;
        case 3:
            return 31;
        case 4:
            return 30;
        case 5:
            return 31;
        case 6:
            return 30;
        case 7:
            return 31;
        case 8:
            return 31;
        case 9:
            return 30;
        case 10:
            return 31;
        case 11:
            return 30;
        case 12:
            return 31;
        default:
            return 30;
    }
};




export const DaysTable = (day) => {
    switch (day) {
        case 0:
            return DaysOfWeek.Sunday;
        case 1:
            return DaysOfWeek.Monday;
        case 2:
            return DaysOfWeek.Tuesday;
        case 3:
            return DaysOfWeek.Wednesday;
        case 4:
            return DaysOfWeek.Thursday;
        case 5:
            return DaysOfWeek.Friday;
        case 6:
            return DaysOfWeek.Saturday;
        default:
            return DaysOfWeek.Sunday;
    }
}

export const FindFirstDay = (firstDateOfMonth) => {
    if (Object.prototype.toString.call(firstDateOfMonth) !== '[object Date]') {
        throw new Error("Date Format Error!");
    }
    let century = GetCentury(firstDateOfMonth.getFullYear());
    let lastTwoDigitsOfYear = firstDateOfMonth.getFullYear() - (century * 100);
    let divideFour = Math.floor(lastTwoDigitsOfYear / 4);
    let monthTable = MonthsTable(firstDateOfMonth.getMonth() + 1, firstDateOfMonth.getFullYear());
    let sumAll = century + lastTwoDigitsOfYear + divideFour + monthTable + 1;
    return sumAll % 7;
}

export const TotalDaysForPreviousMonth = (month, year) => {
    let result = [];
    let previous = GetPreviousMonth(month, year);
    let totalPreviousDays = DaysOfMonthsTable(previous.month, previous.year);
    let firstDate = new Date(year, month - 1, 1);
    let firstDay = FindFirstDay(firstDate);
    for (let i = 0; i < firstDay; i++) {
        result.unshift(totalPreviousDays--);
    }
    return result;
}

export const TotalDaysForCurrentMonth = (month, year) => {
    let result = [];
    let totalCurrentDays = DaysOfMonthsTable(month, year);
    for (let i = 0; i < totalCurrentDays; i++) {
        result.push(i + 1);
    }
    return result;
}


export const TotalDaysForNextMonth = (month, year) => {
    let result = [];
    let totalCurrentDays = DaysOfMonthsTable(month, year);
    let firstDate = new Date(year, month - 1, 1);
    let firstDay = FindFirstDay(firstDate);
    for (let i = 0; (i + totalCurrentDays + firstDay) < 42; i++) {
        result.push(i + 1);
    }
    return result;
}

export const CombineDateForDateTemplate = (month, year) => {
    let previousArr = TotalDaysForPreviousMonth(month, year);
    let currentArr = TotalDaysForCurrentMonth(month, year);
    let nextArr = TotalDaysForNextMonth(month, year);
    return {
        previous: previousArr,
        current: currentArr,
        next: nextArr
    };
}

export const IsLeapYear = (year) => {
    return (!(year % 4) && (year % 100)) || !(year % 400);
}

export const GetPreviousMonth = (currentMonth, currentYear) => {
    let month = currentMonth - 1;
    let year = currentYear;
    if (currentMonth === 1) {
        month = 12;
        year = currentYear - 1;
    }
    return { month, year };
}


export const GetNextMonth = (currentMonth, currentYear) => {
    let month = currentMonth + 1;
    let year = currentYear;
    if (currentMonth === 12) {
        month = 1;
        year = currentYear + 1;
    }
    return { month, year };
}

