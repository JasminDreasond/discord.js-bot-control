module.exports = async function (data, token, anti_user_repeat, safeDS) {

    // Is Token String
    if (typeof token === "string") {

        // Discord Module
        const Discord = require('discord.js');

        // Prepare Bot
        safeDS.bot[data.index] = new Discord.Client({ autoReconnect: true });

    }

    // Is Object
    else {

        // Prepare Bot
        safeDS.bot[data.index] = token;

    }

    // Ready
    safeDS.bot[data.index].on('ready', async () => {

        // Start Console Files
        await safeDS.console.startBotFile(safeDS.bot[data.index].user.id);

        // Console Warning
        safeDS.console.cmd.log(`${safeDS.lang.get('ready_bot')}`.replace('{bot}', safeDS.bot[data.index].user.tag));

        // Welcome Bot
        if (safeDS.bot[data.index].dbc_cache.firstTime) {

            // First Time Off
            safeDS.bot[data.index].dbc_cache.firstTime = false;

            // Load Module
            const path = require('path');

            // Load Sounds
            if (typeof safeDS.config.sound_folder === "string") {
                await safeDS.soundManager.functions.loadFolder(safeDS.bot[data.index].user.id, safeDS);
            }

            // Prepare Function
            let start_user_data_base = null;

            // Prepare Storage
            if (safeDS.config.storage_folder) {

                // Console Warn
                safeDS.console.cmd.log(`${safeDS.lang.get('starting_bot_storage')}`.replace('{tag}', safeDS.bot[data.index].user.tag).replace('{id}', safeDS.bot[data.index].user.id));

                // Module
                const JSONStore = require('data-store');

                // Create Database
                try {

                    // Create JSON
                    safeDS.storage.bots[data.index] = await JSONStore({ path: path.join(safeDS.config.storage_folder, '/bot_' + safeDS.bot[data.index].user.id + '.json') });
                    safeDS.storage.users[data.index] = {};

                    start_user_data_base = async function (userID) {

                        // User Admin Data
                        if (!safeDS.storage.users[data.index][userID]) {

                            // Prepare File
                            safeDS.storage.users[data.index][userID] = await JSONStore({ path: path.join(safeDS.config.storage_folder, '/user_' + safeDS.bot[data.index].user.id + '_' + userID + '.json') });;

                            // Load Database
                            if (typeof safeDS.config.discord.bots[data.index].users !== "undefined") {
                                safeDS.config.discord.bots[data.index].users = {};
                            }

                            // Read Data
                            if (typeof safeDS.config.discord.bots[data.index].users[userID] !== "undefined") {
                                for (const item in safeDS.config.discord.bots[data.index].users[userID]) {

                                    // Get Data
                                    const tiny_data = await safeDS.storage.users[data.index][userID].get(item);

                                    // Install Data
                                    if (typeof tiny_data === "undefined") {
                                        await safeDS.storage.users[data.index][userID].set(item, safeDS.config[item]);
                                    }

                                    // Nope
                                    else {
                                        await safeDS.configManager.user.set(data.index, userID, item, tiny_data, safeDS);
                                    }

                                }
                            }

                            // Nope. Insert All
                            else {

                                const user_data = await safeDS.storage.users[data.index][userID].get();
                                for (const item in user_data) {
                                    await safeDS.configManager.user.set(data.index, userID, item, user_data[item], safeDS);
                                }

                            }

                            // Emit Event
                            await safeDS.events.emit('startAdminDatabase', { bot: data.index, userID: userID, firstTime: true });

                        }

                        // Return
                        return;

                    };

                    // Load Database
                    for (const item in data) {
                        if (item !== "token" && item !== "index") {

                            // Get Data
                            const tiny_data = await safeDS.storage.bots[data.index].get(item);

                            // Install Data
                            if (typeof tiny_data === "undefined") {
                                await safeDS.storage.bots[data.index].set(item, data[item]);
                            }

                            // Nope
                            else {
                                await safeDS.configManager.bot.set(data.index, item, tiny_data, safeDS);;
                            }

                        }
                    }

                    // Console Warn
                    safeDS.console.cmd.log(`${safeDS.lang.get('started_bot_storage')}`.replace('{tag}', safeDS.bot[data.index].user.tag).replace('{id}', safeDS.bot[data.index].user.id));

                }

                // Fail
                catch (err) {

                    // Cancel App
                    safeDS.storage = null;
                    console.error(err);

                    return safeDS.close_app(`${err.message}`);

                }

            }

            // DM Allowed
            let dm_warn_message = ``;
            if (data.allowGlobalDM) {
                dm_warn_message = `\n${safeDS.lang.get('welcome_dm', data.lang)}`.replace('{on}', 'on').replace('{off}', 'off');
            } else {
                dm_warn_message = `\n${safeDS.lang.get('welcome_dm_disabled', data.lang)}`;
            }

            // Send Warn
            const warn_message = safeDS.console.discord.log(`${safeDS.lang.get('welcome_1', data.lang)}\n${safeDS.lang.get('welcome_2', data.lang)}\n${safeDS.lang.get('welcome_3', data.lang)}\n${safeDS.lang.get('welcome_4', data.lang)}${dm_warn_message}`.replace(/\{appname\}/g, safeDS.appName).replace('{author}', safeDS.functions.getModuleAuthor()).replace('{homepage}', safeDS.package.homepage).replace('{patreon}', safeDS.package.patreon).replace('{discord_invite}', safeDS.discordInvite).replace(/\{prefix\}/g, data.prefix));

            // Prepare Welcome
            let use_welcome = false;

            if (safeDS.config.welcome) {
                use_welcome = true;
            }

            if (safeDS.config.discord.bots[data.index].welcome) {
                use_welcome = true;
            } else {
                use_welcome = false;
            }


            // Send to Admin
            if (Array.isArray(safeDS.config.discord.bots[data.index].admin)) {
                for (const item in safeDS.config.discord.bots[data.index].admin) {

                    // Prepare Database
                    if (typeof start_user_data_base === "function") { await start_user_data_base(safeDS.config.discord.bots[data.index].admin[item]); }

                    // Send Welcome
                    if (typeof safeDS.config.discord.bots[data.index].admin[item] === "string" && anti_user_repeat.indexOf(safeDS.config.discord.bots[data.index].admin[item]) < 0) {
                        const admin_channel = await safeDS.bot[data.index].users.fetch(safeDS.config.discord.bots[data.index].admin[item]);
                        if (admin_channel) {

                            // Emit Event
                            await safeDS.events.emit('readyAdminBot', { index: data.index }, admin_channel);

                            // Send Message
                            anti_user_repeat.push(safeDS.config.discord.bots[data.index].admin[item]);
                            if (use_welcome) { admin_channel.send(warn_message); }

                        }
                    }

                }
            }

            if (Array.isArray(safeDS.config.discord.bots[data.index].superAdmin)) {
                for (const item in safeDS.config.discord.bots[data.index].superAdmin) {

                    // Prepare Database
                    if (typeof start_user_data_base === "function") { await start_user_data_base(safeDS.config.discord.bots[data.index].superAdmin[item]); }

                    // Send Welcome
                    if (typeof safeDS.config.discord.bots[data.index].superAdmin[item] === "string" && anti_user_repeat.indexOf(safeDS.config.discord.bots[data.index].superAdmin[item]) < 0) {
                        const admin_channel = await safeDS.bot[data.index].users.fetch(safeDS.config.discord.bots[data.index].superAdmin[item]);
                        if (admin_channel) {

                            // Emit Event
                            await safeDS.events.emit('readyAdminBot', { index: data.index }, admin_channel);

                            // Send Message
                            anti_user_repeat.push(safeDS.config.discord.bots[data.index].superAdmin[item]);
                            if (use_welcome) { admin_channel.send(warn_message); }

                        }
                    }

                }
            }

            if (Array.isArray(safeDS.config.superAdmin)) {
                for (const item in safeDS.config.superAdmin) {

                    // Prepare Database
                    if (typeof start_user_data_base === "function") { await start_user_data_base(safeDS.config.superAdmin[item]); }

                    // Send Welcome
                    if (typeof safeDS.config.superAdmin[item] === "string" && anti_user_repeat.indexOf(safeDS.config.superAdmin[item]) < 0) {
                        const admin_channel = await safeDS.bot[data.index].users.fetch(safeDS.config.superAdmin[item]);
                        if (admin_channel) {

                            // Emit Event
                            await safeDS.events.emit('readyAdminBot', { index: data.index }, admin_channel);

                            // Send Message
                            anti_user_repeat.push(safeDS.config.superAdmin[item]);
                            if (use_welcome) { admin_channel.send(warn_message); }

                        }
                    }

                }
            }

            if (Array.isArray(safeDS.config.discord.bots[data.index].adminRoles)) {
                await safeDS.functions.userRoleChecker(start_user_data_base, safeDS.bot[data.index].guilds, safeDS.config.discord.bots[data.index].adminRoles, anti_user_repeat, async function (user) {

                    // Emit Event
                    await safeDS.events.emit('readyAdminBot', { index: data.index }, user);

                    // Send Message
                    anti_user_repeat.push(user.id);
                    if (use_welcome) { user.send(warn_message); }
                    return;

                });
            }

            // Emit Event
            await safeDS.events.emit('readyBot', { index: data.index }, safeDS.bot[data.index]);
            await safeDS.events.emit('readyBot[' + data.index + ']', { index: data.index }, safeDS.bot[data.index]);

        }

        // Return
        return;

    });

    // Reconnect
    if (data.logs.disconnect) {
        safeDS.bot[data.index].on('disconnect', (erMsg, code) => {
            safeDS.console.cmd.error(`${erMsg}! Code: ${code}`);
        });
    }

    // Error
    if (data.logs.error) {
        safeDS.bot[data.index].on('error', (erMsg) => {
            safeDS.console.cmd.error(`${erMsg}`);
        });
    }

    // Warn
    if (data.logs.warn) {
        safeDS.bot[data.index].on('warn', (erMsg) => {
            safeDS.console.cmd.warn(`${erMsg}`);
        });
    }

    // Rate Limit
    if (data.logs.rateLimit) {
        safeDS.bot[data.index].on('rateLimit', (rateLimit) => {
            safeDS.console.cmd.warn(`Rate Limit!\n\`\`\`Timeout: ${rateLimit.timeout}\nLimit: ${rateLimit.limit}\nMethod: ${rateLimit.method}\nPath: ${rateLimit.path}\nRoute: ${rateLimit.route}\`\`\``);
        });
    }

    // Variables
    safeDS.bot[data.index].dbc_cache = {

        // Admin List
        admins: {},

        // First Time
        firstTime: true

    };

    // Detect Messages
    safeDS.bot[data.index].on('message', (msg) => {
        return safeDS.functions.message(msg, data);
    });

    // Reaction
    safeDS.bot[data.index].on('messageReactionAdd', (reaction, user) => {
        return safeDS.functions.messageReaction(reaction, user, data, 'Add');
    });

    safeDS.bot[data.index].on('messageReactionRemove', (reaction, user) => {
        return safeDS.functions.messageReaction(reaction, user, data, 'Remove');
    });

    safeDS.bot[data.index].on('messageReactionRemoveEmoji', (reaction) => {
        return safeDS.functions.messageReaction(reaction, reaction.client.user, data, 'Remove');
    });

    safeDS.bot[data.index].on('messageReactionRemoveAll', (msg) => {
        return safeDS.functions.messageReactionRemoveAll(msg, data);
    });

    safeDS.bot[data.index].on('messageUpdate', (old_msg, msg) => {
        return safeDS.functions.updateMessage(old_msg, msg, data);
    });

    // Delete Message
    safeDS.bot[data.index].on('messageDelete', (msg) => {
        return safeDS.functions.deleteMessage(msg, data);
    });

    // Emit Event
    await safeDS.events.emit('preparingBot', { index: data.index }, safeDS.bot[data.index]);
    await safeDS.events.emit('preparingBot[' + data.index + ']', { index: data.index }, safeDS.bot[data.index]);
    
    // Login In Bot
    if (typeof token === "string") {
        await safeDS.bot[data.index].login(token);
    }

    // Return
    return;

};