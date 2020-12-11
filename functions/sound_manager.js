const soundManager = {

    // Functions
    functions: {

        // Check Folder
        checkFolder: async function (the_folder, safeDS) {

            // File Module
            const fs = require('fs');

            // Prepare the Continue
            let the_continue = true;

            // Create Main Folder
            try {

                if (!fs.existsSync(the_folder)) {
                    fs.mkdirSync(the_folder);
                } else if (!fs.lstatSync(the_folder).isDirectory()) {

                    // Create Error
                    const err = new Error(`The sound path "${the_folder}" is not a directory!`);

                    // Cancel App
                    safeDS.console.cmd.error(err);
                    safeDS.close_app(`${err.message}`);

                    the_continue = false;

                }

            } catch (err) {

                // Cancel App
                safeDS.console.cmd.error(err);
                safeDS.close_app(`${err.message}`);

                the_continue = false;

            }

            // Return
            return the_continue;

        },

        // Load Folder
        loadFolder: async function (the_id, safeDS) {

            // Load Path
            const path = require('path');
            const fs = require('fs');

            // Get Clone
            const clone = require('clone');

            // Get Folder
            const the_folder = path.join(safeDS.config.sound_folder, './' + the_id);

            // Console Message
            safeDS.console.cmd.log(`${safeDS.lang.get('sound_load_folder_prepare')}`.replace('{id}', the_id).replace('{folder}', the_folder));

            // Prepare Continue
            let the_continue = true;

            // Check Var Exist
            if (!soundManager.folders[the_id]) {

                // Create Base
                soundManager.folders[the_id] = {

                    // Ready
                    ready: false,

                    // Error
                    error: false,

                    // Files Ready
                    filesReady: false

                };

                // Create Folder
                the_continue = await soundManager.functions.checkFolder(the_folder, safeDS);

                // Continue the Load
                if (the_continue) {

                    // Emit Event
                    await safeDS.events.emit('soundFolderDataCreated', {
                        folder: the_id,
                        value: the_folder
                    });

                    // Load Chokidar
                    const chokidar = require('chokidar');

                    // Insert Path
                    soundManager.folders[the_id].path = the_folder;

                    // File List
                    soundManager.folders[the_id].files = {};

                    // File Insert
                    const file_insert_st = async (folder, event, type) => {

                        // File Name
                        const filename = path.basename(folder);

                        // Insert File
                        if (filename && fs.lstatSync(folder).isFile()) {

                            // Prepare Sound
                            const { getAudioDurationInSeconds } = require('get-audio-duration');
                            let duration = null;

                            try {
                                duration = await getAudioDurationInSeconds(folder);
                            } catch (err) {
                                duration = null;
                            }

                            if (duration) {

                                // Insert File Value
                                soundManager.folders[the_id].files[filename] = {
                                    path: folder,
                                    duration: duration,
                                    data: event
                                };

                                // Prepare Event Type
                                let eventType = 'soundFolderFile';

                                // Add
                                if (type === "add") {
                                    eventType += 'Added';
                                }

                                // Change
                                else if (type === "change") {
                                    eventType += 'Changed';
                                }

                                // Emit Event
                                await safeDS.events.emit(eventType, {
                                    folder: the_id,
                                    file: folder,
                                    duration: duration,
                                    filename: filename,
                                    value: clone(event)
                                });

                            }

                        }

                        return;

                    };

                    // Insert Watch
                    soundManager.folders[the_id].watch = chokidar.watch(the_folder).on('add', (folder, event) => { return file_insert_st(folder, event, 'add'); }).on('change', (folder, event) => { return file_insert_st(folder, event, 'change'); }).on('unlink', async (folder, event) => {

                        // File Name
                        const filename = path.basename(folder);

                        // Insert File
                        if (filename) {

                            /// Delete File
                            if (soundManager.folders[the_id].files[filename]) {

                                // Delete
                                delete soundManager.folders[the_id].files[filename];

                                // Emit Event
                                await safeDS.events.emit('soundFolderFileDeleted', {
                                    folder: the_id,
                                    file: folder,
                                    filename: filename,
                                    value: clone(event)
                                });

                            }

                        }

                        return;

                    }).on('ready', async () => {

                        // File Ready
                        soundManager.folders[the_id].filesReady = true;

                        // Emit Event
                        await safeDS.events.emit('soundFolderFilesReady', {
                            folder: the_id,
                            value: the_folder
                        });

                        // Console Message
                        safeDS.console.cmd.log(`${safeDS.lang.get('sound_load_folder_ready')}`.replace('{id}', the_id).replace('{folder}', the_folder));

                    });

                }

                // Nope
                else {

                    soundManager.folders[the_id].error = true;

                    // Console Message
                    safeDS.console.cmd.log(`${safeDS.lang.get('sound_load_folder_error')}`.replace('{id}', the_id).replace('{folder}', the_folder));

                }

                // Ready
                soundManager.folders[the_id].ready = true;

                // Emit Event
                await safeDS.events.emit('soundFolderReady', {
                    folder: the_id,
                    value: the_folder
                });

            }

            // Complete
            return the_continue;

        }

    },

    // Folder List
    folders: {},

    // Ready
    ready: false,

    // Start
    start: async function (safeDS) {

        // Continue Starting
        let continue_the_start = true;

        // Value Exist
        if (typeof safeDS.config.sound_folder === "string") {

            // Console Message
            safeDS.console.cmd.log(`${safeDS.lang.get('sound_load_folder_preparing_main')}`.replace('{folder}', safeDS.config.sound_folder));

            // Create Main Folder
            continue_the_start = await soundManager.functions.checkFolder(safeDS.config.sound_folder, safeDS);

            // Continue?
            if (continue_the_start) {

                // Console Message
                safeDS.console.cmd.log(`${safeDS.lang.get('sound_load_folder_ready_main')}`.replace('{folder}', safeDS.config.sound_folder));

                // Prepare Global
                continue_the_start = await soundManager.functions.loadFolder('global', safeDS);

            }

            // Nope
            else {

                // Console Message
                safeDS.console.cmd.log(`${safeDS.lang.get('sound_load_folder_error_main')}`.replace('{folder}', safeDS.config.sound_folder));

            }

        }

        // Complete
        return continue_the_start;

    }

};

module.exports = soundManager;