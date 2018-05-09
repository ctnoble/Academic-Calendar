/*jshint esversion: 6 */

const expect = require('chai').expect;

const displayHelper = require('../../../../custom/modules/shared/util/displayHelper');


describe("displayHelper", function () {

    describe("supportsDisplay", function () {

        it("empty object", function () {

            let mockHandler = {};

            let result = displayHelper.supportsDisplay.call(mockHandler);

            expect(result).to.equal(false);

        });

        it("partial path", function () {

            let mockHandler = { event: { context: { System: { device: { supportedInterfaces: { } } } } } };

            let result = displayHelper.supportsDisplay.call(mockHandler);

            expect(result).to.equal(false);

        });

        it("full path", function () {

            let mockHandler = { event: { context: { System: { device: { supportedInterfaces: { Display: {} } } } } } };

            let result = displayHelper.supportsDisplay.call(mockHandler);

            expect(result).to.equal(true);

        });

    });


});