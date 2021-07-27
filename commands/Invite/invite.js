const Discord = require('discord.js')
module.exports = 
{
    name:'invite',
    description:'Invite Command Use It To Get The **Link** To The Bot Invite',
    usage:'\u200b',
    execute(message, args) {
        const invitebed = new Discord.MessageEmbed()
        .setColor('#ffff00')
        .setTitle('R6S Operator Picker')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=868529495429238796&permissions=8&scope=bot');
        message.channel.send({embed: invitebed});
    },

}