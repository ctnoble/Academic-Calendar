/*jslint node: true */
/*jshint esversion: 6 */

const _ = require('lodash');

function supportsDisplay() {

    return _.get(this, 'event.context.System.device.supportedInterfaces.Display') ? true : false;   
}

module.exports.supportsDisplay = supportsDisplay;