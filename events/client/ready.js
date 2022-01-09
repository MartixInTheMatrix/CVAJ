const config = require('../../util/config');
const { deploySlashCommands } = require('../../startup')
module.exports = async (Client) => {
    const statuses = [`/help`, 'Centre Virtuel d\'Aide  aux Jeunes !', Client.guilds.cache.get(config.guildID).members.cache.size + ' membres !'];
	var i = 0;

    setInterval(() => {
        Client.user.setActivity(statuses[i], {type:"PLAYING"});
        i = ++i % statuses.length
    }, 30000)
    

	console.log(`BotLog : Connecté en tant que ${Client.user.tag}`);
    deploySlashCommands(Client)
    console.log('BotLog : Commandes slash correctement enregistrées !')

}
