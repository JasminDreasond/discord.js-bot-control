const messageCache = {

    // Cache
    cache: {

        // DM
        original: {},

        // Guild
        sent: {},

        // Timeout List
        timeout: {}

    },

    // Start
    start: function (safeDS) {

        // Cache Add
        messageCache.add = async function (msg_sent, new_msg, type, data, isAdmin) {

            // Create Channel ID
            if (!messageCache.cache.original[msg_sent.channel.id]) {
                messageCache.cache.original[msg_sent.channel.id] = {};
            }

            // Insert Message
            messageCache.cache.original[msg_sent.channel.id][msg_sent.id] = {
                made: false,
                author: msg_sent.author,
                msg: msg_sent,
                type: type,
                origin: {
                    id: new_msg.id,
                    channel: new_msg.channel.id
                }
            };

            // Create Channel ID
            if (!messageCache.cache.sent[new_msg.channel.id]) {
                messageCache.cache.sent[new_msg.channel.id] = {};
            }

            // Insert Message
            messageCache.cache.sent[new_msg.channel.id][new_msg.id] = {
                made: false,
                author: msg_sent.author,
                type: type,
                msg: new_msg,
                origin: {
                    id: msg_sent.id,
                    channel: msg_sent.channel.id
                }
            };

            // Timeout
            messageCache.cache.timeout[msg_sent.channel.id + '_' + msg_sent.id + '_' + new_msg.channel.id + '_' + new_msg.id] = setTimeout(async function () {

                // Validate Exist
                if (
                    messageCache.cache.original[msg_sent.channel.id] &&
                    messageCache.cache.original[msg_sent.channel.id][msg_sent.id] &&
                    messageCache.cache.sent[new_msg.channel.id] &&
                    messageCache.cache.sent[new_msg.channel.id][new_msg.id]
                ) {

                    // React
                    if (isAdmin) {
                        msg_sent.react(safeDS.reactions.get('timeout', data.index, true));
                    }

                    // Delete Cache
                    if (messageCache.cache.original[msg_sent.channel.id][msg_sent.id]) { delete messageCache.cache.original[msg_sent.channel.id][msg_sent.id]; }
                    if (messageCache.cache.sent[new_msg.channel.id][new_msg.id]) { delete messageCache.cache.sent[new_msg.channel.id][new_msg.id]; }

                    // Clear More Cache
                    if (messageCache.cache.original[msg_sent.channel.id] && Object.keys(messageCache.cache.original[msg_sent.channel.id]).length < 1) { delete messageCache.cache.original[msg_sent.channel.id]; }
                    if (messageCache.cache.sent[new_msg.channel.id] && Object.keys(messageCache.cache.sent[new_msg.channel.id]).length < 1) { delete messageCache.cache.sent[new_msg.channel.id]; }

                }

                // Complete
                return;

            }, safeDS.config.messageCacheTime * 1000);

            // Return Complete
            return;

        };

        // Complete
        return;

    }

};

module.exports = messageCache;