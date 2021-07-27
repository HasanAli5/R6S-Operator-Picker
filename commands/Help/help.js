const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../config.json');

module.exports = {
	name: 'help',
	description: 'List All Of Commands Or Info About A Specific Command.',
	usage: '[command name]',
	execute(message, args) {
		const { commands } = message.client;

		if (!args.length) {
			const helpbed = new MessageEmbed()
			.setColor('#00ff00')
			.setTitle('Here\'s a list of all commands:')
			.setDescription(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`)
			.setFooter('Help Command')
			.setTimestamp();
			const cmd = commands.map(command => command.name);
			const desc = commands.map(command => command.description);
			for( numb in cmd){
				helpbed.addField(cmd[numb],desc[numb]);
			}

			return message.channel.send({embed: helpbed});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
		if (!command) {
			const errorbed=new MessageEmbed().setColor('#ff0000').setTitle('that\'s not a valid command!').setTimestamp().setFooter('Error!');
			return message.channel.send({embed: errorbed});
		}
		const specbed=new MessageEmbed()
		.setColor('#00ff00')
		.setFooter('Help Command')
		.setTimestamp();
		specbed.setTitle(`${command.name.replace(/^\w/, (c) => c.toUpperCase())} Command`);
		if (command.description) specbed.addField(`**Description:**`, `${command.description}`);
		if (command.usage) specbed.addField(`**Usage:**`, `**${prefix}${command.name}** ${command.usage}`);

		message.channel.send({embed: specbed});
	},
};