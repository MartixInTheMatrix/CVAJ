const Discord = require('discord.js');

module.exports = async (Client, interaction) => {
    if(!interaction.isCommand())return;

	const command = Client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.interaction(Client, interaction);
		console.log('BotLog : ' + interaction.user.tag + ' a éxectué la commande ' + interaction.commandName)

	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'Il y a eu une erreur !' });
	}

}