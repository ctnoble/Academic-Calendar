/*jslint node: true */
/*jshint esversion: 6 */

'use strict';

const config = require('./configHelper');
const SplunkNova = require('splunknova');

function logToSplunkNova(event, context) {
    return new Promise(function (resolve, reject) {
        if (config.splunkNovaClientID && config.splunkNovaClientSecret) {
            try {
                let novaEvent = {
                    source: context.invokedFunctionArn,
                    entity: `${config.region}`,
                    sourcetype: 'alexa:invocation',
                    event: event,
                    context: context
                };
                let nova = new SplunkNova(config.splunkNovaClientID, config.splunkNovaClientSecret);
                nova.events.ingest([novaEvent]).then(() => resolve());
            } catch(error) {
                console.log(`Splunk Nova logging failed - ${error}.`);
                resolve();
            }
        } else {
            console.log('Missing parameters for Splunk Nova logging.');
            resolve();
        }
    });
}

module.exports = logToSplunkNova;