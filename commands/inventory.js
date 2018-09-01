const Discord = require("discord.js");
const fs = require("fs")

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

    let usericon = message.author.displayAvatarURL;
    let embed = new Discord.RichEmbed()
    .setTitle(`${message.author.username}'s Inventory`)
    .setThumbnail(usericon)
    .addField("Equipped", `Item: ${inventories[message.guild.id][message.author.id].equipment.name}`, true)
    .addField("Shield", `Item: ${inventories[message.guild.id][message.author.id].shield.name}`, true)
    .addBlankField()
    .addField("Helmet", `Item: ${inventories[message.guild.id][message.author.id].helmet.name}`, true)
    .addField("Breastplate", `Item: ${inventories[message.guild.id][message.author.id].breastplate.name}`, true)
    .addField("Leggings", `Item: ${inventories[message.guild.id][message.author.id].leggings.name}`, true)
    .addField("Boots", `Item: ${inventories[message.guild.id][message.author.id].boots.name}`, true)
    .addField("Ammo", `Item: ${inventories[message.guild.id][message.author.id].name}`)
    .addBlankField()
    .setColor("#8e278e");

    for(i = 1; i <= 15; i++){
        embed.addField(`Slot ${i}`, `Item: ${inventories[message.guild.id][message.author.id][`slot${i}`].name}`, true)
    }

    message.channel.send(embed);

    fs.writeFile("./database/inventories.json", JSON.stringify(inventories,null,4), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "inventory"
}