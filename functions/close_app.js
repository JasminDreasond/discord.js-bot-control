module.exports = async function (signal, err, safeDS) {

    // Warn Console
    safeDS.console.cmd.log(`${safeDS.lang.get('close_server_warn')}`.replace('{signal}', signal));

    // Emit Event
    await safeDS.events.emit('closeAppWarn');

    // Create Warn
    let warn_message = safeDS.console.discord.log(`${safeDS.lang.get('close_bots_warn')}`.replace('{appname}', safeDS.appName));
    if (err) {
        warn_message += '\n' + err.message;
        safeDS.console.cmd.error(err);
    }

    // Check App
    if (!safeDS.firstTime) {

        // Close Bots
        for (let i = 0; i < safeDS.config.discord.bots.length; i++) {

            // Anti Bug
            if (safeDS.bot[i] && safeDS.bot[i].user) {

                // Log Message
                safeDS.console.cmd.log(`${safeDS.lang.get('close_bot_warn')}`.replace('{bot}', safeDS.bot[i].user.tag));

                // Emit Event
                await safeDS.events.emit('closeBot', safeDS.bot[i], i);

                // Anti Repeat
                const anti_user_repeat = [];

                // Prepare Welcome
                let use_welcome = false;

                if (safeDS.config.logoff_warn) {
                    use_welcome = true;
                }

                if (safeDS.config.discord.bots[i].logoff_warn) {
                    use_welcome = true;
                } else {
                    use_welcome = false;
                }

                // Send Warn to Admin
                for (const item in safeDS.config.discord.bots[i].admin) {
                    if (typeof safeDS.config.discord.bots[i].admin[item] === "string" && anti_user_repeat.indexOf(safeDS.config.discord.bots[i].admin[item]) < 0) {
                        const admin_channel = await safeDS.bot[i].users.fetch(safeDS.config.discord.bots[i].admin[item]);
                        if (admin_channel) {

                            // Emit Event
                            await safeDS.events.emit('closeBotAdmin', admin_channel, i);

                            // Send Message
                            anti_user_repeat.push(safeDS.config.discord.bots[i].admin[item]);
                            if (use_welcome) { await admin_channel.send(warn_message); }

                        }
                    }
                }

                for (const item in safeDS.config.discord.bots[i].superAdmin) {
                    if (typeof safeDS.config.discord.bots[i].superAdmin[item] === "string" && anti_user_repeat.indexOf(safeDS.config.discord.bots[i].superAdmin[item]) < 0) {
                        const admin_channel = await safeDS.bot[i].users.fetch(safeDS.config.discord.bots[i].superAdmin[item]);
                        if (admin_channel) {

                            // Emit Event
                            await safeDS.events.emit('closeBotAdmin', admin_channel, i);

                            // Send Message
                            anti_user_repeat.push(safeDS.config.discord.bots[i].superAdmin[item]);
                            if (use_welcome) { await admin_channel.send(warn_message); }

                        }
                    }
                }

                for (const item in safeDS.config.superAdmin) {
                    if (typeof safeDS.config.superAdmin[item] === "string" && anti_user_repeat.indexOf(safeDS.config.superAdmin[item]) < 0) {
                        const admin_channel = await safeDS.bot[i].users.fetch(safeDS.config.superAdmin[item]);
                        if (admin_channel) {

                            // Emit Event
                            await safeDS.events.emit('closeBotAdmin', admin_channel, i);

                            // Send Message
                            anti_user_repeat.push(safeDS.config.superAdmin[item]);
                            if (use_welcome) { await admin_channel.send(warn_message); }

                        }
                    }
                }

                await safeDS.functions.userRoleChecker(null, safeDS.bot[i].guilds, safeDS.config.discord.bots[i].adminRoles, anti_user_repeat, async function (user) {

                    // Emit Event
                    await safeDS.events.emit('closeBotAdmin', user, i);

                    // Send Message
                    anti_user_repeat.push(user.id);
                    if (use_welcome) { await user.send(warn_message); }
                    return;

                });

                // Set Status
                if (safeDS.config.discord.bots[i].shutdownStatus) {
                    await safeDS.bot[i].user.setStatus('invisible');
                }

                // Destroy Bot
                safeDS.bot[i].destroy();

                // Emit Event
                await safeDS.events.emit('closeBotDestroyed', i);

                // Warn Bot Destroyed 
                safeDS.console.cmd.log(`${safeDS.lang.get('closed_bot_warn')}`.replace('{bot}', safeDS.bot[i].user.tag));

            }

            // Nope
            else {
                safeDS.console.cmd.log(`${safeDS.lang.get('closed_bot_warn')}`.replace('{bot}', '??? (' + i + ')'));
            }

        }

    }

    // Emit Event
    await safeDS.events.emit('closeApp');

    // Close Warning
    safeDS.console.cmd.log(`${safeDS.lang.get('close_app_warn')}`);

    // Close Node App
    return process.exit(0);

};