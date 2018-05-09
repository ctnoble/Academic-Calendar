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

const descriptionHandlers = Alexa.CreateStateHandler(states.DESCRIPTION, {
    'eventIntent': function () {

        const reprompt = " Would you like to hear another event?";
        let slotValue = this.event.request.intent.slots.number.value;

        // parse slot value
        const index = parseInt(slotValue, 10) - 1;

        if (relevantEvents[index]) {

            // use the slot value as an index to retrieve description from our relevant array
            output = descriptionMessage + removeTags(relevantEvents[index].description);

            output += reprompt;

            this.response.cardRenderer(relevantEvents[index].summary, output);
            this.response.speak(output).listen(reprompt);
        } else {
            this.response.speak(eventOutOfRange).listen(welcomeMessage);
        }

        this.emit(':responseReady');
    },

    'AMAZON.HelpIntent': function () {
        this.response.speak(descriptionStateHelpMessage).listen(descriptionStateHelpMessage);
        this.emit(':responseReady');
    },

    'AMAZON.StopIntent': function () {
        this.response.speak(killSkillMessage);
        this.emit(':responseReady');
    },

    'AMAZON.CancelIntent': function () {
        this.response.speak(killSkillMessage);
        this.emit(':responseReady');
    },

    'AMAZON.NoIntent': function () {
        this.response.speak(shutdownMessage);
        this.emit(':responseReady');
    },

    'AMAZON.YesIntent': function () {
        output = welcomeMessage;
        alexa.response.speak(eventNumberMoreInfoText).listen(eventNumberMoreInfoText);
        this.emit(':responseReady');
    },

    'SessionEndedRequest': function () {
        this.emit('AMAZON.StopIntent');
    },

    'Unhandled': function () {
        this.response.speak(HelpMessage).listen(HelpMessage);
        this.emit(':responseReady');
    }
});

module.exports = descriptionHandlers;