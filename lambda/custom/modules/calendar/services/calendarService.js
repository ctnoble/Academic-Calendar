/*jslint node: true */
/*jshint esversion: 6 */

'use strict';

class DataService {

    /**
     * Create an instance of DataService
     * @memberOf DataService
     */
    constructor() {
        
    }

    getEventsBeweenDates(startDate, endDate, eventList) {
        return new Promise(function (resolve) {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        let data = new Array();
    
        for (let i = 0; i < eventList.length; i++) {
            if (start <= eventList[i].start && end >= eventList[i].start) {
                data.push(eventList[i]);
            }
        }
    
        console.log("FOUND " + data.length + " events between those times");
        return data;
        });
    }
    
    getWeekData(res) {
        return new Promise(function (resolve) {
            if (res.length === 2) {

        const mondayIndex = 0;
        const sundayIndex = 6;

        const weekNumber = res[1].substring(1);

        const weekStart = w2date(res[0], weekNumber, mondayIndex);
        const weekEnd = w2date(res[0], weekNumber, sundayIndex);

        return {
            startDate: weekStart,
            endDate: weekEnd,
        };
    }});
    }

    getWeekendData(res) {
        return new Promise(function (resolve) {
        if (res.length === 3) {
            const saturdayIndex = 5;
            const sundayIndex = 6;
            const weekNumber = res[1].substring(1);
    
            const weekStart = w2date(res[0], weekNumber, saturdayIndex);
            const weekEnd = w2date(res[0], weekNumber, sundayIndex);
    
            return {
                startDate: weekStart,
                endDate: weekEnd,
            };
        }});
    }
    
    getDateFromSlot(rawDate) {
        return new Promise(function (resolve) {
        // try to parse data
        let date = new Date(Date.parse(rawDate));
        // create an empty object to use later
        let eventDate = {
    
        };
    
        // if could not parse data must be one of the other formats
        if (isNaN(date)) {
            // to find out what type of date this is, we can split it and count how many parts we have see comments above.
            const res = rawDate.split("-");
            // if we have 2 bits that include a 'W' week number
            if (res.length === 2 && res[1].indexOf('W') > -1) {
                let dates = getWeekData(res);
                eventDate["startDate"] = new Date(dates.startDate);
                eventDate["endDate"] = new Date(dates.endDate);
                // if we have 3 bits, we could either have a valid date (which would have parsed already) or a weekend
            } else if (res.length === 3) {
                let dates = getWeekendData(res);
                eventDate["startDate"] = new Date(dates.startDate);
                eventDate["endDate"] = new Date(dates.endDate);
                // anything else would be out of range for this skill
            } else {
                eventDate["error"] = dateOutOfRange;
            }
            // original slot value was parsed correctly
        } else {
            eventDate["startDate"] = new Date(date).setUTCHours(0, 0, 0, 0);
            eventDate["endDate"] = new Date(date).setUTCHours(24, 0, 0, 0);
        }
        return eventDate;
        });
    }

    removeTags(str) {
        return new Promise(function (resolve) {
            if (str) {
            return str.replace(/<(?:.|\n)*?>/gm, '');
        }
    });
    }
}

module.exports = DataService;