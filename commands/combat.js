const Discord = require("discord.js");
const fs = require("fs");
let Item = require('../itemClass.js');

module.exports.run = async (bot, message, args, prefix) => {
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
    let embed = new Discord.RichEmbed()
    .setTitle(`${message.author.username}'s Combat`)
    .setColor("#8e278e")
    .addField("Attack", inventories[message.guild.id][message.author.id].damage, true)
    .addField("Defense", inventories[message.guild.id][message.author.id].armor, true);

    message.channel.send(embed);

    fs.writeFile("./database/inventories.json", JSON.stringify(inventories,null,4), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "combat"
}