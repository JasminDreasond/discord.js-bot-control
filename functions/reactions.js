// The Module
const reactionManager = {

    // The Start
    start: function (safeDS) {

        // Prepare Get
        reactionManager.get = function (value, botIndex, isConvertToID = false) {

            // Result
            let result = null;

            // Is Global
            if(typeof botIndex === "string" && botIndex === "global") {
                botIndex = null;
            }

            // Exist Config
            if (safeDS.config && safeDS.config.discord && safeDS.config.discord.bots) {

                // Is Global
                if ((typeof botIndex !== "string" && typeof botIndex !== "number") || !safeDS.config.discord.bots[botIndex] || !safeDS.config.discord.bots[botIndex].reactions || typeof safeDS.config.discord.bots[botIndex].reactions[value] !== "string") {

                    // Exist Global
                    if (safeDS.config.reactions && typeof safeDS.config.reactions[value] === "string") {
                        result = safeDS.config.reactions[value];
                    }

                }

                // Nope
                else {
                    result = safeDS.config.discord.bots[botIndex].reactions[value];
                }

                // Convert
                if(isConvertToID){
                    result = safeDS.functions.getEmojiID(result);
                }

            }

            // Send Result
            return result;

        };

        // Exist
        reactionManager.exist = function (value, botIndex) {

            // Get Reaction
            let the_reaction = reactionManager.get(value, botIndex);

            // Exist?
            if(typeof the_reaction === "string"){
                return true;
            }

            // Nope
            else {
                return false;
            }

        };

    }

};

// Send Module
module.exports = reactionManager;