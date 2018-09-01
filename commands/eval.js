const Discord = require("discord.js");

module.exports.run = async (bot, message, args, prefix) => {
    if(!message.author.id === "261619158096150528") return message.reply("You can not use this command!");

    let value = (eval(args.join(" ")));

    let embed = new Discord.RichEmbed()
    .setDescription("Eval")
    .setColor("#8e278e")
    .addField("Requested User", message.author)
    .addField("Input", args)
    .addField("Result", value);

    message.channel.send(embed);
}

module.exports.help = {
    name: "eval"
}