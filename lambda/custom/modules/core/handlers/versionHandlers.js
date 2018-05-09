/*jslint node: true */
/*jshint esversion: 6 */
"use strict";

const config = require('../../shared/util/configHelper');
const TranslationService = require('../../shared/services/translationResolutionService');

const handlers = {

    'VersionIntent': function () {
        console.log('versionHandlers ---> VersionIntent');

        const version = require('../../../package.json').version;

        let translations = new TranslationService(this).getTranslationsWithFallback('VersionIntent', { version: version, env: config.env });

        if (this.attributes.sessionTemp.isConversationMode) {
            this.response.speak(translations.speechWithPrompt)
                .listen(translations.reprompt);
        }
        else {
            this.response.speak(translations.speech);
        }

        this.emit(':responseReady');
    },

};

module.exports = handlers;