module.exports = {

    prefix: 'sound',
    description: 'help_sound',
    options: ['value'],
    action: async function(msg, data, safeDS, command_message, message, app_permissions) {

        // Get File List
        const fileList = [];

        // Get Files
        const get_files = function(id) {

            // Validate Item
            if (safeDS.soundManager.folders[id] && safeDS.soundManager.folders[id].ready && safeDS.soundManager.folders[id].filesReady && !safeDS.soundManager.folders[id].error && safeDS.soundManager.folders[id].files) {

                // Read Files
                for (const item in safeDS.soundManager.folders[id].files) {

                    // Add File
                    fileList.push({

                        fileID: item,

                        // Folder
                        folder: {
                            id: id,
                            path: safeDS.soundManager.folders[id].path
                        },

                        // File
                        file: safeDS.soundManager.folders[id].files[item]

                    });

                }

            }

            // Return
            return;

        };

        // List FIles
        const file_list_view = async function() {

            // Prepare Array PAgination
            const paginate = require("paginate-array");

            // Convert to Number
            let page = Number(message_value.substring(2));
            if (isNaN(page) || page < 1) {
                page = 1;
            }

            // Get Items
            let paginateCollection = paginate(fileList, page, 10);

            // Prepare Field
            const tiny_field = [];

            // Prepare Field
            if (paginateCollection.data.length > 0) {
                for (const item in paginateCollection.data) {

                    // Exist Prefix
                    if (typeof paginateCollection.data[item].fileID === "string" && paginateCollection.data[item].folder && typeof paginateCollection.data[item].folder.id === "string") {

                        // Insert Prefix
                        let name = paginateCollection.data[item].fileID;
                        let value = '???';

                        // Is Global
                        if (paginateCollection.data[item].folder.id === "global") {
                            name = `(${safeDS.lang.get('global', data.lang)}) - ${name}`;
                            value = `${data.prefix}sound global.${paginateCollection.data[item].fileID}`;
                        }

                        // Nope
                        else {
                            name = `(${safeDS.lang.get('bot', data.lang)}) - ${name}`;
                            value = `${data.prefix}sound bot.${paginateCollection.data[item].fileID}`;
                        }

                        // Add Sound Time
                        value += `\n${safeDS.lang.get('cm_sound_embed_duration', data.lang)}`.replace('{duration}', new Date(paginateCollection.data[item].file.duration * 1000).toISOString().substr(11, 8));

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
                            name: safeDS.lang.get('cm_sound_no_value', data.lang),
                            value: safeDS.lang.get('cm_sound_no_value_info', data.lang)
                        });

                    }

                }
            }

            // Nothing
            else {

                // Add to Field
                tiny_field.push({
                    name: safeDS.lang.get('cm_sound_is_empty', data.lang),
                    value: safeDS.lang.get('cm_sound_is_empty_info', data.lang)
                });

            }

            // Message Data
            const message_data = {
                embed: {
                    title: safeDS.lang.get('cm_sound_title', data.lang),
                    description: safeDS.lang.get('cm_sound_description', data.lang),
                    author: {
                        name: safeDS.appName,
                        icon_url: msg.client.user.avatarURL()
                    },
                    footer: {
                        text: safeDS.functions.getPaginationText(paginateCollection, data.lang)
                    },
                    fields: tiny_field
                }
            };

            // Set Embed Color
            message_data.embed.color = require('../functions/embed_color')(data.color);

            // Send Message
            msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_sound_list', data.lang)}`), message_data);

            // Complete
            return;

        };

        // Get Command value
        let message_value = msg.content.substring(data.prefix.length + 6);

        // Check Values Exist
        if (safeDS.soundManager && safeDS.soundManager.folders && safeDS.soundManager.folders.global) {

            // Voice Exist
            if (msg.client.dbc_cache.admins[msg.author.id].voice) {

                // Detect Sound Playing
                if (msg.client.dbc_cache.admins[msg.author.id] && !msg.client.dbc_cache.admins[msg.author.id].voiceConnectionPlaying) {

                    // Get Value
                    if (message_value) {

                        // Read Files Now
                        get_files('global');
                        get_files(msg.client.user.id);

                        // Normal Result
                        if (message_value !== "?") {

                            // Prepare Options
                            const message_items = message_value.split('.');

                            // Prepare FIle Value
                            let the_file = null;

                            // ID Inside the Value
                            if (message_items.length > 0) {

                                // Detect Item
                                if (message_items[0] !== "global" && message_items[0] !== "bot") {
                                    the_file = fileList.find(the_item => the_item.fileID === message_value);
                                }

                                // Nope
                                else {

                                    // Try
                                    message_value = message_value.substring(message_items[0].length + 1);

                                    // Is Global
                                    if (message_items[0] === "global") {
                                        the_file = fileList.find(the_item => the_item.folder.id === 'global' && the_item.fileID === message_value);
                                    }

                                    // is Bot
                                    else {
                                        the_file = fileList.find(the_item => the_item.folder.id === msg.client.user.id && the_item.fileID === message_value);
                                    }

                                    // Again
                                    if (!the_file) {
                                        message_value = message_items[0] + '.' + message_value;
                                        the_file = fileList.find(the_item => the_item.fileID === message_value);
                                    }

                                }

                            }

                            // Detect Language Exist
                            if (the_file) {

                                // Get Clone
                                const clone = require('clone');

                                // Emit Event
                                await safeDS.events.emit('command_soundEmited', {
                                    bot: data.index,
                                    value: clone(the_file)
                                }, msg);

                                // Send Sound
                                try {

                                    // Play Sound
                                    msg.client.dbc_cache.admins[msg.author.id].voiceConnectionPlaying = true;
                                    //await msg.client.dbc_cache.admins[msg.author.id].voiceConnection.setSpeaking('speaking');

                                    // Get File Duration
                                    if (the_file.file.duration) {

                                        // Play Sound
                                        msg.client.dbc_cache.admins[msg.author.id].voiceConnection.play(the_file.file.path);

                                        // Wait Sound Ends
                                        setTimeout(async function() {

                                            // Reset Values
                                            //await msg.client.dbc_cache.admins[msg.author.id].voiceConnection.setSpeaking('none');
                                            msg.client.dbc_cache.admins[msg.author.id].voiceConnectionPlaying = false;

                                            // Send Message
                                            await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_sound_result_ended', data.lang)}`.replace('{file}', the_file.fileID).replace('{folder_id}', the_file.folder.id));

                                            // Return
                                            return;

                                        }, Number(the_file.file.duration * 1000) + 2000);

                                        // Send Message
                                        await safeDS.console.file.sendDSUserLog(msg, 'mod', 'info', 'log', `${safeDS.lang.get('cm_sound_result', data.lang)}`.replace('{file}', the_file.fileID).replace('{folder_id}', the_file.folder.id));

                                        // Complete
                                        return;

                                    } else {

                                        //await msg.client.dbc_cache.admins[msg.author.id].voiceConnection.setSpeaking('none');
                                        msg.client.dbc_cache.admins[msg.author.id].voiceConnectionPlaying = false;
                                        await msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_sound_result_invalid', data.lang)}`.replace('{file}', the_file.fileID).replace('{folder_id}', the_file.folder.id)));

                                    };

                                }

                                // Error
                                catch (err) {
                                    //await msg.client.dbc_cache.admins[msg.author.id].voiceConnection.setSpeaking('none');
                                    msg.client.dbc_cache.admins[msg.author.id].voiceConnectionPlaying = false;
                                    await msg.channel.send(safeDS.console.discord.error(err.message));
                                }

                            }

                            // Nope
                            else {
                                msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_sound_not_found', data.lang)}`));
                            }

                        }

                        // Help
                        else {
                            await file_list_view();
                        }

                    }

                    // Nope
                    else {
                        msg.channel.send(safeDS.console.discord.log(`${safeDS.lang.get('cm_sound_help', data.lang)}`.replace('{prefix}', data.prefix)));
                    }

                }

                // Nope
                else {

                    if (message_value === "?") {

                        // Read Files Now
                        get_files('global');
                        get_files(msg.client.user.id);

                        await file_list_view();

                    }

                    // Nope
                    else {
                        msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_sound_nothing_now', data.lang)}`));
                    }

                }

            }

            // Nope
            else {

                if (message_value === "?") {

                    // Read Files Now
                    get_files('global');
                    get_files(msg.client.user.id);

                    await file_list_view();

                }

                // Nope
                else {
                    msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_sound_voice_not_found', data.lang)}`.replace('{prefix}', data.prefix)));
                }

            }

        }

        // Nope
        else {

            if (message_value === "?") {

                // Read Files Now
                get_files('global');
                get_files(msg.client.user.id);

                await file_list_view();

            }

            // Nope
            else {
                msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('cm_sound_disabled', data.lang)}`));
            }

        }

        // Complete
        return;

    }

};