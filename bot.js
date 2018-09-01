const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true})
const fs = require('fs');
bot.commands = new Discord.Collection();
let cooldown = new Set();
let cool = 5;
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
    if(bot.guilds.size > 1) {
        bot.user.setActivity(`Legacy-RPG on ${bot.guilds.size} servers!`);
        console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`)
    } else {
        bot.user.setActivity(`Legacy-RPG on ${bot.guilds.size} server!`);
        console.log(`${bot.user.username} is online on ${bot.guilds.size} server!`)
    }
    bot.user.setStatus("online");
})

bot.on("message", async message => {
    let crates = JSON.parse(fs.readFileSync("./database/crates.json", "utf8"));
    if(!crates[message.guild.id]){
        crates[message.guild.id] = {

        };
    }
    if(!crates[message.guild.id][message.author.id]){
        crates[message.guild.id][message.author.id] = {
            "reward": 0,
            "gift": 0,
            "dungeon": 0,
            "quest": 0
        };
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
    fs.writeFileSync("./database/levels.json", JSON.stringify(levels,null,4), (err) => {
        if (err) console.log(err)
    });

    let shop = JSON.parse(fs.readFileSync("./database/shops.json", "utf8"));
    let shopCheck1 = [];
    let shopCheck2 = [];
    let shopCheck3 = [];
    let shopA1 = [];
    let shopA2 = [];
    let shopA3 = [];

    let messageCount = JSON.parse(fs.readFileSync("./database/message.json", "utf8"));
    if(!messageCount[message.guild.id]){
        messageCount[message.guild.id] = {

        };
    }
    if(!messageCount[message.guild.id][message.author.id]) {
        messageCount[message.guild.id][message.author.id] = {
            count: 0
        };
    }
    messageCount[message.guild.id][message.author.id].count++;
    if(messageCount[message.guild.id][message.author.id].count == 50 || messageCount[message.guild.id][message.author.id].count == 100){
        crates[message.guild.id][message.author.id].reward += 1;
        message.reply("You have earned a crate!");
    }
    if(!shop[message.guild.id][message.author.id] || messageCount[message.guild.id][message.author.id].count == 100) {
        messageCount[message.guild.id][message.author.id].count = 0;
        shopCheck1 = [];
        shopCheck2 = [];
        shopCheck3 = [];
        if(levels[message.guild.id][message.author.id].level >= 0) {
            shopA1 = [
                "Branch",
                "Pebble",
                "Flint",
                "Apple",
                "Leaf",
                "Kelp"
            ];
        } else if(levels[message.guild.id][message.author.id].level >= 3) {
            shopA1 = [
                "Branch",
                "Pebble",
                "Flint",
                "Apple",
                "Leaf",
                "Kelp",
                "Fish",
                "Enchanted Branch",
                "Fabric",
                "Sharpened Stone"
            ];
        } else if(levels[message.guild.id][message.author.id].level >= 6) {
            shopA1 = [
                "Branch",
                "Pebble",
                "Flint",
                "Apple",
                "Leaf",
                "Kelp",
                "Fish",
                "Enchanted Branch",
                "Fabric",
                "Hunter's Bow",
                "Bandage",
                "Wooden Shield",
                "Flint Spiked Shield",
                "Sharpened Stone"
            ];
        }
        let shopA2 = [
            Math.floor(Math.random() * 6) + 1,
            Math.floor(Math.random() * 7) + 1,
            Math.floor(Math.random() * 5) + 1,
            Math.floor(Math.random() * 5) + 1,
            Math.floor(Math.random() * 8) + 1,
            Math.floor(Math.random() * 4) + 1
        ];
        let shopA3 = [
            Math.floor(Math.random() * 3) + 1,
            Math.floor(Math.random() * 3) + 1,
            Math.floor(Math.random() * 3) + 1,
            Math.floor(Math.random() * 3) + 1,
            Math.floor(Math.random() * 3) + 1,
            Math.floor(Math.random() * 3) + 1
        ];
        for(i = 0; i < 4; i++) {
            shopCheck1.push(shopA1[(Math.floor(Math.random() * shopA1.length))]);
            shopCheck2.push(shopA2[(Math.floor(Math.random() * shopA2.length))]);
            shopCheck3.push(shopA3[(Math.floor(Math.random() * shopA3.length))]);
        }
        shop[message.author.id] = {
            slotItem1: shopCheck1[0],
            slotItem1C1: shopCheck2[0],
            slotItem1C2: shopCheck3[0],
            slotItem2: shopCheck1[1],
            slotItem2C1: shopCheck2[1],
            slotItem2C2: shopCheck3[1],
            slotItem3: shopCheck1[2],
            slotItem3C1: shopCheck2[2],
            slotItem3C2: shopCheck3[2],
            slotItem4: shopCheck1[3],
            slotItem4C1: shopCheck2[3],
            slotItem4C2: shopCheck3[3],
        };
        message.reply("Shop updated!")
    }
    fs.writeFileSync("./database/shops.json", JSON.stringify(shop,null,4), (err) => {
        if (err) console.log(err)
    });
    fs.writeFileSync("./database/message.json", JSON.stringify(messageCount,null,4), (err) => {
        if (err) console.log(err)
    });
    fs.writeFileSync("./database/crates.json", JSON.stringify(crates,null,4), (err) => {
        if (err) console.log(err)
    });

    let prefixes = JSON.parse(fs.readFileSync("./database/prefixes.json", "utf8"))
    
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
 
    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: "!"
        };
    }
    
    let prefix = prefixes[message.guild.id].prefixes;
    
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(prefix)) return;

    commandFile = bot.commands.get(cmd.slice(prefix.length));
    if (commandFile) {
        if(cooldown.has(message.author.id)){
            message.reply(`You have to wait ${cdseconds} seconds between commands.`);
            return message.delete();
        }
        cooldown.add(message.author.id);
        commandFile.run(bot, message, args, prefix);
        setTimeout(() => {
            cooldown.delete(message.author.id)
        }, cdseconds * 1000)
    } else {
        message.reply("Unknown command!")
    }

    message.delete();

})

bot.on("guildMemberAdd", member => {
    
})

bot.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
    if(bot.guilds.size > 1) {
        bot.user.setActivity(`Legacy-RPG on ${bot.guilds.size} servers!`);
    } else {
        bot.user.setActivity(`Legacy-RPG on ${bot.guilds.size} server!`);
    }
})

bot.on("guildDelete", guild => {
    console.log("Left a guild: " + guild.name);
    if(bot.guilds.size > 1) {
        bot.user.setActivity(`Legacy-RPG on ${bot.guilds.size} servers!`);
    } else {
        bot.user.setActivity(`Legacy-RPG on ${bot.guilds.size} server!`);
    }
})

bot.login("BOT TOKEN HERE");
