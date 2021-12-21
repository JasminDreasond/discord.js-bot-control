module.exports = {

    prefix: 'leavechannel',
    description: 'help_leave_channel',
    action: async function(msg, data, safeDS, command_message) {

        // Exist
        if (msg.client.dbc_cache.admins[msg.author.id].channel) {

            // Get ID
            let the_id = msg.client.dbc_cache.admins[msg.author.id].channel.id;
            let type_channel = null;

            // Is User Channel
            if (msg.client.dbc_cache.admins[msg.author.id].channel.tag) {
                type_channel = 'user_dm';
            }

            // Nope
            else {
                type_channel = 'text_channel';
            }

            // Get Names
            let item_type = null;
            let channel_name = '???';
            let channel_id = '0';

            // Is User Channel
            if (msg.client.dbc_cache.admins[msg.author.id].channel.tag) {
                item_type = 'user';
                channel_name = msg.client.dbc_cache.admins[msg.author.id].channel.tag;
                channel_id = msg.client.dbc_cache.admins[msg.author.id].channel.id;
            }

            // Nope
            else {
                item_type = 'channel';
                channel_name = msg.client.dbc_cache.admins[msg.author.id].channel.name;
                channel_id = msg.client.dbc_cache.admins[msg.author.id].channel.guild.name;
            }

            // Reset variable
            msg.client.dbc_cache.admins[msg.author.id].channel = null;

            // Emit Event
            await safeDS.events.emit('command_channelLeft', {
                bot: data.index,
                value: the_id,
                type: type_channel
            }, msg);

            // Is User Channel
            if (item_type === "user") {
                await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_leave_user_channel', data.lang)}`.replace('{user}', channel_name).replace('{id}', channel_id));
            }

            // Nope
            else {
                await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_leave_channel', data.lang)}`.replace('{channel}', channel_name).replace('{guild}', channel_id));
            }

        }

        // Nope
        else {
            msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_channel_not_found', data.lang)}`)).catch((err) => {
                msg.channel.send(safeDS.console.discord.error(err.message));
            });
        }

        // Complete
        return;

    }

};