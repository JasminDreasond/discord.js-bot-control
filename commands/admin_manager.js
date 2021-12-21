module.exports = {

    prefix: 'admin',
    description: 'help_admin',
    action: async function(msg, data, safeDS, command_message, message, app_permissions) {

        // Get Command value
        const message_value = command_message.substring(data.prefix.length + 6).split(' ');

        // Get Value
        if (message_value.length > 0 && message_value[0] !== "") {

            // Detect Permission
            if (message_value[0] !== "list" && (app_permissions.botSuperAdmin || app_permissions.superAdmin)) {

                // Template Script
                const change_admin_value = async function(config_option) {

                    // Lang Text
                    let message_lang_name = '';

                    // Check Second Value
                    if (message_value[1] === "add" || message_value[1] === "remove" || message_value[1] === "reset") {

                        // Edit List
                        if (message_value[1] === "add" || message_value[1] === "remove") {

                            // Detect ID Value
                            if (typeof message_value[2] === "string") {

                                // Get User
                                if (config_option !== "adminRoles") {
                                    try {
                                        message_value[2] = await msg.client.users.fetch(message_value[2]);
                                    } catch (err) {
                                        message_value[2] = {};
                                    }
                                }

                                // Get Role
                                else {
                                    try {

                                        // Guild Try
                                        let try_guild = msg.client.guilds.resolve(message_value[2]);
                                        if (!try_guild) { message_value[2] = await msg.client.guilds.fetch(message_value[2]); } else {
                                            message_value[2] = try_guild;
                                        }

                                        try {
                                            message_value[3] = await message_value[2].roles.fetch(message_value[3]);
                                        } catch (err) {
                                            message_value[2] = {};
                                            message_value[3] = {};
                                        }

                                    } catch (err) {
                                        message_value[2] = {};
                                        message_value[3] = {};
                                    }
                                }

                                // Detect User
                                if (message_value[2] && message_value[2].id && message_value[2].id !== "") {

                                    // Get Value to Change
                                    let result = safeDS.configManager.bot.get(data.index, config_option, safeDS);

                                    // Check
                                    if (!Array.isArray(result)) {
                                        result = [];
                                    }

                                    // Prepare Name
                                    let show_name = '???';

                                    // User Message
                                    if (config_option !== "adminRoles") {
                                        if (typeof message_value[2].tag === "string" && message_value[2].tag !== "") {
                                            show_name = message_value[2].tag;
                                        }
                                    }

                                    // Role Message
                                    else {
                                        if (typeof message_value[3].name === "string" && message_value[3].name !== "") {
                                            show_name = message_value[3].name;
                                        }
                                    }

                                    // Add
                                    if (message_value[1] === "add") {

                                        // User Message
                                        if (config_option !== "adminRoles") {

                                            // Insert Value
                                            const tiny_index = result.indexOf(message_value[2].id);
                                            if (tiny_index < 0) {

                                                // Set Result
                                                result.push(message_value[2].id);

                                                // Make the Change
                                                await safeDS.configManager.bot.set(data.index, config_option, result, safeDS);

                                                // Emit Event
                                                await safeDS.events.emit('command_adminBotAdded', {
                                                    bot: data.index,
                                                    cfg_option: config_option,
                                                    value: message_value[2].id,
                                                    result: result,
                                                }, msg);

                                                // Message Lang Set
                                                message_lang_name = 'cm_admin_config_user_added';

                                            }

                                            // Nope
                                            else {
                                                message_lang_name = 'cm_admin_config_user_added_error';
                                            }

                                            // Send Message
                                            // await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get(message_lang_name, data.lang)}`.replace('{option}', message_value[0]).replace('{value}', message_value[2].id).replace('{username}', show_name));

                                        }

                                        // Role Message
                                        else {

                                            // Insert Value
                                            const tiny_index = result.findIndex(item => item.id === message_value[3].id && item.guild === message_value[2].id);
                                            if (tiny_index < 0) {

                                                // Set Result
                                                result.push({
                                                    id: message_value[3].id,
                                                    guild: message_value[2].id
                                                });

                                                // Make the Change
                                                await safeDS.configManager.bot.set(data.index, config_option, result, safeDS);

                                                // Emit Event
                                                await safeDS.events.emit('command_adminBotAdded', {
                                                    bot: data.index,
                                                    cfg_option: config_option,
                                                    value: {
                                                        id: message_value[3].id,
                                                        guild: message_value[2].id
                                                    },
                                                    result: result,
                                                }, msg);

                                                // Message Lang Set
                                                message_lang_name = 'cm_admin_config_role_added';

                                            }

                                            // Nope
                                            else {
                                                message_lang_name = 'cm_admin_config_role_added_error';
                                            }

                                            // Send Message
                                            // await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get(message_lang_name, data.lang)}`.replace('{option}', message_value[0]).replace('{guild_value}', message_value[2].id).replace('{guild_name}', message_value[2].name).replace('{role_value}', message_value[3].id).replace('{role_name}', show_name));

                                        }

                                    }

                                    // Remove
                                    else if (message_value[1] === "remove") {

                                        // User Message
                                        if (config_option !== "adminRoles") {

                                            // Prepare Module
                                            const permission_checker = require('../functions/permission_checker');

                                            // Bot Get
                                            for (const g_index in safeDS.config.discord.bots) {

                                                // Get Permissions
                                                const user_perms = await permission_checker(msg.client.guilds, message_value[2].id, g_index, safeDS);

                                                // Reset Admin
                                                if (!user_perms.admin) {
                                                    await safeDS.configManager.user.delete(message_value[2].id, data.index, safeDS);
                                                }

                                            }

                                            // Remove Value
                                            const tiny_index = result.indexOf(message_value[2].id);
                                            if (tiny_index > -1) {

                                                // Set Result
                                                result.splice(tiny_index, 1);

                                                // Make the Change
                                                await safeDS.configManager.bot.set(data.index, config_option, result, safeDS);

                                                // Emit Event
                                                await safeDS.events.emit('command_adminBotRemoved', {
                                                    bot: data.index,
                                                    cfg_option: config_option,
                                                    value: message_value[2].id,
                                                    result: result,
                                                }, msg);

                                                // Message Lang Set
                                                message_lang_name = 'cm_admin_config_user_removed';

                                            }

                                            // Nope
                                            else {
                                                message_lang_name = 'cm_admin_config_user_removed_error';
                                            }

                                            // Send Message
                                            // await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get(message_lang_name, data.lang)}`.replace('{option}', message_value[0]).replace('{value}', message_value[2].id).replace('{username}', show_name));

                                        }

                                        // Role Message
                                        else {

                                            // Remove Value
                                            const tiny_index = result.findIndex(item => item.id === message_value[3].id && item.guild === message_value[2].id);
                                            if (tiny_index > -1) {

                                                // Set Result
                                                result.splice(tiny_index, 1);

                                                // Make the Change
                                                await safeDS.configManager.bot.set(data.index, config_option, result, safeDS);

                                                // Emit Event
                                                await safeDS.events.emit('command_adminBotRemoved', {
                                                    bot: data.index,
                                                    cfg_option: config_option,
                                                    value: {
                                                        id: message_value[3].id,
                                                        guild: message_value[2].id
                                                    },
                                                    result: result,
                                                }, msg);

                                                // Prepare Module
                                                const permission_checker = require('../functions/permission_checker');

                                                // Prepare Clear
                                                for (const g_index in safeDS.config.discord.bots) {
                                                    for (const item in safeDS.config.discord.bots[g_index].users) {

                                                        // Get Permissions
                                                        const user_perms = await permission_checker(msg.client.guilds, item, g_index, safeDS);

                                                        // Removed
                                                        if (!user_perms.admin) {
                                                            await safeDS.configManager.user.delete(item, data.index, safeDS);
                                                        }

                                                    }
                                                }

                                                // Message Lang Set
                                                message_lang_name = 'cm_admin_config_role_removed';

                                            }

                                            // Nope
                                            else {
                                                message_lang_name = 'cm_admin_config_role_removed_error';
                                            }

                                            // Send Message
                                            // await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get(message_lang_name, data.lang)}`.replace('{option}', message_value[0]).replace('{guild_value}', message_value[2].id).replace('{guild_name}', message_value[2].name).replace('{role_value}', message_value[3].id).replace('{role_name}', show_name));

                                        }

                                    }

                                }

                                // Nope
                                else {

                                    // Send the List
                                    msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_admin_invalid_id', data.lang)}`));

                                }

                            }

                            // Nothing
                            else {

                                // Send the List
                                msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_admin_no_id', data.lang)}`));

                            }

                        }

                        // Reset
                        else if (message_value[1] === "reset") {

                            // No Use Detected
                            if (typeof message_value[2] !== "string") {

                                // Get Value to Change
                                let result = safeDS.configManager.bot.get(data.index, null, safeDS)[config_option];

                                // Is Empty
                                if (result.length > 0) {

                                    // Make the Change
                                    await safeDS.configManager.bot.set(data.index, config_option, [], safeDS);

                                    // Remove All
                                    await safeDS.configManager.allUsers.delete(data.index, safeDS);

                                    // Emit Event
                                    await safeDS.events.emit('command_adminBotReseted', {
                                        bot: data.index,
                                        cfg_option: config_option
                                    }, msg);

                                    // Message Lang Set
                                    message_lang_name = 'cm_admin_config_reseted';

                                }

                                // Nope
                                else {
                                    message_lang_name = 'cm_admin_config_reseted_error';
                                }

                                // Send Message
                                // await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get(message_lang_name, data.lang)}`.replace('{option}', message_value[0]));

                            }

                            // Nope
                            else {

                                // Send the List
                                msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_admin_need_no_id', data.lang)}`));

                            }

                        }

                    }

                    // Nope
                    else {

                        // Send the List
                        msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_admin_command_not_found', data.lang)}`));

                    }

                };

                // Bot Admin
                if (message_value[0] === "bot") {
                    await change_admin_value('admin');
                }

                // Super Bot Admin
                else if (message_value[0] === "superbot") {
                    await change_admin_value('superAdmin');
                }

                // Role Bot Admin
                else if (message_value[0] === "role") {
                    await change_admin_value('adminRoles');
                }

                // Command Not Found
                else {

                    // Send the List
                    msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_admin_command_not_found', data.lang)}`));

                }

            }

            // Role Bot Admin
            else if (message_value[0] === "list") {

                if (typeof message_value[1] === "string") {

                    // Bot
                    if (message_value[1] === "bot" || message_value[1] === "superbot" || message_value[1] === "role" || message_value[1] === "superadmin") {

                        // Prepare Field List
                        const tiny_field = [];
                        let desc_name = '';
                        let groupVariable = '';

                        // Prepare Array PAgination
                        const paginate = require("paginate-array");
                        let paginateCollection = {};

                        // Convert to Number
                        message_value[2] = Number(message_value[2]);
                        if (isNaN(message_value[2]) || message_value[2] < 1) {
                            message_value[2] = 1;
                        }

                        // Bot Admins
                        if (message_value[1] === "bot" || message_value[1] === "superbot" || message_value[1] === "role") {

                            // User List
                            if (message_value[1] === "bot" || message_value[1] === "superbot") {

                                // Bot Text
                                if (message_value[1] === "bot") {

                                    // Insert Text
                                    desc_name = '_bots';
                                    groupVariable = 'admin';

                                }

                                // Super Bot Text
                                else if (message_value[1] === "superbot") {

                                    // Insert Text
                                    desc_name = '_superbots';
                                    groupVariable = 'superAdmin';
                                }

                                // Prepare Where
                                let whereItem = '';

                                // Admin
                                if (message_value[1] === "bot") {
                                    whereItem = 'admin';
                                }

                                // Super Bot Admin
                                else if (message_value[1] === "superbot") {
                                    whereItem = 'superAdmin';
                                }

                                // Get Items
                                if (Array.isArray(data[whereItem])) {
                                    paginateCollection = paginate(data[whereItem], message_value[2], 10);
                                } else {
                                    paginateCollection = paginate([], message_value[2], 10);
                                }

                            }

                            // Role Bot
                            else if (message_value[1] === "role") {

                                // Insert Text
                                desc_name = '_roles';
                                groupVariable = 'adminRoles';

                                // Get Items
                                if (Array.isArray(data.adminRoles)) {
                                    paginateCollection = paginate(data.adminRoles, message_value[2], 10);
                                } else {
                                    paginateCollection = paginate([], message_value[2], 10);
                                }

                            }

                        }

                        // Super Admins
                        else if (message_value[1] === "superadmin") {

                            // Insert Text
                            desc_name = '_superadmin';
                            groupVariable = '🔑 superAdmin';

                            // Get Items
                            if (Array.isArray(safeDS.config.superAdmin)) {
                                paginateCollection = paginate(safeDS.config.superAdmin, message_value[2], 10);
                            } else {
                                paginateCollection = paginate([], message_value[2], 10);
                            }

                        }

                        // Prepare Field
                        if (paginateCollection.data.length > 0) {
                            for (const item in paginateCollection.data) {

                                // Main Values
                                let name = '???';
                                let value = '0';

                                // String Item
                                if (typeof paginateCollection.data[item] === "string") {

                                    try {
                                        paginateCollection.data[item] = await msg.client.users.fetch(paginateCollection.data[item]);
                                        name = paginateCollection.data[item].tag;
                                        value = paginateCollection.data[item].id;
                                    } catch (err) {
                                        paginateCollection.data[item] = null;
                                        name = 'ERROR';
                                        value = err.message;
                                    }

                                    // Add to Field
                                    tiny_field.push({
                                        name: name,
                                        value: `<@${value}> ${value}`
                                    });

                                }

                                // Object
                                else {

                                    // Prepare Cache
                                    let tiny_cache = {
                                        id: paginateCollection.data[item].id,
                                        guild: paginateCollection.data[item].guild
                                    };

                                    // Errors
                                    const errors_list = {
                                        id: '',
                                        guild: ''
                                    };

                                    // Try!
                                    try {

                                        // Prepare Base
                                        paginateCollection.data[item] = {};

                                        // Guild
                                        paginateCollection.data[item].guild = msg.client.guilds.resolve(tiny_cache.guild);
                                        if (!paginateCollection.data[item].guild) { paginateCollection.data[item].guild = await msg.client.guilds.fetch(tiny_cache.guild); };

                                        // Role
                                        try {
                                            paginateCollection.data[item].id = await paginateCollection.data[item].guild.roles.fetch(tiny_cache.id);
                                        }

                                        // Fail
                                        catch (err) {
                                            paginateCollection.data[item] = {};
                                            errors_list.id = '\n' + safeDS.lang.get('cm_admin_command_user_list_embed_error_id', data.lang).replace('{error}', err.message);
                                        }

                                    } catch (err) {
                                        paginateCollection.data[item] = {};
                                        errors_list.guild = '\n' + safeDS.lang.get('cm_admin_command_user_list_embed_error_guild', data.lang).replace('{error}', err.message);
                                    }

                                    // Add to Field
                                    if (paginateCollection.data[item].id && paginateCollection.data[item].guild) {
                                        tiny_field.push({
                                            name: `${paginateCollection.data[item].guild.name} | ${paginateCollection.data[item].id.name}`,
                                            value: `${tiny_cache.guild} | ${tiny_cache.id}`
                                        });
                                    }

                                    // Nope
                                    else {

                                        tiny_field.push({
                                            name: safeDS.lang.get('cm_admin_command_user_list_embed_error', data.lang),
                                            value: `${tiny_cache.guild} | ${tiny_cache.id}${errors_list.guild}${errors_list.id}`
                                        });

                                    }

                                }

                            }
                        }

                        // Nothing
                        else {

                            // Add to Field
                            tiny_field.push({
                                name: safeDS.lang.get('cm_admin_command_no_user', data.lang),
                                value: safeDS.lang.get('cm_admin_command_no_user_info', data.lang)
                            });

                        }

                        // Message Data
                        const message_data = {
                            embed: {
                                title: safeDS.lang.get('cm_admin_command_user_list_embed_title', data.lang).replace('{group}', groupVariable),
                                description: safeDS.lang.get('cm_admin_command_user_list_embed_desc' + desc_name, data.lang),
                                author: {
                                    name: safeDS.appName,
                                    icon_url: msg.client.user.avatarURL()
                                },
                                footer: {
                                    text: safeDS.functions.getPaginationText(paginateCollection, data.lang)
                                },
                                fields: tiny_field
                            }
                        };

                        // Set Embed Color
                        message_data.embed.color = require('../functions/embed_color')(data.color);

                        // Send Message
                        msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_admin_command_user_list_title', data.lang)}`.replace('{group}', message_value[1])), message_data);

                    }

                    // Nope
                    else {

                        // Send the List
                        msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_admin_command_not_found', data.lang)}`));

                    }

                }

                // Need Argument
                else {

                    // Send the List
                    msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_admin_help_list_title', data.lang)}\n\`\`\`\n${data.prefix}admin list {bot | superbot | role | superadmin} - ${safeDS.lang.get('cm_admin_help_list', data.lang)}\`\`\``));

                }

            }

            // Not Allowed
            else {

                // Emit Event
                await safeDS.events.emit('triedForbiddenCommand', {
                    bot: data.index,
                    command: 'admin'
                }, msg);

                // Send Message
                // await safeDS.console.file.sendDSUserLog(msg, 'mod', 'error', 'error', `${safeDS.lang.get('cm_admin_not_allowed', data.lang)}`);

            }

        }

        // Help
        else {
            msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_admin_help_title', data.lang)}\n\`\`\`\n${data.prefix}admin bot add {${safeDS.lang.get('user_id', data.lang)}} - ${safeDS.lang.get('cm_admin_help_bot_add', data.lang)}\n${data.prefix}admin superbot add {${safeDS.lang.get('user_id', data.lang)}} - ${safeDS.lang.get('cm_admin_help_superbot_add', data.lang)}\n${data.prefix}admin role add {${safeDS.lang.get('guild_id', data.lang)}} {${safeDS.lang.get('role_id', data.lang)}} - ${safeDS.lang.get('cm_admin_help_role_add', data.lang)}\n\n${data.prefix}admin bot remove {${safeDS.lang.get('user_id', data.lang)}} - ${safeDS.lang.get('cm_admin_help_bot_remove', data.lang)}\n${data.prefix}admin superbot remove {${safeDS.lang.get('user_id', data.lang)}} - ${safeDS.lang.get('cm_admin_help_superbot_remove', data.lang)}\n${data.prefix}admin role remove {${safeDS.lang.get('guild_id', data.lang)}} {${safeDS.lang.get('role_id', data.lang)}} - ${safeDS.lang.get('cm_admin_help_role_remove', data.lang)}\n\n${data.prefix}admin bot reset - ${safeDS.lang.get('cm_admin_help_bot_remove_all', data.lang)}\n${data.prefix}admin superbot reset - ${safeDS.lang.get('cm_admin_help_superbot_remove_all', data.lang)}\n${data.prefix}admin role reset - ${safeDS.lang.get('cm_admin_help_role_remove_all', data.lang)}\`\`\`\n${safeDS.lang.get('cm_admin_help_list_title', data.lang)}\n\`\`\`\n${data.prefix}admin list - ${safeDS.lang.get('cm_admin_help_list', data.lang)}\`\`\``));
        }

        // Complete
        return;

    }

};