// Base
const tiny_lang = {

    // Build Main Values
    list: {},
    defaultLang: 'en',
    mainLang: null,
    get: function (value, lang) {

        // Default Lang Value
        if (typeof lang !== "string") {
            if (typeof tiny_lang.mainLang === 'string') {
                lang = tiny_lang.mainLang;
            } else {
                lang = tiny_lang.defaultLang;
            }
        }

        // Result
        let result = null;

        // Exist Default Value
        try {
            result = tiny_lang.list[tiny_lang.defaultLang][value];
        } catch (err) {
            result = null;
        }

        // Exist Value
        if (lang !== tiny_lang.defaultLang && typeof tiny_lang.list[lang][value] === "string") {
            result = tiny_lang.list[lang][value];
        }

        // Return Result
        return result;

    },

    // Builder
    load: async function (lang_name, values, safeDS) {

        // Detect is String
        if (typeof lang_name === "string") {

            try {

                // Is New
                let isNew = true;

                // Start the Variable
                if (!tiny_lang.list[lang_name]) {

                    // Create Language
                    tiny_lang.list[lang_name] = {};

                    // Emit Event
                    await safeDS.events.emit('langAdd', lang_name);

                }

                // Nope
                else {

                    // Not New
                    isNew = false;

                    // Emit Event
                    await safeDS.events.emit('langUpdate', lang_name);

                }

                // Build the language
                for (const item in values) {
                    if (typeof values[item] === "string") {

                        // Anti Duplicator
                        if (typeof tiny_lang.list[lang_name][item] !== "string") {

                            // Add Language
                            tiny_lang.list[lang_name][item] = values[item];

                            // Emit Event
                            await safeDS.events.emit('langValueAdded', { lang: lang_name, item: item, value: values[item], isAuthorValue: false });

                        }

                        // Extra Author
                        else if (item === "lang_author" || item === "lang_homepage") {

                            // Add Language
                            tiny_lang.list[lang_name][item] += ` | ${values[item]}`;

                            // Emit Event
                            await safeDS.events.emit('langValueAdded', { lang: lang_name, item: item, value: values[item], isAuthorValue: true });

                        }

                    }
                }

                // is New
                if (isNew) {

                    // Emit Event
                    await safeDS.events.emit('langAdded', lang_name);

                }

                // Nope
                else {

                    // Emit Event
                    await safeDS.events.emit('langUpdated', lang_name);

                }

                // Complete
                return { success: true };

            }

            // Error
            catch (err) {
                delete tiny_lang.list[lang_name];
                return { success: false, error: err };
            }

        }

        // Nope
        else {
            return { success: false, error: new Error('Invalid Language Name!') };
        }

    },

    // Get All
    getAll: function (lang = null) {

        // Clone Module
        const clone = require('clone');

        // Get One Language
        if (typeof lang === "string") {

            // Exist
            if (tiny_lang.list[lang]) {
                return clone(tiny_lang.list[lang]);
            }

            // Nope
            else {
                return null;
            }

        }

        // Get Complete List
        else {
            return clone(tiny_lang.list);
        }

    },

    // Get List
    getList: function () {

        // Prepare List
        const tiny_list = [];

        // Get Items from the list
        for (const item in tiny_lang.list) {
            tiny_list.push({
                value: item,
                name: tiny_lang.list[item].lang_name,
                author: tiny_lang.list[item].lang_author,
                homepage: tiny_lang.list[item].lang_homepage
            });
        }

        // Return the List
        return tiny_list;

    },

    // Exist Lang
    exist: function (lang = null) {

        // Is String
        if (typeof lang === "string") {

            // Check
            if (tiny_lang.list[lang]) {
                return true;
            }

            // Nope
            else {
                return false;
            }

        }

        // Nope
        else {
            return false;
        }

    }

};

// Module Export
module.exports = {
    
    // Set Main Lang
    setMainLang: function (value) {

        if (tiny_lang.exist(value)) {
            tiny_lang.mainLang = value;
            return true;  
        } else {
            return false;
        }

    },

    // Others
    defaultLang: tiny_lang.defaultLang,
    getAll: tiny_lang.getAll,
    load: tiny_lang.load,
    get: tiny_lang.get,
    exist: tiny_lang.exist,
    getList: tiny_lang.getList
    
};