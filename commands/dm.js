module.exports = {

    prefix: 'dm',
    description: 'help_dm',
    extra_prefix_info: '{on | off}',
    action: async function(msg, data, safeDS, command_message) {

        // Allowed
        if (data.allowGlobalDM) {

            // Get Command value
            const message_value = command_message.substring(data.prefix.length + 3);

            // Active
            if (message_value === "on") {

                // Checker
                if (!data.users[msg.author.id].receiveDM) {

                    // Change Value
                    await safeDS.configManager.user.set(data.index, msg.author.id, 'receiveDM', true, safeDS);

                    // Emit Event
                    await safeDS.events.emit('command_globalDMChanged', {
                        bot: data.index,
                        value: true
                    }, msg);

                    // Send Message
                    // await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_dm_enabled', data.lang)}`);

                }

                // Nope
                else {

                    // Send Message
                    msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_dm_enabled_error', data.lang)}`));

                }

            }

            // Disable
            else if (message_value === "off") {

                // Checker
                if (data.users[msg.author.id].receiveDM) {

                    // Change Value
                    await safeDS.configManager.user.set(data.index, msg.author.id, 'receiveDM', false, safeDS);

                    // Emit Event
                    await safeDS.events.emit('command_globalDMChanged', {
                        bot: data.index,
                        value: false
                    }, msg);

                    // Send Message
                    // await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_dm_disabled', data.lang)}`);

                }

                // Nope
                else {

                    // Send Message
                    msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_dm_disabled_error', data.lang)}`));

                }

            }

            // What?
            else {
                msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_dm_invalid_value', data.lang)}`));
            }

        }

        // Nope
        else {
            msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_dm_system_disabled', data.lang)}`));
        }

        // Complete
        return;

    }

};