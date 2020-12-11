// Get Module
const clone = require('clone');

// Base
const settings_manager = {

    // Global
    global: {

        // Set
        set: async function (where, value, safeDS) {

            // Result
            const result = { success: false };

            // Validate Where
            if (typeof where === "string" && where !== "discord" && where !== "commands" && where !== "storage_folder" && where !== "sound_folder" && where !== "log_folder" && where !== "log_timezone" && where !== "log_time_24hours") {

                // Try Edit
                try {

                    // Set JSON
                    if (safeDS.storage) {
                        if (typeof value !== "undefined") {
                            await safeDS.storage.global.set(where, value);
                        } else {
                            await safeDS.storage.global.del(where);
                        }
                    }

                    // Insert Cache
                    if (typeof value !== "undefined") {
                        safeDS.config[where] = value;
                    } else {
                        delete safeDS.config[where];
                    }
                    result.success = true;

                    // Emit Event
                    await safeDS.events.emit(`cfgUpdated_global.${where}`, { value: clone(safeDS.config[where]) });
                    await safeDS.events.emit(`cfgUpdated_global.*`, { value: clone(safeDS.config[where]), where: where });
                    await safeDS.events.emit(`cfgUpdated`, { value: clone(safeDS.config[where]), where: where, type: 'global' });

                }

                // Error
                catch (err) {
                    result.error = err;
                }

            }

            // Result
            return result;

        },

        // Get
        get: function (where, safeDS) {

            // Prepare Result
            let result = null;

            // Is Not Where
            if (typeof where !== "string") {
                result = {};
            }

            // Get Value
            if (typeof where === "string") {
                if (where !== "discord" && where !== "commands" && where !== "storage_folder" && where !== "sound_folder" && where !== "log_folder" && where !== "log_timezone" && where !== "log_time_24hours" && safeDS.config[where]) {
                    result = clone(safeDS.config[where]);
                }
            }

            // Get Configs
            else {
                for (const item in safeDS.config) {
                    if (item !== "discord" && item !== "commands" && item !== "storage_folder" && item !== "sound_folder" && item !== "log_folder" && item !== "log_timezone" && item !== "log_time_24hours") {
                        result[item] = clone(safeDS.config[item]);
                    }
                }
            }

            // Result
            return result;

        }

    },

    // Bot
    bot: {

        // Validate Bot Index
        validatorIndex: function (index, safeDS) {
            return ((typeof index === "number" || typeof index === "string") && safeDS.config.discord.bots[index]);
        },

        // Set
        set: async function (index, where, value, safeDS) {

            // Result
            const result = { success: false };

            // Validate Index and Where
            if (settings_manager.bot.validatorIndex(index, safeDS) && typeof where === "string" && where !== "token" && where !== "users" && where !== "commands" && where !== "sound_folder") {

                // Try Edit
                try {

                    // Set JSON
                    if (safeDS.storage) {
                        if (typeof value !== "undefined") {
                            await safeDS.storage.bots[index].set(where, value);
                        } else {
                            await safeDS.storage.bots[index].del(where);
                        }
                    }

                    // Insert Cache
                    if (typeof value !== "undefined") {
                        safeDS.config.discord.bots[index][where] = value;
                    } else {
                        delete safeDS.config.discord.bots[index][where];
                    }
                    result.success = true;

                    // Emit Event
                    await safeDS.events.emit(`cfgUpdated_bot.${index}.${where}`, { value: clone(safeDS.config.discord.bots[index][where]) });
                    await safeDS.events.emit(`cfgUpdated_bot.*`, { value: clone(safeDS.config.discord.bots[index][where]), bot: index, where: where });
                    await safeDS.events.emit(`cfgUpdated`, { value: clone(safeDS.config.discord.bots[index][where]), bot: index, where: where, type: 'bot' });

                }

                // Error
                catch (err) {
                    result.error = err;
                }

            }

            // Result
            return result;

        },

        // Get
        get: function (index, where, safeDS) {

            // Prepare Result
            let result = null;

            // Is Not Where
            if (typeof where !== "string") {
                result = {};
            }

            // Exist Value
            if (settings_manager.bot.validatorIndex(index, safeDS)) {

                // Get Configs

                // Value
                if (typeof where === "string") {
                    if (where !== "token" && where !== "users" && safeDS.config.discord.bots[index][where]) {
                        result = clone(safeDS.config.discord.bots[index][where]);
                    }
                }

                // Global
                else {
                    for (const item in safeDS.config.discord.bots[index]) {
                        if (item !== "token" && item !== "users") {
                            result[item] = clone(safeDS.config.discord.bots[index][item]);
                        }
                    }
                }

            }

            // Nope
            else {
                result = null;
            }

            // Result
            return result;

        }

    },

    // User
    user: {

        // Validate Bot Index
        validatorIndex: function (b_index, index, safeDS) {
            return ((typeof b_index === "number" || typeof b_index === "string") && (typeof index === "number" || typeof index === "string") && safeDS.config.discord.bots[b_index].users[index]);
        },

        validator: async function (b_index, index, safeDS) {

            // Create New
            if (safeDS.config.discord.bots[b_index] && !safeDS.config.discord.bots[b_index].users[index]) {
                safeDS.config.discord.bots[b_index].users[index] = {};
            }

            // Create File
            if (safeDS.storage.users[b_index] && !safeDS.storage.users[b_index][index]) {
                const JSONStore = require('data-store');
                const { join } = require('path');
                safeDS.storage.users[b_index][index] = await JSONStore({ path: join(safeDS.config.storage_folder, '/user_' + safeDS.bot[b_index].user.id + '_' + index + '.json') });
                await safeDS.events.emit('startAdminDatabase', { bot: b_index, userID: index, firstTime: false });
            }

            // Create Cache
            if (!safeDS.bot[b_index].dbc_cache.admins[index]) {
                safeDS.bot[b_index].dbc_cache.admins[index] = {};
            }

            return;

        },

        // Set
        set: async function (b_index, index, where, value, safeDS) {

            // Result
            const result = { success: false };

            // Exist Bot
            if (safeDS.config.discord.bots[b_index]) {

                // Create New
                if (!safeDS.config.discord.bots[b_index].users[index]) {
                    safeDS.config.discord.bots[b_index].users[index] = {};
                }

                // Create File
                if (safeDS.storage.users[b_index] && !safeDS.storage.users[b_index][index]) {
                    const JSONStore = require('data-store');
                    const { join } = require('path');
                    safeDS.storage.users[b_index][index] = await JSONStore({ path: join(safeDS.config.storage_folder, '/user_' + safeDS.bot[b_index].user.id + '_' + index + '.json') });
                    await safeDS.events.emit('startAdminDatabase', { bot: b_index, userID: index, firstTime: false });
                }

                // Create Cache
                if (!safeDS.bot[b_index].dbc_cache.admins[index]) {
                    safeDS.bot[b_index].dbc_cache.admins[index] = {};
                }

                // Validate Index and Where
                if (settings_manager.user.validatorIndex(b_index, index, safeDS) && typeof where === "string") {

                    // Try Edit
                    try {

                        // Set JSON
                        if (safeDS.storage) {
                            if (typeof value !== "undefined") {
                                await safeDS.storage.users[b_index][index].set(where, value);
                            } else {
                                await safeDS.storage.users[b_index][index].del(where);
                            }
                        }

                        // Insert Cache
                        if (typeof value !== "undefined") {
                            safeDS.config.discord.bots[b_index].users[index][where] = value;
                        } else {
                            delete safeDS.config.discord.bots[b_index].users[index][where];
                        }
                        result.success = true;

                        // Emit Event
                        await safeDS.events.emit(`cfgUpdated_user.${index}.${where}`, { value: clone(safeDS.config.discord.bots[b_index].users[index][where]), bot: b_index });
                        await safeDS.events.emit(`cfgUpdated_user.*`, { value: clone(safeDS.config.discord.bots[b_index].users[index][where]), bot: b_index, index: index, where: where });
                        await safeDS.events.emit(`cfgUpdated`, { value: clone(safeDS.config.discord.bots[b_index].users[index][where]), bot: b_index, index: index, where: where, type: 'user' });

                    }

                    // Error
                    catch (err) {
                        result.error = err;
                    }

                }

            }

            // Nope
            else {
                result.error = new Error('Guild not found.');
            }

            // Result
            return result;

        },

        // Get
        get: function (b_index, index, where, safeDS) {

            // Prepare Result
            let result = null;

            // Is Not Where
            if (typeof where !== "string") {
                result = {};
            }

            // Exist Bot
            if (safeDS.config.discord.bots[b_index]) {

                // Exist Value
                if (settings_manager.user.validatorIndex(b_index, index, safeDS)) {

                    // Get Value
                    if (typeof where === "string") {
                        if (safeDS.config.discord.bots[b_index].users[index][where]) {
                            result = clone(safeDS.config.discord.bots[b_index].users[index][where]);
                        }
                    }

                    // Get Configs
                    else {
                        for (const item in safeDS.config.discord.bots[b_index].users[index]) {
                            result[item] = clone(safeDS.config.discord.bots[b_index].users[index][item]);
                        }
                    }

                }

                // Nope
                else {
                    result = null;
                }

            }

            // Nope
            else {
                result = null;
            }

            // Result
            return result;

        },

        // Delete
        delete: async function (index, b_index, safeDS) {

            // Result
            let result = null;

            // Exist Bot
            if (safeDS.config.discord.bots[b_index]) {

                // Delete Function
                const delete_items = async function (b_index) {

                    // Detect Count
                    if (safeDS.config.discord.bots[b_index].users[index]) {

                        // Reset
                        try {

                            // Delete Cache
                            delete safeDS.config.discord.bots[b_index].users[index];

                            // Delete Cache
                            if (safeDS.bot[b_index].dbc_cache.admins[index]) {
                                delete safeDS.bot[b_index].dbc_cache.admins[index];
                            }

                            // Delete File
                            try {
                                await safeDS.storage.users[b_index][index].unlink();
                                delete safeDS.storage.users[b_index][index];
                            } catch (err) {
                                await safeDS.events.emit('error', err);
                            }

                            // Emit Event
                            await safeDS.events.emit(`cfgDeleted_user.` + index, { bot: b_index });
                            await safeDS.events.emit(`cfgDeleted_user.*`, { bot: b_index, index: index });
                            await safeDS.events.emit(`cfgDeleted`, { bot: b_index, index: index, type: 'user' });

                            return { success: true };

                        } catch (err) {
                            return { success: false, error: err };
                        }

                    }

                    // Nope
                    else {
                        return { success: false, error: Error('User Not Found.') };
                    }

                };

                // Check
                if (typeof b_index === "string" || typeof b_index === "number") {
                    result = await delete_items(b_index);
                }

                // Nope
                else {
                    for (const b_index in safeDS.config.discord.bots) {
                        result = [];
                        const final_value = delete_items(b_index);
                        result.push(final_value);
                    }
                }

            }

            // Return
            return result;

        }

    },

    // All Bots
    allUsers: {

        // Set
        set: async function (where, value, b_index = null, safeDS) {

            // Prepare Result
            let result = [];

            // Check
            if (typeof where === "string") {

                // Try Edit
                try {

                    // Normal
                    if (typeof b_index === "number" || typeof b_index === "string") {

                        // Get Bots
                        for (const item in safeDS.config.discord.bots[b_index].users) {
                            const final_value = await settings_manager.user.set(b_index, item, where, value, safeDS);
                            result.push(final_value);
                        }

                    }

                    // All
                    else {

                        // Get Bots
                        for (const b_index in safeDS.config.discord.bots) {
                            for (const item in safeDS.config.discord.bots[b_index].users) {
                                const final_value = await settings_manager.user.set(b_index, item, where, value, safeDS);
                                result.push(final_value);
                            }
                        }

                    }

                } catch (err) {
                    result.push({ success: false, error: err });
                }

            }

            // Result
            return result;

        },

        // Get
        get: function (where = null, b_index = null, safeDS) {

            // Prepare Variable
            let result = null;

            // All
            if (typeof where === "string" && where === "all") {
                where = null;
            }

            // Get Bots
            if (typeof b_index === "number" || typeof b_index === "string") {

                // Prepare Result
                result = [];

                // Create Result
                for (const item in safeDS.config.discord.bots[b_index].users) {
                    result.push(settings_manager.user.get(b_index, item, where, safeDS));
                }

            } else {

                // Prepare Result
                result = {};

                // Create Result
                for (const b_index in safeDS.config.discord.bots) {
                    result[b_index] = [];
                    for (const item in safeDS.config.discord.bots[b_index].users) {
                        result[b_index].push(settings_manager.user.get(b_index, item, where, safeDS));
                    }
                }

            }

            // Result
            return result;

        },

        // Delete
        delete: async function (b_index, safeDS) {

            // Result
            let result = null;

            // Delete Function
            const delete_items = async function (b_index) {

                const result = [];

                // Detect Count
                if (safeDS.config.discord.bots[b_index].users) {
                    if (Object.keys(safeDS.config.discord.bots[b_index].users).length > 0) {

                        // Reset
                        try {

                            // Delete
                            for (const item in safeDS.config.discord.bots[b_index].users) {

                                // Delete
                                delete safeDS.config.discord.bots[b_index].users[item];

                                // Delete File
                                try {
                                    await safeDS.storage.users[b_index][item].unlink();
                                    delete safeDS.storage.users[b_index][item];
                                } catch (err) {
                                    await safeDS.events.emit('error', err);
                                }

                                // Emit Event
                                await safeDS.events.emit(`cfgDeleted_user.` + item, { bot: b_index });
                                await safeDS.events.emit(`cfgDeleted_user.*`, { bot: b_index, index: item });
                                await safeDS.events.emit(`cfgDeleted`, { bot: b_index, index: item, type: 'user' });
                                result.push({ success: true, index: item });

                            }

                        } catch (err) {
                            result.push({ success: false, error: err });
                        }

                    }

                    // Nothing
                    else {
                        result.push({ success: false });
                    }
                }

                // Nope
                else {
                    safeDS.config.discord.bots[b_index].users = {};
                    result.push({ success: true });
                }

                return result;

            };

            // Check
            if (typeof b_index === "string" || typeof b_index === "number") {
                result = await delete_items(b_index);
            }

            // Nope
            else {
                for (const b_index in safeDS.config.discord.bots) {
                    result = [];
                    const final_value = delete_items(b_index);
                    result.push(final_value);
                }
            }

            // Return
            return result;

        }

    },

    // All Bots
    allBots: {

        // Set
        set: async function (where, value, safeDS) {

            // Prepare Result
            let result = [];

            // Get Bots
            for (const item in safeDS.config.discord.bots) {
                const final_value = await settings_manager.bot.set(item, where, value, safeDS);
                result.push(final_value);
            }

            // Result
            return result;

        },

        // Get
        get: function (where, safeDS) {

            // Prepare Result
            let result = [];

            // Exist Where
            if (typeof where === "string") {

                // Get Bots
                for (const item in safeDS.config.discord.bots) {
                    result.push(settings_manager.bot.get(item, where, safeDS));
                }

            }

            // All
            else {

                // Get Bots
                for (const item in safeDS.config.discord.bots) {
                    const final_value = settings_manager.bot.get(item, where, safeDS);
                    final_value.users = settings_manager.allUsers.get(where, item, safeDS);
                    result.push(final_value);
                }

            }

            // Result
            return result;

        }

    },

    // Get All
    getAll: function (safeDS) {

        // Prepare Result
        let result = settings_manager.global.get(null, safeDS);

        // Get Discord Values
        result.discord = {
            bots: settings_manager.allBots.get(null, safeDS)
        };

        // Result
        return result;

    }

};

// Prepare Module
module.exports = settings_manager;