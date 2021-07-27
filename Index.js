const fs = require('fs');
const Discord = require('discord.js');
const {token,prefix} = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandfolders = fs.readdirSync('./commands');

for (const folder of commandfolders) {
	const commandfiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandfiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.once('ready',() =>{
    console.log('Logged In As',client.user.username);
    client.user.setActivity(`Truckers.FM | ${prefix}help`,{type:'LISTENING'});
});

client.on('message',message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try 
    {
        client.commands.get(command).execute(message, args);
    }
    catch (error)
    {
        if (error = TypeError)
        {
            message.channel.send(new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Not Right Usage')
            .setDescription(`**usage:** \`${prefix}s a\` *[For Attacker]* or \`${prefix}s d\` *[For Defender]*`)
            .setFooter('Error!')
            .setTimestamp());
            var skip=true;
        }
        else
        {
            console.error(error);
            message.channel.send(new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('There was an error trying to execute that command!')
            .setDescription(`try **${prefix}help** to check commands available.`)
            .setFooter('Error!')
            .setTimestamp());
        }
    }
    
});

client.login(token);