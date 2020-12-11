module.exports = {

    prefix: 'react',
    description: 'help_reaction',
    options: ['channel_id', 'message_id', 'reaction'],
    action: async function (msg, data, safeDS, command_message) {

        // Get Command value
        const message_value = msg.content.substring(data.prefix.length + 6).split(' ');

        // Get Channel
        if (message_value.length > 0 && message_value[0] !== "") {

            // Detect
            const tiny_channel = await msg.client.channels.fetch(message_value[0]);

            // Exist
            if (tiny_channel && tiny_channel.type === "text") {

                // Prepare Message
                if (typeof message_value[1] === "string" && message_value[1] !== "") {

                    // Get Message
                    tiny_channel.messages.fetch(message_value[1]).then((the_message) => {

                        // Prepare Reaction
                        if (typeof message_value[2] === "string" && message_value[2] !== "") {

                            // If Remover
                            let isRemove = false;
                            if (typeof message_value[3] === "string" && message_value[3] === "r") {
                                isRemove = true;
                            }

                            // Get Emoji ID
                            let emoji_id = safeDS.functions.getEmojiID(message_value[2]);

                            // React Message
                            if (!isRemove) {
                                the_message.react(emoji_id).then(async (reaction) => {

                                    // Emit Event
                                    await safeDS.events.emit('command_react', {
                                        bot: data.index,
                                        value: {
                                            channel: message_value[0],
                                            message: message_value[1],
                                            reaction: message_value[2],
                                            emoji_id: emoji_id
                                        }
                                    }, msg, the_message, reaction);

                                    // Send Message
                                    await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_reaction_sent', data.lang)}`.replace('{message_id}', message_value[1]).replace('{channel_name}', tiny_channel.name).replace('{guild_name}', tiny_channel.guild.name).replace('{reaction}', message_value[2]));

                                }).catch((err) => {

                                    // Error Message
                                    msg.channel.send(safeDS.console.discord.error(err.message));
                                    return;

                                });
                            }

                            // Remove Reaction
                            else {
                                the_message.reactions.resolve(emoji_id).users.remove(msg.client.user.id).then(async (reaction) => {

                                    // Emit Event
                                    await safeDS.events.emit('command_react_removed', {
                                        bot: data.index,
                                        value: {
                                            channel: message_value[0],
                                            message: message_value[1],
                                            reaction: message_value[2],
                                            emoji_id: emoji_id
                                        }
                                    }, msg, the_message, reaction);

                                    // Send Message
                                    await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_reaction_removed', data.lang)}`.replace('{message_id}', message_value[1]).replace('{channel_name}', tiny_channel.name).replace('{guild_name}', tiny_channel.guild.name).replace('{reaction}', message_value[2]));

                                }).catch((err) => {

                                    // Error Message
                                    msg.channel.send(safeDS.console.discord.error(err.message));
                                    return;

                                });
                            }

                        }

                        return;

                    }).catch((err) => {

                        // Error Message
                        msg.channel.send(safeDS.console.discord.error(err.message));
                        return;

                    });

                }

                // Nope
                else {
                    msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_reaction_message_not_found', data.lang)}`));
                }

            }

            // Nope
            else {
                msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_reaction_channel_not_found', data.lang)}`));
            }

        }

        // Nothing
        else {
            msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_reaction_help', data.lang)}`.replace('{remove_p}', 'r')));
        }

        // Complete
        return;

    }

};