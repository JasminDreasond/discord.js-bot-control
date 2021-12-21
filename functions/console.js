// Create Console
const tiny_console = {

    start: function(safeDS) {

        // Console Generator
        tiny_console.generator = function() {

            // Generator Part 2
            const itemsGenerator = function(type) {

                // Return Items
                return {

                    // Global
                    global: function(callback, obj) {

                        // Convert String
                        if (typeof obj === "string") {
                            obj = [obj];
                        }

                        // Validator and Send
                        if (typeof callback === "string" && Array.isArray(obj) && tiny_console.files[type] && tiny_console.files[type].global && typeof tiny_console.files[type].global[callback] === "function") {

                            tiny_console.defaultConsoleCall('console', obj, 'cmd', 'base', 'base', false, false, false, 'global', callback, type);
                            return false;

                        } else {
                            return true;
                        }

                    },

                    // Bot
                    bot: function(id, callback, obj) {

                        // Convert String
                        if (typeof obj === "string") {
                            obj = [obj];
                        }

                        // Validator and Send
                        if (typeof id === "string" && id !== "global" && typeof callback === "string" && Array.isArray(obj) && tiny_console.files[type] && tiny_console.files[type][id] && typeof tiny_console.files[type][id][callback] === "function") {

                            tiny_console.defaultConsoleCall('console', obj, 'cmd', 'base', 'base', false, false, false, id, callback, type);
                            return false;

                        } else {
                            return true;
                        }

                    },

                };

            };

            // Result
            return {

                // The Log Commands
                cmd: itemsGenerator('cmd'),
                mod: itemsGenerator('mod'),

                // Create User DS Log
                sendDSUserLog: async function(msg, type2, where, type, message, extra, isGlobal = false) {

                    // Send Bot Console Message
                    if (!isGlobal) {
                        safeDS.console.file[where].bot(msg.client.user.id, type, `[${msg.author.id}] [${msg.author.tag}] [${msg.content}] ${message}`);
                    } else {
                        safeDS.console.file[where].global(type, `[${msg.author.id}] [${msg.author.tag}] [${msg.content}] ${message}`);
                    }

                    // Send Message
                    if (!extra) {
                        await msg.channel.send(safeDS.console.discord[type2](message));
                    } else {
                        await msg.channel.send(safeDS.console.discord[type2](message, extra));
                    }

                    // Complete
                    return;

                }

            };

        };

        // Variables Text
        safeDS.messageTag = {
            cmd: {},
            discord: {}
        };

        // Prepare Module
        const log = require('simple-node-logger');
        const path = require('path');

        // Prepare Console Color
        const chalk = require('chalk');

        // Template
        safeDS.messageTag.cmd.template = '[DBC SYSTEM] ';

        // Values
        safeDS.messageTag.discord.base = '**' + safeDS.messageTag.cmd.template + '** ';
        safeDS.messageTag.discord.error = safeDS.messageTag.discord.base + '**[ERROR]** ';
        safeDS.messageTag.discord.warn = safeDS.messageTag.discord.base + '**[WARN]** ';

        safeDS.messageTag.cmd.base = chalk.bold.green(safeDS.messageTag.cmd.template);
        safeDS.messageTag.cmd.error = chalk.bold.red(safeDS.messageTag.cmd.template + '[ERROR] ');
        safeDS.messageTag.cmd.warn = chalk.bold.yellow(safeDS.messageTag.cmd.template + '[WARN] ');
        safeDS.messageTag.cmd.event = chalk.bold.blue(safeDS.messageTag.cmd.template + '[EVENT] ');
        safeDS.messageTag.cmd.eventFile = chalk.bold.blue('[EVENT] ');

        // Validator Value
        tiny_console.defaultConsoleCall = function(c_type, args, where, type, tagType, force_console, noClock = false, can_console = false, custom_file = null, where_custom_file = null, type_custom_type = null) {

            // Check
            if (typeof safeDS.messageTag[where] !== "undefined" && typeof safeDS.messageTag[where][tagType] === "string") {

                // Base
                const args_list = [];
                const args_file = [];
                let tiny_type = type;

                if (tiny_type === "event") {
                    tiny_type = 'log';
                }

                // Is Array
                let first_item = true;
                for (const item in args) {

                    // Anti Bug
                    if (!force_console || Number(item) !== 0) {

                        // All
                        if (!first_item) {

                            // Console
                            if (can_console) {
                                args_list.push(args[item]);
                            }

                            // File
                            if (tiny_console.files && c_type !== "discord") {
                                args_file.push(args[item]);
                            }

                        }

                        // First Value
                        else {

                            // Confirm
                            first_item = false;

                            // Prepare Time Console
                            let time_arg = '';

                            // File Base
                            let filebase = '';

                            // Prepare Clock
                            if (tiny_console.moment && !noClock) {
                                time_arg = chalk.bold.gray(`${tiny_console.moment().format(tiny_console.time_format.console)} `);
                                filebase = chalk.bold.gray(`${tiny_console.moment().format(tiny_console.time_format.console_file)} `);
                            }

                            // Is Event
                            if (tagType === "event") {
                                filebase += safeDS.messageTag[where].eventFile;
                            }

                            // Is Text
                            if (typeof args[item] === "string") {

                                // Console
                                if (can_console) {
                                    args_list.push(`${time_arg}${safeDS.messageTag[where][tagType]}${args[item]}`);
                                }

                                // Console FIle
                                if (tiny_console.files && c_type !== "discord") {
                                    args_file.push(`${filebase}${args[item]}`);
                                }

                            }

                            // Nope
                            else {

                                // Console
                                if (can_console) {
                                    args_list.push(`${time_arg}${safeDS.messageTag[where][tagType]}`);
                                    args_list.push(args[item]);
                                }

                                // Console File
                                if (tiny_console.files && c_type !== "discord") {
                                    args_file.push(filebase);
                                    args_file.push(args[item]);
                                }

                            }

                        }

                    }

                }

                // Console Log File
                if (tiny_console.files && c_type !== "discord") {

                    // Log File Type
                    let file_log_type = tiny_type;

                    // Convert Log
                    if (file_log_type === "log") {
                        file_log_type = 'info';
                    }

                    // Send Log
                    if (typeof custom_file !== "string" || !tiny_console.files[type_custom_type][custom_file] || typeof tiny_console.files[type_custom_type][custom_file][where_custom_file] !== "function") {
                        tiny_console.files.cmd.global[file_log_type].apply(tiny_console.files.cmd.global, args_file);
                    } else {
                        tiny_console.files[type_custom_type][custom_file][where_custom_file].apply(tiny_console.files.cmd[custom_file], args_file);
                    }

                }

                // Result
                return { items: args_list, type: tiny_type };

            }

            // Nope
            else {
                throw new Error('Invalid Console Item!');
            }

        };

        // Create Item Console Base
        const createConsoleItemBase = function(baseName, item, itemName = null, callback) {

            // Fix Item Name
            if (typeof itemName !== "string") {
                itemName = item;
            }

            // Create New
            if (typeof tiny_console[baseName][item] !== "function" && typeof item === "string") {

                // Start Value
                tiny_console[baseName][item] = function() {

                    // Force Console
                    const force_console = (Object.prototype.toString.call(arguments[0]).toLocaleLowerCase() === '[object object]' && typeof arguments[0].FORCEDBCCONSOLE === "boolean" && arguments[0].FORCEDBCCONSOLE === true);
                    return callback(arguments, baseName, item, itemName, force_console);

                };

            }

            // Complete
            return;

        };

        // Create Console
        tiny_console.cmd = {};
        const console_result = function(original_args, baseName, item, itemName, force_console) {

            const can_console = (item === "error" || (safeDS.config && safeDS.config.showLogs) || force_console);

            // Convert to Array
            const args = tiny_console.defaultConsoleCall('console', original_args, baseName, item, itemName, force_console, false, can_console);

            // Return Console
            if (can_console) {
                return console[args.type].apply(console, args.items);
            }

        };

        createConsoleItemBase('cmd', 'warn', null, console_result);
        createConsoleItemBase('cmd', 'error', null, console_result);
        createConsoleItemBase('cmd', 'log', 'base', console_result);
        createConsoleItemBase('cmd', 'event', null, console_result);

        // Create Discord
        tiny_console.discord = {};
        const discord_result = function(original_args, baseName, item, itemName) {

            // Convert to Array
            try {

                // Validate String
                if (typeof original_args[0] === "string") {

                    // Get Value
                    const args = tiny_console.defaultConsoleCall('discord', [original_args[0]], baseName, item, itemName, false, true, true);

                    // Return Console
                    if (typeof args.items[0] === "string") {
                        return args.items[0];
                    } else {
                        return null;
                    }

                }

                // Nope
                else {
                    return null;
                }

            } catch (err) {
                tiny_console.cmd.error(err);
                return null;
            }

        };

        createConsoleItemBase('discord', 'warn', null, discord_result);
        createConsoleItemBase('discord', 'error', null, discord_result);
        createConsoleItemBase('discord', 'log', 'base', discord_result);

        // Create
        const fs = require('fs');
        const create_log = function(folder, resolver = function() { return; }, fail = function() { return; }) {

            // Create Main Folder
            try {

                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder);
                    resolver(folder);
                } else if (!fs.lstatSync(folder).isDirectory()) {

                    // Create Error
                    const err = new Error(`The log path "${folder}" is not a directory!`);

                    // Cancel Log
                    tiny_console.cmd.error(err);
                    fail(folder, err);

                } else {
                    resolver(folder);
                }

            } catch (err) {

                // Cancel Log
                tiny_console.cmd.error(err);
                fail(folder, err);

            }

            // Complete
            return;

        };

        // Start The File
        tiny_console.startFiles = async function() {

            // Exist Folder
            tiny_console.folder = null;

            // Install Modules
            tiny_console.moment = require('moment-timezone');

            // Clock Format
            tiny_console.time_format = {};

            // Set Timezone
            if (typeof safeDS.config.log_timezone === "string") {
                tiny_console.moment.tz.setDefault(safeDS.config.log_timezone);
                delete safeDS.config.log_timezone;
            }

            // Prepare Clock
            if (typeof safeDS.config.log_time_24hours === "boolean" && safeDS.config.log_time_24hours === true) {
                tiny_console.time_format.withSeconds = "hh:mm:ss a";
                tiny_console.time_format.withoutSeconds = "hh:mm a";
            } else {
                tiny_console.time_format.withSeconds = "HH:mm:ss";
                tiny_console.time_format.withoutSeconds = "HH:mm";
            }

            // Prepare Calendar
            tiny_console.time_format.calendar2 = 'dddd, MMMM Do YYYY';
            tiny_console.time_format.calendar = 'MM-DD-YYYY';
            tiny_console.time_format.console = '\\[ZZ\\] \\[' + tiny_console.time_format.calendar + '\\] \\[' + tiny_console.time_format.withSeconds + '\\]';
            tiny_console.time_format.console_file = '\\[ZZ\\] \\[' + tiny_console.time_format.withSeconds + '\\]';

            if (typeof safeDS.config.log_folder === "string") {

                // Create Main Folder
                create_log(safeDS.config.log_folder, function(folder) {
                    tiny_console.folder = safeDS.config.log_folder;
                }, function(folder) {
                    tiny_console.folder = null;
                });

            }

            // Exist Folder
            if (tiny_console.folder) {

                // Delete Variable
                delete safeDS.config.log_folder;

                // Prepare Files
                tiny_console.files = {
                    cmd: {},
                    mod: {}
                };

                // Folder
                const main_folder = path.join(tiny_console.folder, './global');
                const mod_folder = path.join(tiny_console.folder, './mod_global');

                // Create Folder
                create_log(main_folder, function() {

                    // Prepare Global
                    tiny_console.files.cmd.global = log.createRollingFileLogger({
                        logDirectory: main_folder,
                        fileNamePattern: '<DATE>.log',
                        dateFormat: 'YYYY.MM.DD'
                    });

                });

                // Create Folder
                create_log(mod_folder, function() {

                    // Prepare Global
                    tiny_console.files.mod.global = log.createRollingFileLogger({
                        logDirectory: mod_folder,
                        fileNamePattern: '<DATE>.log',
                        dateFormat: 'YYYY.MM.DD'
                    });

                });

            }

            // Complete
            return;

        };

        // Start The File
        tiny_console.startBotFile = async function(id) {

            // Exist Folder
            if (tiny_console.files) {

                // Folder
                const main_folder = path.join(tiny_console.folder, './' + id);
                const mod_folder = path.join(tiny_console.folder, './mod_' + id);

                // Create Folder
                create_log(main_folder, function() {

                    // Prepare Global
                    tiny_console.files.cmd[id] = log.createRollingFileLogger({
                        logDirectory: main_folder,
                        fileNamePattern: '<DATE>.log',
                        dateFormat: 'YYYY.MM.DD'
                    });

                });

                // Create Folder
                create_log(mod_folder, function() {

                    // Prepare Global
                    tiny_console.files.mod[id] = log.createRollingFileLogger({
                        logDirectory: mod_folder,
                        fileNamePattern: '<DATE>.log',
                        dateFormat: 'YYYY.MM.DD'
                    });

                });

            }

            // Complete
            return;

        };

        // Complete
        return;

    }

};

// Send Console
module.exports = tiny_console;