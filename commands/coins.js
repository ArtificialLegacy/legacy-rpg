const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, prefix) => {
    let coins = JSON.parse(fs.readFileSync("./database/coins.json", "utf8"));
    if(!coins[message.guild.id]) {
        coins[message.guild.id] = {

        };
    }
    if(!coins[message.guild.id][message.author.id]) {
        coins[message.guild.id][message.author.id] = {
            coins: 0
        };
    }

    let embed = new Discord.RichEmbed()
    .setTitle(`${message.author.username}'s Coins`)
    .setColor("#8e278e")
    .addField("Coins", coins[message.guild.id][message.author.id].coins)
    .setFooter("You gain coins from leveling up your jobs and skills!")

    message.channel.send(embed);

    fs.writeFile("./database/coins.json", JSON.stringify(coins,null,4), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "coins"
}