const Discord = require("discord.js");

module.exports.run = async (bot, message, args, prefix) => {
    let boticon = bot.user.displayAvatarURL;
    let embed = new Discord.RichEmbed()
    .setTitle("Bot Information")
    .setColor("#8e278e")
    .setThumbnail(boticon)
    .addField("Bot Name", bot.user.username)
    .addField("Ping", (Math.floor(bot.ping) + " ms"));

    message.channel.send(embed);
}

module.exports.help = {
    name: "botinfo"
}