/*jslint node: true */
/*jshint esversion: 6 */
"use strict";

const config = require('../../shared/util/configHelper');
const TranslationService = require('../../shared/services/translationResolutionService');
const sessionHelper = require('../../shared/util/sessionHelper');
const displayHelper = require('../../shared/util/displayHelper');
const display = require('../display/coreDisplay');

const handlers = {

    'NewSession': function () {
        console.log('coreHandlers ---> NewSession');

        let isFirstTimeSkillLaunched = false;
        this.attributes.sessionTemp = {};

        if (!this.attributes.skillInfo) {
            isFirstTimeSkillLaunched = true;

            // init skill default values
            this.attributes.skillInfo = {
                launchCount: 0,
                oneShotCount: 0,
                firstAccessed: new Date().toUTCString()
            };
        }

        let eventString = 'Unhandled';

        if (this.event.request.type === 'LaunchRequest') {
            this.attributes.sessionTemp.isConversationMode = true;

            //Set skill values - Conversation
            this.attributes.skillInfo.launchCount += 1;



            if (isFirstTimeSkillLaunched === true) {
                eventString = 'PrivateWelcomeFirst';
            }
            else {
                eventString = 'PrivateWelcomeBack';
            }

        } else if (this.event.request.type === 'IntentRequest') {

            this.attributes.sessionTemp.isConversationMode = false;

            //Set skill values - SingleShot
            this.attributes.skillInfo.oneShotCount += 1;



            eventString = this.event.request.intent.name;
        }

        //Set skill values
        this.attributes.skillInfo.lastAccessed = new Date().toUTCString();



        this.emit(eventString);
    },

    'PrivateWelcomeFirst': function () {
        console.log('coreHandlers ---> PrivateWelcomeFirst');

        const options = {
            s3BucketName: config.s3BucketName
        };

        this.emit('PrivateHandleIntent', 'PrivateWelcomeFirst', null, display.renderWelcomeScreen, options);
    },

    'PrivateWelcomeBack': function () {
        console.log('coreHandlers ---> PrivateWelcomeBack');

        const options = {
            s3BucketName: config.s3BucketName
        };

        this.emit('PrivateHandleIntent', 'PrivateWelcomeBack', null, display.renderWelcomeScreen, options);
    },

    'AMAZON.HelpIntent': function () {
        console.log('coreHandlers ---> AMAZON.HelpIntent');

        let translations = new TranslationService(this).getTranslationsWithFallback('AMAZONHelpIntent');

        // always conversation mode
        this.response.speak(translations.speechWithPrompt)
            .listen(translations.reprompt);

        this.emit(':responseReady');
    },

    'AMAZON.RepeatIntent': function () {
        console.log('coreHandlers ---> AMAZON.RepeatIntent');

        let speech = this.attributes.sessionTemp.speech;
        let prompt = this.attributes.sessionTemp.prompt;
        let speechWithPrompt = speech + '<break time="300ms"/>' + prompt;
        let reprompt = this.attributes.sessionTemp.reprompt;

        this.emit(':ask', speechWithPrompt, reprompt);
    },

    'PrivateShortRepeat': function () {
        console.log('coreHandlers ---> PrivateShortRepeat');

        let prompt = this.attributes.sessionTemp.prompt;
        let reprompt = this.attributes.sessionTemp.reprompt;

        this.emit(':ask', prompt, reprompt);
    },

    'PrivateHandleIntent': function (translationKey, translationData, displayFunction, displayData) {
        console.log('coreHandlers ---> PrivateHandleIntent');

        if (translationKey === undefined || translationKey === null) {
            translationKey = 'PrivateMissingTranslationKey';
        }

        if (translationData === undefined || translationData === null) {
            translationData = {};
        }

        if (displayData === undefined || displayData === null) {
            displayData = {};
        }

        // get translations

        let translations = new TranslationService(this).getTranslationsWithFallback(translationKey, translationData);

        if (this.attributes.sessionTemp.isConversationMode) {
            this.response.speak(translations.speechWithPrompt)
                .listen(translations.reprompt);
        }
        else {
            this.response.speak(translations.speech);
        }



        // render display

        if (displayFunction !== undefined &&
            displayFunction !== null &&
            typeof (displayFunction) === 'function' &&
            displayHelper.supportsDisplay.call(this)) {

            let defaultDisplayData = {
                title: translations.displayTitle
            };

            let mergedDisplayData = Object.assign({}, defaultDisplayData, displayData);

            let template = displayFunction.call(this, mergedDisplayData);
            this.response.renderTemplate(template);

            if (translations.displayHint && translations.displayHint != '') {
                this.response.hint(translations.displayHint);
            }

        }

        this.emit(':responseReady');
    },

    'AMAZON.CancelIntent': function () {
        console.log('coreHandlers ---> AMAZON.CancelIntent');

        this.emit('SessionEndedRequest');
    },

    'AMAZON.StopIntent': function () {
        console.log('coreHandlers ---> AMAZON.StopIntent');

        this.emit('SessionEndedRequest');
    },


    'SessionEndedRequest': function () {
        console.log('coreHandlers ---> SessionEndedRequest');

        let translations = new TranslationService(this).getTranslationsWithFallback('SessionEndedRequest');
        this.response.speak(translations.speech);

        // place at the end of every one-shot intent and SessionEndedRequest
        sessionHelper.beforeEndSession.call(this);

        // render display
        if (displayHelper.supportsDisplay.call(this)) {

            const options = {
                s3BucketName: config.s3BucketName
            };

            let template = display.renderGoodbyeScreen.call(this, options);

            this.response.renderTemplate(template); // jshint ignore:line
        }

        this.emit(':responseReady');
    },

    'Unhandled': function () {
        console.log('coreHandlers ---> Unhandled');

        let translations = new TranslationService(this).getTranslationsWithFallback('Unhandled');

        // always conversation mode
        this.emit(':ask', translations.speechWithPrompt, translations.reprompt);
    },

};

module.exports = handlers;