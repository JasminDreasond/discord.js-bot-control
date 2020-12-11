module.exports = {

    prefix: 'user',
    description: 'cm_user_help',
    options: ['user_id'],
    action: async function (msg, data, safeDS, command_message) {

        // Get Command value
        const message_value = msg.content.substring(data.prefix.length + 5);

        // Get Value
        if (message_value) {

            // Anti Youself
            if (message_value !== msg.author.id) {

                // Detect
                msg.client.dbc_cache.admins[msg.author.id].channel = await msg.client.users.fetch(message_value);

                // Exist
                if (msg.client.dbc_cache.admins[msg.author.id].channel && msg.client.dbc_cache.admins[msg.author.id].channel.tag) {

                    // Emit Event
                    await safeDS.events.emit('command_userSelected', {
                        bot: data.index,
                        value: message_value
                    }, msg);

                    // Send Message
                    await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_user_change', data.lang)}`.replace('{user}', msg.client.dbc_cache.admins[msg.author.id].channel.tag).replace('{id}', msg.client.dbc_cache.admins[msg.author.id].channel.id));

                }

                // Nope
                else {
                    msg.client.dbc_cache.admins[msg.author.id].channel = null;
                    msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_user_not_found', data.lang)}`));
                }

            }

            // Nope
            else {
                msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_user_no_youself', data.lang)}`));
            }

        }

        // Nothing
        else {
            msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_user_help', data.lang)}`));
        }

        // Complete
        return;

    }

};