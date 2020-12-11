module.exports = {

    prefix: 'about',
    description: 'help_about',
    action: async function (msg, data, safeDS, command_message) {

        // About Message
        msg.channel.send(
            safeDS.console.discord.log(`${safeDS.lang.get('welcome_2', data.lang)}`.replace('{appname}', safeDS.appName).replace('{author}', safeDS.functions.getModuleAuthor()).replace('{homepage}', safeDS.package.homepage).replace('{patreon}', safeDS.package.patreon).replace('{discord_invite}', 'https://discord.gg/TgHdvJd'))
        );

        // Complete
        return;

    }

};