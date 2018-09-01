const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, prefix) => {
    let coins = JSON.parse(fs.readFileSync("./database/coins.json", "utf8"));
    if(!coins[message.guild.id]){
        coins[message.guild.id] = {

        };
    }
    if(!coins[message.guild.id][message.author.id]) {
        coins[message.guild.id][message.author.id] = {
            coins: 0
        };
    }

    if(!args[0]){
        message.reply(`${prefix}gamble (amount)`);
        return;
    }

    let amount = parseInt(args[0]);
    if(!amount){
        message.reply(`${prefix}gamble (amount)`);
        return;
    }
    
    if(amount <= 0){
        message.reply("Amount must be greater than 0!");
        return;
    }

    coins[message.guild.id][message.author.id].coins -= amount;

    let win = "Loss";

    let prize = 0;

    let chance = Math.floor(Math.random()*10)-7;
    if(chance >= 0){
        prize = (amount+(Math.floor(amount/2)))*2;
        coins[message.guild.id][message.author.id].coins += prize;
        win = "Win";
    } else {
        win = "Loss";
    }

    let embed = new Discord.RichEmbed()
    .setTitle(`${message.author.username}'s Gamble`)
    .setColor("#8e278e")
    .addField("Result", win)
    .addField("Gambled", amount);

    if(win == "Win"){
        embed.addField("Prize", prize);
    }

    message.channel.send(embed);

    fs.writeFile("./database/coins.json", JSON.stringify(coins,null,4), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "gamble"
}