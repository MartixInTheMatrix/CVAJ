const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");
const db = require('../util/db');


module.exports.interaction = async (Client, interaction) => {
    let member = interaction.guild.members.cache.get(interaction.options._hoistedOptions[0].value)
    let reason = interaction.options._hoistedOptions[1].value

    let dbUser = await Client.getUser(member) || Client.createUser(member)
    if(!dbUser) {
        Client.createUser(member)
        interaction.reply({embeds:[Client.error('Exceptionnellement cet utilisateur n\'avait pas de compte, veuillez réessayer.')]})
        
    }else{

        let date = new Date()
        await dbUser.warnsArray.push({date:date, raison: reason})
        if(dbUser.warnsArray[0].date === 'base'){
            dbUser.warnsArray.shift()
        }  

        await Client.updateUser(member, {warns: dbUser.warnsArray.length, warnsArray: dbUser.warnsArray}).then(()=>{
            interaction.reply({embeds:[Client.success('Le membre ' + member.displayName + ' a bien été warn, il est désormais à ' +  dbUser.warnsArray.length + ' warns !')]})
            Client.log('Membre warn', 'Le membre ' + member.displayName + ' a été warn par ' + interaction.guild.members.cache.get(interaction.user.id).displayName + ', il est désormais à ' + dbUser.warnsArray.length + ' warns, raison: ' + reason )
        })
        Client.alert(member, 'Vous avez été warn dans le serveur CVAJ, vous etes désormais à '+ dbUser.warnsArray.length  +' warns, raison: ' + reason)
    
    }
        

    
}

module.exports.help = COMMANDS.WARN;
