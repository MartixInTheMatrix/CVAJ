const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");


module.exports.interaction = async (Client, interaction) => {
    let nb = interaction.options._hoistedOptions[0].value
    if(nb > 100){
        return interaction.reply({embeds:[Client.error('Je ne peux supprimer que 100 messages d\'un coup ! Veuillez faire en plusieures fois.')]})
    }else{
        interaction.channel.bulkDelete(nb)
        Client.log('Clear messages', `${ interaction.guild.members.cache.get(interaction.user.id).displayName} a supprimé ${nb} messages dans <#${interaction.channel.id}>`)
        return interaction.reply({embeds:[Client.succcess('J\'ai supprimé `' + nb + ' messages` !')]})
    }
}

module.exports.help = COMMANDS.CLEAR;
