const { SlashCommandBuilder } = require('@discordjs/builders');

const COMMANDS = {
        HELP: {
            name: 'help',
            description: 'Donne des informations sur l\'utilisation du bot !',
            interaction: new SlashCommandBuilder()
            .setName('help')
            .setDescription('Donne des informations sur l\'utilisation du bot !'),
        },
        BAN: {
            name: 'ban',
            description: 'Bannir un utilisateur du serveur',
            interaction: new SlashCommandBuilder()
            .setName('ban')
            .setDescription('Bannir un utilisateur du serveur')
            .addUserOption(option =>
                option.setName('utilisateur')
                .setDescription('Quel utilisateur faut-il bannir ?')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('raison')
                .setDescription('Pourquoi bannez-vous le membre ?')
                .setRequired(true)
            )
        },
        TEMPBAN: {
            name: 'tempban',
            description: 'Bannir temporairement un utilisateur du serveur',
            interaction: new SlashCommandBuilder()
            .setName('tempban')
            .setDescription('Bannir temporairement un utilisateur du serveur')
            .addUserOption(option =>
                option.setName('utilisateur')
                .setDescription('Quel utilisateur faut-il bannir temporairement ?')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('durée')
                .setDescription('Combien de temps l\'utilisateur restera-t-il banni ? (ex de durée: 3s,4h,2d)')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('raison')
                .setDescription('Pourquoi bannez-vous temporairement le membre ?')
                .setRequired(true)
            )
        },
        KICK: {
            name: 'kick',
            description: 'Expulser un utilisateur du serveur',
            interaction: new SlashCommandBuilder()
            .setName('kick')
            .setDescription('Expulser un utilisateur du serveur')
            .addUserOption(option =>
                option.setName('utilisateur')
                .setDescription('Quel utilisateur faut-il kick ?')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('raison')
                .setDescription('Pourquoi kickez-vous le membre ?')
                .setRequired(true)
            )
            
        },
        LOCK: {
            name: 'lock',
            description: 'Verouille le salon dans lequel la commande est tapée',
            interaction: new SlashCommandBuilder()
            .setName('lock')
            .setDescription('Vérouille le salon dans lequel la commande est tapée')
        },
        UNLOCK: {
            name: 'unlock',
            description: 'Dévérouille le salon dans lequel la commande est tapée',
            interaction: new SlashCommandBuilder()
            .setName('unlock')
            .setDescription('Dévérouille le salon dans lequel la commande est tapée')
        },
        WARN: {
            name: 'warn',
            description: 'Avertir un utilisateur',
            interaction: new SlashCommandBuilder()
            .setName('warn')
            .setDescription('Avertir un utilisateur')
            .addUserOption(option =>
                option.setName('utilisateur')
                .setDescription('Quel utilisateur faut-il warn ?')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('message')
                .setDescription('Pourquoi warnez-vous le membre ?')
                .setRequired(true)
            )
        },
        SANCTIONS: {
            name: 'sanctions',
            description: 'Consulter l\'historique de sanctions d\'un utilisateur',
            interaction: new SlashCommandBuilder()
            .setName('sanctions')
            .setDescription('Consulter l\'historique de sanctions d\'un utilisateur')
            .addUserOption(option =>
                option.setName('utilisateur')
                .setDescription('De quel utilisateur voulez-vous avoir l\'historique ?')
                .setRequired(true)
            )
        },
        CLEAR: {
            name: 'clear',
            description: 'Supprimer un certain nombre de messages',
            interaction: new SlashCommandBuilder()
            .setName('clear')
            .setDescription('Supprimer un certain nombre de messages')
            .addStringOption(option =>
                option.setName('nombre')
                .setDescription('Combien de messages voulez-vous supprimer ?')
                .setRequired(true)
            )
        },
        MUTE: {
            name: 'mute',
            description: 'Rendre muet un utilisateur',
            interaction: new SlashCommandBuilder()
            .setName('mute')
            .setDescription('Rendre muet un utilisateur')
            .addUserOption(option =>
                option.setName('utilisateur')
                .setDescription('Quel utilisateur faut-il rendre muet ?')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('raison')
                .setDescription('Pourquoi mutez-vous le membre ?')
                .setRequired(true)
            )
        },
        UNMUTE: {
            name: 'unmute',
            description: 'Révoquer le mute d\'un utilisateur',
            interaction: new SlashCommandBuilder()
            .setName('unmute')
            .setDescription('Révoquer le mute d\'un utilisateur')
            .addUserOption(option =>
                option.setName('utilisateur')
                .setDescription('A quel utilisateur faut-il révoquer le mute ?')
                .setRequired(true)
            )
        },
        PARTIALBAN: {
            name: 'partial-ban',
            description: 'Bannir partiellement un utilisateur du serveur',
            interaction: new SlashCommandBuilder()
            .setName('partial-ban')
            .setDescription('Bannir partiellement un utilisateur du serveur')
            .addUserOption(option =>
                option.setName('utilisateur')
                .setDescription('Quel utilisateur faut-il partiellement bannir ?')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('raison')
                .setDescription('Pourquoi bannez-vous partiellement le membre ?')
                .setRequired(true)
            )
        },

        
    
}
module.exports = {
    COMMANDS
}