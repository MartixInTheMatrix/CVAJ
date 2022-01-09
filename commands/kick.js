const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");


module.exports.interaction = async (Client, interaction) => {
    let member = interaction.guild.members.cache.get(interaction.options._hoistedOptions[0].value) 
    let reason = interaction.options._hoistedOptions[1].value

    Client.alert(member,  'Vous avez été kick du serveur CVAJ, raison: ' + reason  )
    member.kick({reason: reason}).then(()=>{
        interaction.reply({embeds:[Client.success( 'Le membre ' + member.displayName + ' a bien été kick !' )]})
        Client.log('Membre kick',  'Le membre ' + member.displayName + ' a été kick par ' + interaction.guild.members.cache.get(interaction.user.id).displayName + ', raison: ' + reason )
    })
}

module.exports.help = COMMANDS.KICK;
