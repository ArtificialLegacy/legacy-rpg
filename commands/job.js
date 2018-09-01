const Discord = require("discord.js");
const fs = require("fs");
let jobS;

module.exports.run = async (bot, message, args, prefix) => {
    if(!args[0] || args[0] == "help" || args[0] == "list") {
        message.reply(`Usage: ${prefix}job <info, select, quit> <miner, woodcutter, fisher, hunter>`);
        return;
    }
    let job = JSON.parse(fs.readFileSync("./database/jobs.json", "utf8"));
    if(!job[message.guild.id]){
        job[message.guild.id] = {

        };
    }
    if(!job[message.guild.id][message.author.id]) {
        job[message.guild.id][message.author.id] = {
            current: "None",
            xp: 0,
            level: 0
        };
    }
    if(args[0] !== "info" && args[0] !== "quit") { 
        if(!args[1]) {
            message.reply(`Usage: ${prefix}job <info, select, quit> <miner, woodcutter, fisher, hunter>`);
            return;  
        }
        if(args[1] == "miner") {
            jobS = "Miner";
        } else if(args[1] == "woodcutter") {
            jobS = "Wood Cutter";
        } else if(args[1] == "fisher") {
            jobS = "Fisherman";
        } else if(args[1] == "hunter") {
            jobS = "Hunter";
        } else {
            message.reply(`Usage: ${prefix}job <info, select, quit> <miner, woodcutter, fisher, hunter>`);
            return;  
        }
    }

    if(args[0] == "info") {
        let embed = new Discord.RichEmbed()
        .setTitle(`${message.author.username}'s Job`)
        .setColor("#8e278e")
        .addField("Job", job[message.guild.id][message.author.id].current)
        .addField("XP", job[message.guild.id][message.author.id].xp)
        .addField("Level", job[message.guild.id][message.author.id].level)
        .setFooter("Quiting your current job will reset your xp and level.")

        message.channel.send(embed)
    } else if(args[0] == "select") {
        if(job[message.guild.id][message.author.id].current == "None") {
            job[message.guild.id][message.author.id] = {
                current: jobS,
                xp: 0,
                level: 0
            };
            let embed = new Discord.RichEmbed()
            .setTitle(`${message.author.username}'s Job`)
            .setColor("#8e278e")
            .addField("Job", job[message.author.id].current)
            .setFooter("Quiting your current job will reset your xp and level.")
    
            message.channel.send(embed)
        } else {
            message.reply("You must quit your current job before selecting a new one!");
            return;
        }
    } else if(args[0] == "quit") {
        if(job[message.guild.id][message.author.id].current !== "None") {
            let oJob = job[message.guild.id][message.author.id].current;
            job[message.guild.id][message.author.id] = {
                current: "None",
                xp: 0,
                level: 0
            };
            let embed = new Discord.RichEmbed()
            .setTitle(`${message.author.username}'s Job`)
            .setColor("#8e278e")
            .addField("Old Job", oJob)
            .setFooter("Quiting your current job will reset your xp and level.")
    
            message.channel.send(embed)
        } else {
            message.reply("You must have a job to quit!");
            return;
        }
    } else {
        message.reply(`Usage: ${prefix}job <xp, select, quit> <miner, woodcutter, fisher>`);
        return;  
    }
    fs.writeFile("./database/jobs.json", JSON.stringify(job), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "job"
}