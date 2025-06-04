const { EmbedBuilder,SlashCommandBuilder } = require('discord.js');
const Operator = require('./operator.json');

function randint(max,min){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = 
{
    data: new SlashCommandBuilder()
    .setName('random')
    .setDescription('Get A Random **R6S Operator**')
    .addStringOption(option =>
        option.setName('role')
        .setDescription('are you playing attacker or defender?')
        .setRequired(true)
        .addChoices(
            { name: 'Attacker', value: 'attack' },
            { name: 'Defender', value: 'defend' }
        )
    ),
    async execute(interaction) 
    {
        if (interaction.options.getString("role")=="attack"){
            var authname = "Attacker"
            var oplist=Operator.attackingoperators;
            var oplistimg=Operator.attackimg;
            var number=randint(29,0);
            var {primary,secondary,gadget} = require(`./AOperator/${oplist[number]}.json`);
            var {icon} = require('./icon.json');
            var primary = primary[randint(primary.length-1,0)];
            var secondary = secondary[randint(secondary.length-1,0)];
            var gadget = gadget[randint(gadget.length-1,0)];
            var {icon} = require(`./icons/${oplist[number]}/${oplist[number]}.json`);
            var color = "#0aa0ff";
        }
        else if (interaction.options.getString("role")=="defend"){
            var authname = "Defender"
            var oplist=Operator.defendingoperators;
            var oplistimg=Operator.defendimg;
            var number=randint(29,0);
            var {primary,secondary,gadget} = require(`./DOperator/${oplist[number]}.json`);
            var {icon} = require('./icon.json');
            var primary = primary[randint(primary.length-1,0)];
            var secondary = secondary[randint(secondary.length-1,0)];
            var gadget = gadget[randint(gadget.length-1,0)];
            var {icon} = require(`./icons/${oplist[number]}/${oplist[number]}.json`);
            var color = "#ff9900";
        }

        const opbed = new EmbedBuilder()
        .setColor(color)
        .setThumbnail(icon)
        .setURL(`https://www.ubisoft.com/en-gb/game/rainbow-six/siege/game-info/operators/${oplist[number]}`)
        .setTitle(oplist[number])
        .setImage(oplistimg[number])
        .addFields(
            {name:"Primary",value:primary},
            {name:"Secondary",value:secondary},
            {name:"Gadget",value:gadget})
        .setFooter({text:authname})
        .setTimestamp()

        await interaction.reply({embeds: [opbed]});
    },

}