const fs = require("fs");
const Discord = require('discord.js')
const { token, id } = require('./util/config');

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


}


module.exports = {
    loadEvents,
    deploySlashCommands
}
