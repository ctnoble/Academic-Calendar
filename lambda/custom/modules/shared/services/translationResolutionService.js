/*jslint node: true */
/*jshint esversion: 6 */

'use strict';

const _ = require('lodash');
const FALLBACK_LIST_NAME = 'FallbackLists';

class TranslationResolutionService {

    /**
     * Create an instance of TranslationResolutionService
     * @param {Object} handlerContext Alexa Handler Context
     * @memberOf TranslationResolutionService
     */
    constructor(handlerContext) {
        this.handlerContext = handlerContext;
    }

    /**
     * Gets translations for a given key without fallbacks
     * @param {string} key key in the translations.json file
     * @param {Object} namedParams list of named params. ex: {name: 'Mark', company: 'VoiceXP Inc'}
     * @returns {Object}
     * @memberOf TranslationResolutionService
     */
    getTranslations(key, namedParams) {
        return this.handlerContext.t(key, namedParams);
    }

    /**
     * Gets translations for a given key, using fallbacks when needed
     * @param {string} key key in the translations.json file
     * @param {Object} namedParams list of named params. ex: {name: 'Mark', company: 'VoiceXP Inc'}
     * @returns {Object}
     * @memberOf TranslationResolutionService
     */
    getTranslationsWithFallback(key, namedParams) {

        let response = {
            speech: null,
            prompt: null,
            reprompt: null,
            displayHint: null,
            displayTitle: null,
            progressiveResponse: "",
            itemTemplate: ""
        };

        let mainTranslations = this.handlerContext.t(key, namedParams);
        let fallbackTranslations = this.handlerContext.t(FALLBACK_LIST_NAME);

        // get speech
        if (mainTranslations.speech) {
            response.speech = mainTranslations.speech;
        }
        else if (mainTranslations.speechList) {
            response.speech = _.sample(mainTranslations.speechList);
        }
        else {
            response.speech = _.sample(fallbackTranslations.speechList);
        }

        // get prompt
        if (mainTranslations.prompt) {
            response.prompt = mainTranslations.prompt;
        }
        else if (mainTranslations.promptList) {
            response.prompt = _.sample(mainTranslations.promptList);
        }
        else {
            response.prompt = _.sample(fallbackTranslations.promptList);
        }

        // used for conversation mode
        response.speechWithPrompt = response.speech + '<break time="300ms"/>' + response.prompt;

        // get reprompt
        if (mainTranslations.reprompt) {
            response.reprompt = mainTranslations.reprompt;
        }
        else if (mainTranslations.repromptList) {
            response.reprompt = _.sample(mainTranslations.repromptList);
        }
        else {
            response.reprompt = _.sample(fallbackTranslations.repromptList);
        }

        // get displayHint
        if (mainTranslations.displayHint) {
            response.displayHint = mainTranslations.displayHint;
        }
        else if (mainTranslations.displayHintList) {
            response.displayHint = _.sample(mainTranslations.displayHintList);
        }
        else {
            response.displayHint = _.sample(fallbackTranslations.displayHintList);
        }

        // get displayTitle
        if (mainTranslations.displayTitle) {
            response.displayTitle = mainTranslations.displayTitle;
        }
        else if (mainTranslations.displayTitleList) {
            response.displayTitle = _.sample(mainTranslations.displayTitleList);
        }
        else {
            response.displayTitle = _.sample(fallbackTranslations.displayTitleList);
        }


        // set attributes so repeat works
        this.handlerContext.attributes.sessionTemp.speech = response.speech;
        this.handlerContext.attributes.sessionTemp.prompt = response.prompt;
        this.handlerContext.attributes.sessionTemp.reprompt = response.reprompt;

        return response;
    }

}

module.exports = TranslationResolutionService;