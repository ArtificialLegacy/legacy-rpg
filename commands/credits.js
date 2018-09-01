const Discord = require("discord.js");

module.exports.run = async (bot, message, args, prefix) => {

    let embed = new Discord.RichEmbed()
    .setTitle("Credits")
    .setColor("#8e278e")
    .addField("Developers", "ArtificialLegacy#0682, lior5654#1856")
    .addField("Supporters", "〜𝔇𝔯𝔞𝑘𝔬𝔰𝔱～#5500, ConradPoos#0002, Jethz#2276")
    .addField("Main Server", "https://discord.gg/UEHGrxN");

    message.channel.send(embed);
}

module.exports.help = {
    name: "credits"
}