const Discord = require("discord.js");
const fs = require("fs");
let slots;
let slot;
let slotItem;
let slotCount;
let check;
let done = false;

module.exports.run = async (bot, message, args, prefix) => {
    if(!args[0] || args[0] == "info") {
        message.reply(`Usage: ${prefix}vault <view, store, retrieve> <slot>`);
        return;
    }
    let vault = JSON.parse(fs.readFileSync("./database/vaults.json", "utf8"));
    if(!vaults[message.guild.id]){
        vaults[message.guild.id] = {

        };
    }
    if(!vaults[message.guild.id][message.author.id]){
        for(i=0; i<50; i++){
            Item.setEmpty(message.guild.id,message.author.id,i,"V");
        }
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
    let levels = JSON.parse(fs.readFileSync("./database/levels.json", "utf8"));
    if(!levels[message.guild.id]){
        levels[message.guild.id] = {

        };
    }
    if(!levels[message.guild.id][message.author.id]) {
        levels[message.guild.id][message.author.id] = {
            XP: 0,
            level: 0
        };
    }

    let levelC = parseInt(levels[message.guild.id][message.author.id].level);
    let slots = 15 + levelC;
    slots = parseInt(slots);
    if(slots > 50) slots = 50;

    if(args[0] == "view") {
        let page = 1;
        if(!args[1]){
            page = "1";
        } else {
            page = args[1];
        }
        if(page !== "1" && page !== "2"){
            page = "1";
        }
        let embed = new Discord.RichEmbed()
        .setTitle(`${message.author.username}'s Vault`)
        .setColor("#8e278e")
        .setThumbnail(message.author.displayAvatarURL)
        .setFooter(`Note: Storing uses the slot from your inventory, retrieving uses the slot from the vault! Additionally you have ${slots} slots unlocked in your vault!`);

        let loadSlots = slots;
        if(loadSlots > 25) loadSlots = 25;

        if(page == "1"){
            for(i = 0; i < loadSlots; i++){
                if(!vault[message.guild.id][message.author.id][`slot${i+1}`]){
                    vault[message.guild.id][message.author.id][`slot${i+1}`] = Item.empty();
                }
                embed.addField(`Slot ${i+1}`, `Item: ${vault[message.guild.id][message.author.id][`slot${i+1}`].name} Count: ${vault[message.author.id][`slot${i+1}`].count}`, true);
            }
        } else if(page == "2"){
            if(slots <= 25){
                message.reply("You do not have enough slots unlocked!");
                return;
            }
            for(i = 0; i < loadSlots; i++){
                if(!vault[message.guild.id][message.author.id][`slot${i+1+25}`]){
                    vault[message.guild.id][message.author.id][`slot${i+1+25}`] = Item.empty();
                }
                embed.addField(`Slot ${i+1+25}`, `Item: ${vault[message.guild.id][message.author.id][`slot${i+1+25}`].name}; Count: ${vault[message.guild.id][message.author.id][`slot${i+1+25}`].count}`, true);
            }
        }

        message.channel.send(embed);
    } else if(args[0] == "store") {
        if(args[1] > 9 && args[1] < 1){
            message.reply(`Selected slot must be between 1 and 9! Input: ${args[1]}`);
            return;
        }

        slotItem = inventories[message.guild.id][message.author.id][`slot${args[1]}`];
        slot = args[1];

        if(slotItem == "Empty") {
            message.reply("That slot is empty!")
            return;
        }

        inventories[message.guild.id][message.author.id][`slot${args[1]}`].checkForItem(message.guild.id, message.author.id);

        let error = slotItem.addToVault();

        if(error == true){
            message.reply("")
        }

        if(done == true) done = false;
        
        message.reply(`Item moved to vault! Item: ${slotItem}; Count: ${slotCount};`);

    } else if(args[0] == "retrieve") {
        console.log(done);

        if(args[1] < 1 && args[1] > slots){
            message.reply(`Selected slot must be between 1 and ${slots}! Input: ${args[1]}`);
            return;
        }

        slotItem = vault[message.author.id][`slot${args[1]}`];
        slotCount = vault[message.author.id][`slot${args[1]}C`];
        slotDuri = vault[message.author.id][`slot${args[1]}D`];
        vault[message.author.id][`slot${args[1]}`] = "Empty";
        vault[message.author.id][`slot${args[1]}C`] = 0;

        if(slotItem == "Empty"){
            message.reply("That slot is empty!");
            return;
        }
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
                    check = inventories[message.author.id][`slot${i+1}C`] + slotCount;
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

        if(done == true) done = false;

        message.reply(`Item retreived from vault! Item: ${slotItem}; Count: ${slotCount};`);
    }

    fs.writeFile("./database/inventories.json", JSON.stringify(inventories), (err) => {
        if (err) console.log(err)
    });
    fs.writeFile("./database/vaults.json", JSON.stringify(vault), (err) => {
        if (err) console.log(err)
    });
    fs.writeFile("./database/levels.json", JSON.stringify(levels), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "vault"
}