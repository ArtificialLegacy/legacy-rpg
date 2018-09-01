const Discord = require("discord.js");
const fs = require("fs");
let failed = false;

module.exports.run = async (bot, message, args, prefix) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        message.reply("No permission!");
        return;
    }
    if(!args[0]) {
        message.reply(`Usage: ${prefix}prefix <desired prefix here>`);
        args[0] = `${prefix}`;
        failed = true;
    }
    
    let prefixes = JSON.parse(fs.readFileSync("./database/prefixes.json", "utf8"));
    prefixes[message.guild.id] = {
        prefixes: args[0]
    };

    if(failed == false) {
        let embed = new Discord.RichEmbed()
        .setTitle("Prefix")
        .setColor("#8e278e")
        .addField("New Prefix", args[0]);

        message.channel.send(embed);
    }
    
    fs.writeFile("./database/prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "prefix"
}