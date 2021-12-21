module.exports = {

    prefix: 'presence',
    description: 'help_presence',
    options: ['value'],
    action: async function(msg, data, safeDS, command_message) {

        // Get Command value
        const message_value = msg.content.substring(data.prefix.length + 9).toLocaleLowerCase();

        // Get Value
        if (message_value) {

            // Set Status
            await msg.client.user.setStatus(message_value);

            // Emit Event
            await safeDS.events.emit('command_presence', {
                bot: data.index,
                value: message_value
            }, msg);

            // Send Message
            // await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_presence_changed', data.lang)}`.replace('{presence}', message_value));

            return;

        }

        // Help
        else {
            msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_presence_help', data.lang)}\n\`\`\`\nonline\nidle\ninvisible\ndnd\`\`\``));
        }

        // Complete
        return;

    }

};