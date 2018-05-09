/*jshint esversion: 6 */

const expect = require('chai').expect;

const display = require('../../../custom/modules/core/display/coreDisplay');


describe("coreDisplay", function () {

    describe("renderWelcomeScreen", function () {

        it("check template", function () {

            const options = {
                s3BucketName: 'fakebucket'
            };

            let template = display.renderWelcomeScreen.call(Object, options);

            expect(template.type).to.equal('BodyTemplate6');
            expect(template.backgroundImage.sources[0].url).to.equal('https://s3.amazonaws.com/fakebucket/images/background-welcome.png');
        });

    });

    describe("renderGoodbyeScreen", function () {

        it("check template", function () {

            const options = {
                s3BucketName: 'fakebucket'
            };

            let template = display.renderGoodbyeScreen(options);

            expect(template.type).to.equal('BodyTemplate6');
            expect(template.backgroundImage.sources[0].url).to.equal('https://s3.amazonaws.com/fakebucket/images/background-goodbye.png');
        });

    });    

});