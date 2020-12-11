module.exports = {

    prefix: 'embedcolor',
    description: 'help_embedcolor',
    options: ['value'],
    action: async function (msg, data, safeDS, command_message, message, app_permissions) {

        // Detect Permission
        if (app_permissions.botSuperAdmin || app_permissions.superAdmin) {

            // Get Command value
            const message_value = msg.content.substring(data.prefix.length + 11).toLocaleLowerCase().split(' ')[0];

            // Get Value
            if (message_value) {

                // Set Value
                if (message_value !== "show") {

                    // Set new prefix
                    await safeDS.configManager.bot.set(data.index, 'color', message_value, safeDS);

                    // Emit Event
                    await safeDS.events.emit('command_changeEmbedColor', {
                        bot: data.index,
                        value: message_value
                    }, msg);

                    // Message
                    await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_embedcolor_changed', data.lang)}`.replace('{color}', message_value));

                }

                // Show Value
                else {

                    // Message
                    msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_embedcolor_show', data.lang)}`.replace('{color}', safeDS.configManager.bot.get(data.index, 'color', safeDS))));

                }

            }

            // Help
            else {
                msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_embedcolor_help', data.lang)}`.replace('{prefix}', data.prefix).replace('{command_show}', 'embedcolor show')));
            }

        }

        // Nope
        else {

            // Emit Event
            await safeDS.events.emit('triedForbiddenCommand', {
                bot: data.index,
                command: 'prefix'
            }, msg);

            // Send Message
            await safeDS.console.file.sendDSUserLog(msg, 'mod', 'error', 'error', `${safeDS.lang.get('cm_embedcolor_not_allowed', data.lang)}`);

        }

        // Complete
        return;

    }

};