const { EmbedBuilder,SlashCommandBuilder } = require('discord.js')
module.exports = 
{
    data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Invite Command Use It To Get The **Link** To The Bot Invite'),
    async execute(interaction) {
        const invitebed = new EmbedBuilder()
        .setColor('#ffff00')
        .setTitle('R6S Operator Picker')
        .setURL('https://discord.com/oauth2/authorize?client_id=868529495429238796&permissions=8&integration_type=0&scope=bot');
        await interaction.reply({embed: [invitebed]});
    },

}