const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");
const config = require('../util/config')

module.exports.interaction = async (Client, interaction) => {
    let member = interaction.guild.members.cache.get(interaction.options._hoistedOptions[0].value) 
    let reason = interaction.options._hoistedOptions[1].value

    let main = Client.channels.cache.get(config.PartialBanCat)
    interaction.guild.channels.create('ban-'+member.displayName,{
        type:'text',
        parent: main,
        permissionOverwrites:[
            {
                id: member.id,
                allow: [Discord.Permissions.FLAGS.SEND_MESSAGES, Discord.Permissions.FLAGS.VIEW_CHANNEL]
            },
            {
                id: config.StaffID,
                allow: [Discord.Permissions.FLAGS.SEND_MESSAGES, Discord.Permissions.FLAGS.VIEW_CHANNEL]
            },
            {
                id: interaction.guild.roles.everyone.id,
                deny: [Discord.Permissions.FLAGS.SEND_MESSAGES, Discord.Permissions.FLAGS.VIEW_CHANNEL]
            },
            {
                id: config.AdoID,
                deny: [Discord.Permissions.FLAGS.SEND_MESSAGES, Discord.Permissions.FLAGS.VIEW_CHANNEL]
            },
            {
                id: config.AdulteID,
                deny: [Discord.Permissions.FLAGS.SEND_MESSAGES, Discord.Permissions.FLAGS.VIEW_CHANNEL]
            },
            {
                id: config.NonVerifID,
                deny: [Discord.Permissions.FLAGS.SEND_MESSAGES, Discord.Permissions.FLAGS.VIEW_CHANNEL]
            },
    ]
    }).then(channel =>{
        let embed = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .setAuthor('Vous avez été partiellement banni !', member.user.displayAvatarURL())
        .setDescription(`**Raison: ${reason}**, vous pouvez discuter dans ce salon avec le staff pour expliquer vos actes`)
        channel.send({embeds:[embed]})
        let roles = [ interaction.guild.roles.cache.get(config.NonVerifID), interaction.guild.roles.cache.get(config.AdoID), interaction.guild.roles.cache.get(config.AdulteID)]
        roles.forEach(r =>{
            if(member.roles.cache.has(r)){
                member.roles.remove(r)
            }
        })

        Client.alert(member,  'Vous avez été partiellement banni du serveur CVAJ, raison: ' + reason + ', vous pouvez vous expliquer auprès du staff du serveur dans le salon <#' + channel.id + '>')
        interaction.reply({embeds:[Client.success( 'Le membre ' + member.displayName + ' a bien été partiellement banni ! Retrouver son ticket dans la categorie correspondante' )]})
        Client.log('Membre partiellement banni',  'Le membre ' + member.displayName + ' a été partiellement banni par ' + interaction.guild.members.cache.get(interaction.user.id).displayName + ', raison: ' + reason, ', ticket : <#' + channel.id + '>')
        Client.updateUser(member,{partial_banned:true})
    })
    

}

module.exports.help = COMMANDS.PARTIALBAN;
