const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, prefix) => {
    let skills = JSON.parse(fs.readFileSync("./database/skills.json", "utf8"));
    if(!skills[message.guild.id]){
        skills[message.guild.id] = {
            
        };
    }
    if(!skills[message.guild.id][message.author.id]) {
        skills[message.guild.id][message.author.id] = {
            collectXP: 0,
            collectLevel: 0,
            fightXP: 0,
            fightLevel: 0
        };
    }

    let embed = new Discord.RichEmbed()
    .setTitle(`${message.author.username}'s Skills`)
    .setColor("#8e278e")
    .addField("Collecting Skill XP", skills[message.guild.id][message.author.id].collectXP, true)
    .addField("Collecting Skill Level", skills[message.guild.id][message.author.id].collectLevel, true)
    .addField("Fighting Skill XP", skills[message.guild.id][message.author.id].fightXP, true)
    .addField("Fighting Skill Level", skills[message.guild.id][message.author.id].fightLevel, true)
    .setFooter("Your skills level up by completing tasks!")

    message.channel.send(embed);

    fs.writeFile("./database/skills.json", JSON.stringify(skills,null,4), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "skills"
}