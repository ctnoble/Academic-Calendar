/*jslint node: true */
/*jshint esversion: 6 */

'use strict';

function beforeEndSession() {
    delete this.attributes.sessionTemp; // jshint ignore:line
}

module.exports.beforeEndSession = beforeEndSession;