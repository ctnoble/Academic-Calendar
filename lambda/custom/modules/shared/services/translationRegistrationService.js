/*jslint node: true */
/*jshint esversion: 6 */

'use strict';

const localeCode = require('locale-code');

class TranslationRegistrationService {

    /**
     * Create an instance of TranslationRegistrationService
     * @memberOf TranslationRegistrationService
     */
    constructor() {
        this.resources = {};
    }

    /**
     * Registers resources
     * @param {Object[]} resources translation resource object(s)
     * @returns {Object}
     * @memberOf TranslationRegistrationService
     */
    registerResources() {
        for (let arg = 0; arg < arguments.length; arg++) {
            const resourceObject = arguments[arg];

            if (!isObject(resourceObject)) {
                throw new Error(`Argument #${arg} was not an Object`);
            }

            const resourceLocales = Object.keys(resourceObject);

            for (let i = 0; i < resourceLocales.length; i++) {
                const resourceLocale = resourceLocales[i];

                if (!this.resources[resourceLocale]) {
                    this.resources[resourceLocale] = [];
                }

                this.resources[resourceLocale].push(resourceObject);
            }
        }
    }

    /**
     * Gets resources for a given locale. 
     * If format is 'en-US' and even one resource is tagged as 'en-US' then only 'en-US' will return.
     * If there is no 'en-US' but there is at least one 'en' then 'en' is returned.
     * @param {string} locale the locale
     * @returns {Object}
     * @memberOf TranslationHelper
     */
    getResources(locale) {

        locale = locale || 'en';
        let langCode = localeCode.getLanguageCode(locale);
        if (langCode === '') {
            langCode = locale;
        }

        let defaultResource = {};

        let resourcesForLocale;
        let chosenLocale;
        let useDefault = false;

        if (this.resources[locale]) {
            chosenLocale = locale;
        }
        else if (this.resources[langCode]) {
            chosenLocale = langCode;
        }
        else {
            chosenLocale = langCode;
            useDefault = true;
        }

        defaultResource[chosenLocale] = {
            "translation": {}
        };

        if (useDefault) {
            resourcesForLocale = [defaultResource];
        }
        else {
            resourcesForLocale = this.resources[chosenLocale];
        }

        resourcesForLocale.forEach(resource => {

            if (resource && resource[chosenLocale] && resource[chosenLocale].translation) {
                const resourceNames = Object.keys(resource[chosenLocale].translation);
                for (let i = 0; i < resourceNames.length; i++) {
                    const resourceName = resourceNames[i];

                    defaultResource[chosenLocale].translation[resourceName] = resource[chosenLocale].translation[resourceName];
                }
            }
            else {
                console.log('Resource file not in correct format:' + JSON.stringify(resource, null, '  '));
            }
        });

        let response = defaultResource;

        return response;
    }
}

module.exports = TranslationRegistrationService;

function isObject(obj) {
    return (!!obj) && (obj.constructor === Object);
}