/*jslint node: true */
/*jshint esversion: 6 */
'use strict';

const Alexa = require("alexa-sdk");
const AWS = require('aws-sdk');
const config = require('./modules/shared/util/configHelper');
const Translations = require('./modules/shared/services/translationRegistrationService');
const logToSplunkNova = require('./modules/shared/util/loggingHelper');

exports.handler = function (event, context) {
    console.log(JSON.stringify(event, null, '  '));

    if (config.debugLocal == true) {

        // needed for running locally with Bespoken Tools
        // without explicitly setting the region, you will get the error:
        //     Unhandled Exception from Lambda: Error: Error fetching user state: ConfigError: Missing region in config        
        AWS.config.update({ region: config.region });
    }

    var alexa = Alexa.handler(event, context);

    if (config.debugLocal == false) {
        alexa.appId = config.appId;
    }

    let translations = new Translations();
    translations.registerResources(require('./modules/shared/translations/fallback.en-US.json'));
    translations.registerResources(require('./modules/core/translations/core.en-US.json'));
    translations.registerResources(require('./modules/core/translations/version.en-US.json'));
    translations.registerResources(require('./modules/samples/translations/sample.en-US.json'));

    alexa.resources = translations.getResources(event.request.locale);

    if (config.dynamoDBTableName && config.dynamoDBTableName !== '') {
        alexa.dynamoDBTableName = config.dynamoDBTableName;
    }

    alexa.registerHandlers(require('./modules/core/handlers/coreHandlers'));
    alexa.registerHandlers(require('./modules/core/handlers/skillEventHandlers'));
    alexa.registerHandlers(require('./modules/core/handlers/versionHandlers'));
    alexa.registerHandlers(require('./modules/samples/handlers/sampleHandlers'));

    logToSplunkNova(event, context).then(() => alexa.execute());
};