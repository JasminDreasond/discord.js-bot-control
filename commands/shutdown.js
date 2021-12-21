module.exports = {

    prefix: 'shutdown',
    description: 'help_shutdown',
    action: async function(msg, data, safeDS, command_message, message, app_permissions) {

        // Check Global Permission
        if (safeDS.config.allowShutdown) {

            // Shutdown
            if (app_permissions.superAdmin) {

                // await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_shutdown_result', data.lang)}`, null, true);

                // Emit Event
                await safeDS.events.emit('command_shutdown', {
                    bot: data.index
                }, msg);

                safeDS.close_app(`${safeDS.lang.get('cm_shutdown_alert', data.lang)}`.replace('{user}', msg.author.tag).replace('{id}', msg.author.id));

            }

            // Nope
            else {

                // Emit Event
                await safeDS.events.emit('triedSuperForbiddenCommand', {
                    bot: data.index,
                    command: 'shutdown'
                }, msg);

                // Send Message
                // await safeDS.console.file.sendDSUserLog(msg, 'mod', 'error', 'error', `${safeDS.lang.get('cm_shutdown_not_allowed', data.lang)}`, null, true);

            }

        }

        // Nope
        else {
            msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_shutdown_not_allowed', data.lang)}`));
        }

        // Complete
        return;

    }

};