const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");
const config = require('../util/config')

module.exports.interaction = async (Client, interaction) => {
    interaction.channel.edit({permissionOverwrites:[
        {
            id:interaction.guild.roles.everyone.id,
            deny: [Discord.Permissions.FLAGS.SEND_MESSAGES, Discord.Permissions.FLAGS.ADD_REACTIONS, Discord.Permissions.FLAGS.CREATE_PUBLIC_THREADS, Discord.Permissions.FLAGS.CREATE_PRIVATE_THREADS]
        },
        
        {
            id: config.NonVerifID,
            deny: [Discord.Permissions.FLAGS.SEND_MESSAGES, Discord.Permissions.FLAGS.ADD_REACTIONS]
        },
        {
            id: config.AdoID,
            deny: [Discord.Permissions.FLAGS.SEND_MESSAGES, Discord.Permissions.FLAGS.ADD_REACTIONS]
        },
        {
            id: config.AdulteID,
            deny: [Discord.Permissions.FLAGS.SEND_MESSAGES, Discord.Permissions.FLAGS.ADD_REACTIONS]
        },
        
]
})
    Client.log('Salon lock', `${interaction.guild.members.cache.get(interaction.user.id).displayName} a vérouillé le salon <#${interaction.channel.id}> !`)
    interaction.reply({embeds:[Client.success('Salon correctement vérouillé !')]})
}

module.exports.help = COMMANDS.LOCK;
