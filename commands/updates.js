const Discord = require("discord.js");

module.exports.run = async (bot, message, args, prefix) => {

    let embed = new Discord.RichEmbed()
    .setTitle("Planned Features")
    .setColor("#8e278e")
    .addField("Questing", `${prefix}quests, ${prefix}rewards <list, claim>`)
    .addField("Arcane / Alcemist", "Potions and runes!")
    .addField("Duels", `${prefix}duel (player)`)
    .addField("Trading", `${prefix}trade`)

    message.channel.send(embed);
}

module.exports.help = {
    name: "updates"
}