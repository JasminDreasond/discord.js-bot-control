module.exports = {

    prefix: 'reactionmanager',
    description: 'help_reactionmanager',
    action: async function(msg, data, safeDS, command_message, message, app_permissions) {

        // Get Command value
        const message_value = msg.content.substring(data.prefix.length + 16).split(' ');

        // Validate
        if (message_value.length > 0 && typeof message_value[0] === "string" && message_value[0] !== "") {

            // Get Value
            if (message_value[0] !== "?") {

                // Reaction Exist
                let reaction_type = null;
                let the_reaction = null;
                let reaction_global = 0;

                // Check Global
                if (message_value[0] === "global" || message_value[0] === "all") {

                    // Check Permission
                    if (app_permissions.superAdmin) {

                        // Is Global
                        if (message_value[0] === "global") {
                            reaction_global = 1;
                        } else {
                            reaction_global = 2;
                        }

                        // Exist Option Value
                        if (typeof message_value[1] === "string" && message_value[1] !== "") {

                            // Exist Option Value
                            if (safeDS.reactions.exist(message_value[1])) {

                                // Get Reaction Type
                                reaction_type = message_value[1];

                                // Exist the New Value
                                if (typeof message_value[2] === "string" && message_value[2] !== "") {
                                    the_reaction = message_value[2];
                                }

                            }

                        }

                    }

                    // Nope
                    else {
                        msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_reactionmanager_not_allowed', data.lang)}`));
                        return;
                    }

                }

                // Bot
                else {

                    // Detect Permission
                    if (app_permissions.botSuperAdmin || app_permissions.superAdmin) {

                        // Exist Option Value
                        if (safeDS.reactions.exist(message_value[0], data.index) || safeDS.reactions.exist(message_value[0])) {

                            // Get Reaction Type
                            reaction_type = message_value[0];

                            // Exist the New Value
                            if (typeof message_value[1] === "string" && message_value[1] !== "") {
                                the_reaction = message_value[1];
                            }

                        }

                    }

                    // Nope
                    else {
                        msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_reactionmanager_not_allowed', data.lang)}`));
                        return;
                    }

                }

                // Exist
                if (reaction_type) {

                    // Have Value
                    if (the_reaction) {

                        // Emit Values
                        const emit_values = {
                            bot: data.index,
                            type: reaction_type,
                            value: the_reaction
                        };

                        // Global
                        if (reaction_global === 1) {

                            // Get Reaction List
                            const reaction_list = safeDS.configManager.global.get('reactions', safeDS);

                            // Insert Value
                            reaction_list[reaction_type] = the_reaction;

                            // Set new prefix
                            await safeDS.configManager.global.set('reactions', reaction_list, safeDS);

                            // Emit Event
                            await safeDS.events.emit('command_reactionChangedGlobal', emit_values, msg);

                            // Send Message
                            await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_reactionmanager_change_global', data.lang)}`.replace('{reaction}', the_reaction).replace('{type}', reaction_type));

                        }

                        // All
                        else if (reaction_global === 2) {

                            // Get Reaction List
                            const reaction_list = safeDS.configManager.allBots.get('reactions', safeDS);

                            for (const item in reaction_list) {

                                // Insert Value
                                reaction_list[item][reaction_type] = the_reaction;

                                // Set new prefix
                                await safeDS.configManager.bot.set(item, 'reactions', reaction_list[item], safeDS);

                            }

                            // Emit Event
                            await safeDS.events.emit('command_reactionChangedAllBots', emit_values, msg);

                            // Send Message
                            await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_reactionmanager_change_all_bots', data.lang)}`.replace('{reaction}', the_reaction).replace('{type}', reaction_type));

                        }

                        // Bot
                        else {

                            // Get Reaction List
                            const reaction_list = safeDS.configManager.bot.get(data.index, 'reactions', safeDS);

                            // Insert Value
                            reaction_list[reaction_type] = the_reaction;

                            // Set new prefix
                            await safeDS.configManager.bot.set(data.index, 'reactions', reaction_list, safeDS);

                            // Emit Event
                            await safeDS.events.emit('command_reactionChanged', emit_values, msg);

                            // Send Message
                            await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_reactionmanager_change', data.lang)}`.replace('{reaction}', the_reaction).replace('{type}', reaction_type));

                        }

                    }

                    // Nope
                    else {
                        msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_reactionmanager_new_value_not_found', data.lang)}`));
                    }

                }

                // Nope
                else {
                    msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_reactionmanager_not_found', data.lang)}`));
                }

            }

            // Help
            else {

                // Get Reaction List
                const reaction_list = safeDS.configManager.bot.get(data.index, 'reactions', safeDS);

                // Exist Items
                if (reaction_list) {

                    // Convert to Array
                    const reactions_array = [];
                    for (const item in reaction_list) {
                        reactions_array.push({ name: item, value: reaction_list[item] });
                    }

                    // Count Items
                    if (reactions_array.length > 0) {

                        // Prepare Array PAgination
                        const paginate = require("paginate-array");

                        // Convert to Number
                        let page = Number(message_value[1]);
                        if (isNaN(page) || page < 1) {
                            page = 1;
                        }

                        // Get Items
                        let paginateCollection = paginate(reactions_array, page, 10);

                        // Prepare Field
                        const tiny_field = [];

                        // Prepare Field
                        for (const item in paginateCollection.data) {

                            // Add to Field
                            tiny_field.push({
                                name: paginateCollection.data[item].name,
                                value: paginateCollection.data[item].value
                            });

                        }

                        // Message Data
                        const message_data = {
                            embed: {
                                title: safeDS.lang.get('cm_reactionmanager_title', data.lang),
                                description: safeDS.lang.get('cm_reactionmanager_description', data.lang),
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

                        msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_reactionmanager_help', data.lang)}`), message_data);

                    }

                    // Nope
                    else {
                        msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_reactionmanager_empty_reactions', data.lang)}`));
                    }

                }

                // Nope
                else {
                    msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_reactionmanager_empty_reactions', data.lang)}`));
                }

            }

        }

        // Nothing
        else {
            msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('help_reactionmanager', data.lang)}\n\`\`\`\n${data.prefix}reactionmanager ? - ${safeDS.lang.get('cm_reactionmanager_help_message_see_list', data.lang)}\n${data.prefix}reactionmanager {${safeDS.lang.get('optional', data.lang)} (global | all)} {${safeDS.lang.get('reaction', data.lang)}} {${safeDS.lang.get('value', data.lang)}} - ${safeDS.lang.get('cm_reactionmanager_help_message_change_reaction', data.lang)}\`\`\``));
        }

        // Complete
        return;

    }

};