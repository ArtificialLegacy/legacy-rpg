const Discord = require("discord.js");
let fs = require("fs");
let material = "Empty";
let amount = 0;
let crafted = "Empty";
let count = 0;
let amounts = [];
let materials = [];
let slotDuri = 0;
let Item = require('../itemClass.js');

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

    let furnace = JSON.parse(fs.readFileSync("./database/furnace.json", "utf8"));
    if(!furnace[message.guild.id]){
        furnace[message.guild.id] = {

        };
    }
    if(!furnace[message.guild.id][message.author.id]){
        furnace[message.guild.id][message.author.id] = {
            fuel: 0
        };
    }

    if (!args[0] || args[0] == "list" || args[0] == "help" || args[0] == "info") {
        let embed = new Discord.RichEmbed()
        .setTitle("Smelting")
        .setColor("#8e278e")
        .addField("3 Charcoal", "2 Branches, 2 Fuel")
        .addField("Cooked Fish", "1 Fish, 4 Fuel")
        .addField("Cooked Meat", "1 Raw Meat, 5 Fuel")
        .setFooter(`Note: you must enter the exact item name to smelt! Fuel left: ${furnace[message.guild.id][message.author.id]}`)

        message.channel.send(embed);
    } else if(args[0] == "refuel") {
        if(!args[1] || args[1] > 15 || args[1] < 1) {
            message.reply(`Usage: ${prefix}smelt refuel (slot 1-15)`);
            return;
        }
        let slotItem = inventories[message.guild.id][message.author.id][`slot${args[0]}`];

        if(slotItem.isFuel == false){
            message.reply("This item cannot be used as fuel!");
            return;
        }

        furnace[message.guild.id][message.author.id].fuel += slotItem.fuelPower;
    } else {
        if(args[0] == "Charcoal") {
            materials = ["Branch"];
            amounts = [2];
            crafted = "Charcoal";
            count = 3;
            fuel = 2;
        } else if(args[0] == "Cooked" && args[1] == "Fish") {
            materials = ["Fish"];
            amounts = [1];
            crafted = "Cooked Fish";
            count = 1;
            fuel = 4;
        } else if(args[0] == "Cooked" && args[1] == "Meat") {
            materials = ["Raw Meat"];
            amounts = [1];
            crafted = "Cooked Meat";
            count = 1;
            fuel = 5;
        } else {
            message.reply("Smelting failed! Item is not smeltable!");
            return;
        }
        for (i = 0; i <= amounts.length-1; i++) {
            let done = false;
            let slotItem = materials[i];
            amount = amounts[i]
            slotItem.checkForItem(message.guild.id, message.author.id);
        }

        if(furnace[message.guild.id][message.author.id].fuel < fuel){
            message.reply("Not enough fuel!");
            return;
        }
        slotItem = crafted;
        slotItem.count = count;
        
        slotItem.addToInventory(message.guild.id, message.author.id);

        let embed = new Discord.RichEmbed()
        .setDescription(`${message.author.username}'s Smelting`)
        .setColor("#8e278e")
        .addField("Smelted", crafted)

        message.channel.send(embed);
    }
    fs.writeFile("./database/inventories.json", JSON.stringify(inventories,null,4), (err) => {
        if (err) console.log(err)
    });
    fs.writeFile("./database/furnace.json", JSON.stringify(furnace,null,4), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "smelt"
}