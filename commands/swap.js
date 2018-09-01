const Discord = require("discord.js");
let fs = require("fs");
let slot;
let slotItem;
let slot2;
let slotItem2;
let Item = require('../itemClass.js');

module.exports.run = async (bot, message, args, prefix) => {
    if(!args[0] || !args[0]) {
        message.reply(`Usage: ${prefix}swap <slot 1> <slot 2>`);
        return;
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

    if(args[0] > 9 || args[0] < 1){
        message.reply(`Selected slot 1 must be between 1 and 9! Input: ${args[0]}`);
        return;
    }
    if(args[1] > 9 || args[1] < 1){
        message.reply(`Selected slot 2 must be between 1 and 9! Input: ${args[1]}`);
        return;
    }

    slotItem = inventories[message.author.id][`slot${args[0]}`];
    slot = args[0];
    slotItem2 = inventories[message.author.id][`slot${args[1]}`];
    slot2 = args[0];

    inventories[message.author.id][`slot${args[0]}`] = slotItem2;
    inventories[message.author.id][`slot${args[1]}`] = slotItem;

    let embed = new Discord.RichEmbed()
    .setTitle(`${message.author.username}'s Swapping`)
    .setColor("#8e278e")
    .addField(`Slot ${slot}`, `Item: ${slotItem.name}`)
    .addField(`Slot ${slot2}`, `Item: ${slotItem2.name}`);

    message.channel.send(embed);

    fs.writeFile("./database/inventories.json", JSON.stringify(inventories,null,4), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "swap"
}