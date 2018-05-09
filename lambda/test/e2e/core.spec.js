/*jshint esversion: 6 */

const expect = require("chai").expect;
const va = require("virtual-alexa");

describe("core", function () {

    let alexa;
    beforeEach(function () {

        let model = require("../../../models/en-US.json");
        let handler = require("../../custom/index").handler;

        alexa = va.VirtualAlexa.Builder()
            .handler(handler)
            .interactionModel(model)
            .create();

        console.log('virtual alexa created');
    });

    it("Should launch the skill and get a response", function (done) {
        alexa.launch().then((result) => {
            expect(result.response.outputSpeech.ssml).to.exist;
            expect(result.response.outputSpeech.ssml).to.include("Welcome to the multi modal skill template sample");
            done();            
        });
    });

    it("Should utter help and get a response", function (done) {
        alexa.utter("help").then((result) => {
            expect(result.response.outputSpeech.ssml).to.exist;
            expect(result.response.outputSpeech.ssml).to.include("This is for general help");
            done();
        });
    });

    it("Should utter repeat and get a response", function (done) {
        alexa.utter("repeat").then((result) => {
            expect(result.response.outputSpeech.ssml).to.exist;
            expect(result.response.outputSpeech.ssml).to.include("This is for general help");
            done();
        });
    });
    

    it("Should utter cancel and get a response", function (done) {
        alexa.utter("cancel").then((result) => {
            expect(result.response.outputSpeech.ssml).to.exist;
            // expect(result.response.outputSpeech.ssml).to.include("Goodbye!");
            // expect(result.response.outputSpeech.ssml).to.satisfy(function(text) {
            //     return num > 0; 
            //   });
            done();
        });
    });

    it("Should utter stop and get a response", function (done) {
        alexa.utter("stop").then((result) => {
            expect(result.response.outputSpeech.ssml).to.exist;
            // expect(result.response.outputSpeech.ssml).to.include("See you later!");
            done();
        });
    });

});