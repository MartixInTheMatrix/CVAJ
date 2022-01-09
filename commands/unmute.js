const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");


module.exports.interaction = async (Client, interaction) => {
    let member = interaction.guild.members.cache.get(interaction.options._hoistedOptions[0].value)

    let dbUser = await Client.getUser(member) || Client.createUser(member)
    if(!dbUser) {
        return interaction.reply({embeds:[Client.error('Exceptionnellement cet utilisateur n\'avait pas de compte, veuillez réessayer.')]})
        
    }else if(!dbUser.muted){
        return interaction.reply({embeds:[Client.error('L\'utilisateur n\'est pas muet !')]})

    }else{
        let role = interaction.guild.roles.cache.get('929700596796235837')
        member.roles.remove(role)
        Client.log('Membre démute !', `${interaction.guild.members.cache.get(interaction.user.id).displayName} a révoqué le mute du membre ${member.displayName}`)
        Client.updateUser(member,{muted: false})
        return interaction.reply({embeds:[Client.success(`Vous avez bien démuté le membre ${member.displayName} !`)]})
    }
}

module.exports.help = COMMANDS.UNMUTE;
