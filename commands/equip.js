const Discord = require("discord.js");
const fs = require("fs");
let type;
let slotItem2;
let slotItem;
let stat = 0;

module.exports.run = async (bot, message, args, prefix) => {
    if(!args[0] || args[0] > 9 || args[0] < 1) {
        message.reply("Invalid Slot <1 - 9>");
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
    let status = JSON.parse(fs.readFileSync("./database/status.json", "utf8"));
    if(!status[message.guild.id]){
        status[message.guild.id] = {

        };
    }
    if(!status[message.guild.id][message.author.id]) {
        status[message.guild.id][message.author.id] = {
            health: 100,
            hunger: 0
        };
    }

    if(args[0] > 9 || args[0] < 1){
        message.reply(`Selected slot must be between 1 and 9! Input: ${args[0]}`);
        return;
    }

    slotItem = inventories[message.guild.id][message.author.id][`slot${args[0]}`];
    let slot = args[0];

    type = slotItem.type;

    if(type == "static"){
        message.reply("This item can not be equipped!");
        return;
    }

    stat = slotItem.stat;

    /*
    if(slotItem == "Improvised Axe") {
        type = "equipment";
        stat = 3;
    } else if (slotItem == "Improvised Pickaxe") {
        type = "equipment";
        stat = 1;
    } else if (slotItem == "Flint Axe") {
        type = "equipment";
        stat = 4;
    } else if(slotItem == "Stone Pickaxe") {
        type = "equipment";
        stat = 2;
    } else if(slotItem == "Flint Pickaxe") {
        type = "equipment";
        stat = 2;
    } else if(slotItem == "Improvised Fish Trap") {
        type = "equipment";
        stat = 0;
    } else if(slotItem == "Stone Axe") {
        type = "equipment";
        stat = 5;
    } else if(slotItem == "Wooden Shield") {
        type = "shield";
        stat = 2;
    } else if(slotItem == "Hunter's Bow") {
        type = "equipment";
        stat = 5;
    } else if(slotItem == "Enchanted Wooden Shield") {
        type = "shield";
        stat = 4;
    } else if(slotItem == "Leaf Helmet") {
        type = "helmet";
        stat = 2;
    } else if(slotItem == "Leaf Breastplate") {
        type = "breastplate";
        stat = 4;
    } else if(slotItem == "Leaf Leggings") {
        type = "leggings";
        stat = 3;
    } else if(slotItem == "Leaf Boots") {
        type = "boots";
        stat = 2;
    } else if(slotItem == "Flint Spiked Shield") {
        type = "shield";
        stat = 6;
    } else if(slotItem == "Sharpened Stone") {
        type = "equipment";
        stat = 2;
    } else if(slotItem == "Bone Sword") {
        type = "equipment";
        stat = 4;
    } else if(slotItem == "Enchanted Wooden Axe") {
        type = "equipment";
        stat = 2;
    } else if(slotItem == "Enchanted Wooden Pickaxe") {
        type = "equipment";
        stat = 3;
    } else if(slotItem == "Fish Scale Helmet") {
        type = "helmet";
        stat = 3;
    } else if(slotItem == "Fish Scale Breastplate") {
        type = "breastplate";
        stat = 5;
    } else if(slotItem == "Fish Scale Leggings") {
        type = "leggings";
        stat = 4;
    } else if(slotItem == "Fish Scale Boots") {
        type = "boots";
        stat = 3;
    } else {
        message.reply("This item can not be equipped!");
        return;
    }
    */

    let count = 1;

    if (type == "equipment") {
        slotItem2 = inventories[message.guild.id][message.author.id].equipment;
        inventories[message.guild.id][message.author.id].equipment = slotItem;
        inventories[message.guild.id][message.author.id].damage = stat;
    } else if (type == "shield") {
        slotItem2 = inventories[message.guild.id][message.author.id].shield;
        inventories[message.guild.id][message.author.id].shield = slotItem;
        inventories[message.guild.id][message.author.id].armor += stat;
    } else if (type == "helmet") {
        slotItem2 = inventories[message.guild.id][message.author.id].helmet;
        inventories[message.guild.id][message.author.id].helmet = slotItem;
        inventories[message.guild.id][message.author.id].armor += stat;
    } else if (type == "breastplate") {
        slotItem2 = inventories[message.guild.id][message.author.id].breastplate;
        inventories[message.guild.id][message.author.id].breastplate = slotItem;
        inventories[message.guild.id][message.author.id].armor += stat;
    } else if (type == "leggings") {
        slotItem2 = inventories[message.guild.id][message.author.id].leggings;
        inventories[message.guild.id][message.author.id].leggings = slotItem;
        inventories[message.guild.id][message.author.id].armor += stat;
    } else if (type == "boots") {
        slotItem2 = inventories[message.guild.id][message.author.id].boots;
        inventories[message.guild.id][message.author.id].boots = slotItem;
        inventories[message.guild.id][message.author.id].armor += stat;
    } else if (type == "ammo") {
        count = slotItem.count;
        slotItem2 = inventories[message.guild.id][message.author.id].ammo;
        if(slotItem.id == slotItem2.id && slotItem.name == slotItem.name){
            inventories[message.guild.id][message.author.id].ammo.count += slotItem.count;
            slotItem2 = Item.empty();
        }
    }
    
    let check = inventories[message.guild.id][message.author.id][`slot${slot}`].count - 1;
    inventories[message.guild.id][message.author.id][`slot${slot}`].count = check;
    if(check == 0) {
        inventories[message.guild.id][message.author.id][`slot${slot}`] = Item.empty();
    }

    if(slotItem2.id !== "Empty") {
        
        let error = slotItem2.addToInventory(message.guild.id, message.author.id);

        if(done == true) done = false;
    }

    check = status[message.guild.id][message.author.id].hunger + 1;
    if(check > 25) {
        check2 = status[message.guild.id][message.author.id].health - 2 + (status[message.guild.id][message.author.id].hunger - 25);
    } else {
        check2 = status[message.guild.id][message.author.id].health;
    }
    if(status[message.guild.id][message.author.id].health <= 0) {
        message.reply("You died!");
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
        status[message.guild.id][message.author.id] = {
            health: 100,
            hunger: 0
        };
    }

    let embed = new Discord.RichEmbed()
    .setTitle(`${message.author.username}'s Equipped`)
    .setColor("#8e278e")
    .addField("Equipped Item", slotItem.name);

    message.channel.send(embed);

    fs.writeFile("./database/inventories.json", JSON.stringify(inventories), (err) => {
        if (err) console.log(err)
    });
    fs.writeFile("./database/status.json", JSON.stringify(status), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "equip"
}