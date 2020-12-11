module.exports = async function (tinyCfg, safeDS) {

    // Detect First Time
    if (safeDS.firstTime) {

        // Prepare Module
        const { join } = require('path');
        const { readdirSync, existsSync, mkdirSync } = require('fs');
        const default_settings = require('../settings/default');

        // Lang Folder
        const lang_folder = join(__dirname, '../lang');

        // Get Lang Files
        const getLangFiles = readdirSync(lang_folder, { withFileTypes: true })
            .filter(dirent => dirent.isFile())
            .map(dirent => dirent.name);

        // Loading First Language
        const default_lang_index = getLangFiles.findIndex(t_lang => t_lang.startsWith(safeDS.lang.defaultLang + '.'));
        if (default_lang_index > -1 && (getLangFiles[default_lang_index].endsWith('.js') || getLangFiles[default_lang_index].endsWith('.json'))) {

            // Load the Language
            const main_lang_result = await safeDS.lang.load(getLangFiles[default_lang_index].split('.')[0], require(join(lang_folder, '/' + getLangFiles[default_lang_index])), safeDS);
            if (main_lang_result.success) {

                // Console Warn
                safeDS.console.cmd.log({ FORCEDBCCONSOLE: true }, `${safeDS.lang.get('starting_settings')}`);

                // Read Config
                safeDS.config = default_settings(tinyCfg);

                // Console Warn
                safeDS.console.cmd.log({ FORCEDBCCONSOLE: true }, `${safeDS.lang.get('settings_started')}`);

                // Prepare Console Functions
                safeDS.console.file = safeDS.console.generator();

                // Start Console Files
                await safeDS.console.startFiles();

                // Console Warn
                safeDS.console.cmd.log(`${safeDS.lang.get('starting_language')}`);

                // Read Files
                for (const item in getLangFiles) {

                    // Load FIle
                    const lang_name = getLangFiles[item].split('.')[0];
                    if ((getLangFiles[item].endsWith('.js') || getLangFiles[item].endsWith('.json')) && lang_name !== safeDS.lang.defaultLang) {

                        // Build Default Lang
                        const lang_result = await safeDS.lang.load(lang_name, require(join(lang_folder, '/' + getLangFiles[item])), safeDS);

                        // Success
                        if (lang_result.success) {

                            // Console Warn
                            safeDS.console.cmd.log(`${safeDS.lang.get('language_loaded')}`.replace('{lang}', lang_name));

                        }

                        // Nope
                        else {

                            // Console Warn
                            safeDS.console.cmd.error(lang_result.error);

                        }

                    }

                    // Default Value
                    else if (lang_name === safeDS.lang.defaultLang) {
                        safeDS.console.cmd.log(`${safeDS.lang.get('language_loaded')}`.replace('{lang}', lang_name));
                    }

                }

                // Console Warn
                safeDS.console.cmd.log(`${safeDS.lang.get('languages_started')}`);

                // Set Main Language of the application
                safeDS.lang.setMainLang(safeDS.config.lang);

                if (typeof safeDS.config.lang !== "undefined") {
                    delete safeDS.config.lang;
                }

                // Welcome
                safeDS.console.cmd.log(`${safeDS.lang.get('starting_app')}`.replace('{appname}', safeDS.appName));

                // Check First Time
                safeDS.firstTime = false;

                // Console Warn
                safeDS.console.cmd.log(`${safeDS.lang.get('starting_commands')}`);

                // Prepare Commands
                for (const item in safeDS.defaultCommands) {

                    safeDS.commands.push(safeDS.defaultCommands[item]);

                    // Console Warn
                    safeDS.console.cmd.log(`${safeDS.lang.get('list_commands_loaded')}`.replace('{command}', safeDS.defaultCommands[item].prefix));

                }

                // Console Warn
                safeDS.console.cmd.log(`${safeDS.lang.get('commands_started')}`);

                // Prepare Sound Files and start app var
                let start_app_continue = await safeDS.soundManager.start(safeDS);

                // Continue the Application
                if (start_app_continue) {

                    // Custom Command List
                    safeDS.custom_commandsIDs = [];

                    // Custom Commands
                    const add_custom_commands = async function (command_list) {

                        if (Array.isArray(command_list)) {
                            for (const item in command_list) {

                                // Convert
                                if (typeof command_list[item] === "string") {
                                    command_list[item] = await require(command_list[item]);
                                }

                                // Add Command
                                if (Object.prototype.toString.call(command_list[item]).toLocaleLowerCase() === '[object object]') {

                                    // Insert Command
                                    safeDS.commands.push(command_list[item]);

                                    // Define Custom Command
                                    safeDS.custom_commandsIDs.push(String(safeDS.commands.length - 1));

                                    // Console Warn
                                    safeDS.console.cmd.log(`${safeDS.lang.get('list_commands_loaded')}`.replace('{command}', command_list[item].prefix));

                                }

                            }
                        }

                    };

                    // Console Warn
                    safeDS.console.cmd.log(`${safeDS.lang.get('starting_list_commands')}`);

                    // Global
                    await add_custom_commands(safeDS.config.commands);

                    // Create Folder and Data
                    if (typeof safeDS.config.storage_folder === "string") {

                        // Console Warn
                        safeDS.console.cmd.log(`${safeDS.lang.get('starting_global_storage')}`);

                        // Prepare Folder and Module
                        const JSONStore = require('data-store');

                        // Create Database
                        try {

                            // Create Folder
                            if (!existsSync(safeDS.config.storage_folder,)) {
                                mkdirSync(safeDS.config.storage_folder);
                            }

                            // Prepare Storage
                            safeDS.storage = {
                                global: JSONStore({ path: join(safeDS.config.storage_folder, '/global.json') }),
                                users: {},
                                bots: {}
                            };

                            // Load Database
                            for (const item in safeDS.config) {
                                if (item !== "discord" && item !== "storage_folder" && item !== "sound_folder" && item !== "log_folder" && item !== "log_timezone" && item !== "log_time_24hours") {

                                    // Get Data
                                    const tiny_data = await safeDS.storage.global.get(item);

                                    // Install Data
                                    if (typeof tiny_data === "undefined") {
                                        await safeDS.storage.global.set(item, safeDS.config[item]);
                                    }

                                    // Nope
                                    else {
                                        await safeDS.configManager.global.set(item, tiny_data, safeDS);;
                                    }

                                }
                            }

                            // Console Warn
                            safeDS.console.cmd.log(`${safeDS.lang.get('started_global_storage')}`);

                        }

                        // Fail
                        catch (err) {

                            // Cancel App
                            safeDS.storage = null;
                            safeDS.console.cmd.error(err);

                            return safeDS.close_app(`${err.message}`);

                        }

                    }

                    // Nope
                    else {
                        safeDS.storage = null;
                    }

                    // Anti Repeat
                    const anti_user_repeat = [];

                    // Read Bots
                    for (let i = 0; i < safeDS.config.discord.bots.length; i++) {

                        // Prepare Data
                        safeDS.config.discord.bots[i].index = i;
                        safeDS.config.discord.bots[i].prefix = safeDS.config.discord.bots[i].prefix.toLocaleLowerCase();
                        safeDS.config.discord.bots[i].users = {};

                        // Bot Commands
                        await add_custom_commands(safeDS.config.discord.bots[i].commands);

                        // Send Start
                        await safeDS.functions.start(safeDS.config.discord.bots[i], safeDS.config.discord.bots[i].token, anti_user_repeat);

                    }

                    // Console Warn
                    safeDS.console.cmd.log(`${safeDS.lang.get('list_commands_started')}`);

                    // Emit Event
                    await safeDS.events.emit('ready');

                    // Console Warning
                    safeDS.console.cmd.log(`${safeDS.lang.get('ready_app')}`);

                }

            }

            // Nope
            else {
                return safeDS.close_app(main_lang_result.error.message);
            }

        }

        // Nope
        else {
            return safeDS.close_app(`INVALID DEFAULT LANGUAGE!`);
        }

    }

    // Return
    return;

};