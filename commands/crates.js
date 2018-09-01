const Discord = require("discord.js");
const fs = require("fs");
let Item = require('../itemClass.js');

module.exports.run = async (bot, message, args, prefix) => {
    if(!args[0]){
        message.reply(`Usage: ${prefix}crates (view, open, gift)`);
        return;
    }

    let crates = JSON.parse(fs.readFileSync("./database/crates.json", "utf8"));
    if(!crates[message.author.id]){
        crates[message.author.id] = {
            "reward": 0,
            "gift": 0,
            "dungeon": 0,
            "quest": 0
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

    if(args[0] == "view"){
        let embed = new Discord.RichEmbed()
        .setTitle(`${message.author.username}'s Crates`)
        .setColor("#15f153")
        .addField("Reward Crates", crates[message.guild.id][message.author.id].reward)
        .addField("Gift Crates", crates[message.guild.id][message.author.id].gift)
        .addField("Dungeon Crates", crates[message.guild.id][message.author.id].dungeon);

        message.channel.send(embed);
    } else if(args[0] == "open"){
        if(!args[1]){
            message.reply(`Usage: ${prefix}crates open (reward, gift, dungeon)`)
        }
        let rPick = 0;
        let count = 0;
        let hardScale = 0;
        if(args[1] == "reward"){
            if(crates[message.guild.id][message.author.id].reward > 0){
                crates[message.guild.id][message.author.id].reward--;
            } else {
                message.reply("You don't have this crate!");
                return;
            }
            hardScale = 0;
            count = Math.floor(Math.random()*3+1);
        } else if(args[1] == "gift"){
            if(crates[message.guild.id][message.author.id].gift > 0){
                crates[message.guild.id][message.author.id].gift--;
            } else {
                message.reply("You don't have this crate!");
                return;
            }
            hardScale = 1;
            count = Math.floor(Math.random()*5+3);
        } else if(args[1] == "dungeon"){
            if(crates[message.guild.id][message.author.id].dungeon > 0){
                crates[message.guild.id][message.author.id].dungeon--;
            } else {
                message.reply("You don't have this crate!");
                return;
            }
            hardScale = 2;
            count = Math.floor(Math.random()*10+3);
        } else {
            message.reply("This crate doesn't exist!");
            return;
        }

        let loot = JSON.parse(fs.readFileSync("./loottables/crates.json", "utf8"));
        let score = 0;
        let items = loot[`hard_scale_${hardScale}`][score];
        let itemGet = Math.floor(Math.random()*items.length);
        material = items[itemGet];

        if(material.isStackable == true){
            material.count = count;
        } else {
            material.count = 1;
        }

        let error = material.addToInventory(message.guild.id, message.author.id);

        if(error){
            return;
        }

        let embed = new Discord.RichEmbed()
        .setTitle(`${message.author.username}'s Crates`)
        .setColor("#04a50d")
        .addField("Item", material.name);
        if(material.isStackable == true) {
            embed.addField("Amount", material.count);
        }

        message.channel.send(embed);
    } else if(args[0] == "gift"){
        if(!args[1]){
            message.reply("No user defined!");
            return;
        }
        let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[1]);
        if(!pUser){
            message.reply("No user defined!");
            console.log(pUser);
            return;
        }

        let coins = JSON.parse(fs.readFileSync("./database/coins.json", "utf8"));
        if(!coins[message.guild.id][message.author.id]) {
            coins[message.guild.id][message.author.id] = {
                coins: 0
            };
        }
        if(coins[message.guild.id][message.author.id].coins >= 10){
            coins[message.guild.id][message.author.id].coins -= 10;
        } else {
            message.reply("Not enough coins! Gifting costs 10 coins!");
            return;
        }
        if(!crates[message.guild.id][pUser.id]){
            crates[message.guild.id][pUser.id] = {
                "reward": 0,
                "gift": 0,
                "dungeon": 0,
                "quest": 0
            }
        }
        crates[message.guild.id][pUser.id].gift++;

        let embed = new Discord.RichEmbed()
        .setTitle(`${message.author.username}'s Gifting`)
        .setColor("#8e278e")
        .addField("Gifted User", pUser.displayName);

        message.channel.send(embed);

        fs.writeFile("./database/coins.json", JSON.stringify(coins,null,4), (err) => {
            if (err) console.log(err)
        });
    } else {
        message.reply(`Usage: ${prefix}crates (view, open, gift)`);
        return;
    }
    fs.writeFileSync("./database/crates.json", JSON.stringify(crates,null,4), (err) => {
        if (err) console.log(err)
    });
    fs.writeFile("./database/inventories.json", JSON.stringify(inventories,null,4), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "crates"
}