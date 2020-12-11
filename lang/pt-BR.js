module.exports = {

    // Lang Info
    lang_name: 'Português Brasil',
    lang_author: 'Yasmin Seidel',
    lang_homepage: 'https://github.com/JasminDreasond',

    // Start
    starting_app: `{appname} foi iniciado...`,

    starting_language: `Os idiomas estão sendo inicializados...`,
    languages_started: `Languages started.`,
    language_loaded: `O valor do idioma "{lang}" foi carregado.`,

    starting_settings: `As configurações do aplicativo estão sendo carregadas...`,
    settings_started: `As configurações do aplicativo foram carregadas.`,

    starting_commands: `Os comandos estão sendo inicializados...`,
    commands_started: `Os comandos foram inicializados.`,

    starting_list_commands: `Os comandos estão sendo inicializados...`,
    list_commands_loaded: `O comando "{command}" foi inicializado.`,
    list_commands_started: `Os comandos foram inicializados.`,

    starting_global_storage: `O Global Storage está sendo inicializado...`,
    started_global_storage: `O Global Storage foi inicializado.`,

    starting_bot_storage: `O armazenamento do Storage de "{tag} ({id})" está sendo inicializado...`,
    started_bot_storage: `O armazenamento do Storage de "{tag} ({id})" foi inicializado.`,

    // Pagination
    pagination_base: `Página: {currect_page} | Total de Páginas: {total_pages} | Itens: {total}`,

    // Welcome Message
    welcome_1: `{appname} está online neste bot agora!`,
    welcome_2: `{appname} feito por {author} ({homepage}). Patreon: {patreon}`,
    welcome_3: `Lembre-se: Se este bot não tiver um banco de dados, todas as suas configurações serão redefinidas durante a inicialização.`,
    welcome_4: `Digite: \`\`{prefix}help\`\` para ver os comandos que você pode usar neste canal de DM.`,

    welcome_dm: `**Para receber DM de usuários que tentam conversar com o bot, use o comando: \`\`{prefix}dm ({on} or {off})\`\`.**`,
    welcome_dm_disabled: `**O comando Global DM está desabilitado para este bot.**`,

    // Folder Sounds
    sound_load_folder_prepare: `O carregador de pasta de som para "{id}" está sendo iniciado. ({folder})`,
    sound_load_folder_ready: `O carregador de pasta de som para "{id}" foi iniciado. ({folder})`,
    sound_load_folder_error: `Ocorreu um erro ao tentar ler o carregador de pasta de som "{id}". ({folder})`,

    sound_load_folder_preparing_main: `A pasta de áudio principal está sendo iniciada. ({folder})`,
    sound_load_folder_ready_main: `A pasta de áudio principal foi iniciada. ({folder})`,
    sound_load_folder_error_main: `Ocorreu um erro ao tentar ler a pasta de som principal. ({folder})`,

    // Reaction Manager Command
    cm_reactionmanager_not_allowed: `Você não tem permissão para gerenciar as reações.`,

    cm_reactionmanager_change_global: `Você modificou a reação **{reaction}** do valor **{tyoe}** nos valores globais.`,
    cm_reactionmanager_change_all_bots: `Você modificou a reação **{reaction}** do valor **{type}** em todos os bots.`,
    cm_reactionmanager_change: `Você modificou a reação **{reaction}** do valor **{type}** neste bot.`,

    cm_reactionmanager_new_value_not_found: `A nova reação não foi encontrada.`,
    cm_reactionmanager_not_found: `A reação que você deseja alterar não foi encontrada.`,
    cm_reactionmanager_help: `**Todas as reações estão no embed abaixo, digite um número ao lado do comando para prosseguir para a próxima página:**`,
    
    cm_reactionmanager_title: `Lista de Reações`,
    cm_reactionmanager_description: `Todas as reações configuradas estão armazenadas aqui.`,
    cm_reactionmanager_empty_reactions: `Algo está errado, a lista está vazia!`,

    cm_reactionmanager_help_message_see_list: `Veja a lista completa de reações que podem ser modificadas.`,
    cm_reactionmanager_help_message_change_reaction: `Altere o valor da reação.`,

    // DM Command
    cm_dm_enabled: `Você habilitou as mensagens DM globais.`,
    cm_dm_disabled: `Você desativou as mensagens DM globais.`,

    cm_dm_enabled_error: `Global DM já está habilitado.`,
    cm_dm_disabled_error: `Global DM já está desabilitado.`,

    cm_dm_invalid_value: `Você precisa escolher uma opção entre **on** ou **off** para as mensagens DM globais.`,
    cm_dm_system_disabled: `O comando do Global DM está desabilitado. Você não tem permissão para usá-lo.`,

    // Embed Color Command
    cm_embedcolor_changed: `O valor da cor foi alterado para **{color}**.`,
    cm_embedcolor_show: `A cor atualmente selecionada é **{color}**.`,
    cm_embedcolor_help: `Coloque qualquer valor relacionado a um código de cor junto com este comando. Para ver a cor selecionada atualmente, digite: **{prefix}{command_show}**.`,
    cm_embedcolor_not_allowed: `Você não tem permissão para alterar a cor do embed do bot.`,

    // Channel Command
    cm_channel_change: `O canal selecionado agora é **{channel}** na guilda **{guild}**.`,
    cm_channel_not_found: `Canal não encontrado.`,
    cm_channel_help: `Ao ativar este comando, todas as suas mensagens digitadas no DM serão enviadas para o canal de texto selecionado. Você precisa executar este comando com o ID de um canal de texto.`,

    // User Command
    cm_user_change: `O canal selecionado agora é a DM de **{user}** ({id}).`,
    cm_user_not_found: `Usuário não encontrado.`,
    cm_user_help: `Ao habilitar este comando, todas as suas mensagens digitadas no DM serão enviadas para o DM do usuário selecionado. Você precisa executar este comando com a ID de um usuário Discord.`,
    cm_user_no_youself: `Este ID de usuário é você mesmo!`,

    // Voice Command
    cm_voice_channel_change: `O canal de voz selecionado agora é **{channel}** na guilda **{guild}**.`,
    cm_voice_channel_not_found: `Canal de voz não encontrado.`,
    cm_voice_channel_help: `Este comando fará com que o bot entre no canal de voz selecionado. Você precisa executar este comando com o ID de um canal de voz.`,
    cm_voice_channel_need_leave: `Você precisa sair do canal de voz para usar este comando: **{channel}** na guilda **{guild}**.`,

    // Leave Voice Command
    cm_leave_voice_channel: `O canal de voz selecionado foi deixado: **{channel}** na guilda **{guild}**.`,
    cm_leave_user_channel: `Você saiu do canal de texto do usuário selecionado: **{user}** ({id}).`,
    cm_leave_channel: `Você saiu do canal de texto selecionado: **{channel}** na guilda **{guild}**.`,

    // Status Command
    cm_status_changed: `Novo status foi definido: **{status}**.`,
    cm_status_help: `**Opções de Status:**`,

    // Shutdown Command
    cm_shutdown_alert: `Comando de desligamento do Discord enviado por {user} ({id})`,
    cm_shutdown_result: `O aplicativo está sendo encerrado...`,
    cm_shutdown_not_allowed: `Você não tem permissão para encerrar o aplicativo! >:c`,

    // Help Command
    help_title: `Lista de Comandos`,
    help_message_info: `**Todos os comandos estão no embed abaixo, digite um número próximo ao comando para prosseguir para a próxima página:**`,
    help_description: `Todos os comandos instalados no aplicativo são visíveis nesta lista.`,

    help_is_empty: `O que? O comando de ajuda está vazio!`,
    help_is_empty_info: `O que você fez? Você é mau! >:c`,

    help_without_prefix: `Este comando não tem valor para o prefixo!`,
    help_without_prefix_value: `Índice de Comando: {index}`,

    help_dm: `Desative ou ative o receptor de DM deste bot. Você receberá DM de todos os usuários que tentarem conversar com o bot.`,
    help_leave_channel: `Suas mensagens não entrarão mais neste canal.`,
    help_leave_voice_channel: `O bot vai deixar este canal de voz da guilda.`,
    help_status: `Mude o status do bot. Digite o comando para mais opções.`,
    help_shutdown: `Encerre o aplicativo. Este comando é exclusivo para Super Administradores.`,
    help_about: `Veja os créditos do autor do aplicativo.`,
    help_admin: `Gerenciador de administrador do aplicativo.`,
    help_dmwarn: `Habilite ou desabilite a mensagem de aviso que aparece aos usuários quando não há administrador disponível para ver a mensagem privada do usuário.`,
    help_block_prefix: `Gerenciador de Prefixo Bloqueado.`,
    help_embedcolor: `Este comando muda a cor que é usada no Embed das mensagens do aplicativo. Insira o comando sem valor para obter mais informações.`,
    help_sound: `Use este comando para reproduzir arquivos de som em um canal de áudio.`,
    help_reaction: `Use este comando para que você possa reagir a uma mensagem que está em uma guilda. Digite o comando para obter mais informações.`,
    help_reactionmanager: `Gerenciar as reações utilizadas pelo sistema de aplicação.`,

    // Values
    channel_id: `ID do Canal`,
    user_id: `ID do Usuário`,
    role_id: `ID do Cargo`,
    guild_id: `ID da Guilda`,
    message_id: `ID da Mensagem`,
    reaction: `Reação`,
    optional: `Opcional`,
    voice_channel_id: `ID do Canal de Voz`,
    value: `Valor`,
    bot: `Bot`,
    global: `Global`,

    // Not Found
    command_not_found: `Comando não encontrado.`,

    // Ready Console Bot Message
    ready_bot: `Discord foi logado como {bot}!`,

    // Ready Console Message
    ready_app: `O aplicativo está pronto!`,

    // Close App Messages
    close_server_warn: `Recebido {sinal}. Fechando o aplicativo corretamente.`,
    close_bots_warn: `Desligando o {appname}.`,
    close_bot_warn: `Desligando o bot {bot}...`,
    closed_bot_warn: `{bot} foi desligado!`,
    close_app_warn: `Desligando o aplicativo node...`,

    // Inactive DM Messages Warning
    inactive_bot_dm: `Este Canal DM está inativo, sua mensagem não foi recebida.`,

    // Lang Commands
    cm_lang_list: `**Todos os idiomas estão no embed abaixo, digite um número ao lado do comando para prosseguir para a próxima página:**`,
    cm_lang_not_allowed: `Você não tem permissão para alterar o idioma do bot.`,
    cm_lang_result: `O idioma deste bot foi alterado para **{lang}**.`,
    cm_lang_not_found: `Idioma não encontrado.`,
    cm_lang_help: `Insira um valor de idioma junto com o comando para alterar o idioma. Para obter a lista de idiomas disponíveis, digite "?" com o comando.`,

    cm_lang_is_empty: `Sem idiomas aqui.`,
    cm_lang_is_empty_info: `A lista de idiomas está vazia. Algo está errado, como você está lendo isso?`,

    cm_lang_no_value: `Erro de idioma!`,
    cm_lang_no_value_info: `Este idioma não tem valor definido!`,

    cm_lang_title: `Idiomas do Aplicativo`,
    cm_lang_description: `Lista de idiomas instalados no aplicativo.`,

    // Admin Commands
    cm_admin_not_allowed: `Você não tem permissão para alterar a configuração do bot.`,
    cm_admin_command_not_found: `Comando Admin não encontrado.`,
    cm_admin_no_id: `Você precisa adicionar um ID ao comando admin!`,
    cm_admin_invalid_id: `Este ID é inválido para o comando admin!`,
    cm_admin_need_no_id: `Este comando admin não precisa de um ID.`,

    cm_admin_config_user_added: `O usuário **{username}** ({value}) foi adicionado à lista de **{option}**.`,
    cm_admin_config_user_removed: `O usuário **{username}** ({value}) foi removido da lista de **{option}**.`,

    cm_admin_config_user_added_error: `O usuário **{username}** ({value}) já está adicionado na lista de **{option}**.`,
    cm_admin_config_user_removed_error: `O usuário **{username}** ({value}) não está na lista **{option}**.`,

    cm_admin_config_role_added: `O cargo **{role_name}** ({role_value}) de **{guild_name}** ({guild_value}) foi adicionado à lista **{option}**.`,
    cm_admin_config_role_removed: `O cargo **{role_name}** ({role_value}) de **{guild_name}** ({guild_value}) foi removida da lista **{option}**.`,

    cm_admin_config_role_added_error: `O cargo **{role_name}** ({role_value}) de **{guild_name}** ({guild_value}) já está adicionado na lista **{option}**.`,
    cm_admin_config_role_removed_error: `O cargo **{role_name}** ({role_value}) de **{guild_name}** ({guild_value}) não está na lista **{option}**.`,

    cm_admin_config_reseted: `A lista **{option}** foi redefinida.`,
    cm_admin_config_reseted_error: `A lista **{option}** já está vazia.`,

    cm_admin_help_title: `**Opções que podem ser modificadas pelo comando admin:**`,
    cm_admin_help_bot_add: `Adicione um usuário que pode usar este bot.`,
    cm_admin_help_role_add: `Adicione um cargo que pode usar este bot.`,
    cm_admin_help_superbot_add: `Adicione um usuário que pode modificar as permissões deste bot.`,

    cm_admin_help_bot_remove: `Remova um usuário que pode usar este bot.`,
    cm_admin_help_role_remove: `Remova um cargo que pode usar este bot.`,
    cm_admin_help_superbot_remove: `Remova um usuário que pode modificar as permissões deste bot.`,

    cm_admin_help_bot_remove_all: `Remova todos os usuários que podem usar este bot.`,
    cm_admin_help_role_remove_all: `Remova todos os cargos que podem usar este bot.`,
    cm_admin_help_superbot_remove_all: `Remova todos os usuários que podem modificar as permissões deste bot.`,

    cm_admin_help_list: `Visualize a lista de usuários dentro do valor selecionado.`,
    cm_admin_help_list_title: `**Escolha uma opção para ver a lista de usuários:**`,

    cm_admin_command_no_user: `Vazio`,
    cm_admin_command_no_user_info: `Nenhum usuário foi encontrado.`,
    
    cm_admin_command_user_list_title: `**Lista de todos os usuários que estão dentro do grupo **{group}**, digite um número ao lado do comando para prosseguir para a próxima página:**`,
    
    cm_admin_command_user_list_embed_title: `Lista do Grupo - {group}`,
    
    cm_admin_command_user_list_embed_error: `Ocorreu um erro ao tentar carregar esta função!`,
    cm_admin_command_user_list_embed_error_guild: `Erro de Guilda: {error}`,
    cm_admin_command_user_list_embed_error_id: `Error no Cargo: {error}`,
    
    cm_admin_command_user_list_embed_desc_bots: `Esses usuários podem bater papo com outros usuários usando este bot.`,
    cm_admin_command_user_list_embed_desc_superbots: `Esses usuários podem gerenciar as configurações deste bot.`,
    cm_admin_command_user_list_embed_desc_superadmin: `Esses usuários têm acesso total a todos os comandos das ferramentas do aplicativo.`,
    cm_admin_command_user_list_embed_desc_roles: `Os usuários destes cargos podem conversar com outros usuários usando este bot.`,

    // Prefix Command
    cm_prefix_help: `Mude o prefixo deste bot.`,
    cm_prefix_changed: `O prefixo deste bot foi alterado para **{prefix}**.`,
    cm_prefix_not_allowed: `Você não tem permissão para alterar o prefixo do bot.`,
    cm_prefix_set_not_allowed: `Você não pode usar um prefixo que está na lista de prefixos bloqueados!`,

    // Block Prefix Command
    cm_blockprefix_added: `O prefixo **{prefix}** foi bloqueado.`,
    cm_blockprefix_added_error_duplicate: `O prefixo **{prefix}** já foi bloqueado.`,
    cm_blockprefix_added_same_prefix: `Você não pode bloquear o prefixo que está sendo usado para executar os comandos!`,
    cm_blockprefix_added_error: `Você precisa inserir um prefixo para ser bloqueado.`,

    cm_blockprefix_removed: `O prefixo **{prefix}** foi desbloqueado.`,
    cm_blockprefix_removed_error_duplicate: `O prefixo **{prefix}** já foi desbloqueado.`,
    cm_blockprefix_removed_error: `Você precisa inserir um prefixo para ser desbloqueado.`,

    cm_blockprefix_reseted: `Todos os prefixos foram desbloqueados.`,
    cm_blockprefix_reseted_error_duplicate: `A lista de prefixos do bloqueador já está vazia.`,
    cm_blockprefix_reseted_error: `Este comando do bloqueador de prefixo não precisa de valores.`,

    cm_blockprefix_command_not_found: `O comando do bloqueador de prefixo não foi encontrado.`,
    cm_blockprefix_not_allowed: `Você não tem permissão para usar o bloqueador de prefixo.`,

    cm_blockprefix_help_title: `**Comandos do Bloqueador de Prefixo:**`,
    cm_blockprefix_help_add: `Bloqueie um prefixo.`,
    cm_blockprefix_help_remove: `Desbloqueie um prefixo.`,
    cm_blockprefix_help_remove_all: `Desbloqueie todos os prefixos.`,
    cm_blockprefix_help_list: `Mostra a lista de todos os prefixos que foram bloqueados por este comando.`,

    cm_blockprefix_no_value: `Valor de prefixo inválido!`,
    cm_blockprefix_no_value_info: `Algo deu errado aqui.`,

    cm_blockprefix_is_empty: `Nenhum prefixo encontrado.`,
    cm_blockprefix_is_empty_info: `Use este comando para adicionar novos prefixos à lista.`,

    cm_blockprefix_title: `Lista de Prefixos Bloqueados`,
    cm_blockprefix_description: `Coloque aqui prefixos que você não deseja usar para evitar conflitos com outros recursos do bot.`,
    cm_blockprefix_list: `**Lista de todos os prefixos bloqueados, digite um número ao lado do comando para prosseguir para a próxima página:**`,

    // DM Warn Command
    cm_dmwarn_enabled: `Você habilitou o aviso de DM para nenhuma presença de administrador.`,
    cm_dmwarn_disabled: `Você desabilitou o aviso de DM para nenhuma presença de administrador.`,

    cm_dmwarn_enabled_error: `O aviso de DM para nenhuma presença de administrador já está habilitado.`,
    cm_dmwarn_disabled_error: `O aviso de DM para nenhuma presença de administrador já está desativado.`,

    cm_dmwarn_invalid_value: `Você precisa escolher uma opção entre **on** ou **off** para o avusi DM para nenhuma presença de administrador.`,
    cm_dmwarn_not_allowed: `Você não tem permissão para alterar o aviso de DM para nenhuma presença de administrador.`,

    // Reaction Command
    cm_reaction_sent: `A reação **{reaction}** foi enviada para a mensagem **{message_id}** no canal **{channel_name}** na guilda **{guild_name}**.`,
    cm_reaction_removed: `A reação **{reaction}** foi removida da mensagem **{message_id}** no canal **{channel_name}** na guilda **{guild_name}**.`,
    cm_reaction_message_not_found: `A mensagem para reagir não foi encontrada.`,
    cm_reaction_channel_not_found: `O canal para reagir não foi encontrado.`,
    cm_reaction_help: `Use este comando para que você possa reagir a uma mensagem que está em uma guilda. Adicione um **{remove_p}** no final do comando para remover a reação em uma mensagem.`,

    // Sound Command
    cm_sound_embed_duration: `Tempo do Som: {duration}`,

    cm_sound_no_value: `Arquivo não encontrado!`,
    cm_sound_no_value_info: `Algo aconteceu ao tentar detectar este arquivo.`,

    cm_sound_is_empty: `ELista de sons vazia.`,
    cm_sound_is_empty_info: `Você não tem som gravado, coloque um arquivo em uma pasta. :c`,

    cm_sound_title: `Arquivos de Som Registrados`,
    cm_sound_description: `Todos os arquivos de som registrados em sua pasta de som aparecerão aqui.`,
    cm_sound_list: `**Lista de todos os sons que você pode usar neste bot, digite um número ao lado do comando para prosseguir para a próxima página:**`,

    cm_sound_result_ended: `O som **{file}** da pasta **{folder_id}** foi encerrado.`,
    cm_sound_result: `O som **{file}** da pasta **{folder_id}** foi enviado.`,
    cm_sound_result_invalid: `O som **{file}** da pasta **{folder_id}** é inválido.`,

    cm_sound_not_found: `Arquivo de som não encontrado.`,

    cm_sound_help: `Você só precisa dizer o nome do arquivo junto com este comando. Para ver a lista de arquivos disponíveis, digite o comando **{prefix}sound ?**.`,

    cm_sound_nothing_now: `O reprodutor de som não está disponível no momento.`,
    cm_sound_voice_not_found: `O canal de áudio não foi encontrado. Digite o comando: **{prefix}voice**`,
    cm_sound_disabled: `O sistema de áudio está desativado no momento.`,

};