module.exports = {

    prefix: 'leavevoice',
    description: 'help_leave_voice_channel',
    action: async function (msg, data, safeDS, command_message) {

        // Exist
        if (msg.client.dbc_cache.admins[msg.author.id].voice) {

            // Get ID
            const the_id = msg.client.dbc_cache.admins[msg.author.id].voice.id;

            // Get Names
            let channel_name = msg.client.dbc_cache.admins[msg.author.id].voice.name;
            let channel_id = msg.client.dbc_cache.admins[msg.author.id].voice.guild.name;

            // Try Leave
            try {
                await msg.client.dbc_cache.admins[msg.author.id].voice.leave();
            } catch (err) { }

            // Clear Value
            msg.client.dbc_cache.admins[msg.author.id].voice = null;

            // Insert Connection
            msg.client.dbc_cache.admins[msg.author.id].voiceConnection = null;
            msg.client.dbc_cache.admins[msg.author.id].voiceConnectionPlaying = false;

            // Emit Event
            await safeDS.events.emit('command_voiceLeft', {
                bot: data.index,
                value: the_id
            }, msg);

            // Send Message
            await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_leave_voice_channel', data.lang)}`.replace('{channel}', channel_name).replace('{guild}', channel_id));

        }

        // Nope
        else {
            msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_voice_channel_not_found', data.lang)}`)).catch((err) => {
                msg.channel.send(safeDS.console.discord.error(err.message));
            });
        }

        // Complete
        return true;

    }

};