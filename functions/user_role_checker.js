module.exports = async function (userID, guilds, adminRoles, anti_user_repeat, callback) {

    // Create Result
    let result = false;

    // Check Admin Roles
    for (const item in adminRoles) {

        if (
            adminRoles[item] &&
            typeof adminRoles[item] !== "string" &&
            typeof adminRoles[item].id === "string" &&
            typeof adminRoles[item].guild === "string"
        ) {

            // Get Guild
            const the_guild = await guilds.cache.find(guild => guild.id === adminRoles[item].guild);
            if (the_guild) {

                // Check User ID Value
                if (typeof userID === "string" || typeof userID === "number") {

                    // Anti Repeat
                    if (!anti_user_repeat || anti_user_repeat.indexOf(userID) < 0) {

                        // Get User
                        const the_user = await the_guild.members.fetch(userID);
                        if (the_user) {

                            // Get Role
                            const the_role = await the_user.roles.cache.get(adminRoles[item].id);
                            if (the_role) {
                                result = true;
                            }

                        }

                    }

                }

                // Callback
                else if (typeof callback === "function") {

                    // Get Roles
                    const the_role = await the_guild.roles.fetch(adminRoles[item].id);
                    if (the_role) {

                        // Read Members
                        const itemsCheck = [];
                        the_role.members.forEach(async function (value) {
                            itemsCheck.push(value);
                        });

                        for (const item in itemsCheck) {

                            // Send userID Callback
                            if (typeof userID === "function") { await userID(itemsCheck[item].id); }

                            // Validate Repeat before the callback
                            if (!result && itemsCheck[item].user && (!anti_user_repeat || anti_user_repeat.indexOf(itemsCheck[item].id) < 0)) {
                                result = await callback(itemsCheck[item].user);
                            }

                        }

                    }

                }

            }

        }

    }

    // Result
    return result;

};