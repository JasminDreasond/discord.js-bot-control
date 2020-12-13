module.exports = async function (msg, data, safeDS, command_message, message) {

    // The Channel Exist
    if (msg.client.dbc_cache.admins[msg.author.id].channel) {

        // Notification Send
        msg.react(safeDS.reactions.get('success', data.index, true)).catch((err) => {
            msg.channel.send(safeDS.console.discord.error(err.message));
        });

        // Send Message
        msg.client.dbc_cache.admins[msg.author.id].channel.send(message).then(async (new_msg) => {
           
            // Type
            let message_type = null;
            if(msg.client.dbc_cache.admins[msg.author.id].channel.tag){
                message_type = 'user';
            } else {
                message_type = 'channel';
            }

             // Emit Event
             await safeDS.messageCache.add(msg, new_msg, message_type, data, true);
             await safeDS.events.emit('adminMessageSent', data.index, msg.author, new_msg);
             return;       
            
        }).catch((err) => {

            // Error
            msg.channel.send(safeDS.console.discord.error(err.message));
            msg.react(safeDS.reactions.get('error', data.index, true)).catch((err) => {
                msg.channel.send(safeDS.console.discord.error(err.message));
            });

        });

        // Complete
        return true;

    }

    // Nope
    return false;

};