const Discord = require("discord.js");

module.exports.run = async (bot, message, args, prefix) => {

    let embed = new Discord.RichEmbed()
    .setTitle("Help")
    .setColor("#8e278e")
    .addField("RPG Commands", `${prefix}inventory, ${prefix}collect, ${prefix}craft, ${prefix}equip, ${prefix}consume, ${prefix}status, ${prefix}unequip, ${prefix}trash, ${prefix}coins, ${prefix}pay, ${prefix}level, ${prefix}skills, ${prefix}smelt, ${prefix}vault, ${prefix}swap, ${prefix}shop, ${prefix}dungeon, ${prefix}crates, ${prefix}combat, ${prefix}repair, ${prefix}sell, ${prefix}salvage, ${prefix}info, ${prefix}`)
    .addField("Admin Commands", `${prefix}prefix`)
    .addField("Info Commands", `${prefix}botinfo, ${prefix}help, ${prefix}updates, ${prefix}patch, ${prefix}credits`)
    .addField("Server Prefix", prefix)
    .setFooter("Note: The server prefix may be changed at any time by the server admins!");

    message.channel.send(embed);
}

module.exports.help = {
    name: "help"
}