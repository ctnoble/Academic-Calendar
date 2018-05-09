/*jshint esversion: 6 */

const expect = require('chai').expect;

const sessionHelper = require('../../../../custom/modules/shared/util/sessionHelper');


describe("sessionHelper", function () {

    describe("beforeEndSession", function () {

        it("removes attributes.sessionTemp", function () {

            let mockHandler = {
                attributes: {
                    dummy: {
                        key1: "value1",
                        key2: "value2"
                    },
                    sessionTemp: {
                        key1: "value1",
                        key2: "value2"                        
                    }
                }
            };

            sessionHelper.beforeEndSession.call(mockHandler);

            const expected = {
                attributes: {
                    dummy: {
                        key1: "value1",
                        key2: "value2"
                    }
                }
            };

            expect(mockHandler).to.deep.equal(expected);            
        });

    });


});