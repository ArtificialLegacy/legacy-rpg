const Discord = require("discord.js");
const fs = require("fs")

module.exports.run = async (bot, message, args, prefix) => {
    let done = false;
    if(!args[0]) {
        message.reply(`Usage: ${prefix}unequip <slot (equipped, shield, helmet, breastplate, leggings, boots)>`)
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
    let material;
    if(args[0] == "equipped") {
        material = inventories[message.author.id].equipment;
        inventories[message.author.id].equipment = Item.empty();
    } else if(args[0] == "shield") {
        material = inventories[message.author.id].shield;
        inventories[message.author.id].shield = Item.empty();
    } else if(args[0] == "helmet") {
        material = inventories[message.author.id].helmet;
        inventories[message.author.id].helmet = Item.empty();
    } else if(args[0] == "breastplate") {
        material = inventories[message.author.id].breastplate;
        inventories[message.author.id].breastplate = Item.empty();
    } else if(args[0] == "leggings") {
        material = inventories[message.author.id].leggings;
        inventories[message.author.id].leggings = Item.empty();
    } else if(args[0] == "boots") {
        material = inventories[message.author.id].boots;
        inventories[message.author.id].boots = Item.empty();
    } else if(args[0] == "ammo") {
        material = inventories[message.author.id].ammo;
        inventories[message.author.id].ammo = Item.empty();
    } else {
        message.reply(`Usage: ${prefix}unequip <slot (equipped, shield, helmet, breastplate, leggings, boots, ammo)>`);
        return;
    }

    let stat = material.stat;
    let type = material.type;

    if (type == "equipment") {
        inventories[message.author.id].damage = 0;
    } else if (type == "shield") {
        inventories[message.author.id].armor -= stat;
    } else if (type == "helmet") {
        inventories[message.author.id].armor -= stat;
    } else if (type == "breastplate") {
        inventories[message.author.id].armor -= stat;
    } else if (type == "leggings") {
        inventories[message.author.id].armor -= stat;
    } else if (type == "boots") {
        inventories[message.author.id].armor -= stat;
    } 

    material.addToInventory(message.guild.id, message.author.id);

    let embed = new Discord.RichEmbed()
    .setTitle(`${message.author.username}'s Unequipped`)
    .setColor("#8e278e")
    .addField("Unequipped Item", material.name);

    message.channel.send(embed);
    
    fs.writeFile("./database/inventories.json", JSON.stringify(inventories,null,4), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "unequip"
}