// Modules
const clone = require('clone');

// The System
const safeDS = {};

// Cache Messages
safeDS.messageCache = require('./functions/message_cache');
safeDS.messageCache.start(safeDS);

// Main Items
safeDS.package = require('./package.json');
safeDS.appName = 'Discord Bot Control';
safeDS.discordInvite = 'https://discord.gg/TgHdvJd';

// Console Log
safeDS.console = require('./functions/console');
safeDS.console.start(safeDS);

// Prepare Lang Script
safeDS.lang = require('./functions/lang');

// Reactions
safeDS.reactions = require('./functions/reactions');
safeDS.reactions.start(safeDS);

// Prepare Commands
safeDS.defaultCommands = [

    // Commands
    require('./commands/sound'),
    require('./commands/dm'),
    //require('./commands/presence'),

    require('./commands/channel'),
    require('./commands/user'),
    require('./commands/leave_channel'),

    require('./commands/voice_channel'),
    require('./commands/leave_voice'),

    require('./commands/status'),
    require('./commands/react'),

    //require('./commands/shutdown'),
    require('./commands/about'),

    // Users Manager
    require('./commands/block_user'),
    require('./commands/admin_manager'),
    require('./commands/reaction_manager'),
    require('./commands/embed_color'),
    require('./commands/change_lang'),
    require('./commands/prefix'),
    require('./commands/block_prefix'),
    require('./commands/warn_no_admins_dm')

];

safeDS.finalCommands = [

    // Final Search
    require('./commands/help'),
    require('./commands/not_found'),

    // Send Message
    require('./bot_message/send')

];

safeDS.commands = [];

// Load Sound Files
safeDS.soundManager = require('./functions/sound_manager');

// First Time
safeDS.firstTime = true;

// Bot List
safeDS.bot = {};

// System Functions
safeDS.functions = {

    // Get Emoji ID
    getEmojiID: function(value) {
        const new_value = value.match(/^<(a?):(\w+):(\d+)>/);
        if (new_value) {
            const new_value_index = new_value.length - 1;
            if (new_value[new_value_index]) {
                return new_value[new_value_index];
            } else {
                return value;
            }
        } else {
            return value;
        }
    },

    // Get Pagination
    getPaginationText: function(paginateCollection, dataLang) {
        return safeDS.lang.get('pagination_base', dataLang).replace('{currect_page}', paginateCollection.currentPage).replace('{total}', paginateCollection.total).replace('{total_pages}', paginateCollection.totalPages);
    },

    // Get Package Author
    getModuleAuthor: function() {

        // String
        if (typeof safeDS.package.author === "string") {
            return safeDS.package.author;
        }

        // Object
        if (typeof safeDS.package.author.name === "string") {
            return safeDS.package.author.name;
        }

        // What
        else {
            return '{ERROR GET AUTHOR NAME}';
        }

    },

    // Start Bot
    start: async function(data, token, anti_user_repeat) { return await require('./functions/start_bot')(data, token, anti_user_repeat, safeDS); },

    // DM Receiver
    dmReceiver: async(msg, admin, adminCfg, message, anti_user_repeat, data) => {
        return require('./bot_message/dm_receiver')(msg, admin, adminCfg, message, anti_user_repeat, data, safeDS);
    },

    // User Role Checker
    userRoleChecker: require('./functions/user_role_checker'),

    // Message
    message: async(msg, data) => {
        return require('./functions/message')(msg, data, safeDS, ds);
    },

    // Update Message
    updateMessage: async(old_msg, msg, data) => {
        return require('./functions/bot_message_manager')('edit', old_msg, msg.author, msg, data, safeDS);
    },

    // Reaction
    messageReaction: async(reaction, user, data, type) => {
        return require('./functions/bot_message_manager')('reaction' + type, reaction, user, reaction.message, data, safeDS);
    },

    messageReactionRemoveAll: async(msg, data) => {
        return require('./functions/bot_message_manager')('removeAllReactions', {}, msg.author, msg, data, safeDS);
    },

    // Delete Message
    deleteMessage: async(msg, data) => {
        return require('./functions/bot_message_manager')('delete', {}, msg.author, msg, data, safeDS);
    }

};

// Config Manager
safeDS.configManager = require('./settings/manager');

// Events
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
safeDS.events = new MyEmitter();

// The Module
const ds = {

    // Get Emoji ID
    getEmojiID: function(value) {
        return safeDS.functions.getEmojiID(value);
    },

    // Get Pagination Text
    getPaginationText: function(paginateCollection, dataLang) {
        return safeDS.functions.getPaginationText(paginateCollection, dataLang);
    },

    // Reactions
    reactions: {

        // Get Reaction
        get: function(value, botIndex, isIDReturn) {
            return safeDS.reactions.get(value, botIndex, isIDReturn);
        }

    },

    // Console
    console: {

        // Control FIle
        file: safeDS.console.generator(),

        // CMD
        cmd: {

            // Warn
            warn: function() {
                return safeDS.console.cmd.warn.apply(safeDS.console, arguments);
            },

            // Warn
            log: function() {
                return safeDS.console.cmd.log.apply(safeDS.console, arguments);
            },

            // Warn
            error: function() {
                return safeDS.console.cmd.error.apply(safeDS.console, arguments);
            },

            // Event
            event: function() {
                return safeDS.console.cmd.event.apply(safeDS.console, arguments);
            }

        },

        // Discord
        discord: {

            // Warn
            warn: function() {
                return safeDS.console.discord.warn.apply(safeDS.console, arguments);
            },

            // Warn
            log: function() {
                return safeDS.console.discord.log.apply(safeDS.console, arguments);
            },

            // Warn
            error: function() {
                return safeDS.console.discord.error.apply(safeDS.console, arguments);
            }

        }

    },

    // Add Events
    on: function(value, callback) {
        return safeDS.events.on(value, callback);
    },

    once: function(value, callback) {
        return safeDS.events.once(value, callback);
    },

    // Remove Events
    off: function(value, callback) {
        return safeDS.events.off(value, callback);
    },

    // Trigger Event
    emit: function() {
        return safeDS.events.emit.apply(safeDS.events, arguments);
    },

    // Lang Load
    loadLang: function(lang_name, values) {
        return safeDS.lang.load(lang_name, values, safeDS);
    },

    // Get Lang
    getLang: function(lang) {
        return safeDS.lang.getAll(lang);
    },

    setMainLang: function(lang) {
        return safeDS.lang.setMainLang(lang);;
    },

    // Get Bot
    getBot: function(index) {
        if (safeDS.bot[index]) {
            return safeDS.bot[index];
        } else {
            return null;
        }
    },

    // Get List
    getLangList: function() {
        return safeDS.lang.getList();
    },

    // Exist
    langExist: function(lang) {
        return safeDS.lang.exist(lang);
    },

    // Get Lang Value
    getLangValue: function(value, lang) {
        return safeDS.lang.get(value, lang);
    },

    // Message Tag
    messageTag: clone(safeDS.messageTag),

    // Settings
    config: {

        // Global
        global: {

            // Set New Option
            set: function(where, value) {
                return safeDS.configManager.global.set(where, value, safeDS);
            },

            get: function(where) {
                return safeDS.configManager.global.get(where, safeDS);
            },

        },

        // Bot
        bot: {

            // Set New Option
            set: function(index, where, value) {
                return safeDS.configManager.bot.set(index, where, value, safeDS);
            },

            // Get
            get: function(index, where) {
                return safeDS.configManager.bot.get(index, where, safeDS);
            },

        },

        // User
        user: {

            // Validator
            validator: function(b_index, index) {
                return safeDS.configManager.user.validator(b_index, index, safeDS);
            },

            // Set New Option
            set: function(b_index, index, where, value) {
                return safeDS.configManager.user.set(b_index, index, where, value, safeDS);
            },

            // Get
            get: function(b_index, index, where) {
                return safeDS.configManager.user.get(b_index, index, where, safeDS);
            },

            // Delete
            delete: function(index, b_index) {
                return safeDS.configManager.user.delete(index, b_index, safeDS);
            },

        },

        // All Users
        allUsers: {

            // Set New Option
            set: function(b_index, where, value) {
                return safeDS.configManager.allUsers.set(where, value, b_index, safeDS);
            },

            // Get
            get: function(where, b_index) {
                return safeDS.configManager.allUsers.get(where, b_index, safeDS);
            },

            // Delete
            delete: function(b_index) {
                return safeDS.configManager.allUsers.delete(b_index, safeDS);
            },

        },

        // All Bots
        allBots: {

            // Set New Option
            set: function(where, value) {
                return safeDS.configManager.allBots.set(where, value, safeDS);
            },

            // Get
            get: function(where) {
                return safeDS.configManager.allBots.get(where, safeDS);
            },

        },

        // Get All
        getAll: function() {
            return safeDS.configManager.getAll(safeDS);
        }

    }

};

// Start Module
ds.start = async function(tinyCfg) { return require('./functions/start')(tinyCfg, safeDS) };

// Detect Shutdown
const ON_DEATH = require('death');
safeDS.close_app = async function(signal, err) { return require('./functions/close_app')(signal, err, safeDS); };
ON_DEATH(safeDS.close_app);

/*

process.on('SIGINT', safeDS.close_app);
process.on('SIGQUIT', safeDS.close_app);
process.on('SIGTERM', safeDS.close_app);

*/

// Prepare Module
module.exports = ds;