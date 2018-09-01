const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, perms) => {

    let coins = JSON.parse(fs.readFileSync("./database/coins.json", "utf8"));

    if(!coins[message.guild.id][message.author.id]){
        message.reply("You don't have any coins!");
        return;
    }

    let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    if(!pUser){
        message.reply("No user specified!");
        return;
    }
    if(!args[1]){
        message.reply("No amount specified!");
        return;
    }

    if(!coins[message.guild.id][pUser.id]){
        coins[message.guild.id][pUser.id] = {
            coins: 0
        };
    }

    let pCoins = coins[message.guild.id][pUser.id].coins;
    let sCoins = coins[message.guild.id][message.author.id].coins;

    if(sCoins < args[0]) return message.reply("Your lacking " + (sCoins - args[1]) + "coins!");

    coins[message.guild.id][message.author.id] = {
        coins: sCoins - parseInt(args[1])
    };

    coins[message.guild.id][pUser.id] = {
        coins: pCoins + parseInt(args[1])
    };

    let payEmbed = new Discord.RichEmbed()
    .setDescription("Pay")
    .setColor("#8e278e")
    .addField("Payer", `${message.author.username}`)
    .addField("Payee", pUser)
    .addField("Amount", args[1]);

    message.channel.send(payEmbed);

    fs.writeFile("./database/coins.json", JSON.stringify(coins), (err) => {
        if(err) console.log(err)
    });
}

module.exports.help = {
    name: "pay"
}