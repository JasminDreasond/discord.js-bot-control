module.exports = async function(msg, admin, message, anti_user_repeat, data, safeDS) {

    // Validator Admin
    await safeDS.configManager.user.validator(data.index, admin, safeDS);

    // Receive DM
    if (typeof admin === "string" && ((data.users[admin] && data.users[admin].receiveDM) || (msg.client.dbc_cache.admins[admin].channel && msg.client.dbc_cache.admins[admin].channel.id === msg.author.id && msg.client.dbc_cache.admins[admin].channel.tag))) {

        // Anti Repeat
        if (anti_user_repeat.indexOf(admin) < 0) {

            // Get User Chat
            const admin_channel = await msg.client.users.fetch(admin);
            if (admin_channel) {

                // Detect Same User
                if (admin !== msg.author.id) {

                    // Send Message
                    admin_channel.send(safeDS.console.discord.log(`**${msg.author.tag} (${msg.author.id})**:\n\n${message}`)).then(async(new_msg) => {

                        // Emit Event
                        await safeDS.messageCache.add(msg, new_msg, 'user', data, false);
                        await safeDS.events.emit('dmReceiver', data.index, msg.author, new_msg);
                        return;

                    }).catch((err) => {

                        // Error
                        msg.channel.send(safeDS.console.discord.error(err.message));
                        msg.react(safeDS.reactions.get('error', data.index, true)).catch((err) => {
                            msg.channel.send(safeDS.console.discord.error(err.message));
                        });

                    });

                }

                // Nope
                else {
                    return false;
                }

            }

        }

        // Complete
        return true;

    }

    // Nope
    else {
        return false;
    }

};