/*jslint node: true */
/*jshint esversion: 6 */
"use strict";

const config = require('../../shared/util/configHelper');
const TranslationService = require('../../shared/services/translationResolutionService');
const sessionHelper = require('../../shared/util/sessionHelper');
const displayHelper = require('../../shared/util/displayHelper');
const display = require('../display/calendarDisplay');

const Alexa = require('alexa-sdk');
const ical = require('ical');
const utils = require('util');
const URL = "https://calendar.google.com/calendar/ical/asu.edu_q065bkoducouhbr42c83548dgk%40group.calendar.google.com/public/basic.ics";

const states = {
    SEARCHMODE: '_SEARCHMODE',
    DESCRIPTION: '_DESKMODE',
};

const skillName = "Events Calendar";
const cardTitle = "Events";
let output = "";
let alexa;
let APP_ID = undefined;
let relevantEvents = new Array();

const startSearchHandlers = Alexa.CreateStateHandler(states.SEARCHMODE, {
    'AMAZON.YesIntent': function () {
        output = welcomeMessage;
        alexa.response.speak(output).listen(welcomeMessage);
        this.emit(':responseReady');
    },

    'AMAZON.NoIntent': function () {
        this.response.speak(shutdownMessage);
        this.emit(':responseReady');
    },

    'AMAZON.RepeatIntent': function () {
        this.response.speak(output).listen(HelpMessage);
    },

    'searchIntent': function () {
        // Declare variables
        let eventList = new Array();
        const slotValue = this.event.request.intent.slots.date.value;
        if (slotValue != undefined)
        {
            let parent = this;

            // Using the iCal library I pass the URL of where we want to get the data from.
            ical.fromURL(URL, {}, function (error, data) {
                // Loop through all iCal data found
                for (let k in data) {
                    if (data.hasOwnProperty(k)) {
                        let ev = data[k];
                        // Pick out the data relevant to us and create an object to hold it.
                        let eventData = {
                            summary: removeTags(ev.summary),
                            location: removeTags(ev.location),
                            description: removeTags(ev.description),
                            start: ev.start
                        };
                        // add the newly created object to an array for use later.
                        eventList.push(eventData);
                    }
                }
                // Check we have data
                if (eventList.length > 0) {
                    // Read slot data and parse out a usable date
                    const eventDate = getDateFromSlot(slotValue);
                    // Check we have both a start and end date
                    if (eventDate.startDate && eventDate.endDate) {
                        // initiate a new array, and this time fill it with events that fit between the two dates
                        relevantEvents = getEventsBeweenDates(eventDate.startDate, eventDate.endDate, eventList);

                        if (relevantEvents.length > 0) {
                            // change state to description
                            parent.handler.state = states.DESCRIPTION;

                            // Create output for both Alexa and the content card
                            let cardContent = "";
                            output = oneEventMessage;
                            if (relevantEvents.length > 1) {
                                output = utils.format(multipleEventMessage, relevantEvents.length);
                            }

                            output += scheduledEventMessage;

                            if (relevantEvents.length > 1) {
                                output += utils.format(firstThreeMessage, relevantEvents.length > 3 ? 3 : relevantEvents.length);
                            }

                            if (relevantEvents[0] != null) {
                                let date = new Date(relevantEvents[0].start);
                                output += utils.format(eventSummary, "First", removeTags(relevantEvents[0].summary), relevantEvents[0].location, date.toDateString() + ".");
                            }
                            if (relevantEvents[1]) {
                                let date = new Date(relevantEvents[1].start);
                                output += utils.format(eventSummary, "Second", removeTags(relevantEvents[1].summary), relevantEvents[1].location, date.toDateString() + ".");
                            }
                            if (relevantEvents[2]) {
                                let date = new Date(relevantEvents[2].start);
                                output += utils.format(eventSummary, "Third", removeTags(relevantEvents[2].summary), relevantEvents[2].location, date.toDateString() + ".");
                            }

                            for (let i = 0; i < relevantEvents.length; i++) {
                                let date = new Date(relevantEvents[i].start);
                                cardContent += utils.format(cardContentSummary, removeTags(relevantEvents[i].summary), removeTags(relevantEvents[i].location), date.toDateString()+ "\n\n");
                            }

                            output += eventNumberMoreInfoText;
                            alexa.response.cardRenderer(cardTitle, cardContent);
                            alexa.response.speak(output).listen(haveEventsreprompt);
                        } else {
                            output = NoDataMessage;
                            alexa.emit(output).listen(output);
                        }
                    }
                    else {
                        output = NoDataMessage;
                        alexa.emit(output).listen(output);
                    }
                } else {
                    output = NoDataMessage;
                    alexa.emit(output).listen(output);
                }
            });
        }
        else{
            this.response.speak("I'm sorry.  What day did you want me to look for events?").listen("I'm sorry.  What day did you want me to look for events?");
        }

        this.emit(':responseReady');
    },

    'AMAZON.HelpIntent': function () {
        output = HelpMessage;
        this.response.speak(output).listen(output);
        this.emit(':responseReady');
    },

    'AMAZON.StopIntent': function () {
        this.response.speak(killSkillMessage);
    },

    'AMAZON.CancelIntent': function () {
        this.response.speak(killSkillMessage);
    },

    'SessionEndedRequest': function () {
        this.emit('AMAZON.StopIntent');
    },

    'Unhandled': function () {
        this.response.speak(HelpMessage).listen(HelpMessage);
        this.emit(':responseReady');
    }
});

module.exports = startSearchHandlers;