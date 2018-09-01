const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, prefix) => {
    let levels = JSON.parse(fs.readFileSync("./database/levels.json", "utf8"));
    if(!levels[message.guild.id][message.author.id]) {
        levels[message.guild.id][message.author.id] = {
            XP: 0,
            level: 0
        };
    }

    let embed = new Discord.RichEmbed()
    .setTitle(`${message.author.username}'s Level`)
    .setColor("#8e278e")
    .addField("Player XP", levels[message.guild.id][message.author.id].XP)
    .addField("Player Level", levels[message.guild.id][message.author.id].level)
    .setFooter("Your player levels up by completing tasks and leveling other stats up!")

    message.channel.send(embed);

    fs.writeFile("./database/levels.json", JSON.stringify(levels), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "level"
}