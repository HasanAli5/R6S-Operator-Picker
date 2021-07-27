const Discord = require('discord.js')
const Operator = require('./operator.json')
const {prefix} = require('../../config.json')

function randint(max,min){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = 
{
    name:'s',
    description:'Get A Random **R6S Operator** using attack or defend!',
    usage:'[attack/defend]',
    execute(message, args) 
    {
        if (args[0]=="a" || args[0]=="attack"){
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
        else if (args[0]=="d" || args[0]=="defend"){
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



        const opbed = new Discord.MessageEmbed()
        .setColor(color)
        .setThumbnail(icon)
        .setURL(`https://www.ubisoft.com/en-gb/game/rainbow-six/siege/game-info/operators/${oplist[number]}`)
        .setTitle(oplist[number])
        .setImage(oplistimg[number])
        .addField("Primary",primary,true)
        .addField("Secondary",secondary,true)
        .addField("Gadget",gadget,true)
        .setFooter(authname)
        .setTimestamp()

        message.channel.send({embed: opbed});
    },

}