const Discord = require("discord.js");
const fs = require("fs")
let material = "Empty";
let count = 0;
let Item = require('../itemClass.js');

module.exports.run = async (bot, message, args, prefix) => {
    if(!args[0]) { 
        message.reply(`Usage: ${prefix}collect <wood, minerals, fish, prey>`);
        return;
    }
    let status = JSON.parse(fs.readFileSync("./database/status.json", "utf8"));
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
    let coins = JSON.parse(fs.readFileSync("./database/coins.json", "utf8"));
    if(!coins[message.guild.id]){
        coins[message.guild.id] = {
            
        };
    }
    if(!coins[message.guild.id][message.author.id]) {
        coins[message.guild.id][message.author.id] = {
            coins: 0
        };
    }
    let skills = JSON.parse(fs.readFileSync("./database/skills.json", "utf8"));
    if(!skills[message.guild.id]){
        skills[message.guild.id] = {

        };
    }
    if(!skills[message.guild.id][message.author.id]) {
        skills[message.guild.id][message.author.id] = {
            collectXP: 0,
            collectLevel: 0,
            fightXP: 0,
            fightLevel: 0
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

    if(args[0] == "wood") {
        let loot = JSON.parse(fs.readFileSync("./loottables/collect_wood.json", "utf8"));
        let hardScale = 0;
        let item = inventories[message.guild.id][message.author.id].equipment;
        if(item.canMineWood == true){
            message.reply("You can not collect wood with this item!");
            return;
        }
        if(item.needsAmmo == true){
            if(inventorie[message.guild.id][message.author.id].ammo.ammo == item.ammoType){
                inventories[message.guild.id][message.author.id].ammo.count--;
                if(inventories[message.guild.id][message.author.id].ammo.count == 0){
                    inventories[message.guild.id][message.author.id].ammo = Item.empty();
                }
            } else {
                message.reply("You do not have the required ammo!");
                return;
            }
        }
        hardScale = item.power;
        let score = 0;
        if(job[message.guild.id][message.author.id].current == "Wood Cutter" && job[message.author.id].level >= 10){
            score = 1;
        }
        let items = loot[`hard_scale_${hardScale}`][score];
        let itemGet = Math.floor(Math.random()*items.length);
        material = items[itemGet];
        count = Math.floor(Math.random()*hardScale)+1+(Math.floor(hardScale/3));
        check = status[message.guild.id][message.author.id].hunger + 1;
        if(check > 25) {
            check2 = status[message.guild.id][message.author.id].health - 2 + (status[message.author.id].hunger - 25);
        } else {
            check2 = status[message.guild.id][message.author.id].health;
        }
        status[message.guild.id][message.author.id] = {
            health: check2,
            hunger: check
        };
        if(job[message.guild.id][message.author.id].current == "Wood Cutter"){
            job[message.guild.id][message.author.id].xp += 2;
            if(job[message.guild.id][message.author.id].xp >= 25){
                job[message.guild.id][message.author.id].xp = 0;
                job[message.guild.id][message.author.id].level++;
            }
        }
    } else if (args[0] == "minerals") {
        let loot = JSON.parse(fs.readFileSync("./loottables/collect_minerals.json", "utf8"));
        let hardScale = 0;
        let item = inventories[message.guild.id][message.author.id].equipment.id;
        if(item.canMineMinerals == true){
            message.reply("You can not collect minerals with this item!");
            return;
        }
        if(item.needsAmmo == true){
            if(inventories[message.guild.id][message.author.id].ammo.ammo == item.ammoType){
                inventories[message.guild.id][message.author.id].ammo.count--;
                if(inventories[message.guild.id][message.author.id].ammo.count == 0){
                    inventories[message.guild.id][message.author.id].ammo = Item.empty();
                }
            } else {
                message.reply("You do not have the required ammo!");
                return;
            }
        }
        hardScale = item.power;
        let score = 0;
        if(job[message.guild.id][message.author.id].current == "Miner" && job[message.author.id].level >= 10){
            score = 1;
        }
        let items = loot[`hard_scale_${hardScale}`][score];
        let itemGet = Math.floor(Math.random()*items.length);
        material = items[itemGet];
        count = Math.floor(Math.random()*hardScale)+1+(Math.floor(hardScale/3));
        check = status[message.guild.id][message.author.id].hunger + 1;
        if(job[message.guild.id][message.author.id].current == "Miner"){
            job[message.guild.id][message.author.id].xp += 2;
            if(job[message.guild.id][message.author.id].xp >= 25){
                job[message.guild.id][message.author.id].xp = 0;
                job[message.guild.id][message.author.id].level++;
            }
        }
        check = status[message.guild.id][message.author.id].hunger + 2;
        if(check > 25) {
            check2 = status[message.guild.id][message.author.id].health - 2 + (status[message.author.id].hunger - 25);
        } else {
            check2 = status[message.guild.id][message.author.id].health;
        }
        status[message.guild.id][message.author.id] = {
            health: check2,
            hunger: check
        };
    } else if(args[0] == "fish") {
        let loot = JSON.parse(fs.readFileSync("./loottables/collect_fish.json", "utf8"));
        let hardScale = 0;
        let item = inventories[message.guild.id][message.author.id].equipment.id;
        if(item.canMineFish == true){
            message.reply("You can not collect fish with this item!");
            return;
        }
        if(item.needsAmmo == true){
            if(inventories[message.guild.id][message.author.id].ammo.ammo == item.ammoType){
                inventories[message.guild.id][message.author.id].ammo.count--;
                if(inventories[message.guild.id][message.author.id].ammo.count == 0){
                    inventories[message.guild.id][message.author.id].ammo = Item.empty();
                }
            } else {
                message.reply("You do not have the required ammo!");
                return;
            }
        }
        hardScale = item.power;
        let score = 0;
        if(job[message.guild.id][message.author.id].current == "Fisherman" && job[message.guild.id][message.author.id].level >= 10){
            score = 1;
        }
        let items = loot[`hard_scale_${hardScale}`][score];
        let itemGet = Math.floor(Math.random()*items.length);
        material = items[itemGet];
        count = Math.floor(Math.random()*hardScale)+1+(Math.floor(hardScale/3));
        check = status[message.guild.id][message.author.id].hunger + 1;
        if(job[message.guild.id][message.author.id].current == "Fisherman"){
            job[message.guild.id][message.author.id].xp += 2;
            if(job[message.guild.id][message.author.id].xp >= 25){
                job[message.guild.id][message.author.id].xp = 0;
                job[message.guild.id][message.author.id].level++;
            }
        }
        check = status[message.guild.id][message.author.id].hunger + 1;
        if(check > 25) {
            check2 = status[message.guild.id][message.author.id].health - 2 + (status[message.guild.id][message.author.id].hunger - 25);
        } else {
            check2 = status[message.guild.id][message.author.id].health;
        }
        status[message.guild.id][message.author.id] = {
            health: check2,
            hunger: check
        };
    } else if(args[0] == "prey") {
        let loot = JSON.parse(fs.readFileSync("./loottables/collect_prey.json", "utf8"));
        let hardScale = 0;
        let item = inventories[message.guild.id][message.author.id].equipment.id;
        if(item.canMinePrey == true){
            message.reply("You can not hunt prey with this item!");
            return;
        }
        if(item.needsAmmo == true){
            if(inventories[message.guild.id][message.author.id].ammo.ammo == item.ammoType){
                inventories[message.guild.id][message.author.id].ammo.count--;
                if(inventories[message.guild.id][message.author.id].ammo.count == 0){
                    inventories[message.guild.id][message.author.id].ammo = Item.empty();
                }
            } else {
                message.reply("You do not have the required ammo!");
                return;
            }
        }
        hardScale = item.power;
        let score = 0;
        if(job[message.guild.id][message.author.id].current == "Hunter" && job[message.guild.id][message.author.id].level >= 10){
            score = 1;
        }
        let items = loot[`hard_scale_${hardScale}`][score];
        let itemGet = Math.floor(Math.random()*items.length);
        material = items[itemGet];
        count = Math.floor(Math.random()*hardScale)+1+(Math.floor(hardScale/3));
        check = status[message.guild.id][message.author.id].hunger + 1;
        if(job[message.guild.id][message.author.id].current == "Hunter"){
            job[message.guild.id][message.author.id].xp += 2;
            if(job[message.guild.id][message.author.id].xp >= 25){
                job[message.guild.id][message.author.id].xp = 0;
                job[message.guild.id][message.author.id].level++;
            }
        }
        check = status[message.guild.id][message.author.id].hunger + 2;
        if(check > 25) {
            check2 = status[message.guild.id][message.author.id].health - 2 + (status[message.author.id].hunger - 25);
        } else {
            check2 = status[message.guild.id][message.author.id].health;
        }
        status[message.guild.id][message.author.id] = {
            health: check2,
            hunger: check
        };
    } else {
        message.reply(`Usage: ${prefix}collect <wood, minerals, fish, prey>`);
        return;
    }

    if(material.isStackable == true){
        material.count = count;
    } else {
        material.count = 1;
    }

    let error = material.addToInventory(message.guild.id, message.author.id);

    if(error){
        return;
    }

    if(status[message.guild.id][message.author.id].health <= 0) {
        message.reply("You died! :(");
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
        status[message.guild.id][message.author.id] = {
            health: 100,
            hunger: 0
        };
    }

    let embed = new Discord.RichEmbed()
    .setTitle(`${message.author.username}'s Collecting`)
    .setColor("#8e278e")
    .addField("Material", material)
    .addField("Amount", count);

    message.channel.send(embed);

    skills[message.guild.id][message.author.id].collectXP += (Math.floor(Math.random() * 2) + 1);
    if(skills[message.guild.id][message.author.id].collectXP >= 15) {
        skills[message.guild.id][message.author.id] = {
            collectXP: 0,
            collectLevel: skills[message.guild.id][message.author.id].collectLevel++
        };
        coins[message.guild.id][message.author.id] = {
            coins: coins[message.guild.id][message.author.id].coins + job[message.guild.id][message.author.id].level + Math.floor(Math.random() * 2) + 5
        };
        levels[message.guild.id][message.author.id] = {
            XP: levels[message.guild.id][message.author.id].XP,
            level: skills[message.guild.id][message.author.id].level
        };
    }
    if(levels[message.guild.id][message.author.id].XP >= 20) {
        levels[message.guild.id][message.author.id] = {
            XP: 0,
            level: skills[message.guild.id][message.author.id].level++
        };
        coins[message.guild.id][message.author.id] = {
            coins: coins[message.guild.id][message.author.id].coins + job[message.guild.id][message.author.id].level + Math.floor(Math.random() * 2) + 5
        };
    }

    if(inventories[message.guild.id][message.author.id].equipment.id !== "Empty" && inventories[message.guild.id][message.author.id].equipment.isDurable == true){
        inventories[message.guild.id][message.author.id].equipment.durability -= Math.floor(Math.random()*2)+1;
        if(inventories[message.guild.id][message.author.id].equipment.durability <= 0){
            inventories[message.guild.id][message.author.id].equipment = Item.empty();
            message.reply("Equipped Item Broken!");
        }
    }

    fs.writeFile("./database/inventories.json", JSON.stringify(inventories,null,4), (err) => {
        if (err) console.log(err)
    });
    fs.writeFile("./database/status.json", JSON.stringify(status,null,4), (err) => {
        if (err) console.log(err)
    });
    fs.writeFile("./database/jobs.json", JSON.stringify(job,null,4), (err) => {
        if (err) console.log(err)
    });
    fs.writeFile("./database/coins.json", JSON.stringify(coins,null,4), (err) => {
        if (err) console.log(err)
    });
    fs.writeFile("./database/skills.json", JSON.stringify(skills,null,4), (err) => {
        if (err) console.log(err)
    });
    fs.writeFile("./database/levels.json", JSON.stringify(levels,null,4), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "collect"
}