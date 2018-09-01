const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, prefix) => {
    let status = JSON.parse(fs.readFileSync("./database/status.json", "utf8"));
    if(!status[message.author.id]){
        status[message.author.id] = {

        };
    }
    if(!status[message.author.id][message.author.id]) {
        status[message.author.id][message.author.id] = {
            health: 100,
            hunger: 0
        };
    }
    let uHealth = status[message.author.id][message.author.id].health;
    let uHunger = status[message.author.id][message.author.id].hunger;

    let embed = new Discord.RichEmbed()
    .setTitle(`${message.author.username}'s Status`)
    .setColor("#8e278e")
    .addField("Health", uHealth)
    .addField("Hunger", uHunger)
    .setFooter("Hunger goes up when you do tasks, and Health goes down when you take damage!")

    message.channel.send(embed);

    fs.writeFile("./database/status.json", JSON.stringify(status,null,4), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "status"
}