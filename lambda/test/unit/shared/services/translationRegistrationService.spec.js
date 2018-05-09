/*jshint esversion: 6 */

const expect = require('chai').expect;

const Translations = require('../../../../custom/modules/shared/services/translationRegistrationService');



describe("translationRegistrationService", function () {
    let translations;

    beforeEach(function () {
        translations = new Translations();
    });

    describe("getResources", function () {

        it("no locale", function () {

            const resources = translations.getResources();

            const expected = {
                "en": {
                    translation: {}
                }
            };

            expect(resources).to.deep.equal(expected);
        });

        it("resource property uses generic locale when none registered", function () {

            const resources = translations.getResources('en-GB');

            const expected = {
                "en": {
                    translation: {}
                }
            };

            expect(resources).to.deep.equal(expected);
        });

        it("return en when 1 en resource registered", function () {

            translations.registerResources(require('../translations/one.en.json'));

            const resources = translations.getResources('en');

            const expected = {
                "en": {
                    translation: {
                        "One-en": {
                            "key": "value"
                        }
                    }
                }
            };

            expect(resources).to.deep.equal(expected);
        });

        it("return en when 1 en and 1 en-US resource registered", function () {

            translations.registerResources(require('../translations/one.en.json'));
            translations.registerResources(require('../translations/one.en-US.json'));

            const resources = translations.getResources('en');

            const expected = {
                "en": {
                    translation: {
                        "One-en": {
                            "key": "value"
                        }
                    }
                }
            };

            expect(resources).to.deep.equal(expected);
        });

        it("return en-US when 1 en and 1 en-US resource registered", function () {

            translations.registerResources(require('../translations/one.en.json'));
            translations.registerResources(require('../translations/one.en-US.json'));

            const resources = translations.getResources('en-US');

            const expected = {
                "en-US": {
                    translation: {
                        "One-en-US": {
                            "key": "value"
                        }
                    }
                }
            };

            expect(resources).to.deep.equal(expected);
        });

        it("return en-US when 1 en-US resource registered", function () {

            translations.registerResources(require('../translations/one.en-US.json'));

            const resources = translations.getResources('en-US');

            const expected = {
                "en-US": {
                    translation: {
                        "One-en-US": {
                            "key": "value"
                        }
                    }
                }
            };

            expect(resources).to.deep.equal(expected);
        });

        it("return en when 1 en resource registered", function () {

            translations.registerResources(require('../translations/one.en.json'));

            const resources = translations.getResources('en-US');

            const expected = {
                "en": {
                    translation: {
                        "One-en": {
                            "key": "value"
                        }
                    }
                }
            };

            expect(resources).to.deep.equal(expected);
        });
        
        it("return en when 2 en resource registered", function () {

            translations.registerResources(require('../translations/one.en.json'));
            translations.registerResources(require('../translations/two.en.json'));

            const resources = translations.getResources('en');

            const expected = {
                "en": {
                    translation: {
                        "One-en": {
                            "key": "value"
                        },
                        "Two-en": {
                            "key": "value"
                        }                        
                    }
                }
            };

            expect(resources).to.deep.equal(expected);
        });

    });

});