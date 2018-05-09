/*jslint node: true */
/*jshint esversion: 6 */
"use strict";

// const config = require('../../shared/util/configHelper');
// const TranslationService = require('../../shared/services/translationResolutionService');

const handlers = {

    'SampleNoDisplayIntent': function () {
        console.log('sampleHandlers ---> SampleNoDisplayIntent');

        this.emit('PrivateHandleIntent', 'SampleNoDisplayIntent');
    },

};

module.exports = handlers;
