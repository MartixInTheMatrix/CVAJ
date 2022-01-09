const config = require('../../util/config');
const { deploySlashCommands, deleteSlashCommands } = require('../../startup')
module.exports = async (Client) => {
    const statuses = [`/help`, 'Centre Virtuel d\'Aide  aux Jeunes !', Client.guilds.cache.get(config.guildID).members.cache.size + ' membres !'];
	var i = 0;

    setInterval(() => {
        Client.user.setActivity(statuses[i], {type:"PLAYING"});
        i = ++i % statuses.length
    }, 30000)
    

	console.log(`BotLog : Connecté en tant que ${Client.user.tag}`);

    deploySlashCommands(Client)

    if (!Client.application.owner) await Client.application.fetch();

Client.guilds.cache.get(config.guildID).commands.fetch().then(collection =>{
    collection.forEach(command =>{
        if(command.applicationId === config.id && command.guildId == config.guildID){
            if(! /ban+tempban+kick+lock+unlock+warn+sanctions+clear+mute+unmuet+partial-ban/.test(command.name))return;

            let guild = Client.guilds.cache.get(config.guildID)
            guild.commands.permissions.set({command: command.id, permissions: [
                {
                    id: config.AdoID,
                    type: 'ROLE',
                    permission: false,
                },
                {
                    id: Client.guilds.cache.get(config.guildID).roles.everyone.id,
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
    console.log('BotLog : Commandes slash correctement enregistrées !')

}
