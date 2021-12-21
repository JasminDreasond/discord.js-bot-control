module.exports = {

    prefix: 'voice',
    description: 'cm_voice_channel_help',
    action: async function(msg, data, safeDS, command_message) {

        // Detect Other Voice Channel
        if (!msg.client.dbc_cache.admins[msg.author.id].voice) {

            // Get Command value
            const message_value = msg.content.substring(data.prefix.length + 6);

            // Get Value
            if (message_value) {

                // Detect
                msg.client.dbc_cache.admins[msg.author.id].voice = await msg.client.channels.fetch(message_value);

                // Exist
                if (msg.client.dbc_cache.admins[msg.author.id].voice && msg.client.dbc_cache.admins[msg.author.id].voice.type === "voice") {

                    msg.client.dbc_cache.admins[msg.author.id].voice.join().then(async connection => {

                        // Emit Event
                        await safeDS.events.emit('command_voiceJoined', {
                            bot: data.index,
                            value: message_value
                        }, msg);

                        // Insert Connection
                        msg.client.dbc_cache.admins[msg.author.id].voiceConnection = connection;
                        //await msg.client.dbc_cache.admins[msg.author.id].voiceConnection.setSpeaking('none');
                        msg.client.dbc_cache.admins[msg.author.id].voiceConnectionPlaying = false;

                        // Send Message
                        // await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_voice_channel_change', data.lang)}`.replace('{channel}', msg.client.dbc_cache.admins[msg.author.id].voice.name).replace('{guild}', msg.client.dbc_cache.admins[msg.author.id].voice.guild.name));

                        // Complete
                        return;

                    }).catch(err => {
                        const channel_name = msg.client.dbc_cache.admins[msg.author.id].voice.name;
                        const guild_name = msg.client.dbc_cache.admins[msg.author.id].voice.guild.name;
                        msg.client.dbc_cache.admins[msg.author.id].voice = null;
                        msg.channel.send(safeDS.console.discord.error(`**${channel_name}**: ${err.message}`.replace('{error}', err.message).replace('{channel}', channel_name).replace('{guild}', guild_name)));
                        return;
                    });

                }

                // Nope
                else {
                    msg.client.dbc_cache.admins[msg.author.id].voice = null;
                    msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_voice_channel_not_found', data.lang)}`));
                }

            }

            // Nothing
            else {
                msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_voice_channel_help', data.lang)}`));
            }

        }

        // Exist
        else {
            msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_voice_channel_need_leave', data.lang)}`.replace('{channel}', msg.client.dbc_cache.admins[msg.author.id].voice.name).replace('{guild}', msg.client.dbc_cache.admins[msg.author.id].voice.guild.name)));
        }

        // Complete
        return;

    }

};