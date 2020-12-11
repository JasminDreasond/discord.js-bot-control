module.exports = async function (msg, data, safeDS, command_message) {

    // Command Not Found
    if (command_message.startsWith(data.prefix) && command_message.length > data.prefix.length) {
       
        // Send Message
        msg.channel.send(safeDS.console.discord.error(`${safeDS.lang.get('command_not_found', data.lang)}`));
        
        // Complete
        return true;
    
    }

    // Nope
    return false;

};