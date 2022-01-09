const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");
const config = require('../util/config')


module.exports.interaction = async (Client, interaction) => {
    interaction.channel.edit({permissionOverwrites:[
        {
            id:interaction.guild.roles.everyone.id,
            allow: [Discord.Permissions.FLAGS.SEND_MESSAGES, Discord.Permissions.FLAGS.ADD_REACTIONS, Discord.Permissions.FLAGS.CREATE_PUBLIC_THREADS, Discord.Permissions.FLAGS.CREATE_PRIVATE_THREADS]
        },
        
        {
            id: config.NonVerifID,
            allow: [Discord.Permissions.FLAGS.SEND_MESSAGES, Discord.Permissions.FLAGS.ADD_REACTIONS]
        },
        {
            id: config.AdoID,
            allow: [Discord.Permissions.FLAGS.SEND_MESSAGES, Discord.Permissions.FLAGS.ADD_REACTIONS]
        },
        {
            id: config.AdulteID,
            allow: [Discord.Permissions.FLAGS.SEND_MESSAGES, Discord.Permissions.FLAGS.ADD_REACTIONS]
        },
       
]
})
    Client.log('Salon déverouillé', `${ interaction.guild.members.cache.get(interaction.user.id).displayName} a déverouillé le salon <#${interaction.channel.id}> !`)
    interaction.reply({embeds:[Client.success('Salon correctement déverouillé !')]})
}

module.exports.help = COMMANDS.UNLOCK;
