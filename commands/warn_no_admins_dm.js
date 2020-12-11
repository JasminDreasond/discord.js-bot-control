module.exports = {

    prefix: 'dmwarn',
    description: 'help_dmwarn',
    extra_prefix_info: '{on | off}',
    action: async function (msg, data, safeDS, command_message, message, app_permissions) {

        // Detect Permission
        if (app_permissions.botSuperAdmin || app_permissions.superAdmin) {

            // Get Command value
            const message_value = command_message.substring(data.prefix.length + 7);

            // Active
            if (message_value === "on") {

                // Checker
                if (!data.warnNoAdminsDM) {

                    // Set Config
                    await safeDS.configManager.bot.set(data.index, 'warnNoAdminsDM', true, safeDS);

                    // Emit Event
                    await safeDS.events.emit('command_warnDMChanged', {
                        bot: data.index,
                        value: true
                    }, msg);

                    // Send Message
                    await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_dmwarn_enabled', data.lang)}`);

                }

                // Nope
                else {

                    // Send Message
                    msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_dmwarn_enabled_error', data.lang)}`));

                }

            }

            // Disable
            else if (message_value === "off") {

                // Checker
                if (data.warnNoAdminsDM) {

                    // Set Config
                    await safeDS.configManager.bot.set(data.index, 'warnNoAdminsDM', false, safeDS);

                    // Emit Event
                    await safeDS.events.emit('command_warnDMChanged', {
                        bot: data.index,
                        value: false
                    }, msg);

                    // Send Message
                    await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_dmwarn_disabled', data.lang)}`);

                }

                // Nope
                else {

                    // Send Message
                    msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_dmwarn_disabled_error', data.lang)}`));

                }

            }

            // What?
            else {
                msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_dmwarn_invalid_value', data.lang)}`));
            }

        }

        // Nope
        else {
            msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_dmwarn_not_allowed', data.lang)}`));
        }

        // Complete
        return;

    }

};