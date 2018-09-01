const Discord = require("discord.js");
const fs = require("fs")
let slot;
let Item = require('../itemClass.js');

module.exports.run = async (bot, message, args, prefix) => {
    let status = JSON.parse(fs.readFileSync("./database/status.json", "utf8"));
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
    if(!args[0] || args[0] == "help" || args[0] == "info" || args[0] > 9 || args[0] < 1) {
        message.reply(`Usage: ${prefix}consume <slot 1-9>`);
        return;
    }

    item = inventories[message.guild.id][message.author.id][`slot${args[0]}`];
    slot = args[0];

    if(item.isConsumable == false){
        message.reply("This item is not consumable!");
        return;
    }

    if(item.consumeHealth > 0 && itemconsumeHunger > 0){
        if(status[message.guild.id][message.author.id].hunger == 0 && status[message.guild.id][message.author.id].health == 100){
            message.reply("Your status bars are full!");
            return;
        }
    }

    status[message.guild.id][message.author.id].hunger - item.consumeHunger;
    status[message.guild.id][message.author.id].health + item.consumeHealth;

    let embed = new Discord.RichEmbed()
    .setTitle(`${message.author.username}'s Consuming`)
    .setColor("#8e278e")
    .addField("New Health", status[message.guild.id][message.author.id].health)
    .addField("New Hunger", status[message.guild.id][message.author.id].hunger)
    .addField("Consumed", item.name);
    message.channel.send(embed);

    let check = inventories[message.guild.id][message.author.id][`slot${slot}`].count - 1;
    inventories[message.guild.id][message.author.id][`slot${slot}`].count = check;
    if(check == 0) {
        inventories[message.author.id][`slot${slot}`] = Item.empty();
    }

    if(status[message.author.id].health <= 0) {
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
            };
            for(i=0; i<15; i++){
                Item.setEmpty(guildid, userid,i,"I");
            }
        }
        status[message.author.id] = {
            health: 100,
            hunger: 0
        };
    }

    fs.writeFile("./database/inventories.json", JSON.stringify(inventories,null,4), (err) => {
        if (err) console.log(err)
    });
    fs.writeFile("./database/status.json", JSON.stringify(status,null,4), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "consume"
}