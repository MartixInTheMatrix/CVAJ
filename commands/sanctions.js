const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");


module.exports.interaction = async (Client, interaction) => {
    let member = interaction.guild.members.cache.get(interaction.options._hoistedOptions[0].value)

    let dbUser = await Client.getUser(member) || await Client.createUser(member)

    let i = 1
    let warns = dbUser.warnsArray

    let d = `**__Warns : \`${dbUser.warns}\`__**`
    warns.forEach((w)=>{
        d = d + `\n> \`#${i}\` - date: **${Client.convertDate(w.date)}** - message: **${w.raison}**`
    })
    let embed = new Discord.MessageEmbed()
    .setColor('#5865F2')
    .setAuthor('Historique de sanctions du membre ' + member.displayName, 'https://cdn.discordapp.com/attachments/928598025675358228/928600153206685706/info.png')
    .setDescription(d)
    interaction.reply({embeds:[embed]})
}

module.exports.help = COMMANDS.SANCTIONS;
