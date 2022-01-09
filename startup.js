const fs = require("fs");
const Discord = require('discord.js')
const { token, id } = require('./util/config');
const config = require('./util/config')
const loadEvents = (Client) => {
    fs.readdirSync(`./events`).forEach(dirs => {
        const events = fs.readdirSync(`./events/${dirs}/`).filter(files => files.endsWith(".js"));

        for(const event of events) {
            const evt = require(`./events/${dirs}/${event}`);
            const evtName = event.split('.')[0];
            Client.on(evtName, evt.bind(null, Client));
        }
    })
}
const deploySlashCommands = (client, guild) =>{

    const { REST } = require('@discordjs/rest');
    const { Routes } = require('discord-api-types/v9');
    const commands = [];

    const commandFiles = fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    let infos = command.help.interaction
    if(!infos){return;}
	commands.push(infos.toJSON());
    const getFileName = require(`./commands/${file}`);
    client.commands.set(getFileName.help.name, getFileName);
}

const rest = new REST({ version: '9' }).setToken(token);
if(!guild){

client.guilds.cache.forEach((g)=>{
    rest.put(Routes.applicationGuildCommands(id, g.id), { body: commands })
	.catch((e) => {
        return 
    });
})
}else{
    rest.put(Routes.applicationGuildCommands(id, guild.id), { body: commands })
	.catch((e) => {
        return 
    });
}
fixPermissions(client)
}

const fixPermissions = (client)=>{
    client.guilds.cache.get(config.guildID).commands.fetch().then(collection =>{
        collection.forEach(command =>{
            if(command.applicationId === config.id && command.guildId == config.guildID){
                if(! /ban+tempban+kick+lock+unlock+warn+sanctions+clear+mute+unmuet+partial-ban/.test(command.name))return;
    
                let guild = client.guilds.cache.get(config.guildID)
                guild.commands.permissions.set({command: command.id, permissions: [
                    {
                        id: config.AdoID,
                        type: 'ROLE',
                        permission: false,
                    },
                    {
                        id: client.guilds.cache.get(config.guildID).roles.everyone.id,
                        type: 'ROLE',
                        permission: false,
                    },
                    {
                        id: config.AdulteID,
                        type: 'ROLE',
                        permission: false,
                    },
                    {
                        id: config.NonVerifID,
                        type: 'ROLE',
                        permission: false,
                    },
                    {
                        id: config.StaffID,
                        type: 'ROLE',
                        permission: true,
                    },
                ]}).catch(console.log);
    
            }
        })
    
        
    })
}
module.exports = {
    loadEvents,
    deploySlashCommands
}
