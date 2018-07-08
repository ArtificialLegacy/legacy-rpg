const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true})
const fs = require('fs');
bot.commands = new Discord.Collection();
let cooldown = new Set();
let cool = botconfig.cooldown
let cdseconds = 5;

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        console.log("Couldn't load commands!");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });

});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`)
    bot.user.setActivity("&help for more info!", {type: "WATCHING"});
    bot.user.setStatus("online");
})

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
if(!message.content.startsWith(prefix)) return;
        commandFile = bot.commands.get(cmd.slice(prefix.length));
    if (commandFile) {
        if(cooldown.has(message.author.id)){
            message.delete;
            return message.reply(`You have to wait ${cdseconds} seconds before your next command.`);
        }
          cooldown.add(message.author.id);
         commandFile.run(bot, message, args);
         setTimeout(() => {
             cooldown.delete(message.author.id)
         }, cdseconds * 1000)
    }

    return message.delete();

})

bot.on("guildMemberAdd", member => {
    
})

bot.login(yeet);
