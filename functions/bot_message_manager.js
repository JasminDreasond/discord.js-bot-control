module.exports = async function (type, extra, author, msg, data, safeDS) {

    // Validator
    if (
        safeDS.messageCache &&
        safeDS.messageCache.cache &&
        safeDS.messageCache.cache.sent &&
        safeDS.messageCache.cache.original &&
        (safeDS.messageCache.cache.original[msg.channel.id] || safeDS.messageCache.cache.sent[msg.channel.id])
    ) {

        // Get Confirm
        let confirm_delete = false;
        let tiny_error = null;

        // The Action
        const make_action = async function (where, from) {

            // Get Item
            const the_channel = safeDS.messageCache.cache[from][msg.channel.id][msg.id].origin.channel;
            const the_id = safeDS.messageCache.cache[from][msg.channel.id][msg.id].origin.id;
            const the_item = safeDS.messageCache.cache[where][the_channel][the_id];

            // Prepare Reverse
            let where2 = where;
            if (where2 === "sent") {
                where2 = 'original';
            } else {
                where2 = 'sent';
            }

            // Get Item
            const the_channel_2 = the_item.origin.channel;
            const the_id_2 = the_item.origin.id;
            const the_item_2 = safeDS.messageCache.cache[where2][the_channel_2][the_id_2];

            // Anti Multi Action
            if (!the_item.made && !the_item_2.made) {

                // Check
                the_item.made = true;
                the_item_2.made = true;

                // Try
                try {

                    // Emit Valies
                    const emitValue = {
                        bot: data.index,
                        type: type,
                        value: {
                            receiver: the_item,
                            transmitter: the_item_2
                        }
                    };

                    // Delete
                    if (type === "delete") {
                        await the_item.msg.delete().then(async () => {

                            // Prepare to Delete
                            if (the_item && the_item_2) {

                                // Emit Event
                                await safeDS.events.emit('botInteractionDeleteMessage', emitValue);
                                await safeDS.events.emit('botInteraction', emitValue);

                                // Prepare to Delete
                                if (the_item && the_item_2) {

                                    // Delete the Values
                                    delete safeDS.messageCache.cache[where][the_channel][the_id];
                                    delete safeDS.messageCache.cache[where2][the_channel_2][the_id_2];

                                    // Delete Rest
                                    if (Object.keys(safeDS.messageCache.cache[where][the_channel]).length < 1) { delete safeDS.messageCache.cache[where][the_channel]; }
                                    if (Object.keys(safeDS.messageCache.cache[where2][the_channel_2]).length < 1) { delete safeDS.messageCache.cache[where2][the_channel_2]; }

                                    // Delete Timeout
                                    if (where === "original") {
                                        clearTimeout(safeDS.messageCache.cache.timeout[the_channel + '_' + the_id + '_' + the_channel_2 + '_' + the_id_2]);
                                        delete safeDS.messageCache.cache.timeout[the_channel + '_' + the_id + '_' + the_channel_2 + '_' + the_id_2];
                                    } else {
                                        clearTimeout(safeDS.messageCache.cache.timeout[the_channel_2 + '_' + the_id_2 + '_' + the_channel + '_' + the_id]);
                                        delete safeDS.messageCache.cache.timeout[the_channel_2 + '_' + the_id_2 + '_' + the_channel + '_' + the_id];
                                    }

                                }

                            }

                            // Complete
                            return;

                        }).catch(() => {
                            return the_item.msg.react(safeDS.reactions.get('blocked', data.index, true));
                        });
                    }

                    // Edit
                    else if (type === "edit") {
                        await the_item.msg.edit(msg.content).then(async function () {

                            // Emit Event
                            await safeDS.events.emit('botInteractionEditMessage', emitValue);
                            await safeDS.events.emit('botInteraction', emitValue);

                        }).catch(() => {
                            return the_item.msg.react(safeDS.reactions.get('blocked', data.index, true));
                        });
                    }

                    // Reaction
                    else if (type === "reactionAdd") {
                        if (!the_item_2.msg.channel.guild) {
                            await the_item.msg.react(extra.emoji).then(async function () {

                                // Emit Event
                                await safeDS.events.emit('botInteractionAddMessageReaction', emitValue);
                                await safeDS.events.emit('botInteraction', emitValue);

                            }).catch(() => {
                                return;
                            });
                        }
                    }

                    // Reaction
                    else if (type === "reactionRemove") {
                        if (!the_item_2.msg.channel.guild) {
                            await the_item.msg.reactions.resolve(extra.emoji.name).users.remove(the_item.msg.client.user.id).then(async function () {

                                // Emit Event
                                await safeDS.events.emit('botInteractionRemoveMessageReaction', emitValue);
                                await safeDS.events.emit('botInteraction', emitValue);

                            }).catch(() => {
                                return;
                            });
                        }
                    }

                    // Remove All Reactions
                    else if (type === "removeAllReactions") {
                        if (!the_item_2.msg.channel.guild) {
                            the_item.msg.reactions.removeAll().then(async function () {

                                // Emit Event
                                await safeDS.events.emit('botInteractionRemoveAllMessageReactions', emitValue);
                                await safeDS.events.emit('botInteraction', emitValue);

                            }).catch(() => {
                                return;
                            });
                        }
                    }

                    // Confirm Delete
                    confirm_delete = true;

                }

                // Fail
                catch (err) {
                    tiny_error = err;
                    confirm_delete = false;
                }

            }

            // Nope
            else {
                the_item.made = false;
                the_item_2.made = false;
            }

            // Complete
            return;

        };

        // Your Message
        if (safeDS.messageCache.cache.original[msg.channel.id] && safeDS.messageCache.cache.original[msg.channel.id][msg.id]) {
            await make_action('sent', 'original');
        }

        // Other Message
        else if (safeDS.messageCache.cache.sent[msg.channel.id] && safeDS.messageCache.cache.sent[msg.channel.id][msg.id]) {
            await make_action('original', 'sent');
        }

        // Error Delete
        if (!confirm_delete) {

            if (tiny_error) {
                safeDS.console.cmd.error(tiny_error);
                msg.channel.send(safeDS.console.discord.error(tiny_error.message));
            }

        }

    }

    // Complete
    return;

};