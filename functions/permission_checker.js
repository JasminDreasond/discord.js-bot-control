module.exports = async (guilds, authorID, bot_index, safeDS) => {

    // Is Admin
    const app_permissions = {
        superAdmin: false,
        botSuperAdmin: false,
        admin: false
    };

    // is Super Admin
    for (const item in safeDS.config.superAdmin) {
        if (typeof safeDS.config.superAdmin[item] === "string" && safeDS.config.superAdmin[item] === authorID) {
            app_permissions.superAdmin = true;
            app_permissions.admin = true;
            app_permissions.botSuperAdmin = true;
        }
    }

    // Is Bot Super Admin
    if (!app_permissions.admin) {
        for (const item in safeDS.config.discord.bots[bot_index].superAdmin) {
            if (typeof safeDS.config.discord.bots[bot_index].superAdmin[item] === "string" && safeDS.config.discord.bots[bot_index].superAdmin[item] === authorID) {
                app_permissions.admin = true;
                app_permissions.botSuperAdmin = true;
            }
        }
    }

    // Is Bot Admin
    if (!app_permissions.admin) {
        for (const item in safeDS.config.discord.bots[bot_index].admin) {
            if (typeof safeDS.config.discord.bots[bot_index].admin[item] === "string" && safeDS.config.discord.bots[bot_index].admin[item] === authorID) {
                app_permissions.admin = true;
            }
        }
    }

    // Is Role Admin
    if (!app_permissions.admin) {
        if (await safeDS.functions.userRoleChecker(authorID, guilds, safeDS.config.discord.bots[bot_index].adminRoles)) {
            app_permissions.admin = true;
        }
    }

    return app_permissions;

};