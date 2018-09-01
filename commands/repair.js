const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, prefix) => {
    let Item = require('../itemClass.js');
    let inventories = JSON.parse(fs.readFileSync("./database/inventories.json", "utf8"));
    if(!inventories[message.guild.id]) {
        inventories[message.guild.id] = {

        };
    }
    if(!inventories[message.guild.id][message.author.id]) {
        inventories[message.guild.id][message.author.id] = {
            equipment: Item.empty(),
            damage: 0,
            shield: Item.empty(),
            helmet: Item.empty(),
            breastplate: Item.empty(),
            leggings: Item.empty(),
            boots: Item.empty(),
            armor: 0,
            ammo: Item.empty()
        };
        for(i=0; i<15; i++){
            Item.setEmpty(guildid, userid,i,"I");
        }
    }

    if(!args[0] || args[0] < 1 || args[0] > 15){
        message.reply(`Selected slot must be between 1 and 15! Input: ${args[0]}`);
        return;
    }

    if(inventories[message.author.id][`slot${args[0]}`].isDurable == false){
        message.reply("This item cannot be repaired!");
        return;
    }
    if(inventories[message.author.id][`slot${args[0]}`].durability == inventories[message.guild.id][message.author.id][`slot${args[0]}`].max){
        message.reply("This item has max durability!");
        return;
    }

    let slotDuri = inventories[message.guild.id][message.author.id][`slot${args[0]}`].durability;
    let cost = Math.ceil((inventories[message.guild.id][message.author.id].maxDurable - slotDuri)/5);

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

    if(coins[message.guild.id][message.author.id].coins >= cost){
        coins[message.guild.id][message.author.id].coins -= cost;
        inventories[message.guild.id][message.author.id][`slot${args[0]}`].durability = inventories[message.author.id][`slot${args[0]}`].maxDurability;
    } else {
        message.reply(`You don't have enough coins! Cost: ${cost}!`);
        return;
    }

    let embed = new Discord.RichEmbed()
    .setTitle(`${message.author.username}'s Repairing`)
    .setColor("#8e278e")
    .addField("Item", inventories[message.guild.id][message.author.id][`slot${args[0]}`].name)
    .addField("Cost", cost);

    message.channel.send(embed);

    fs.writeFile("./database/inventories.json", JSON.stringify(inventories,null,4), (err) => {
        if (err) console.log(err)
    });
    fs.writeFile("./database/coins.json", JSON.stringify(coins,null,4), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "repair"
}