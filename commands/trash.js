const Discord = require("discord.js");
const fs = require("fs");
let item;

module.exports.run = async (bot, message, args, prefix) => {
    if(!args[0] || args[0] == "help" || args[0] == "info" || args[0] < 1 || args[0] > 9) {
        message.reply(`Usage: ${prefix}trash <slot 1-9>`);
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

    if(!args[0]){
        message.reply("You must specify a slot!");
        return;
    }
    if(args[0] > 9 && args[0] < 1){
        message.reply(`Selected slot must be between 1 and 9. Input: ${args[0]}`);
        return;
    }

    item = inventories[message.author.id][`slot${args[0]}`];
    inventories[message.author.id][`slot${args[0]}`] = Item.empty();

    let embed = new Discord.RichEmbed()
    .setTitle(`${message.author.id}'s Trash`)
    .setColor("#8e278e")
    .addField("Trashed Item", item)
    .addField("Trashed Slot", args[0]);

    message.channel.send(embed);

    fs.writeFile("./database/inventories.json", JSON.stringify(inventories,null,4), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "trash"
}