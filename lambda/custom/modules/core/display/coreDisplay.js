/*jslint node: true */
/*jshint esversion: 6 */

'use strict';

const Alexa = require('alexa-sdk');
const makePlainText = Alexa.utils.TextUtils.makePlainText;
const makeRichText = Alexa.utils.TextUtils.makeRichText;
const makeImage = Alexa.utils.ImageUtils.makeImage;

function renderWelcomeScreen(params) {

    const builder = new Alexa.templateBuilders.BodyTemplate6Builder();

    const template = builder
        .setBackgroundImage(makeImage(`https://s3.amazonaws.com/${params.s3BucketName}/images/background-welcome.png`))
        .build();

    return template;
}

function renderGoodbyeScreen(params) {

    const builder = new Alexa.templateBuilders.BodyTemplate6Builder();

    const template = builder
        .setBackgroundImage(makeImage(`https://s3.amazonaws.com/${params.s3BucketName}/images/background-goodbye.png`))
        .build();

    return template;
}


module.exports.renderWelcomeScreen = renderWelcomeScreen;
module.exports.renderGoodbyeScreen = renderGoodbyeScreen;