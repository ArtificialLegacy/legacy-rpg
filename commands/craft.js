const Discord = require("discord.js");
let fs = require("fs");
let material = "Empty";
let amount = 0;
let crafted = "Empty";
let count = 0;
let amounts = [];
let materials = [];
let done = false;

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
    if (!args[0] || args[0] == "list" || args[0] == "help" || args[0] == "info") {
        message.reply(`Usage: ${prefix}craft <item or page(axes, pickaxes, weapons, fishing, shields, consumables, materials)>`);
        return;
    } else if(args[0] == "axes") {
        let embed = new Discord.RichEmbed()
        .setTitle("Crafting (Axes)")
        .setColor("#8e278e")
        .addField("Improvised Axe", "3 Branches, 2 Pebbles", true)
        .addField("Flint Axe", "4 Flint, 2 Branches", true)
        .addField("Stone Axe", "8 Stone, 5 Branches", true)
        .addField("Enchanted Wooden Axe", "4 Enchanted Branches, 3 Pebbles", true)
        .setFooter("Note: you must enter the exact item name to craft!");

        message.channel.send(embed);
    } else if(args[0] == "pickaxes") {
        let embed = new Discord.RichEmbed()
        .setTitle("Crafting (Pickaxes)")
        .setColor("#8e278e")
        .addField("Improvised Pickaxe", "4 Pebbles, 1 Branch", true)
        .addField("Flint Pickaxe", "3 Flint, 3 Branches", true)
        .addField("Stone Pickaxe", "10 Stone, 4 Branches", true)
        .addField("Enchanted Wooden Pickaxe", "5 Enchanted Branches, 2 Pebbles, 4 Flint", true)
        .setFooter("Note: you must enter the exact item name to craft!");

        message.channel.send(embed);
    } else if(args[0] == "weapons") {
        let embed = new Discord.RichEmbed()
        .setTitle("Crafting (Weapons)")
        .setColor("#8e278e")
        .addField("Hunter's Bow", "4 Branches, 2 Flint", true)
        .setFooter("Note: you must enter the exact item name to craft!");

        message.channel.send(embed);
    } else if(args[0] == "fishing") {
        let embed = new Discord.RichEmbed()
        .setTitle("Crafting (Fishing)")
        .setColor("#8e278e")
        .addField("Improvised Fish Trap", "5 Leaves, 4 Branches, 4 Flint", true)
        .addField("Fish Trap", "4 Leaves, 7 Branches, 3 Flint, 2 Pebbles", true)
        .setFooter("Note: you must enter the exact item name to craft!");

        message.channel.send(embed);
    } else if(args[0] == "shields") {
        let embed = new Discord.RichEmbed()
        .setTitle("Crafting (Shields)")
        .setColor("#8e278e")
        .addField("Wooden Shield", "4 Wood, 2 Pebbles, 3 Leaves", true)
        .addField("Enchanted Wooden Shield", "4 Wood, 3 Pebbles, 4 Leaves, 4 Enchanted Branches", true)
        .addField("Flint Spiked Shield", "5 Wood, 2 Branches, 14 Flint, 2 Leaves", true)
        .setFooter("Note: you must enter the exact item name to craft!");

        message.channel.send(embed);
    } else if(args[0] == "consumables") {
        let embed = new Discord.RichEmbed()
        .setTitle("Crafting (Consumables)")
        .setColor("#8e278e")
        .addField("Improvised Bandage", "4 Leaves, 2 Kelp", true)
        .addField("Bandage", "4 Fabric, 3 Kelp", true)
        .setFooter("Note: you must enter the exact item name to craft!");

        message.channel.send(embed);
    } else if(args[0] == "materials") {
        let embed = new Discord.RichEmbed()
        .setTitle("Crafting (Materials)")
        .setColor("#8e278e")
        .addField("Fabric", "2 Pelts", true)
        .setFooter("Note: you must enter the exact item name to craft!");

        message.channel.send(embed);
    } else if(args[0] == "armor") {
        let embed = new Discord.RichEmbed()
        .setTitle("Crafting (Armor)")
        .setColor("#8e278e")
        .addField("Leaf Helmet", "3 Leaves, 2 Fabric", true)
        .addField("Leaf Breastplate", "5 Leaves, 3 Fabric", true)
        .addField("Leaf Leggings", "4 Leaves, 3 Fabric", true)
        .addField("Leaf Boots", "2 Leaves, 2 Fabric", true)
        .addBlankField()
        .addField("Fish Scale Helmet", "3 Fish Scales, 2 Flint", true)
        .addField("Fish Scale Breastplate", "5 Fish Scales, 4 Flint", true)
        .addField("Fish Scale Leggings", "4 Fish Scales, 3 Flint", true)
        .addField("Fish Scale Boots", "2 Fish Scales, 1 Flint", true)
        .setFooter("Note: you must enter the exact item name to craft!");

        message.channel.send(embed);
    } else {
        if(inventories[message.author.id].slot1 == "Empty") {
        } else if(inventories[message.author.id].slot2 == "Empty") {
        } else if(inventories[message.author.id].slot3 == "Empty") {
        } else if(inventories[message.author.id].slot4 == "Empty") {
        } else if(inventories[message.author.id].slot5 == "Empty") {
        } else if(inventories[message.author.id].slot6 == "Empty") {
        } else if(inventories[message.author.id].slot7 == "Empty") {
        } else if(inventories[message.author.id].slot8 == "Empty") {
        } else if(inventories[message.author.id].slot9 == "Empty") {
        } else { 
            message.reply("Crafting failed, inventory full"); 
            return;
        }
        if (args[0] == "Improvised" && args[1] == "Pickaxe") {
            materials = ["Pebble", "Branch"];
            amounts = [4, 1];
            crafted = "Improvised Pickaxe";
            count = 1;
        } else if (args[0] == "Flint" && args[1] == "Axe") {
            materials = ["Flint", "Branch"];
            amounts = [4, 2];
            crafted = "Flint Axe";
            count = 1;
        } else if (args[0] == "Improvised" && args[1] == "Axe") {
            materials = ["Branch", "Pebble"];
            amounts = [3, 2];
            crafted = "Improvised Axe";
            count = 1;
        } else if (args[0] == "Stone" && args[1] == "Pickaxe") {
            materials = ["Stone", "Branch"];
            amounts = [10, 4];
            crafted = "Stone Pickaxe";
            count = 1;
        } else if (args[0] == "Flint" && args[1] == "Pickaxe") {
            materials = ["Flint", "Branch"];
            amounts = [3, 3];
            crafted = "Flint Pickaxe";
            count = 1;
        } else if (args[0] == "Stone" && args[1] == "Axe") {
            materials = ["Stone", "Branch"];
            amounts = [8, 5];
            crafted = "Stone Axe";
            count = 1;
        } else if (args[0] == "Improvised" && args[1] == "Fish" && args[2] == "Trap") {
            materials = ["Leaf", "Branch", "Flint"];
            amounts = [5, 4, 4];
            crafted = "Improvised Fish Trap";
            count = 1;
        } else if (args[0] == "Wooden" && args[1] == "Shield") {
            materials = ["Wood", "Pebble", "Leaf"];
            amounts = [4, 2, 3];
            crafted = "Wooden Shield";
            count = 1;
        } else if (args[0] == "Enchanted" && args[1] == "Wooden" && args[2] == "Axe") {
            materials = ["Enchanted Branch", "Pebble"];
            amounts = [4, 3];
            crafted = "Enchanted Wooden Axe";
            count = 1;
        } else if(args[0] == "Fish" && args[1] == "Trap") {
            materials = ["Leaf", "Branch", "Flint", "Pebble"];
            amounts = [4, 7, 3, 2]
            crafted = "Fish Trap";
            count = 1;
        } else if(args[0] == "Enchanted" && args[1] == "Wooden" && args[2] == "Shield") {
            materials = ["Wood", "Pebble", "Leaf", "Enchanted Branch"];
            amounts = [4, 3, 4, 6];
            crafted = "Enchanted Wooden Shield";
            count = 1;
        } else if(args[0] == "Enchanted" && args[1] == "Wooden" && args[2] == "Pickaxe") {
            materials = ["Enchanted Branch", "Pebble", "Flint"];
            amounts = [5, 2, 4];
            crafted = "Enchanted Wooden Pickaxe";
            count = 1;
        } else if(args[0] == "Improvised" && args[1] == "Bandage") {
            materials = ["Leaf", "Kelp"];
            amounts = [4, 2];
            crafted = "Improvised Bandage";
            count = 2;
        } else if(args[0] == "Hunter's" && args[1] == "Bow") {
            materials = ["Branch", "Flint"];
            amounts = [4, 2];
            crafted = "Hunter's Bow";
            count = 1;
        } else if(args[0] == "Fabric") {
            materials = ["Pelt"];
            amounts = [2];
            crafted = "Fabric";
            count = 2;
        } else if(args[0] == "Bandage") {
            materials = ["Fabric", "Kelp"];
            amounts = [4, 3];
            crafted = "Bandage";
            count = 1;
        } else if(args[0] == "Leaf" && args[1] == "Helmet") {
            materials = ["Leaf", "Fabric"];
            amounts = [3, 2];
            crafted = "Leaf Helmet";
            count = 1;
        } else if(args[0] == "Leaf" && args[1] == "Breastplate") {
            materials = ["Leaf", "Fabric"];
            amounts = [5, 3];
            crafted = "Leaf Breastplate";
            count = 1;
        } else if(args[0] == "Leaf" && args[1] == "Leggings") {
            materials = ["Leaf", "Fabric"];
            amounts = [4, 3];
            crafted = "Leaf Leggings";
            count = 1;
        } else if(args[0] == "Leaf" && args[1] == "Boots") {
            materials = ["Leaf", "Fabric"];
            amounts = [2, 2];
            crafted = "Leaf Boots";
            count = 1;
        } else if(args[0] == "Flint" && args[1] == "Spiked" && args[2] == "Shield") {
            materials = ["Wood", "Branch", "Flint", "Leaf"];
            amounts = [5, 2, 14, 2];
            crafted = "Flint Spiked Shield";
            count = 1;
        } else if(args[0] == "Fish" && args[1] == "Scale" && args[2] == "Helmet") {
            materials = ["Fish Scale", "Flint"];
            amounts = [3, 2];
            crafted = "Fish Scale Helmet";
            count = 1;
        } else if(args[0] == "Fish" && args[1] == "Scale" && args[2] == "Breastplate") {
            materials = ["Fish Scale", "Flint"];
            amounts = [5, 4];
            crafted = "Fish Scale Breastplate";
            count = 1;
        } else if(args[0] == "Fish" && args[1] == "Scale" && args[2] == "Leggings") {
            materials = ["Fish Scale", "Flint"];
            amounts = [4, 3];
            crafted = "Fish Scale Leggings";
            count = 1;
        } else if(args[0] == "Fish" && args[1] == "Scale" && args[2] == "Boots") {
            materials = ["Fish Scale", "Flint"];
            amounts = [2, 1];
            crafted = "Fish Scale Boots";
            count = 1;
        } else {
            message.reply("Crafting failed! Item is not craftable!");
            return;
        }
        let slotDuri = 100;
        for (let i = 0; i <= amounts.length-1; i++) {
            let done = false;
            slotItem = materials[i];
            amount = amounts[i]
            for(z = 0; z < 9; z++){
                if(inventories[message.author.id][`slot${z+1}`] == slotItem && inventories[message.author.id][`slot${z+1}C`] >= amount) {
                    check = inventories[message.author.id][`slot${z+1}C`] - amount;
                    inventories[message.author.id][`slot${z+1}C`] = check;
                    if(check == 0){
                        inventories[message.author.id][`slot${z+1}`] = "Empty";
                        inventories[message.author.id][`slot${z+1}D`] = 0;
                    }
                    done = true;
                    break;
                }
            }
            if(done == false){
                message.reply("You do not have the required materials!");
                return;
            }
            done = false;
        }
        slotItem = crafted;
        amount = count;
        for(i = 0; i < 9; i++){
            if(inventories[message.author.id][`slot${i+1}`] == slotItem && inventories[message.author.id][`slot${i+1}D`] == slotDuri) {
                check = inventories[message.author.id][`slot${i+1}C`] + amount;
                inventories[message.author.id][`slot${i+1}C`] = check;
                done = true;
                break;
            }
        }
        if(done == false){
            for(i = 0; i < 9; i++){                
                if(inventories[message.author.id][`slot${i+1}`] == "Empty") {
                    check = inventories[message.author.id][`slot${i+1}C`] + amount;
                    inventories[message.author.id][`slot${i+1}`] = slotItem;
                    inventories[message.author.id][`slot${i+1}C`] = check;
                    inventories[message.author.id][`slot${i+1}D`] = slotDuri;                  
                    done = true;
                    break;
                }
            }
        }
        if(done == false){
            message.reply("Your inventory is full!");
            return;
        }
        
        let embed = new Discord.RichEmbed()
        .setDescription(`${message.author.username}'s Crafting`)
        .setColor("#8e278e")
        .addField("Crafted", crafted)

        message.channel.send(embed);
    }
    fs.writeFile("./database/inventories.json", JSON.stringify(inventories), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "craft"
}