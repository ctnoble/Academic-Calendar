/*jslint node: true */
/*jshint esversion: 6 */
"use strict";

const config = require('../../shared/util/configHelper');
const TranslationService = require('../../shared/services/translationResolutionService');
const displayHelper = require('../../shared/util/displayHelper');
const display = require('../display/newDisplay');

const handlers = {

    'SpeechIntent': function () {
        console.log('newHandlers ---> SpeechIntent');

        //speech only, no parameterized translation strings
        this.emit('PrivateHandleIntent', 'SpeechIntent');
    },

    'SpeechWithParamIntent': function () {
        console.log('newHandlers ---> SpeechWithParamIntent');

        //speech only, parameterized translation strings
        this.emit('PrivateHandleIntent', 'SpeechWithParamIntent', { name: 'John' });
    },

    'SpeechAndDisplayIntent': function () {
        console.log('newHandlers ---> SpeechAndDisplayIntent');

        const options = {
            s3BucketName: config.s3BucketName
        };

        //speech and display, no parameterized translation strings
        this.emit('PrivateHandleIntent', 'SpeechIntent', null, display.renderNewScreen, options);
    },

    'SpeechWithParamAndDisplayIntent': function () {
        console.log('newHandlers ---> SpeechWithParamAndDisplayIntent');

        const options = {
            s3BucketName: config.s3BucketName
        };

        //speech and display, parameterized translation strings
        this.emit('PrivateHandleIntent', 'SpeechWithParamIntent', { name: 'John' }, display.renderNewScreen, options);
    },

    'LongWayIntent': function () {
        console.log('newHandlers ---> LongWayIntent');

        let translations = new TranslationService(this).getTranslationsWithFallback('SpeechIntent');

        // always conversation mode
        this.response.speak(translations.speechWithPrompt)
            .listen(translations.reprompt);


            
        //OR check if conversation mode vs one-shot
        // if (this.attributes.sessionTemp.isConversationMode) {
        //     this.response.speak(translations.speechWithPrompt)
        //         .listen(translations.reprompt);
        // }
        // else {
        //     this.response.speak(translations.speech);
        // }

        // render display
        if (displayHelper.supportsDisplay.call(this)) {

            const options = {
                s3BucketName: config.s3BucketName
            };

            let template = display.renderNewScreen.call(this, options);

            this.response.renderTemplate(template) // jshint ignore:line
                .hint(translations.displayHint);
        }

        this.emit(':responseReady');
    },
};

module.exports = handlers;
