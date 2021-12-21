<div align="center">
<p>
    <a href="https://discord.gg/TgHdvJd"><img src="https://img.shields.io/discord/413193536188579841?color=7289da&logo=discord&logoColor=white" alt="Discord server" /></a>
    <a href="https://discord.js.org/" rel="nofollow"><img alt="discord.js Version" src="https://img.shields.io/npm/dependency-version/discord.js-bot-control/discord.js" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/discord.js-bot-control"><img src="https://img.shields.io/npm/v/discord.js-bot-control.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/discord.js-bot-control"><img src="https://img.shields.io/npm/dt/discord.js-bot-control.svg?maxAge=3600" alt="NPM downloads" /></a>
    <a href="https://david-dm.org/JasminDreasond/discord.js-bot-control"><img src="https://img.shields.io/david/JasminDreasond/discord.js-bot-control.svg?maxAge=3600" alt="Dependencies" /></a>
    <a href="https://www.patreon.com/JasminDreasond"><img src="https://img.shields.io/badge/donate-patreon-F96854.svg?logo=patreon" alt="Patreon" /></a>
    <a href="https://ko-fi.com/jasmindreasond"><img src="https://img.shields.io/badge/donate-ko%20fi-29ABE0.svg?logo=ko-fi" alt="Ko-Fi" /></a>
</p>
<p>
    <a href="https://nodei.co/npm/discord.js-bot-control/"><img src="https://nodei.co/npm/discord.js-bot-control.png?downloads=true&stars=true" alt="npm installnfo" /></a>
</p>
</div>

# Discord-JS - Bot Control
This is a fun discord.js plugin for you to use your bot to send messages to other users manually.

<hr/>

# Sound Modules
To use the audio commands, you need to have one of the voice support modules of discord.js installed!

<hr/>

## Installation
While in root directory of your server run:
```
npm install discord.js-bot-control
```
And prepare your `server` script:
```javascript

// Get Modules
const dbc = require('discord.js-bot-control');

// Start
dbc.start({

    // Reactions
    reactions: {
        success: '✅',
        error: '🚫',
        blocked: '❌',
        timeout: '⏰'
    },

    // Intents
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS"
    ],

    // Discord Settings
    discord: {
        bots: [

            // Your Bot
            {

                // Settings
                token: "BOT TOKEN OR A DISCORD.JS OBJECT",
                lang: 'en',
                prefix: 'dbc!',
                block_prefix: ['!'],
                warnNoAdminsDM: true,
                shutdownStatus: true,
                allowGlobalDM: true,
                welcome: true,
                logoff_warn: false,

                // Reactions
                reactions: {
                    success: '✅',
                    error: '🚫',
                    blocked: '❌',
                    timeout: '⏰'
                },

                // Logs
                logs: {
                    error: true,
                    warn: true,
                    rateLimit: true,
                    disconnect: true
                },

                // Anti Flood
                msg_checker: async function(msg, cfg, perm_check) {

                    // Console Viewer
                    console.log(msg);
                    console.log(cfg);

                    // Check User Message Permissions
                    const permissions = await perm_check();
                    
                    return { 

                        // This value confirm that the message is okay
                        confirmed: true,

                        // Permissions
                        perms: permissions
                    
                    };

                },

                // Admin Users
                admin: [],

                // Admin Roles
                adminRoles: [],

                // Custom Commands
                commands: []

            }

        ]
    },

    // Welcome
    welcome: true,
    logoff_warn: false,

    // Custom Commands
    commands: [],

    // Anti Flood
    msg_checker: async function(msg, cfg, perm_check) {

            // Console Viewer
            console.log(msg);
            console.log(cfg);

            // Check User Message Permissions
            const permissions = await perm_check();
                    
            return { 

                // This value confirm that the message is okay
                confirmed: true,

                // Permissions
                perms: permissions
                    
            };

        },

    // Super Admin
    superAdmin: ["YOUR DISCORD ID"],

    // Show Logs
    showLogs: true,

    // Global Lang
    lang: 'en'

}).then(() => {

    // Start Warn
    console.log('Bot Started!');

}).catch(console.error);

```

<hr/>

## Usage
You and bot administrators need to activate Discord developer mode, as you will need to obtain the channel IDs, users, and other varieties of information to execute the commands. The other users don't have to do anything, they just need to interact with your bot.

To see the command list, type !help in the DM Bot Channel. (if your prefix is set to "!")

When you run the application, all users who are bot administrators will receive the application's welcome message. You can disable this by changing the `welcome` value of the global and bot value to false.

The storage folder will store a cache of things that happen in your bot.
The log folder will store reports of things that happen in your bot.
The sound folder will store folders where you can place random sounds to play with your friends in the server.

## Languages

<img src ="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/um.svg" height="20"> en - English (Made by me) (Default Language)

<img src ="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/br.svg" height="20"> pt-BR - Português Brasil (Made by me)

<hr/>

## Reactions
The reactions are used to indicate to the bot administrator if the  message was actually sent or had an error during the process.

Default Values inside the Reactions Object: 
success: ✅
error: 🚫
blocked: ❌
timeout: ⏰

How to get a reaction:
```js
// Get Module
const dbc = require('discord.js-bot-control');

// Start Application
await dbc.start({
    ...
});

// Get Reaction
const reaction = dbc.reactions.get('success', data.index);

// Get Reaction ID
const reactionID = dbc.reactions.get('success', data.index, true);

// Exist the Reaction?
const exist_reaction = dbc.reactions.exist('success', data.index);

// Show the Reaction Value
console.log(reaction, reactionID, exist);

// Get Reaction from global settings
const reaction_global = dbc.reactions.get('success', 'global');

// Exist the Reaction in the global settings?
const exist_reaction_global = dbc.reactions.exist('success');

// Show the Reaction Value
console.log(reaction_global, exist_reaction_global);

```

<hr/>

## Send Console
If you are looking to send log messages to the console, use the log module. It will be obeying the user's settings whether or not user wants to receive these logs on the server console.

```js

// Get Module
const dbc = require('discord.js-bot-control');

await dbc.start({
    ...
});

// Event Log
dbc.console.cmd.event('Event');

// Event Log
dbc.console.cmd.log('Log');

// Event Warn
dbc.console.cmd.warn('Warn');

// Event Error
dbc.console.cmd.error('Error');

```

## Discord Console Messages
If you want to send a Discord message that the user identifies that the message sent was made by the Discord Bot Control module.

```js

// Get Module
const dbc = require('discord.js-bot-control');

await dbc.start({
    ...
});

// Event Log
msg.channel.send(dbc.console.discord.log('Log'));

// Event Warn
msg.channel.send(dbc.console.discord.warn('Warn'));

// Event Error
msg.channel.send(dbc.console.discord.error('Error'));

```

<hr/>

## Send to Log FIle
You can use these scripts to send messages to your chosen log file path.

```js

// Get Module
const dbc = require('discord.js-bot-control');

await dbc.start({
    ...
});

/* 

    ==============================
    Send Discord User Log
    ==============================

    msg: discord.js message object.
    log_type: The Log FIle Type | options: mod, cmd
    log_function: The Log Function Type | options: info, error, warn (More Info: https://www.npmjs.com/package/simple-node-logger)
    discord_log_option: The Log text of the application to send with the Discord Message | options: log, warn, error
    message: The message to be sent to the Author Message.
    extra: The secondary options of the message method. It would be the same as typing: msg.channel.send(message, extra);

*/

/* 

    ==============================
    Send Message Log
    ==============================

    botID: Your Discord Bot ID.
    log_function: The Log Function Type | options: info, error, warn (More Info: https://www.npmjs.com/package/simple-node-logger)
    args: This value accepts only a string or an array that contains the list of arguments to be inserted into the log.

    //////////////////////////////////////////////////////

    dbc.console.file.cmd.bot: Place general events of your application that occur inside a Discord Bot.
    dbc.console.file.cmd.global: Place general events of your application that occur for global reasons.

    dbc.console.file.mod.bot: Place moderation or administration events of your application that occur inside a Discord Bot.
    dbc.console.file.mod.global: Place moderation or administration events of your application that occur for global reasons.

*/

dbc.console.file.cmd.bot(botID, log_function, args);
dbc.console.file.cmd.global(log_function, args);

dbc.console.file.mod.bot(botID, log_function, args);
dbc.console.file.mod.global(log_function, args);

```

<hr/>

## Configuration
The Main Values

<hr/>

### messageCacheTime (Number)
A number in seconds of how long the message control is recorded in the cache before it is deleted.

<hr/>

### showLogs (Boolean)
You can disable the log for this module here. Upon confirming this decision, you will only receive notice of the module settings being loaded and error messages.

<hr/>

### superAdmin (Array [string])
The list of User IDs of the super administrators who have full command to the bots and the application.

<hr/>

### discord.bots  (Array[object])
Array that will list all the bots that will be activated inside the application.

<hr/>

### lang (String)
Main Application Language.

<hr/>

### reactions (Object)
It contains all the reactions that are used in the application's messaging system.

<hr/>

### msg_checker (Function)
Add a function to validate the message.

<hr/>

### commands (Array[String or Object]) (Works in bot config too.)
Place your custom commands here.

Custom Command Example:
```js

module.exports = {

    prefix: 'test',
    action: async function (msg, data, dbc, command_message, message, perms) {

        // Discord.JS Message Object
        console.log(msg);

        // Bot App Data
        console.log(data);

        // Application Methods
        console.log(ds);

        // Message in toLocaleLowerCase
        console.log(command_message);

        // Message
        console.log(message);

        // User Permissions
        console.log(app_permissions);

        // Get Emoji ID
        const emoji_id = dbc.getEmojiID('<:yay:534456626405441536>');

        // Show Emoji ID
        console.log(emoji_id);

        // Get Pagination Text. This method return a string text.
        const pagination_text = dbc.getPaginationText({

            // Current Page
            currentPage: 1,

            // Total Items
            total: 100,

            // Total Pages
            totalPages: 10

        }, data.lang);

        // Show the Pagination
        console.log(pagination_text);

        // Complete
        return;

    }

};

```

<hr/>

### storage_folder (String)
Path of the location that will be stored the JSON files of the application cache.
If you want to disable this functionality, leave this value blank.

### sound_folder (String)
Path of the location that will be stored the sound files of the application.
If you want to disable this functionality, leave this value blank.

The folder named "global" will store all audio files that can be used in all bots. The folders with the ID of a bot stores files that can be opened only in the bot of the ID.

### log_folder (String)
Path of the location that will be stored the log files of the application.
If you want to disable this functionality, leave this value blank.

### log_time_24hours (Boolean)
Activate the 24 hour clock mode.

### log_timezone (String)
Choose a timezone value to be used in the application. You need to choose a value that can be read by the module <a href="https://momentjs.com/timezone/" target="_blank">moment-timezone (https://momentjs.com/timezone/)</a>.

### welcome (Boolean)
Whether a welcome message should be sent to all bot admins when the bot starts.

### logoff_warn (Boolean)
Whether a welcome message should be sent to all bot admins when the bot ends.

<hr/>

### reactions (Object)
It contains all the reactions that are used in the application's messaging system.

<hr/>

## Bot Configuration
Bot Configuration Values

<hr/>

### token (String or Discord.JS Object)
Put your bot's token here. If your bot has already been defined in a Discord.JS Object, you can place your bot's object instead of a Token String.

#### Examples

String:
```javascript
// Insert the token inside the bot setting
const bot_config = {
    token: '12ki35es6fk4sfs5e36'
};
```

Discord.JS Object:
```javascript
// Get Module
const Discord = require('discord.js');
const bot = new Discord.Client({ autoReconnect: true });

// Insert the Discord.JS object inside the token value of the bot setting
const bot_config = {
    token: bot
};

await dbc.start({

    ...

    discord: {
        bots: [bot_config]
    },

    ...

});

// Start the Bot
await bot.login('12ki35es6fk4sfs5e36');
```

<hr/>

### color
Color code that will be used on your bot's embed. The application will try to convert your selected color so that it can be used in Discord using the module <a href="https://www.npmjs.com/package/tinycolor2" target="_blank">tinycolor2</a>.

<hr/>

### welcome (Boolean)
Whether a welcome message should be sent to all bot admins when the bot starts.

### logoff_warn (Boolean)
Whether a welcome message should be sent to all bot admins when the bot ends.

<hr/>

### lang (String)
Set the language for this bot.

<hr/>

### prefix (String)
Enter the prefix that will be used to execute commands of your bot.

<hr/>

### block_prefix (Array [string])
Your bot is being used for other functionality? Put their prefix here to avoid conflict between the other features of your bot.

<hr/>

### warnNoAdminsDM (Boolean)
Let your users know when they don't have anyone to receive your bot's DMs.

<hr/>

### shutdownStatus (Boolean)
By activating this function, your bot will try to change the status to offline when the shutdown command is executed or the application is closed.

<hr/>

### logs (Object with Boolean Values)
Enables information logs on the application console.

<hr/>

### admin (Array [string])
Array of strings with a Discord account ID.

<hr/>

### superAdmin (Array [string])
The list of User IDs of the super administrators who have full command to this bot.

<hr/>

### adminRoles (Array [object])
Array of Discord Roles of servers allowed to access the bot admin.

#### adminRoles[item].id (String)
The Role ID

#### adminRoles[item].guild (String)
The Guild ID

<hr/>

### msg_checker (Function)
Add a function to validate the message.

<hr/>

### allowGlobalDM (Boolean)
Allow the command to receive DM from all users of the bot DM. 
<b>WARNING: not recommended for bots that are present on many servers! Use at your own risk!</b>

<hr/>

## Insert Custom Language
For your language to work, you should always define it before starting the application. 
You can also use this method to add new texts for an existing language, this is a great option if you are creating plugins with an international language.
```javascript

// Get Modules
const dbc = require('discord.js-bot-control');

// Load Custom Language
dbc.loadLang('custom_en', {
    welcome_1: 'This a tiny custom welcome message :3'
});

// Check if lang exist
if(dbc.langExist('custom_en')){

    // Start
    await dbc.start({
        // Discord Settings
        discord: {
            bots: [

                // Your Bot
                {

                    // Insert the new Language Setting
                    lang: 'custom_en'

                }

            ]
        }
    });

    // Change Global Lang
    dbc.setMainLang('en');

    // Get the Custom Language Value
    const custom_message_test = dbc.getLangValue('welcome_1', 'custom_en');
    console.log(custom_message_test);

}

```

You can also obtain languages that are already installed using this method.
```javascript

// Get All Languages List
const lang_list = dbc.getLang();

// Get Custom EN
const custom_en = dbc.getLang('custom_en');

// Get Language Options List
const custom_en = dbc.getLangList();

```

<hr/>

## Edit App Config
You can use these methods to update your application config.
We recommend that you modify user settings within a "readyBot" Event.
To remove a value, you just need to define an undefined value.

```javascript

// Get Modules
const dbc = require('discord.js-bot-control');

///////////////////////////////////////////

dbc.on('readyBot[0]', function () {

    // Validate User Admin Data to create a new Cache
    dbc.config.user.validator(0, '152145019296284672');

    // Create a custom value inside the bot 0 for the user id
    dbc.config.user.set(0, '152145019296284672', 'pudding', true);

    // Set 1 boop for all users in the bot 0
    dbc.config.allUsers.set(0, 'boop', 1);

    // Delete user from the bot's cache list. A empty bot value will reset the user in all bots
    dbc.config.user.delete('152145019296284672', 0);

    // Delete all users from the bot's cache list. A empty value will reset all bots
    dbc.config.allUsers.delete(0);

    // Get All User Cache Data from the bot Index 0
    const tinyUsers = dbc.allUsers.get('all', 0);

    // Show the Bot
    dbc.console.cmd.log(`Bot Users Cache:`, tinyUsers);

    // Get All User Cache Data from the bot Index 0
    const tinyUser = dbc.user.get(0, '152145019296284672');

    // Show the Bot
    dbc.console.cmd.log(`Bot User Cache:`, tinyUser);

    // Get a User Cache Data from the bot Index 0
    const tinyUserPudding = dbc.user.get(0, '152145019296284672', 'pudding');

    // Show the Bot
    dbc.console.cmd.log(`Bot User Pudding Cache:`, tinyUserPudding);

});

///////////////////////////////////////////

dbc.on('readyBot[0]', function () {

    // Use this method to obtain the Discord.JS Bot Object inside the application
    const tiny_bot = dbc.getBot(0);

    // Show the Bot
    dbc.console.cmd.log(`Bot Discord JS Object:`, tiny_bot);

    // You cannot use this method to change a bot token
    // Change the Super Admin list of the application
    dbc.config.global.set('superAdmin', ['test']);

    // Change the Super Admin list of the bot
    dbc.config.bot.set(0, 'superAdmin', ['test2']);

    // Change the Prefix of the all bots
    dbc.config.allBots.set(0, 'prefix', '!');

    // Get Config List
    const tinyCfgLoaded = dbc.config.getAll();

    // See Config List
    console.log(`${dbc.messageTag.cmd.base}Config Loaded:`, tinyCfgLoaded);

    
    // Get the Bot Config
    // The value 0 is the bot index inside the array of the bot list
    // You cannot use this method to get a bot token
    const tinyBotLoaded = dbc.config.bot.get(0);

    // See Bot Config
    dbc.console.cmd.log(`Bot Loaded:`, tinyBotLoaded);

    // Get a value of the Bot Config
    const tinyBotPrefix = dbc.config.bot.get(0, 'prefix');

    // See Bot Config
    dbc.console.cmd.log(`Bot Prefix Loaded:`, tinyBotPrefix);

    ///////////////////////////////////////////

    // Get the Bot List Config
    // You cannot use this method to get a bot token
    const tinyBotsLoaded = dbc.config.allBots.get();

    // See Bot Config
    dbc.console.cmd.log(`Bots Loaded:`, tinyBotsLoaded);

    // Get the Bot Prefix List
    const tinyBotsPrefixes = dbc.config.allBots.get('prefix');

    // See Bot Config
    dbc.console.cmd.log(`Bots Loaded:`, tinyBotsPrefixes);

    ///////////////////////////////////////////

    // Get the Global Config
    const tinyGlobalCfgLoaded = dbc.config.global.get();

    // See the Global Config
    dbc.console.cmd.log(`Global Config Loaded:`, tinyGlobalCfgLoaded);

});

///////////////////////////////////////////

// Start
await dbc.start({
    ...
});

///////////////////////////////////////////

```

<hr/>

# Events
This is the event API for anyone interested in developing plugins. 
You can use the "on", "off", "once" method.
```js

// Event Example
dbc.on('ready', function () {
    console.error('All Done!');
});

// Start
await dbc.start({
    ...
});


```

<hr/>

## ready
When the application is ready to be used.

<hr/>

## preparingBot
## preparingBot[index]
## readyBot
## readyBot[index]
When the bot is being prepared and then ready for use with the application.
Args: data, bot

### data.index
The bot index inside the application.

### bot
Discord.JS Client Object.

<hr/>

## readyAdminBot
When the admin user receive the warn that the bot was started.
Args: data, user

### data.index
The bot index inside the application.

### user
Discord.JS User Object.

<hr/>

## command_adminBotAdded
## command_adminBotRemoved
## command_adminBotReseted
When a user uses the command to add a new administrator.
Args: data, msg

### data.bot
The bot index inside the application.

### data.cfg_option
The config name modified inside the box index.

### data.result (Not available in command_adminBotReseted)
The new result of the cfg_option.

### data.value (Not available in command_adminBotReseted)
New value of the cfg_option.

### msg
Discord.JS Message Object.

<hr/>

## command_blockprefixAdded
## command_blockprefixRemoved
## command_blockprefixReseted
## command_blockuserAdded
## command_blockprefixRemoved
## command_blockprefixReseted
When a user uses the command to add a new prefix blocked.
Args: data, msg

### data.bot
The bot index inside the application.

### data.result (Not available in command_blockprefixReseted)
The new result of the config.

### data.value (Not available in command_blockprefixReseted)
New value of the config.

### msg
Discord.JS Message Object.

<hr/>

## command_reactionChangedGlobal
## command_reactionChangedAllBots
## command_reactionChanged
## command_changeEmbedColor
## command_langChanged
## command_channelSelected
## command_globalDMChanged
## command_channelLeft
## command_userSelected
## command_voiceLeft
## command_changePrefix
## command_shutdown
## command_status
## command_presence
## command_voiceJoined
## command_warnDMChanged
When a user uses the command to change the a bot value.
Args: data, msg

### data.bot
The bot index inside the application.

### data.value (Not available in Reset Events)
New value of the config.

### data.type
Available when the event comes from multiple types of the same value.

<hr/>

## triedForbiddenCommand
## triedSuperForbiddenCommand
When a user tries to execute a command they are not allowed.
Args: data, msg

### data.bot
The bot index inside the application.

### data.command
The bot command executed.

### msg
Discord.JS Message Object.

<hr/>

## closeAppWarn
When the app is getting ready to shut down.

## closeApp
When the app is ready to shut down.

<hr/>

## closeBot
When the bot starts to be turned off.
Args: bot, index

### bot
Discord.JS Client Object.

### index
The bot index inside the application.

<hr/>

## closeBotAdmin
When the admin will receive the application shutdown warning.
Args: user, index

### bot
Discord.JS User Object.

### index
The bot index inside the application.

<hr/>

## closeBotDestroyed
When the bot was completely destroyed.
Args: index

### index
The bot index inside the application.

<hr/>

## dmReceiver
## adminMessageSent
When a private message is received or an administrator sends a message via the bot.
Args: index, author, msg

### index
The bot index inside the application.

### author
Discord.JS User Object.

### msg
Discord.JS Message Object.

<hr/>

## command_react
## command_react_removed
When an user sends a reaction to a guild message via command.
Args: data, msg, msg_reacted, reaction

### data.bot
The bot index inside the application.

### data.value.channel
The Channel ID selected.

### data.value.message
The Message ID selected.

### data.value.reaction
The reaction value.

### data.value.emoji_id
The emoji id.

### msg
Discord.JS Message Object.

### msg_reacted
Discord.JS Message Object.

### reaction
Discord.JS Reaction Object.

<hr/>

## cfgUpdated
When any application settings are updated.
Args: data

### data.value
The new Value.

### data.bot
The bot index inside the application.

### data.index
The index of a value type

### data.where
The variable that was modified.

### data.type
The Value Type

<hr/>

## cfgUpdated_bot.*
When any application settings inside a bot are updated. If you only want to get a specific value, replace the "*".
Args: data

### data.value

### data.index
The bot index inside the application.

### data.where

<hr/>

## cfgUpdated_user.*
When any application settings inside a bot user list are updated. If you only want to get a specific value, replace the "*".
Args: data

### data.value
The new Value.

### data.index
The User ID.

### data.bot
The bot index inside the application.

### data.where
The variable that was modified.

<hr/>

## cfgUpdated_global.*
When any application global settings are updated. If you only want to get a specific value, replace the "*".
Args: data

### data.value
The new Value.

### data.where
The variable that was modified.

<hr/>

## cfgDeleted
When any user bot is deleted.
Args: data

### data.type

### data.bot
The bot index inside the application.

### data.index
The User ID.

<hr/>

## cfgDeleted_user.*
When any user bot is deleted. If you only want to get a specific value, replace the "*".
Args: data

### data.bot
The bot index inside the application.

### data.index
The User ID.

<hr/>

## startAdminDatabase
When an admin database is started.
Args: data

### data.bot
The bot index inside the application

### data.firstTime
Whether the process was caused by the application starting.

### data.userID
The User ID

<hr/>

## soundFolderDataCreated
## soundFolderFileAdded
## soundFolderFileChanged
## soundFolderFileDeleted
## soundFolderFilesReady
## soundFolderReady
When something happens to the application's sounds folder.
Args: data

### data.folder
The Sound Folder ID of the event.

### data.value
The value of the event.

### data.duration
The Audio Duration of the event.

### data.file
The file path when a file event is used.

### data.filename
The file name when a file event is used.

<hr/>

## botInteraction
## botInteractionDeleteMessage
## botInteractionEditMessage
## botInteractionAddMessageReaction
## botInteractionRemoveMessageReaction
## botInteractionRemoveAllMessageReactions
When there is some interaction with the bot.
Args: data

### data.bot
The bot index inside the application.

### data.type
Event Type executed.

### data.value
Object containing the two messages connected to perform the synchronized function.

### data.value[receiver/transmitter].made
This value is a synchronizer! Modify it at your own risk!

### data.value[receiver/transmitter].author
Discord.JS Author Object.

### data.value[receiver/transmitter].type
Event Type executed.

### data.value[receiver/transmitter].msg
Discord.JS Message Object.

### data.value[receiver/transmitter].origin
Message Origin Data to synchronize messages.

### data.value[receiver/transmitter].origin.channel
The Channel ID synced.

### data.value[receiver/transmitter].origin.id
The Message ID synced.
