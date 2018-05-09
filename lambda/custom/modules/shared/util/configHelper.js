/*jslint node: true */
/*jshint esversion: 6 */

'use strict';

const isLambda = require('is-lambda');
const ENV_KEY = 'ENV';

let env = 'local';

if (isLambda && process.env[ENV_KEY]){
    env = process.env[ENV_KEY];
}

module.exports = require(`../../../config/${env}.json`);