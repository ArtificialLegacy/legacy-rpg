const Discord = require("discord.js");
const fs = require("fs");
let Item = require('../itemClass.js');

module.exports.run = async (bot, message, args, prefix) => {
    let errMess = `Usage: ${prefix}dungeon (stats, enter, interact, leave)`;
    let encounters = JSON.parse(fs.readFileSync("./database/encounters.json", "utf8"));
    if(!encounters[message.guild.id]){
        encounters[message.guild.id] = {

        };
    }
    if(!encounters[message.guild.id][message.author.id]) {
        encounters[message.guild.id][message.author.id] = {
            inencounter: false,
            name: "empty",
            health: 0,
            tier: 0
        };
    }
    if(!args[0]) {
        message.reply(errMess);
        return;
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
    let dungeons = JSON.parse(fs.readFileSync("./database/dungeons.json", "utf8"));
    if(!dungeons[message.guild.id]){
        dungeons[message.guild.id] = {

        };
    }
    if(!dungeons[message.guild.id][message.author.id]) {
        dungeons[message.guild.id][message.author.id] = {
            rooms: 0,
            room: 0,
            indungeon: false,
            difficulty: 0,
            totaldungeons: 0,
            dungeonscompleted: 0,
            dungeonslost: 0,
            dungeonlevel: 0,
            roomencounters: 0,
            roomloot: 0
        };
    }
    if(args[0] == "stats") {
        if(dungeons[message.guild.id][message.author.id].indungeon == false) {
            let embed = new Discord.RichEmbed()
            .setTitle(`${message.author.username}'s Dungeon`)
            .setColor("#8e278e")
            .addField("Total Dungeons played", dungeons[message.guild.id][message.author.id].totaldungeons)
            .addField("Dungeons completed", dungeons[message.guild.id][message.author.id].dungeonscompleted)
            .addField("Dungeons failed", dungeons[message.guild.id][message.author.id].dungeonslost)
            .addField("Dungeon level", dungeons[message.guild.id][message.author.id].dungeonlevel)
            .setFooter("Dungeons are rooms made of encounters.")

            message.channel.send(embed);
        } else {
            let embed = new Discord.RichEmbed()
            .setTitle(`${message.author.username}'s Dungeon`)
            .setColor("#8e278e")
            .addField("Current room", dungeons[message.guild.id][message.author.id].room)
            .addField("Total rooms", dungeons[message.guild.id][message.author.id].rooms)
            .addField("Total room encounters", dungeons[message.guild.id][message.author.id].roomencounters)
            .addField("Current room loot", dungeons[message.guild.id][message.author.id].roomloot);

            message.channel.send(embed);
        }
    } else if(args[0] == "enter") {
        if(dungeons[message.guild.id][message.author.id].indungeon == true){
            message.reply("You are already in a dungeon.");
            return;
        }
        dungeons[message.guild.id][message.author.id].indungeon = true;
        dungeons[message.guild.id][message.author.id].totaldungeons += 1;
        dungeons[message.guild.id][message.author.id].room = 1;
        dungeons[message.guild.id][message.author.id].rooms = Math.floor((Math.random() * 3) + dungeons[message.author.id].dungeonlevel + 6);
        dungeons[message.guild.id][message.author.id].difficulty = Math.floor(5 / dungeons[message.author.id].dungeonlevel);
        dungeons[message.guild.id][message.author.id].roomencounters = Math.floor((Math.random() * 3)+1);;
        dungeons[message.guild.id][message.author.id].roomloot = Math.floor((Math.random() * 3)+1);
        encounters[message.guild.id][message.author.id].inencounter = false;
        message.reply("Entered dungeon!");
    } else if(args[0] == "interact") {
        if(dungeons[message.guild.id][message.author.id].indungeon == false) {
            message.reply("You are not in a dungeon");
            return;
        }
        if(!args[1]) {
            message.reply(`${errMess} (explore, loot, fight)`);
            return;
        }
        if(args[1] == "explore") {
            if(encounters[message.guild.id][message.author.id].inencounter == true){
                message.reply("Can not explore while fighting an encounter!");
                return;
            }
            if(!args[2]){
                message.reply(`${errMess} explore (room, encounter)`);
                return;
            }
            if(args[2] == "room"){
                if(dungeons[message.guild.id][message.author.id].roomencounters > 0){
                    message.reply("You haven't cleared the current room yet!");
                    return;
                }
                dungeons[message.guild.id][message.author.id].room += 1;
                dungeons[message.guild.id][message.author.id].roomencounters = Math.floor((Math.random() * 5)+1);;
                dungeons[message.guild.id][message.author.id].roomloot = Math.floor((Math.random() * 5)+1);
                if(dungeons[message.guild.id][message.author.id].room == dungeons[message.author.id].rooms){
                    message.reply("Dungeon completed!");
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
                    crates[message.guild.id][message.author.id].dungeon++;
                    fs.writeFileSync("./database/crates.json", JSON.stringify(crates), (err) => {
                        if (err) console.log(err)
                    });
                }
            }else if(args[2] == "encounter"){
                if(encounters[message.guild.id][message.author.id].inencounter == true){
                   message.reply("You are already in an encounter.");
                   return; 
                }
                dungeon[message.guild.id][message.author.id].roomencounters--;
                encounters[message.guild.id][message.author.id].inencounter = true;
                encounters[message.guild.id][message.author.id].health = Math.floor((Math.random()*3)+4+dungeons[message.guild.id][message.author.id].dungeonlevel);
                let name = [
                    "Husk",
                    "Undead",
                    "Crawler",
                    "Slime"
                ];
                encounters[message.guild.id][message.author.id].name = name[Math.floor(Math.random()*name.length)];
                encounters[message.guild.id][message.author.id].health = Math.floor(Math.random()*dungeons[message.guild.id][message.author.id].dungeonlevel+5);
                encounters[message.guild.id][message.author.id].tier = dungeons[message.guild.id][message.author.id].dungeonlevel+Math.floor(Math.random()*2);
                let embed = new Discord.RichEmbed()
                .setTitle(`${message.author.username} Entered encounter!`)
                .setColor("#8e278e")
                .addField("Type", `Tier ${encounters[message.guild.id][message.author.id].tier} ${encounters[message.guild.id][message.author.id].name}`)
                .addField("Health", encounters[message.guild.id][message.author.id].health);

                message.channel.send(embed);
            }else{
                message.reply(`${errMess} explore (room, encounter)`);
                return;
            }
        } else if(args[1] == "loot") {
            if(dungeons[message.author.id][message.guild.id].roomencounters !== 0){
                message.reply("Can not loot while there are encounters in the room!");
                return;
            }
            if(encounters[message.guild.id][message.author.id].inencounter == true){
                message.reply("Can not loot while fighting an encounter!");
                return;
            }
            if(dungeons[message.guild.id][message.author.id].roomloot >= 1){
                dungeons[message.guild.id][message.author.id].roomloot--;
                let hardScale = 0;
                if(dungeons[message.guild.id][message.author.id].level <= 3){
                    hardScale = 0;
                } else if(dungeons[message.guild.id][message.author.id].level <= 5) {
                    hardScale = 1;
                } else {
                    hardScale = 1;
                }

                let loot = JSON.parse(fs.readFileSync("./loottables/dungeons_loot.json", "utf8"));
                let items = loot[`hard_scale_${hardScale}`][0];
                let itemGet = Math.floor(Math.random()*items.length);
                let material = items[itemGet];
                let count = 1;
                if(material.isStackable == true){
                    count = Math.floor(Math.random()*hardScale)+1+(Math.floor(hardScale/3));
                }
                material.count = count;

                let error = material.addToInventory(message.guild.id, message.author.id);

                if(error){
                    return;
                }

                let embed = new Discord.RichEmbed()
                .setTitle(`${message.author.username}'s Looting`)
                .setColor("#8e278e")
                .addField("Loot", material.name);

                if(material.isStackable == true){
                    embed.addField("Amount", count);
                }

                message.channel.send(embed)
            } else {
                message.reply("The current room has run out of loot!");
                return;
            }
        } else if(args[1] == "fight") {
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
            skills[message.guild.id][message.author.id].fightXP += Math.floor(Math.random()*5)+1;
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
            if(encounters[message.guild.id][message.author.id].inencounter == false){
                message.reply("You must be in an encounter in order to fight!");
                return;
            }
            let item = [message.author.id][message.author.id].equipment;
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
            encounters[message.guild.id][message.author.id].health -= inventories[message.guild.id][message.author.id].damage;
            let recoil = Math.floor(Math.random()*10)-5;
            if(recoil > 0){
                status[message.guild.id][message.author.id].health -= recoil;
            }
            if(encounters[message.guild.id][message.author.id] <= 0){
                message.reply("Encounter killed!");
                dungeons[message.guild.id][message.author.id].roomencounters--;
                if(dungeons[message.guild.id][message.author.id].roomencounters == 0){
                    message.reply("Room cleared of encounters!");
                }
                encounters[message.guild.id][message.author.id].inencounter = false;
            } else {
                let embed = new Discord.RichEmbed()
                .setTitle(`${message.author.username}'s fighting`)
                .setColor("#8e278e")
                .addField("Encounter", encounters[message.guild.id][message.author.id].name)
                .addField("Health", encounters[message.guild.id][message.author.id].health)
                .addField("Damage", inventories[message.guild.id][message.author.id].damage);

                message.channel.send(embed);

                if(inventories[message.guild.id][message.author.id].equipment.id !== "Empty" && inventories[message.guild.id][message.author.id].equipment.isDurable == true){
                    inventories[message.guild.id][message.author.id].equipment.durability -= Math.floor(Math.random()*2)+1;
                    if(inventories[message.guild.id][message.author.id].equipment.durability <= 0){
                        inventories[message.guild.id][message.author.id].equipment = Item.empty();
                        message.reply("Equipped Item Broken!");
                    }
                }

                setTimeout(() => {
                    let damageCheck = encounters[message.guild.id][message.author.id].tier - inventories[message.guild.id][message.author.id].armor;
                    if(damageCheck <= 0) damageCheck = 1;
                    status[message.guild.id][message.author.id].health -= damageCheck;
                    let embed = new Discord.RichEmbed()
                    .setTitle(`${message.author.id} Attacked`)
                    .setColor("#8e278e")
                    .addField("Encounter", encounters[message.guild.id][message.author.id].name)
                    .addField("Damage", damageCheck);

                    message.channel.send(embed);

                    if(inventories[message.guild.id][message.author.id].helmet.id !== "Empty" && inventories[message.guild.id][message.author.id].helmet.isDurable == true){
                        inventories[message.guild.id][message.author.id].helmet.durability -= Math.floor(Math.random()*2)+1;
                        if(inventories[message.guild.id][message.author.id].helmet.durability <= 0){
                            inventories[message.guild.id][message.author.id].helmet = Item.empty();
                            message.reply("Helmet Broken!");
                        }
                    }
                    if(inventories[message.guild.id][message.author.id].breastplate.id !== "Empty" && inventories[message.guild.id][message.author.id].breastplate.isDurable == true){
                        inventories[message.guild.id][message.author.id].breastplate.durability -= Math.floor(Math.random()*2)+1;
                        if(inventories[message.guild.id][message.author.id].breastplate.durability <= 0){
                            inventories[message.guild.id][message.author.id].breastplate = Item.empty();
                            message.reply("Breastplate Broken!");
                        }
                    }
                    if(inventories[message.guild.id][message.author.id].leggings.id !== "Empty" && inventories[message.guild.id][message.author.id].leggings.isDurable == true){
                        inventories[message.guild.id][message.author.id].leggings.durability -= Math.floor(Math.random()*2)+1;
                        if(inventories[message.guild.id][message.author.id].leggings.durability <= 0){
                            inventories[message.guild.id][message.author.id].leggings = Item.empty();
                            message.reply("Leggings Broken!");
                        }
                    }
                    if(inventories[message.guild.id][message.author.id].boots.id !== "Empty" && inventories[message.guild.id][message.author.id].boots.isDurable == true){
                        inventories[message.guild.id][message.author.id].boots.durability -= Math.floor(Math.random()*2)+1;
                        if(inventories[message.guild.id][message.author.id].boots.durability <= 0){
                            inventories[message.guild.id][message.author.id].boots = Item.empty();
                            message.reply("Boots Broken!");
                        }
                    }
                },3000)
            }

            check = status[message.guild.id][message.author.id].hunger + 3;
            if(check > 25) {
                check2 = status[message.guild.id][message.author.id].health - 2 + (status[message.guild.id][message.author.id].hunger - 25);
            } else {
                check2 = status[message.author.id].health;
            }
            if(status[message.guild.id][message.author.id].health <= 0) {
                message.reply("You died! :(");
                dungeons[message.guild.id][message.author.id].dungeonslost += 1;
                dungeons[message.guild.id][message.author.id].indungeon = false;
                encounters[message.guild.id][message.author.id].inencounter = false;
                inventories[guildid][userid] = {
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

            fs.writeFile("./database/levels.json", JSON.stringify(levels,null,4), (err) => {
                if (err) console.log(err)
            });
            fs.writeFile("./database/skills.json", JSON.stringify(skills,null,4), (err) => {
                if (err) console.log(err)
            });
            fs.writeFile("./database/status.json", JSON.stringify(status,null,4), (err) => {
                if (err) console.log(err)
            });
        } else {
            message.reply(`${errMess} (explore, loot, fight)`);
            return;
        }
    } else if(args[0] == "leave") {
        if(dungeons[message.guild.id][message.author.id].indungeon == false){
            message.reply("You are not in a dungeon!");
            return;
        }
        dungeons[message.guild.id][message.author.id].dungeonslost += 1;
        dungeons[message.guild.id][message.author.id].indungeon = false;
        encounters[message.guild.id][message.author.id].inencounter = false;
        message.reply("You left the dungeon!");
    } else {
        message.reply(errMess);
        return;
    }
    fs.writeFile("./database/inventories.json", JSON.stringify(inventories,null,4), (err) => {
        if (err) console.log(err)
    });
    fs.writeFile("./database/encounters.json", JSON.stringify(encounters,null,4), (err) => {
        if (err) console.log(err)
    });
    fs.writeFile("./database/dungeons.json", JSON.stringify(dungeons,null,4), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "dungeon"
}