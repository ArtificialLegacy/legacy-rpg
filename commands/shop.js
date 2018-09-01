const Discord = require("discord.js");
const fs = require("fs")

module.exports.run = async (bot, message, args, prefix) => {
    let Item = require('../itemClass.js');
    let shop = JSON.parse(fs.readFileSync("./database/shops.json", "utf8"));

    if(!args[0]) {
        message.reply(`Usage: ${prefix}shop (list, buy) [slot 1-4]`)
        return;
    }

    if(args[0] == "list") {
        if(args[1]) {
            message.reply("Too many arguments!");
            return;
        }
        let embed = new Discord.RichEmbed()
        .setTitle(`${message.author.username}'s Shop`)
        .setColor("#8e278e")
        .addField("Shop Item 1", `Item: ${shop[message.guild.id][message.author.id].slotItem1.name} Count: ${shop[message.guild.id][message.author.id].slotItem1.count} Cost: ${shop[message.guild.id][message.author.id].slotItem1C2}`)
        .addField("Shop Item 2", `${shop[message.guild.id][message.author.id].slotItem2.name} count: ${shop[message.guild.id][message.author.id].slotItem2.count} cost: ${shop[message.guild.id][message.author.id].slotItem2C}`)
        .addField("Shop Item 3", `${shop[message.guild.id][message.author.id].slotItem3.name} count: ${shop[message.guild.id][message.author.id].slotItem3.count} cost: ${shop[message.guild.id][message.author.id].slotItem3C}`)
        .addField("Shop Item 4", `${shop[message.guild.id][message.author.id].slotItem4.name} count: ${shop[message.guild.id][message.author.id].slotItem4.count} cost: ${shop[message.guild.id][message.author.id].slotItem4C}`)
        .setFooter("Shop items reset every 100 messages!");

        message.channel.send(embed);
        return;
    } else if(args[0] == "buy") {
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

        if(!args[1] || args[1] < 1 || args[1] > 4) {
            message.reply(`Selected slot must be between 1 and 4! Input: ${args[1]}`);
            return;
        }

        let checkCost = shop[message.guild.id][message.author.id][`slotItem${args[1]}C`];
        let crafted = shop[message.guild.id][message.author.id][`slotItem${args[1]}`].name;
        let amount = shop[message.guild.id][message.author.id][`slotItem${args[1]}`].count;

        if(coins[message.guild.id][message.author.id].coins >= checkCost) {
            coins[message.guild.id][message.author.id].coins -= checkCost;
        } else {
            message.reply("Not enought coins!");
            return;
        }

       crafted.addToInventory(message.guild.id, message.author.id);

        let embed = new Discord.RichEmbed()
        .setTitle(`${message.author.username}'s Shopping`)
        .setColor("#8e278e")
        .addField("Bought", crafted)
        .addField("Amount", amount)
        .addField("Cost", checkCost);
        
        message.channel.send(embed);

        fs.writeFile("./database/inventories.json", JSON.stringify(inventories,null,4), (err) => {
            if (err) console.log(err)
        });
        fs.writeFile("./database/coins.json", JSON.stringify(coins,null,4), (err) => {
            if (err) console.log(err)
        });
    } else {
        message.reply(`Usage: ${prefix}shop (list, buy) [slot 1-4]`)
        return;
    }
}

module.exports.help = {
    name: "shop"
}