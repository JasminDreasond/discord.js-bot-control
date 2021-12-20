module.exports = async function(msg, data, safeDS, command_message) {

    // Help
    if (command_message.startsWith(data.prefix + 'help ') || command_message === data.prefix + 'help') {

        // Prepare Array PAgination
        const paginate = require("paginate-array");

        // Convert to Number
        let page = Number(command_message.substring(data.prefix.length + 5));
        if (isNaN(page) || page < 1) {
            page = 1;
        }

        // Get Items
        let paginateCollection = paginate(safeDS.commands, page, 10);

        // Prepare Field
        const tiny_field = [];

        // Prepare Field
        if (paginateCollection.data.length > 0) {
            for (const item in paginateCollection.data) {

                // Exist Prefix
                if (typeof paginateCollection.data[item].prefix === "string") {

                    // Insert Prefix
                    let name = `${data.prefix}${paginateCollection.data[item].prefix}`;
                    let value = '...';

                    // Extra Info
                    if (typeof paginateCollection.data[item].extra_prefix_info === "string") {
                        name += ` ${paginateCollection.data[item].extra_prefix_info}`;
                    }

                    // Add Options
                    if (Array.isArray(paginateCollection.data[item].options)) {
                        for (const option in paginateCollection.data[item].options) {
                            if (typeof paginateCollection.data[item].options[option] === "string") {
                                name += ` {${safeDS.lang.get(paginateCollection.data[item].options[option], data.lang)}}`;
                            }
                        }
                    }

                    // Description Info
                    if (typeof paginateCollection.data[item].description === "string") {
                        value = safeDS.lang.get(paginateCollection.data[item].description, data.lang);
                    }

                    // Add to Field
                    tiny_field.push({
                        name: name,
                        value: value
                    });

                }

                // Error
                else {
                    // Add to Field
                    tiny_field.push({
                        name: `${safeDS.lang.get('help_without_prefix', data.lang)}`,
                        value: `${safeDS.lang.get('help_without_prefix_value', data.lang)}`.replace('{index}', item - safeDS.defaultCommands.length)
                    });
                }

            }
        }

        // Nothing
        else {

            // Add to Field
            tiny_field.push({
                name: safeDS.lang.get('help_is_empty', data.lang),
                value: safeDS.lang.get('help_is_empty_info', data.lang)
            });

        }

        // Message Data
        const message_data = {
            content: safeDS.console.discord.log(`${safeDS.lang.get('help_message_info', data.lang)}`),
            embeds: [{
                title: safeDS.lang.get('help_title', data.lang),
                description: safeDS.lang.get('help_description', data.lang),
                author: {
                    name: safeDS.appName,
                    icon_url: msg.client.user.avatarURL()
                },
                footer: {
                    text: safeDS.functions.getPaginationText(paginateCollection, data.lang)
                },
                fields: tiny_field
            }]
        };

        // Set Embed Color
        message_data.embeds[0].color = require('../functions/embed_color')(data.color);

        // Send Message
        msg.channel.send(message_data);

        // Complete
        return true;

    }

    // Nope
    return false;

};