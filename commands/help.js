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

        // Message Data
        const { MessageEmbed } = require('discord.js');
        const message_data = new MessageEmbed();

        message_data.setTitle(safeDS.lang.get('help_title', data.lang));
        message_data.setColor(data.color);
        message_data.setDescription(safeDS.lang.get('help_description', data.lang));

        message_data.setAuthor(safeDS.appName, msg.client.user.avatarURL());

        message_data.setFooter(safeDS.functions.getPaginationText(paginateCollection, data.lang));

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
                    message_data.addField(name, value);

                }

                // Error
                else {
                    // Add to Field
                    message_data.addField(
                        `${safeDS.lang.get('help_without_prefix', data.lang)}`,
                        `${safeDS.lang.get('help_without_prefix_value', data.lang)}`.replace('{index}', item - safeDS.defaultCommands.length)
                    );
                }

            }
        }

        // Nothing
        else {

            // Add to Field
            message_data.addField(
                safeDS.lang.get('help_is_empty', data.lang),
                safeDS.lang.get('help_is_empty_info', data.lang)
            );

        }

        // Send Message
        msg.channel.send({ embeds: message_data, content: safeDS.console.discord.log(`${safeDS.lang.get('help_message_info', data.lang)}`) });

        // Complete
        return true;

    }

    // Nope
    return false;

};