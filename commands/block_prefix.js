module.exports = {

    prefix: 'blockprefix',
    description: 'help_block_prefix',
    action: async function (msg, data, safeDS, command_message, message, app_permissions) {

        // Detect Permission
        if (app_permissions.botSuperAdmin || app_permissions.superAdmin) {

            // Get Command value
            const message_value = msg.content.substring(data.prefix.length + 12).toLocaleLowerCase().split(' ');

            // Get Value
            if (message_value.length > 0 && message_value[0] !== "") {

                // Get Value to Change
                const result = safeDS.configManager.bot.get(data.index, 'block_prefix', safeDS);

                // Lang Text
                let message_lang_name = '';

                // Check
                if (!Array.isArray(result)) {
                    result = [];
                }

                // Add
                if (message_value[0] === "add") {

                    // Detect Text
                    if (typeof message_value[1] === "string" && message_value[1] !== "") {

                        // Validate Add
                        if (message_value[1] !== data.prefix) {

                            // Check
                            if (result.indexOf(message_value[1]) < 0) {

                                // Insert Value
                                result.push(message_value[1]);

                                // Change Value
                                await safeDS.configManager.bot.set(data.index, 'block_prefix', result, safeDS);

                                // Emit Event
                                await safeDS.events.emit('command_blockprefixAdded', {
                                    bot: data.index,
                                    value: message_value[1],
                                    result: result,
                                }, msg);

                                // Set Lang Text
                                message_lang_name = 'cm_blockprefix_added';

                            }

                            // Nope
                            else {

                                // Set Lang Text
                                message_lang_name = 'cm_blockprefix_added_error_duplicate';

                            }

                            // Send Message
                            await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get(message_lang_name, data.lang)}`.replace('{prefix}', message_value[1]));

                        }

                        // Nope
                        else {

                            // Send Message
                            msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_blockprefix_added_same_prefix', data.lang)}`));

                        }

                    }

                    // Nothing
                    else {

                        // Send Message
                        msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_blockprefix_added_error', data.lang)}`));

                    }

                }

                // Remove
                else if (message_value[0] === "remove") {

                    // Detect Text
                    if (typeof message_value[1] === "string" && message_value[1] !== "") {

                        // Check
                        if (result.indexOf(message_value[1]) > -1) {

                            // Remove Value
                            result.splice(result.indexOf(message_value[1]), 1);

                            // Change Value
                            await safeDS.configManager.bot.set(data.index, 'block_prefix', result, safeDS);

                            // Emit Event
                            await safeDS.events.emit('command_blockprefixRemoved', {
                                bot: data.index,
                                value: message_value[1],
                                result: result,
                            }, msg);

                            // Set Lang Text
                            message_lang_name = 'cm_blockprefix_removed';

                        }

                        // Nope
                        else {

                            // Set Lang Text
                            message_lang_name = 'cm_blockprefix_removed_error_duplicate';

                        }

                        // Send Message
                        await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get(message_lang_name, data.lang)}`.replace('{prefix}', message_value[1]));

                    }

                    // Nothing
                    else {

                        // Send Message
                        msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_blockprefix_removed_error', data.lang)}`));

                    }

                }

                // Reset
                else if (message_value[0] === "reset") {

                    // Detect No Text
                    if (typeof message_value[1] !== "string") {

                        // Check
                        if (result.length > 0) {

                            // Change Value
                            await safeDS.configManager.bot.set(data.index, 'block_prefix', [], safeDS);

                            // Emit Event
                            await safeDS.events.emit('command_blockprefixReseted', {
                                bot: data.index
                            }, msg);

                            // Set Lang Text
                            message_lang_name = 'cm_blockprefix_reseted';

                        }

                        // Nope
                        else {

                            // Set Lang Text
                            message_lang_name = 'cm_blockprefix_reseted_error_duplicate';

                        }

                        // Send Message
                        await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get(message_lang_name, data.lang)}`);

                    }

                    // Nope
                    else {

                        // Send Message
                        msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_blockprefix_reseted_error', data.lang)}`));

                    }

                }

                // List
                else if (message_value[0] === "list") {

                    // Prepare Array PAgination
                    const paginate = require("paginate-array");

                    // Convert to Number
                    let page = Number(message_value[1]);
                    if (isNaN(page) || page < 1) {
                        page = 1;
                    }

                    // Get Items
                    let paginateCollection = paginate(data.block_prefix, page, 10);

                    
                    // Prepare Field
                    const tiny_field = [];

                    // Prepare Field
                    if (paginateCollection.data.length > 0) {
                        for (const item in paginateCollection.data) {

                            // Exist Prefix
                            if (typeof paginateCollection.data[item] === "string") {

                                // Insert Prefix
                                let name = safeDS.lang.get('value', data.lang);
                                let value = paginateCollection.data[item];

                                // Add to Field
                                tiny_field.push({
                                    name: name,
                                    value: value
                                });

                            }

                            // Error
                            else {

                                // Add to Field
                                tiny_field.push({
                                    name: safeDS.lang.get('cm_blockprefix_no_value', data.lang),
                                    value: safeDS.lang.get('cm_blockprefix_no_value_info', data.lang)
                                });

                            }

                        }
                    }

                    // Nothing
                    else {

                        // Add to Field
                        tiny_field.push({
                            name: safeDS.lang.get('cm_blockprefix_is_empty', data.lang),
                            value: safeDS.lang.get('cm_blockprefix_is_empty_info', data.lang)
                        });

                    }

                    // Message Data
                    const message_data = {
                        embed: {
                            title: safeDS.lang.get('cm_blockprefix_title', data.lang),
                            description: safeDS.lang.get('cm_blockprefix_description', data.lang),
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
                    msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_blockprefix_list', data.lang)}`), message_data);

                }

                // Nope
                else {

                    // Send Message
                    msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_blockprefix_command_not_found', data.lang)}`));

                }

            }

            // Help
            else {
                msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_blockprefix_help_title', data.lang)}\n\`\`\`\n${data.prefix}blockprefix add {${safeDS.lang.get('value', data.lang)}} - ${safeDS.lang.get('cm_blockprefix_help_add', data.lang)}\n${data.prefix}blockprefix remove {${safeDS.lang.get('value', data.lang)}} - ${safeDS.lang.get('cm_blockprefix_help_remove', data.lang)}\n${data.prefix}blockprefix reset - ${safeDS.lang.get('cm_blockprefix_help_remove_all', data.lang)}\n\n${data.prefix}blockprefix list - ${safeDS.lang.get('cm_blockprefix_help_list', data.lang)}\`\`\``));
            }

        }

        // Nope
        else {

            // Emit Event
            await safeDS.events.emit('triedForbiddenCommand', {
                bot: data.index,
                command: 'blockprefix'
            }, msg);

            // Send Message
            await safeDS.console.file.sendDSUserLog(msg, 'mod', 'error', 'error', `${safeDS.lang.get('cm_blockprefix_not_allowed', data.lang)}`);

        }

        // Complete
        return;

    }

};