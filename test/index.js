const start_app = async function() {

    // Get Module
    const dbc = require('../index');

    // Get Config
    let tinyCfg = null;
    try {
        tinyCfg = require('./config');
    } catch (err) {
        tinyCfg = null;
        console.error(dbc.messageTag.cmd.error, err);
    }

    // Start the Example
    if (tinyCfg) {

        // Events
        const create_event = function(name, title) {
            dbc.on(name, function() {

                // See Config List
                dbc.console.cmd.event(title, arguments);

            });
        };

        create_event('ready', 'Plugin Ready');

        // Load Language
        await dbc.loadLang('custom_en', {
            welcome_1: 'This a tiny custom welcome message of the {appname} :3'
        });

        // Get Custom EN
        const custom_en = dbc.getLang('custom_en');

        // Bot Variable
        let bot = null;

        dbc.on('readyBot[0]', function() {

            // Get Bot
            bot = dbc.getBot(0);

            // Create a custom value inside the bot 0 for the user id
            dbc.config.user.set(0, '152145019296284672', 'pudding', true);

            // Set 1 boop for all users in the bot 0
            dbc.config.allUsers.set(0, 'boop', 1);

            // Remove the boop for all users in the bot 0
            dbc.config.allUsers.set(0, 'boop');

            // Get All Languages List
            const lang_list = dbc.getLang();

            // Get All Config
            const tinyCfgLoaded = dbc.config.getAll();

            // See Lang List
            dbc.console.cmd.log(`List of loaded languages:`, custom_en, lang_list);

            // See Config List
            dbc.console.cmd.log(`Config Loaded:`, tinyCfgLoaded);

            // See Config List
            dbc.console.file.cmd.bot(bot.user.id, 'info', 'The test bot is ready!');

            return;

        });

        // Start
        await dbc.start(tinyCfg);

        // Log File
        dbc.console.file.cmd.global('info', 'The application test is ready!');

    }

    // Nope! Cancel the example process
    else {

        console.error(`${dbc.messageTag.cmd.error}The settings were not loaded correctly!`);
        process.exit(0);

    }

};

// Start
start_app();