module.exports = {

    // Lang Info
    lang_name: 'English',
    lang_author: 'Yasmin Seidel',
    lang_homepage: 'https://github.com/JasminDreasond',

    // Start
    starting_app: `{appname} started...`,

    starting_language: `Languages are being loaded...`,
    languages_started: `Languages started.`,
    language_loaded: `The language value "{lang}" was loaded.`,

    starting_settings: `The application config is being loaded...`,
    settings_started: `The application config was loaded.`,

    starting_commands: `The commands are being started...`,
    commands_started: `The commands have been started.`,

    starting_list_commands: `The commands are being started...`,
    list_commands_loaded: `The command "{command}" was started.`,
    list_commands_started: `The commands have been started.`,

    starting_global_storage: `The global storage is being started...`,
    started_global_storage: `The global storage have been started.`,

    starting_bot_storage: `The bot "{tag} ({id})" storage is being started...`,
    started_bot_storage: `The bot "{tag} ({id})" storage have been started.`,

    // Pagination
    pagination_base: `Page: {currect_page} | Total Pages: {total_pages} | Items: {total}`,

    // Welcome Message
    welcome_1: `{appname} is online on this bot now!`,
    welcome_2: `{appname} made by {author} ({homepage}). Patreon: {patreon} | Discord: {discord_invite}`,
    welcome_3: `Remember If this bot does not have a database, all its settings will be reseted during the startup.`,
    welcome_4: `Type: \`\`{prefix}help\`\` to see commands that you can use in this DM Channel.`,

    welcome_dm: `**To receive DM from users who try to chat with the bot, use the command: \`\`{prefix}dm ({on} or {off})\`\`.**`,
    welcome_dm_disabled: `**The Global DM command is disabled for this bot.**`,

    // Folder Sounds
    sound_load_folder_prepare: `The sound folder loader for "{id}" is being started. ({folder})`,
    sound_load_folder_ready: `The sound folder loader for "{id}" has been started. ({folder})`,
    sound_load_folder_error: `An error occurred when trying to read the sound folder loader "{id}". ({folder})`,

    sound_load_folder_preparing_main: `The main audio folder is being started. ({folder})`,
    sound_load_folder_ready_main: `The main audio folder has been started. ({folder})`,
    sound_load_folder_error_main: `An error occurred when trying to read the main sound folder. ({folder})`,

    // Reaction Manager Command
    cm_reactionmanager_not_allowed: `You are not allowed to manage the reactions.`,

    cm_reactionmanager_change_global: `You modified the reaction **{reaction}** of the **{type}** value in the global values.`,
    cm_reactionmanager_change_all_bots: `You modified the reaction **{reaction}** of the **{type}** value in all bots.`,
    cm_reactionmanager_change: `You modified the reaction **{reaction}** of the **{type}** value in this bot.`,

    cm_reactionmanager_new_value_not_found: `The new reaction was not found.`,
    cm_reactionmanager_not_found: `The reaction you are wanting to change has not been found.`,
    cm_reactionmanager_help: `**All reactions are in the embed below, enter a number next to the command to proceed to the next page:**`,
    
    cm_reactionmanager_title: `Reactions List`,
    cm_reactionmanager_description: `All configured reactions are stored here.`,
    cm_reactionmanager_empty_reactions: `Something is wrong, the list is empty!`,

    cm_reactionmanager_help_message_see_list: `See the complete list of reactions that can be modified.`,
    cm_reactionmanager_help_message_change_reaction: `Change the reaction value.`,

    // DM Command
    cm_dm_enabled: `You enabled the Global DM messages.`,
    cm_dm_disabled: `You disabled the Global DM messages.`,

    cm_dm_enabled_error: `Global DM is already enabled.`,
    cm_dm_disabled_error: `Global DM is already disabled.`,

    cm_dm_invalid_value: `You need choose a option between **on** or **off** to the Global DM messages.`,
    cm_dm_system_disabled: `The command of Global DM is disabled. You are not allowed to use it.`,

    // Embed Color Command
    cm_embedcolor_changed: `The color value has been changed to **{color}**.`,
    cm_embedcolor_show: `The currently selected color is **{color}**.`,
    cm_embedcolor_help: `Put any value related to a color code together with this command. To see the current selected color, type: **{prefix}{command_show}**.`,
    cm_embedcolor_not_allowed: `You are not allowed to change the color of the bot's embed.`,

    // Channel Command
    cm_channel_change: `The selected channel now is **{channel}** in the guild **{guild}**.`,
    cm_channel_not_found: `Channel not found.`,
    cm_channel_help: `When you enable this command, all your messages typed in the DM will be sent to the selected text channel. You need to execute this command with the ID of a text channel.`,

    // User Command
    cm_user_change: `The selected channel now is **{user}** ({id}) DM.`,
    cm_user_not_found: `User not found.`,
    cm_user_help: `When you enable this command, all your messages typed in the DM will be sent to the selected user DM. You need to execute this command with the ID of a Discord User.`,
    cm_user_no_youself: `This User ID is yourself!`,

    // Voice Command
    cm_voice_channel_change: `The selected voice channel now is **{channel}** in the guild **{guild}**.`,
    cm_voice_channel_not_found: `Voice Channel not found.`,
    cm_voice_channel_help: `This command will make the bot enter the selected voice channel. You need to execute this command with the ID of a voice channel.`,
    cm_voice_channel_need_leave: `You need to leave the voice channel to use this command: **{channel}** in the guild **{guild}**.`,

    // Leave Voice Command
    cm_leave_voice_channel: `The selected voice channel was left: **{channel}** in the guild **{guild}**.`,
    cm_leave_user_channel: `The selected user channel was left: **{user}** ({id}).`,
    cm_leave_channel: `The selected channel was left: **{channel}** in the guild **{guild}**.`,

    // Status Command
    cm_status_changed: `New Status was defined: **{status}**.`,
    cm_status_help: `**Status Options:**`,

    // Shutdown Command
    cm_shutdown_alert: `Discord Shutdown Command sent by {user} ({id})`,
    cm_shutdown_result: `The application is shutting down...`,
    cm_shutdown_not_allowed: `You are not allowed to shut down the application! >:c`,

    // Help Command
    help_title: `Command List`,
    help_message_info: `**All commands are in the embed below, enter a number next to the command to proceed to the next page:**`,
    help_description: `All commands that are installed on the application are visible in this list.`,

    help_is_empty: `What? The help command is empty!`,
    help_is_empty_info: `What did you do? You're mean! >:c`,

    help_without_prefix: `This command has no value for the prefix!`,
    help_without_prefix_value: `Command Index: {index}`,

    help_dm: `Disable or turn on this bot's DM receiver. You will receive DM from all users who try to chat with the bot.`,
    help_leave_channel: `Your messages will no longer enter this channel.`,
    help_leave_voice_channel: `The bot will leave this guild voice channel.`,
    help_status: `Change the status of the bot. Type the command for more options.`,
    help_shutdown: `Shut down the application. This command is exclusive for Super Administrators.`,
    help_about: `See application author credits.`,
    help_admin: `Application administrator manager.`,
    help_dmwarn: `Enable or disable the warning message that appears to users when there is no administrator available to view the user's private message.`,
    help_block_prefix: `Block Prefix Manager.`,
    help_embedcolor: `This command changes the color that is used in the Embed of the application's messages. Enter the command with no value for more information.`,
    help_sound: `Use this command to play sound files on an audio channel.`,
    help_reaction: `Use this command so that you can react to a message that is in a guild. Type the command to more information.`,
    help_reactionmanager: `Manage the reactions that are used by the application system.`,

    // Values
    channel_id: `Channel ID`,
    user_id: `User ID`,
    role_id: `Role ID`,
    guild_id: `Guild ID`,
    message_id: `Message ID`,
    reaction: `Reaction`,
    optional: `Optional`,
    voice_channel_id: `Voice Channel ID`,
    value: `Value`,
    bot: `Bot`,
    global: `Global`,

    // Not Found
    command_not_found: `Command Not Found.`,

    // Ready Console Bot Message
    ready_bot: `Discord Logged in as {bot}!`,

    // Ready Console Message
    ready_app: `The Application is ready!`,

    // Close App Messages
    close_server_warn: `Received {signal}. Close the application properly.`,
    close_bots_warn: `Turning off the {appname}...`,
    close_bot_warn: `Closing {bot}...`,
    closed_bot_warn: `{bot} was closed!`,
    close_app_warn: `Closing node app...`,

    // Inactive DM Messages Warning
    inactive_bot_dm: `This DM Channel is inactive, your message has not been received.`,

    // Lang Commands
    cm_lang_list: `**All languages are in the embed below, enter a number next to the command to proceed to the next page:**`,
    cm_lang_not_allowed: `You are not allowed to change the bot's language.`,
    cm_lang_result: `The language of this bot has been changed to **{lang}**.`,
    cm_lang_not_found: `Language not found.`,
    cm_lang_help: `Enter a language value together with the command to change the language. For the list of available languages, type "?" with the command.`,

    cm_lang_is_empty: `No languages here.`,
    cm_lang_is_empty_info: `The language list is empty. Something's wrong, how are you reading this?`,

    cm_lang_no_value: `Language Error!`,
    cm_lang_no_value_info: `This language has no defined value!`,

    cm_lang_title: `Application Languages`,
    cm_lang_description: `List of languages installed in the application.`,

    // Admin Commands
    cm_admin_not_allowed: `You are not allowed to change the bot's config.`,
    cm_admin_command_not_found: `Admin Command not found.`,
    cm_admin_no_id: `You need to add an ID to the admin command!`,
    cm_admin_invalid_id: `This ID is invalid to the admin command!`,
    cm_admin_need_no_id: `This admin command does not need an ID.`,

    cm_admin_config_user_added: `The user **{username}** ({value}) has been added to the **{option}** list.`,
    cm_admin_config_user_removed: `The user **{username}** ({value}) has been removed to the **{option}** list.`,

    cm_admin_config_user_added_error: `The user **{username}** ({value}) is already added in the **{option}** list.`,
    cm_admin_config_user_removed_error: `The user **{username}** ({value}) is not in the **{option}** list.`,

    cm_admin_config_role_added: `The role **{role_name}** ({role_value}) from **{guild_name}** ({guild_value}) has been added to the **{option}** list.`,
    cm_admin_config_role_removed: `The role **{role_name}** ({role_value}) from **{guild_name}** ({guild_value}) has been removed in the **{option}** list.`,

    cm_admin_config_role_added_error: `The role **{role_name}** ({role_value}) from **{guild_name}** ({guild_value}) is already added in the **{option}** list.`,
    cm_admin_config_role_removed_error: `The role **{role_name}** ({role_value}) from **{guild_name}** ({guild_value}) is not in the **{option}** list.`,

    cm_admin_config_reseted: `The **{option}** list has been reset.`,
    cm_admin_config_reseted_error: `The **{option}** list is already empty.`,

    cm_admin_help_title: `**Options that can be modified by the admin command:**`,
    cm_admin_help_bot_add: `Add a user who can use this bot.`,
    cm_admin_help_role_add: `Add a role who can use this bot.`,
    cm_admin_help_superbot_add: `Add a user who can modify the permissions of this bot.`,

    cm_admin_help_bot_remove: `Remove a user who can use this bot.`,
    cm_admin_help_role_remove: `Remove a role who can use this bot.`,
    cm_admin_help_superbot_remove: `Remove a user who can modify the permissions of this bot.`,

    cm_admin_help_bot_remove_all: `Remove all users who can use this bot.`,
    cm_admin_help_role_remove_all: `Remove all roles who can use this bot.`,
    cm_admin_help_superbot_remove_all: `Remove all users who can modify the permissions of this bot.`,

    cm_admin_help_list: `View the list of users within the selected value.`,
    cm_admin_help_list_title: `**Choose an option to see the list of users:**`,

    cm_admin_command_no_user: `Empty`,
    cm_admin_command_no_user_info: `No users were found.`,

    cm_admin_command_user_list_title: `**List of all users who are inside the **{group}** group, enter a number next to the command to proceed to the next page:**`,
    
    cm_admin_command_user_list_embed_title: `Group List - {group}`,
    
    cm_admin_command_user_list_embed_error: `An error occurred while trying to load this role!`,
    cm_admin_command_user_list_embed_error_guild: `Guild Error: {error}`,
    cm_admin_command_user_list_embed_error_id: `Role Error: {error}`,
    
    cm_admin_command_user_list_embed_desc_bots: `These users can chat with other users using this bot.`,
    cm_admin_command_user_list_embed_desc_superbots: `These users can manage the settings of this bot.`,
    cm_admin_command_user_list_embed_desc_superadmin: `These users have full access to all application tools commands.`,
    cm_admin_command_user_list_embed_desc_roles: `The users of the roles can chat with other users using this bot.`,

    // Prefix Command
    cm_prefix_help: `Change the prefix of this bot.`,
    cm_prefix_changed: `This bot's prefix has been changed to **{prefix}**.`,
    cm_prefix_not_allowed: `You are not allowed to change the bot's prefix.`,
    cm_prefix_set_not_allowed: `You cannot use a prefix that is on the list of blocked prefixes!`,

    // Block Prefix Command
    cm_blockprefix_added: `The prefix **{prefix}** has been blocked.`,
    cm_blockprefix_added_error_duplicate: `The prefix **{prefix}** already been blocked.`,
    cm_blockprefix_added_same_prefix: `You cannot block the prefix being used to execute the commands!`,
    cm_blockprefix_added_error: `You need to enter a prefix to be blocked.`,

    cm_blockprefix_removed: `The prefix **{prefix}** has been unblocked.`,
    cm_blockprefix_removed_error_duplicate: `The prefix **{prefix}** already been unblocked.`,
    cm_blockprefix_removed_error: `You need to enter a prefix to be unblocked.`,

    cm_blockprefix_reseted: `The all prefixes has been unblocked.`,
    cm_blockprefix_reseted_error_duplicate: `The blocker prefix list is already empty.`,
    cm_blockprefix_reseted_error: `This prefix blocker command does not need values.`,

    cm_blockprefix_command_not_found: `The prefix blocker command was not found.`,
    cm_blockprefix_not_allowed: `You are not allowed to use the Prefix Blocker.`,

    cm_blockprefix_help_title: `**Prefix Blocker Commands:**`,
    cm_blockprefix_help_add: `Block a prefix.`,
    cm_blockprefix_help_remove: `Unblock a prefix.`,
    cm_blockprefix_help_remove_all: `Unblock all prefixes.`,
    cm_blockprefix_help_list: `Shows the list of all prefixes that have been blocked by this command.`,

    cm_blockprefix_no_value: `Invalid Prefix Value!`,
    cm_blockprefix_no_value_info: `Something went wrong here.`,

    cm_blockprefix_is_empty: `No Prefix found.`,
    cm_blockprefix_is_empty_info: `Use this command to add new prefixes to the list.`,

    cm_blockprefix_title: `List of Blocked Prefixes`,
    cm_blockprefix_description: `Put here prefixes that you don't want to be used to avoid conflicts with other bot features.`,
    cm_blockprefix_list: `**List of all blocked prefixes, enter a number next to the command to proceed to the next page:**`,

    // DM Warn Command
    cm_dmwarn_enabled: `You enabled the DM Warning to no admin presence.`,
    cm_dmwarn_disabled: `You disabled the DM Warning to no admin presence.`,

    cm_dmwarn_enabled_error: `The DM Warning to no admin presence is already enabled.`,
    cm_dmwarn_disabled_error: `The DM Warning to no admin presence is already disabled.`,

    cm_dmwarn_invalid_value: `You need choose a option between **on** or **off** to the DM Warning to no admin presence.`,
    cm_dmwarn_not_allowed: `You are not allowed to change the DM Warning to no admin presence.`,

    // Reaction Command
    cm_reaction_sent: `The reaction **{reaction}** was sent to the message **{message_id}** on channel **{channel_name}** on guild **{guild_name}**.`,
    cm_reaction_removed: `The reaction **{reaction}** was removed from the message **{message_id}** on channel **{channel_name}** on guild **{guild_name}**.`,
    cm_reaction_message_not_found: `The message to react was not found.`,
    cm_reaction_channel_not_found: `The channel to react was not found.`,
    cm_reaction_help: `Use this command so that you can react to a message that is in a guild. Add a **{remove_p}** at the end of the command to remove the reaction in a message.`,

    // Sound Command
    cm_sound_embed_duration: `Sound Time: {duration}`,

    cm_sound_no_value: `File not found!`,
    cm_sound_no_value_info: `Something happened while trying to detect this file.`,

    cm_sound_is_empty: `Empty sound list.`,
    cm_sound_is_empty_info: `You have no recorded sound, put a file in a folder. :c`,

    cm_sound_title: `Registered Sound Files`,
    cm_sound_description: `All sound files registered in your sound folder will appear here.`,
    cm_sound_list: `**List of all sounds that you can use in this bot, enter a number next to the command to proceed to the next page:**`,

    cm_sound_result_ended: `The sound **{file}** from the folder **{folder_id}** was ended.`,
    cm_sound_result: `The sound **{file}** from the folder **{folder_id}** was sent.`,
    cm_sound_result_invalid: `The sound **{file}** from the folder **{folder_id}** is invalid.`,

    cm_sound_not_found: `Sound file not found.`,

    cm_sound_help: `You just need to say the file name together with this command. To see the list of available files, type the command **{prefix}sound ?**.`,

    cm_sound_nothing_now: `The sound player is currently unavailable.`,
    cm_sound_voice_not_found: `The audio channel was not found. Type the command: **{prefix}voice**`,
    cm_sound_disabled: `The audio system is currently disabled.`,

};