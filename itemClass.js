class Item {
    constructor(n, i, jd, p, st, js, jr, iS, iC, de, nA, cMW, cMM, cMF, cMP, iF, c=1, eS=null, cHu=null, cHe=null, ms=500, md=100, s=1, d=null, r=null, a=null, aT=null, fP=null, t="static") {
        this.name = n; // display name
        this.id = i; // id
        this.durability = d;
        this.count = c;
        this.isDurable = jd;
        this.isSellable = js;
        this.sellPrice = s;
        this.isSalvagable = jr
        this.salvageItems = r; // array
        this.itemType = t; // equipment, helmet, breastplate, leggings, boots, shield, ammo
        this.power = p; // collecting strength
        this.stat = st; // damage or armor
        this.isStackable = iS;
        this.maxStack = ms;
        this.maxDurability = md;
        this.isConsumable = iC;
        this.consumeHunger = cHu;
        this.consumeHealth = cHe;
        this.description = de;
        this.equipStrength = eS; // hunger loss from equipping the item
        this.needsAmmo = nA;
        this.ammoType = aT; // Accepted ammo type
        this.ammo = a; // Ammo type
        this.canMineWood = cMW;
        this.canMineMinerals = cMM;
        this.canMineFish = cMF;
        this.canMinePrey = cMP;
        this.isFuel = iF;
        this.fuelPower = fP;
    }
    addToInventory(guildid, userid){
        let skip = false;
        if(!inventories[guildid][userid]) {
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
        }
        for(i = 0; i < 15; i++){
            if(inventories[guildid][userid][`slot${i+1}`].name == this.name && inventories[guildid][userid][`slot${i+1}`].id == this.id && this.isStackable == true) {
                if(inventories[guildid][userid][`slot${i+1}`].isDurable == false || inventories[guildid][userid][`slot${i+1}`].durability == this.durability) {
                    if(inventories[guildid][userid][`slot${i+1}`].count + this.count > this.maxStack) {
                        check = this.maxStack - inventories[guildid][userid][`slot${i+1}`].count;
                        this.count -= check;
                        skip = true;
                    } else {
                        check = inventories[guildid][userid][`slot${i+1}`].count + amount;
                    }
                    inventories[guildid][userid][`slot${i+1}`].count = check;
                    if(skip == false) {
                        done = true;
                        break;
                    }
                }
            }
        }
        if(done == false){
            for(i = 0; i < 15; i++){                
                if(inventories[guildid][userid][`slot${i+1}`].id == "Empty") {
                    inventories[guildid][userid][`slot${i+1}`] = this;          
                    done = true;
                    break;
                    skip = false;
                }
            }
        }
        if(done == false){
            message.reply("Your inventory is full!");
            return true; 
        }
    }
    static setEmpty(guildid, userid,index,VOI){
        let emptyItem = new Item("Empty", "Empty", 0, false, 0, false, 0, false, false, "Nothing but air.", false, false, false, false, false, false);
        if (VOI == "I" && typeof(index) == int){
            if(0 <= index && index < 15){
                inventories[guildid][userid][`slot${index+1}`] = emptyItem;          
            }           
        }else if (VOI == "V" && typeof(index) == int){
            if(0 <= index && index < 50){
                vaults[guildid][userid][`slot${index+1}`] = emptyItem;
            }
        }
    }
    static empty(){
        return new Item("Empty", "Empty", 0, false, 0, false, 0, false, false, "Nothing but air.", false, false, false, false, false, false);
    }
    addToVault(guildid, userid){
        let skip = false;
        if(!vaults[guildid][userid]){
            for(i=0; i<50; i++){
                Item.setEmpty(userid,i,"V");
            }
        }
        for(i = 0; i < 50; i++){
            if(vaults[guildid][userid][`slot${i+1}`].name == this.name && vaults[guildid][userid][`slot${i+1}`].id == this.id && this.isStackable == true) {
                if(vaults[guildid][userid][`slot${i+1}`].count + this.count > this.maxStack) {
                    check = this.maxStack - vaults[guildid][userid][`slot${i+1}`].count;
                    this.count -= check;
                    skip = true;
                } else {
                    check = vaults[guildid][userid][`slot${i+1}`].count + amount;
                }
                vaults[guildid][userid][`slot${i+1}`].count = check;
                if(skip == false){
                    done = true;
                    break;
                    skip = false;
                }
            }
        }
        if(done == false){
            for(i = 0; i < 50; i++){                
                if(vaults[guildid][userid][`slot${i+1}`].id == "Empty") {
                    vaults[guildid][userid][`slot${i+1}`] = this;
                    done = true;
                    break;
                }
            }
        }
        if(done == false){
            message.reply("Your vault is full!");
            return true;
        }
    }
    checkForItem(guildid, userid){
        if(!inventories[guildid][userid]) {
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
        }
        let done = false;
        for(i = 0; i < 15; i++){
            if(inventories[guildid][userid][`slot${i+1}`].id == this.id && inventories[guildid][userid][`slot${i+1}`].count >= this.count) {
                check = inventories[guildid][userid][`slot${z+1}`] - this.count;
                inventories[guildid][userid][`slot${i+1}`].count = check;
                if(check == 0){
                    inventories[guildid][userid][`slot${i+1}`] = Item.setEmpty(userid,i,"I");
                }
                done = true;
                break;
            }
        }
        if(done == false){
            message.reply("You do not have the required materials!");
            return true;
        }
        done = false;
    }
};

module.exports = Item; // Export class, read with let Item = require('../itemClass.js');