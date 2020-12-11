module.exports = {

    prefix: 'prefix',
    description: 'cm_prefix_help',
    options: ['value'],
    action: async function (msg, data, safeDS, command_message, message, app_permissions) {

        // Detect Permission
        if (app_permissions.botSuperAdmin || app_permissions.superAdmin) {

            // Get Command value
            const message_value = msg.content.substring(data.prefix.length + 7).toLocaleLowerCase().split(' ')[0];

            // Get Value
            if (message_value) {

                // Validate Prefix
                let allow_prefix = true;

                // Check Block Prefix List
                if (Array.isArray(data.block_prefix)) {
                    for (const item in data.block_prefix) {
                        if (data.block_prefix[item] === message_value) {
                            allow_prefix = false;
                            break;
                        }
                    }
                }

                // Prefix Allowed
                if (allow_prefix) {

                    // Set new prefix
                    await safeDS.configManager.bot.set(data.index, 'prefix', message_value, safeDS);

                    // Emit Event
                    await safeDS.events.emit('command_changePrefix', {
                        bot: data.index,
                        value: message_value
                    }, msg);

                    // Message
                    await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_prefix_changed', data.lang)}`.replace('{prefix}', message_value));

                }

                // Nope
                else {

                    // Send Message
                    msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_prefix_set_not_allowed', data.lang)}`));

                }

            }

            // Help
            else {
                msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_prefix_help', data.lang)}`));
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
            await safeDS.console.file.sendDSUserLog(msg, 'mod', 'error', 'error', `${safeDS.lang.get('cm_prefix_not_allowed', data.lang)}`);

        }

        // Complete
        return;

    }

};