module.exports = {

    prefix: 'test',
    description: 'help_about',
    action: async function (msg, data, dbc, command_message, message, perms) {

        // About Message
        msg.channel.send(
            dbc.console.discord.log(`Tiny Test`)
        );

        dbc.console.cmd.log(`Command Test:`, msg, data, dbc, command_message, message, perms);

        // Complete
        return;

    }

};