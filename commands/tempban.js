const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");
const ms = require('ms')

module.exports.interaction = async (Client, interaction) => {
    let member = interaction.guild.members.cache.get(interaction.options._hoistedOptions[0].value)
    let temps = interaction.options._hoistedOptions[1].value
    let reason = interaction.options._hoistedOptions[2].value
    console.log(interaction.options._hoistedOptions)

    if(!member.bannable)return interaction.reply({embeds:[Client.error('L\'utilisateur n\'est pas bannissable, il a peut etre un role plus important que le bot ou les permissions administrateurs.')]});
    
    Client.alert(member, 'Vous avez été banni du serveur CVAJ, pour une durée de '+ temps +', raison: ' + reason )
    member.ban({reason: reason}).then(()=>{
        interaction.reply({embeds:[Client.success('Le membre ' + member.displayName + ' a bien été banni temporairement pendant ' + temps + ' !')]})
        Client.log('Membre banni temporairement', 'Le membre ' + member.displayName + ' a été banni par ' + interaction.guild.members.cache.get(interaction.user.id).displayName + ' pour une durée de ' + temps + ', raison: ' + reason )
    })

    setTimeout(()=>{
        interaction.guild.members.unban(member.id).then(()=>{
            Client.log('Membre débanni automatiquement',  +'Le membre ' + member.displayName + ' a finit son tempban et est par conséquent débanni !' )

        })
    }, ms(temps))

}

module.exports.help = COMMANDS.TEMPBAN;
