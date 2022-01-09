const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");


module.exports.interaction = async (Client, interaction) => {
    let member = interaction.guild.members.cache.get(interaction.options._hoistedOptions[0].value) 
    let reason = interaction.options._hoistedOptions[1].value
    if(!member.bannable)return interaction.reply({embeds:[Client.error('L\'utilisateur n\'est pas bannissable, il a peut etre un role plus important que le bot ou les permissions administrateurs.')]});
    
    Client.alert(member,  'Vous avez été banni du serveur CVAJ, raison: ' + reason )
    member.ban({reason: reason}).then(()=>{
        interaction.reply({embeds:[Client.success( 'Le membre ' + member.displayName + ' a bien été banni !' )]})
        Client.log('Membre banni',  'Le membre ' + member.displayName + ' a été banni par ' + interaction.guild.members.cache.get(interaction.user.id).displayName + ', raison: ' + reason)
    })

}

module.exports.help = COMMANDS.BAN;
