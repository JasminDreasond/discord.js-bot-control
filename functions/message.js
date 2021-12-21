module.exports = async(msg, data, safeDS, ds) => {

    // Detect Bot
    if (!msg.author.bot && msg.author.id !== msg.client.user.id) {

        // Detect DM
        if (msg.channel.type === "DM") {

            // Perm Checker
            const permission_checker = async function() {
                const pm = require('./permission_checker');
                let result = await pm(msg.client.guilds, msg.author.id, data.index, safeDS);
                return result;
            };

            // Prepare Message Checker
            let message_checked = { confirmed: false };

            // Message Checker
            if (typeof safeDS.config.discord.bots[data.index].msg_checker === "function") {
                message_checked = await safeDS.config.discord.bots[data.index].msg_checker(msg, safeDS.configManager.getAll(safeDS), permission_checker);
            } else if (typeof safeDS.config.msg_checker === "function") {
                message_checked = await safeDS.config.msg_checker(msg, safeDS.configManager.getAll(safeDS), permission_checker);
            } else {
                message_checked.confirmed = true;
            }

            // Make the Confirmed Value
            let confirmed_value = false;
            try {
                confirmed_value = (message_checked && message_checked.confirmed);
            } catch (err) {
                confirmed_value = false;
            }

            // Check Message
            if (confirmed_value) {

                // Get Message
                let message = msg.content;

                // Insert File
                if (msg.attachments && msg.attachments.size > 0) {
                    msg.attachments.forEach(function(value) {
                        message += '\n' + value.proxyURL;
                    });
                }

                // Check Message
                try {
                    confirmed_value = (!message_checked.perms || !message_checked.perms.admin);
                } catch (err) {
                    confirmed_value = false;
                }

                if (confirmed_value) {

                    message_checked = {
                        confirmed: true,
                        perms: await permission_checker()
                    };

                }

                // Create Message Sender
                const message_sender = async function() {

                    // Message Sent Confirm
                    let confirm_message_sent = false;

                    // Anti Repeat
                    const anti_user_repeat = [];

                    // Send to Admin
                    if (Array.isArray(data.admin)) {
                        for (const item in data.admin) {
                            let confirm_message_sent_prepare = await safeDS.functions.dmReceiver(msg, data.admin[item], message, anti_user_repeat, data, safeDS);
                            if (confirm_message_sent_prepare) { confirm_message_sent = true; }
                        }
                    }

                    if (Array.isArray(data.superAdmin)) {
                        for (const item in data.superAdmin) {
                            let confirm_message_sent_prepare;
                            if (!confirm_message_sent) { confirm_message_sent_prepare = await safeDS.functions.dmReceiver(msg, data.superAdmin[item], message, anti_user_repeat, data, safeDS); }
                            if (confirm_message_sent_prepare) { confirm_message_sent = true; }
                        }
                    }

                    if (Array.isArray(safeDS.config.superAdmin)) {
                        for (const item in safeDS.config.superAdmin) {
                            let confirm_message_sent_prepare;
                            if (!confirm_message_sent) { confirm_message_sent_prepare = await safeDS.functions.dmReceiver(msg, safeDS.config.superAdmin[item], message, anti_user_repeat, data, safeDS); }
                            if (confirm_message_sent_prepare) { confirm_message_sent = true; }
                        }
                    }

                    if (Array.isArray(safeDS.config.discord.bots[data.index].adminRoles)) {
                        let confirm_message_sent_prepare = await safeDS.functions.userRoleChecker(null, safeDS.bot[data.index].guilds, safeDS.config.discord.bots[data.index].adminRoles, null, async function(user) {
                            let confirm_message_sent_prepare;
                            if (!confirm_message_sent) { confirm_message_sent_prepare = await safeDS.functions.dmReceiver(msg, user.id, message, anti_user_repeat, data, safeDS); }
                            if (confirm_message_sent_prepare) { confirm_message_sent = true; }
                            return confirm_message_sent_prepare;
                        });
                        if (confirm_message_sent_prepare) { confirm_message_sent = true; }
                    }

                    if (!confirm_message_sent && (safeDS.config.discord.bots[data.index].warnNoAdminsDM || message_checked.perms.admin)) {
                        msg.channel.send(safeDS.console.discord.warn(`${safeDS.lang.get('inactive_bot_dm', data.lang)}`));
                    }

                    return;

                };

                // Admin
                if (message_checked.perms.admin) {

                    try {

                        // Validator Admin
                        await safeDS.configManager.user.validator(data.index, msg.author.id, safeDS);

                        // Create Admin Cache
                        if (!msg.client.dbc_cache.admins[msg.author.id]) {
                            msg.client.dbc_cache.admins[msg.author.id] = {};
                        }

                        // Command Message
                        const command_message = msg.content.toLocaleLowerCase();

                        // Check Block Prefixes
                        let prefix_allowed = true;
                        if (Array.isArray(data.block_prefix)) {
                            for (const item in data.block_prefix) {
                                if (prefix_allowed) {
                                    if (command_message.startsWith(data.block_prefix[item]) && command_message.length > data.block_prefix[item].length) {
                                        prefix_allowed = false;
                                    }
                                } else {
                                    break;
                                }
                            }
                        }

                        // Prefix Block Protection
                        if (prefix_allowed) {

                            // Prepare Clone
                            const clone = require('clone');

                            // Execute Commands
                            let command_executed = false;
                            for (const item in safeDS.commands) {

                                // Checker
                                if (command_message.startsWith(data.prefix + safeDS.commands[item].prefix + ' ') || command_message === data.prefix + safeDS.commands[item].prefix) {

                                    // Execute Command
                                    if (safeDS.custom_commandsIDs.indexOf(item) < 0) {
                                        await safeDS.commands[item].action(msg, data, safeDS, command_message, message, message_checked.perms);
                                    }

                                    // Execute Custom Command
                                    else {
                                        await safeDS.commands[item].action(msg, safeDS.configManager.bot.get(data.index, null, safeDS), ds, command_message, message, clone(message_checked.perms));
                                    }

                                    // Check Item
                                    command_executed = true;

                                }

                                // Break
                                if (command_executed) {
                                    break;
                                }

                            }

                            // Final Check
                            if (!command_executed) {
                                for (const item in safeDS.finalCommands) {

                                    command_executed = await safeDS.finalCommands[item](msg, data, safeDS, command_message, message, message_checked.perms);
                                    if (command_executed) {
                                        break;
                                    }

                                }
                            }

                            // Send Message
                            if (!command_executed) { await message_sender(); }

                        }

                    }

                    // Error Command
                    catch (err) {

                        msg.channel.send(safeDS.console.discord.error(err.message));
                        safeDS.console.cmd.error(err);

                    }

                }

                // Others
                else { await message_sender(); }

            }

        }

    }

    // Return Async
    return;

};