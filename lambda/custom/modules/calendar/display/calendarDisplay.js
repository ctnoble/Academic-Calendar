/*jslint node: true */
/*jshint esversion: 6 */

'use strict';

const Alexa = require('alexa-sdk');
const makePlainText = Alexa.utils.TextUtils.makePlainText;
const makeRichText = Alexa.utils.TextUtils.makeRichText;
const makeImage = Alexa.utils.ImageUtils.makeImage;

function renderCalendarScreen(params) {

    const builder = new Alexa.templateBuilders.BodyTemplate1Builder();

    const primaryText = makeRichText(`<b>${params.event}</b> ${params.translations.text1} <b>${params.date}</b>`);

    const template = builder
        .setToken('CalendarScreen')
        .setTitle(params.title)
        .setBackButtonBehavior('HIDDEN')
        .setTextContent(primaryText)
        .setBackgroundImage(makeImage(`https://s3.amazonaws.com/${params.s3BucketName}/images/background-solid.png`))        
        .build();

    return template;
}

module.exports.renderCalendarScreen = renderCalendarScreen;