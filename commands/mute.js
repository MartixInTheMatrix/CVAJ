const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");


module.exports.interaction = async (Client, interaction) => {
    let member = interaction.guild.members.cache.get(interaction.options._hoistedOptions[0].value)
    let reason = interaction.options._hoistedOptions[1].value

    let dbUser = await Client.getUser(member) || await Client.createUser(member)
    if(!dbUser) {
        return interaction.reply({embeds:[Client.error('Exceptionnellement cet utilisateur n\'avait pas de compte, veuillez réessayer.')]})
        
    }else if(dbUser.muted){
        return interaction.reply({embeds:[Client.error('L\'utilisateur que vous tentez de rendre muet est déjà mute !')]})

    }else{
        let role = interaction.guild.roles.cache.get('929700596796235837')
        member.roles.add(role)
        Client.log('Membre muet !', `${interaction.guild.members.cache.get(interaction.user.id).displayName} a rendu muet le membre ${member.displayName}, raison: ${reason}`)
        Client.updateUser(member,{muted: true})
        return interaction.reply({embeds:[Client.success(`Vous avez bien muté le membre ${member.displayName} !`)]})
    }
}

module.exports.help = COMMANDS.MUTE;
