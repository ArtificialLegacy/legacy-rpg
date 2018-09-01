const Discord = require("discord.js");

module.exports.run = async (bot, message, args, prefix) => {

    let embed = new Discord.RichEmbed()
    .setTitle("Patch V.0.3.2 (The Dungeoness Update)")
    .setColor("#8e278e")
    .addField("Embed colors fixed!", "The color of all embeds have been changed to purple! This fixes the issue where embeds could be different shades of green.")
    .addField("New patch notes layout!", "The new layout of this embed is here!")
    .addField("Gambling command buff!", `${prefix}gamble was buffed to give 2x the rewards on average.`)
    .addField("Vault system rework!", "Vaults are now capped at 50 slots and you start with 15 unlocked! You unlock more slots for every player level!")
    .addField("Inventory Buff!", "Inventory is now capped at 15 slots!")
    .addField("Item Durability and repair command!", `Using items will now damage them! Repair them with coins using ${prefix}repair!`)
    .addField("Internal Item rework!", "Since we reworked items they now support a lot more! Items will be renamable!")
    .addField("Salvage item command!", `New command ${prefix}salvage allows you to salvage an item into base items.`)
    .addField("Sell item command!", `New command ${prefix}sell allows you to sell items based on their rarity!`)
    .addField("Item info command!", `Read an item's description and stats with ${prefix}info!`)
    .addField("Dungeon mob rework!", "Now when you fight dungeon mobs they each drop different loot depending on their type!")
    .addField("The bot is now guild based!", "Now you have a seperate character for each guild your in! This allows us to give server admins the permission to spawn in items! Also this causes a full reset of every file! So RIP everyone's progress!")
    .addField("Shop update!", "The shop now only sells unique items you can't get anywhere else! (mostly)")
    
    message.channel.send(embed);
}

module.exports.help = {
    name: "patch"
}