// Default Values
const default_values = {

    // Reactions
    reactions: {
        success: '✅',
        error: '🚫',
        blocked: '❌',
        timeout: '⏰'
    },

    // Discord
    discord: {
        bots: [{

            // Settings
            token: "",
            lang: null,
            prefix: '!',
            block_prefix: [],
            warnNoAdminsDM: true,
            shutdownStatus: true,
            allowGlobalDM: true,

            // Reactions
            reactions: {
                success: '✅',
                error: '🚫',
                blocked: '❌',
                timeout: '⏰'
            },

            // Color
            color: 0,

            // Logs
            logs: {
                error: true,
                warn: true,
                rateLimit: true,
                disconnect: true
            },

            // Welcome
            welcome: true,
            logoff_warn: true,

            // Users Cache
            users: {},

            // Anti Flood
            msg_checker: async function(msg, cfg, perm_check) {

                // Permission
                const perms = await perm_check();

                // Return
                return { confirmed: true, perms: perms };

            },

            // Admins
            admin: [],

            // Admin Role
            adminRoles: [],

            // Super Admin
            superAdmin: [],

            // Custom Commands
            commands: [],

            // Blocked Users
            block_user: []

        }]
    },

    // Welcome
    welcome: true,
    logoff_warn: true,

    // Allow Shutdown
    allowShutdown: true,

    // Super Admin
    superAdmin: [],

    // Anti Flood
    msg_checker: async function(msg, cfg, perm_check) {

        // Permission
        const perms = await perm_check();

        // Return
        return { confirmed: true, perms: perms };

    },

    // Custom Commands
    commands: [],

    // Storage Folder
    storage_folder: null,

    // Sound Folder
    sound_folder: null,

    // Log Folder
    log_folder: null,

    // Log 24 Hours
    log_time_24hours: false,

    // Log Timezone
    log_timezone: null,

    // Main Lang
    lang: 'en',

    // Show Logs
    showLogs: true,

    // Message Cache Time
    messageCacheTime: 3600

};

module.exports = function(tinyCfg) {

    // Prepare Modules
    const clone = require('clone');
    const _ = require('lodash');

    // Create Settings
    return _.defaultsDeep({}, tinyCfg, clone(default_values));

};