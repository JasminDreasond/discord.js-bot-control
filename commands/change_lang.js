module.exports = {

    prefix: 'lang',
    description: 'cm_lang_help',
    options: ['value'],
    action: async function(msg, data, safeDS, command_message, message, app_permissions) {

        // Change Lang
        if (app_permissions.botSuperAdmin || app_permissions.superAdmin) {

            // Get Command value
            const message_value = msg.content.substring(data.prefix.length + 5);

            // Get Value
            if (message_value) {

                // Normal Result
                if (message_value !== "?") {

                    // Detect Language Exist
                    if (safeDS.lang.exist(message_value)) {

                        // Set New Language
                        await safeDS.configManager.bot.set(data.index, 'lang', message_value, safeDS);

                        // Emit Event
                        await safeDS.events.emit('command_langChanged', {
                            bot: data.index,
                            value: message_value
                        }, msg);

                        // New Message
                        await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_lang_result', data.lang)}`.replace('{lang}', message_value));

                    }

                    // Nope
                    else {
                        msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_lang_not_found', data.lang)}`));
                    }

                }

                // Help
                else {

                    // Prepare Array PAgination
                    const paginate = require("paginate-array");

                    // Convert to Number
                    let page = Number(command_message.substring(data.prefix.length + 5));
                    if (isNaN(page) || page < 1) {
                        page = 1;
                    }

                    // Get Items
                    let paginateCollection = null;
                    const lang_list_here = safeDS.lang.getList();

                    // Items
                    if (Array.isArray(lang_list_here)) {
                        paginateCollection = paginate(lang_list_here, page, 10);
                    } else {
                        paginateCollection = paginate([], page, 10);
                    }

                    // Prepare Field
                    const tiny_field = [];

                    // Prepare Field
                    if (paginateCollection.data.length > 0) {
                        for (const item in paginateCollection.data) {

                            // Exist Prefix
                            if (typeof paginateCollection.data[item].value === "string") {

                                // Insert Prefix
                                let name = paginateCollection.data[item].value;
                                let value = '';

                                // Name
                                if (typeof paginateCollection.data[item].name === "string") {
                                    name = `${paginateCollection.data[item].name} (${name})`;
                                }

                                // Author
                                if (typeof paginateCollection.data[item].author === "string") {
                                    value = paginateCollection.data[item].author;
                                }

                                // Homepage
                                if (typeof paginateCollection.data[item].homepage === "string") {
                                    if (value !== "") {
                                        value += ` (${paginateCollection.data[item].homepage})`;
                                    } else {
                                        value = paginateCollection.data[item].homepage;
                                    }
                                }

                                // Nothing
                                if (value === "") {
                                    value = '???';
                                }

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
                                    name: safeDS.lang.get('cm_lang_no_value', data.lang),
                                    value: safeDS.lang.get('cm_lang_no_value_info', data.lang)
                                });

                            }

                        }
                    }

                    // Nothing
                    else {

                        // Add to Field
                        tiny_field.push({
                            name: safeDS.lang.get('cm_lang_is_empty', data.lang),
                            value: safeDS.lang.get('cm_lang_is_empty_info', data.lang)
                        });

                    }

                    // Message Data
                    const message_data = {
                        embed: {
                            title: safeDS.lang.get('cm_lang_title', data.lang),
                            description: safeDS.lang.get('cm_lang_description', data.lang),
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
                    msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_lang_list', data.lang)}`), message_data);

                }

            }

            // Nope
            else {
                msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_lang_help', data.lang)}`));
            }

        }

        // Not Allowed
        else {

            // Emit Event
            await safeDS.events.emit('triedForbiddenCommand', {
                bot: data.index,
                command: 'lang'
            }, msg);

            // Send Message
            await safeDS.console.file.sendDSUserLog(msg, 'mod', 'error', 'error', `${safeDS.lang.get('cm_lang_not_allowed', data.lang)}`);

        }

        // Complete
        return;

    }

};