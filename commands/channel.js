module.exports = {

    prefix: 'channel',
    description: 'cm_channel_help',
    options: ['channel_id'],
    action: async function(msg, data, safeDS, command_message) {

        // Get Command value
        const message_value = msg.content.substring(data.prefix.length + 8);

        // Get Value
        if (message_value) {

            // Detect
            msg.client.dbc_cache.admins[msg.author.id].channel = await msg.client.channels.fetch(message_value);

            // Exist
            if (msg.client.dbc_cache.admins[msg.author.id].channel && msg.client.dbc_cache.admins[msg.author.id].channel.type === "GUILD_TEXT") {

                // Emit Event
                await safeDS.events.emit('command_channelSelected', {
                    bot: data.index,
                    value: message_value
                }, msg);

                // Send Message
                // await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_channel_change', data.lang)}`.replace('{channel}', msg.client.dbc_cache.admins[msg.author.id].channel.name).replace('{guild}', msg.client.dbc_cache.admins[msg.author.id].channel.guild.name));

            }

            // Nope
            else {
                msg.client.dbc_cache.admins[msg.author.id].channel = null;
                msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_channel_not_found', data.lang)}`));
            }

        }

        // Nothing
        else {
            msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_channel_help', data.lang)}`));
        }

        // Complete
        return;

    }

};