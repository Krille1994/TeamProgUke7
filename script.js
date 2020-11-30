// Modell

let whichSite = 0;
let playerHP = 100;
let playerLevel = 1;
let playerXP = 0;
let xpEarned = 0;
let XPNeeded = playerLevel * 100;
let playerDamageBonus = 1;
let playerGold = 50;
let goldWon = 0;
let playerCritBonus = 0;
let playerDodgeBonus = 0;

let winOrLose = '';

let damageDisplay = 10; 

// npc
let npcHP = 100;
let npcLevel = 1;
let npcDamageBonus = 0;
let npcCritBonus = 0;
let npcDodgeBonus = 0;

let npcCharacter = '';

// battle variabler
let playerBattleHP;
let playerHPBar = 100;
let npcColorGreen = 255;
let npcColorRed = 0;

let npcBattleHP;
let npcHPBar = 100;
let playerColorGreen = 255;
let playerColorRed = 0;

let playerCritLog = '';
let playerDodgeLog = '';
let playerDamageLog = '';

let npcCritLog = '';
let npcDodgeLog = '';
let npcDamageLog = '';

let XP;
let Gold;

let attackTurn = true;
let isTournament = false;
let whichChampion;

// Tournament variabler
// stats: [level, HP, DamageBonus, CritBonus, DodgeBonus]
const champions = [
    {name: 'Balder', stats: [2, 220, 1, 2, 2], unlocked: true, alive: true, gold: 100, experience: 100, character: ['<img src="bilder/balder.png">', '<img src="bilder/balderDead.png">', '<img src="bilder/characterLocked.png">']},
    {name: 'Seronicus', stats: [5, 520, 2, 5, 7], unlocked: false, alive: true, gold: 250, experience: 250, character: ['<img src="bilder/seronicus.png">', '<img src="bilder/seronicusDead.png">', '<img src="bilder/characterLocked.png">']},
    {name: 'Bertrix', stats: [10, 1200, 4, 7, 0], unlocked: false, alive: true, gold: 500, experience: 500, character: ['<img src="bilder/bertrix.png">', '<img src="bilder/bertrixDead.png">', '<img src="bilder/characterLocked.png">']},
    {name: 'Foll', stats: [15, 1800, 10, 2, 15], unlocked: false, alive: true, gold: 750, experience: 750, character: ['<img src="bilder/foll.png">', '<img src="bilder/follDead.png">', '<img src="bilder/characterLocked.png">']},
    {name: 'Hank', stats: [20, 2220, 20, 2, 2], unlocked: false, alive: true, gold: 1000, experience: 1000, character: ['<img src="bilder/hank.png">', '<img src="bilder/hankDead.png">', '<img src="bilder/characterLocked.png">']},
    {name: 'Whaler', stats: [25, 2800, 15, 5, 7], unlocked: false, alive: true, gold: 1250, experience: 1250, character: ['<img src="bilder/whaler.png">', '<img src="bilder/whalerDead.png">', '<img src="bilder/characterLocked.png">']},
    {name: 'Crank', stats: [35, 4000, 30, 2, 2], unlocked: false, alive: true, gold: 1750, experience: 1750, character: ['<img src="bilder/crank.png">', '<img src="bilder/crankDead.png">', '<img src="bilder/characterLocked.png">']},
    {name: 'Frank', stats: [50, 6000, 35, 5, 7], unlocked: false, alive: true, gold: 2500, experience: 2500, character: ['<img src="bilder/frank.png">', '<img src="bilder/frankDead.png">', '<img src="bilder/characterLocked.png">']},
    {name: 'Rixus', stats: [100, 12000, 50, 20, 20], unlocked: false, alive: true, gold: 5000, experience: 5000, character: ['<img src="bilder/rixus.png">', '<img src="bilder/rixusDead.png">', '<img src="bilder/characterLocked.png">']}
];


// Store | 1 = health, 2 = damage , 3 = dodge, 4 = crit |
const storeItems = [
    {item: 'Gauntlets of Strenght', price: 100, type1: 'health', type2: 'damage', type3: '',type4: '', look: '<img class="itemframe" src="bilder/Gauntlets_of_Strength.png">', value1: 50, value2: 1,value3: '',value4: '', inStock: true, info: '+50 HP<br>+1 Dmg'},
    {item: 'Slippers of Agility', price: 100, type1: '', type2: 'damage', type3: 'dodge',type4: '', look: '<img class="itemframe" src="bilder/Slippers_of_Agility.png">', value1: '', value2: 2,value3: 2,value4: '', inStock: true, info: '+2 Dmg<br>+2% DB'},
    {item: 'Ring of Health', price: 200, type1: 'health', type2: '', type3: '',type4: '', look: '<img class="itemframe" src="bilder/Ring_of_Health.png">', value1: 100, value2: '',value3: '',value4: '', inStock: true, info: '+100 HP'},
    {item: 'Buckler', price: 175, type1: 'health', type2: '', type3: 'dodge',type4: '', look: '<img class="itemframe" src="bilder/Buckler.png">', value1: 50, value2: 1,value3: 4,value4: '', inStock: true, info: '+50 HP<br>+4 DB'},
    {item: 'Blades of Attack', price: 200, type1: '', type2: 'damage', type3: '',type4: 'crit', look: '<img class="itemframe" src="bilder/Blades_of_Attack.png">', value1: '', value2: 4,value3: '',value4: 2, inStock: true, info: '+4 Dmg<br>+2% CB'},
    {item: 'Necklace of Swiftness', price: 250, type1: '', type2: '', type3: 'dodge',type4: 'crit', look: '<img class="itemframe" src="bilder/Necklace_Critical_Strike.png">', value1: '', value2: '',value3: 9,value4: 6, inStock: true, info: '+9% DB<br>+6% CB'},
    {item: 'Gem of Vitality', price: 300, type1: 'health', type2: '', type3: '',type4: '', look: '<img class="itemframe" src="bilder/Gem_of_Vitiality.png">', value1: 150, 
    value2: '',value3: '',value4: '', inStock: true, info: '+150 HP'},
    {item: 'Boots of Reflexes', price: 450, type1: 'health', type2: '', type3: 'dodge',type4: '', look: '<img class="itemframe" src="bilder/Boots_Reflexes.png">', value1: 100, value2: '',value3: 12,value4: '', inStock: true, info: '+100 HP<br>+12% DB'},
    {item: 'Crystalys', price: 500, type1: '', type2: 'damage', type3: '',type4: 'crit', look: '<img class="itemframe" src="bilder/Crystalys.png">', value1: '', value2: 20,value3: '',value4: 10, inStock: true, info: '+20 Dmg<br>+10% CB'},
    {item: 'Satanic', price: 750, type1: 'health', type2: 'damage', type3: '',type4: '', look: '<img class="itemframe" src="bilder/Satanic.png">', value1: 500, value2: 30,value3: '',value4: '', inStock: true, info: '+500 HP<br>+30 Dmg'},
    {item: 'Apex', price: 800, type1: 'health', type2: 'damage', type3: 'dodge',type4: 'crit', look: '<img class="itemframe" src="bilder/Apex.png">', value1: 3500, value2: 35,value3: 8,value4: 8, inStock: true, info: '+350 HP<br>+35 Dmg<br>8% DB<br>8% CB'},
    {item: 'Mask of Madness', price: 2000, type1: 'health', type2: 'damage', type3: 'dodge',type4: 'crit', look: '<img class="itemframe" src="bilder/Mask_of_Madness.png">', value1: 1000, value2: 100,value3: 25,value4: 25, inStock: true, info: '+1000 HP<br>+100 Dmg<br>25% DB<br>25% CB'},
    ];


// Controller


// Damage Kalkulasjoner
function calcPlayerDamage() {
    damage = (5 + Math.floor(Math.random() * 10) + playerDamageBonus) * playerLevel;
    return damage;
}
function calcPlayerDisplayDamage() {
    damageDisplay = (10 + playerDamageBonus) * playerLevel;
}
function calcNpcDamage() {
    damage = (5 + Math.floor(Math.random() * 10) + npcDamageBonus) * npcLevel;
    return damage;
}
function calcChampionDisplayDamage(i) {
    champDamageDisplay = (10 + champions[i].stats[2]) * champions[i].stats[0];
    return champDamageDisplay;
}


// Andre Kalkulasjoner
function calcPlayerGold(status) {
    if (!isTournament) {
        Gold = (4 + Math.floor(Math.random()*16)) * npcLevel;
        if (status) {playerGold += Gold;}
        else {Gold = 0;}
    }
    else {
        if (status) {
            Gold = champions[whichChampion].gold;
        }
        else {
            Gold = 0;
        }
    }
    playerGold += Gold;
}
function calcPlayerXP(status) {
    if (!isTournament) {
        XP = (9 + Math.floor(Math.random()*10)) * npcLevel;
        if (status) {playerXP += XP;}
        else { XP = Math.floor(XP / 2);}
        }
    else {
        if (status) {
            XP = champions[whichChampion].experience;
            // Setter Champion til dead og unlocker ny
            champions[whichChampion].alive = false;
            if (whichChampion < champions.length -1){
                champions[whichChampion + 1].unlocked = true;
            }
        }
        else {
            XP = 1
        }
    }
    playerXP += XP;
    levelUp(playerXP);
}
function levelUp(playerXPParameter) {
    if (playerXP >= XPNeeded) {
        playerXP = playerXPParameter - XPNeeded;
        console.log(playerXP, XPNeeded);
        playerLevel += 1;
        XPNeeded = playerLevel * 100;
        playerHP += 100;
        calcPlayerDisplayDamage();
    }
}

function playerDodgeChance() {
    let dodge = (1 + Math.floor(Math.random() * 100) + playerDodgeBonus);
        return (dodge > 90);
}
function npcDodgeChance(){
    let dodge = (1 + Math.floor(Math.random() * 100) + npcDodgeBonus);
        return (dodge > 90);
}
function playerCritChance() {
    let crit = (1 + Math.floor(Math.random() * 100) + playerCritBonus);
        return (crit > 90);
}
function npcCritChance(){
    let crit = (1 + Math.floor(Math.random() * 100) + npcCritBonus);
        return (crit > 90);
}

// Battle Funksjoner
function startBattle(number) {
    resetLog();
    attackTurn = true;
    playerBattleHP = playerHP;
    npcBattleHP = npcHP;

    calcNpcStats();
    changeSite(number);
}
function calcNpcStats() {
    npcLevel = playerLevel;
    npcHP = Math.floor((- 0.5 + Math.random() + 1) * npcLevel * 100);
    npcBattleHP = npcHP;
    npcColorGreen = 255;
    npcColorRed = 0;
    playerColorGreen = 255;
    playerColorRed = 0;
    playerHPBar = 100;
    npcHPBar = 100;
    npcDamageBonus = -3 + Math.floor(Math.random() * 6) + npcLevel;
    npcCritBonus = -3 + Math.floor(Math.random() * 6) + npcLevel;
    npcCritBonus > 20 ? npcCritBonus = 20 : npcCritBonus;
    npcCritBonus < 0 ? npcCritBonus = 0 : npcCritBonus;
    npcDodgeBonus = -3 + Math.floor(Math.random() * 6) + npcLevel;
    npcDodgeBonus > 20 ? npcDodgeBonus = 20 : npcDodgeBonus;
    npcDodgeBonus < 0 ? npcDodgeBonus = 0 : npcDodgeBonus;
}
function readyTournamentBattle(i) {
    resetLog();
    npcLevel = champions[i].stats[0];
    npcBattleHP = champions[i].stats[1];
    npcHP = npcBattleHP;
    npcDamageBonus = champions[i].stats[2];
    npcCritBonus = champions[i].stats[3];
    npcDodgeBonus = champions[i].stats[4];

    npcColorGreen = 255;
    npcColorRed = 0;
    playerColorGreen = 255;
    playerColorRed = 0;
    playerHPBar = 100;
    npcHPBar = 100;

    npcCharacter = champions[i].character;

    attackTurn = true;
    playerBattleHP = playerHP;
    npcBattleHP = npcHP;

    isTournament = true;
    whichChampion = i;
    changeSite(1);
}

function playerAttack() {
    attackTurn = false;
    resetLog();
    let damage = calcPlayerDamage();
    playerCritChance() ? (damage *= 2, npcCritLog = 'Critical Strike') : damage;
    npcDodgeChance() ? (damage = 0, npcDodgeLog = 'Dodge') : damage;
    npcDodgeLog ? npcCritLog = '': npcCritLog;
    if (npcBattleHP <= damage) {
        npcBattleHP = 0;
        npcHPBar = 0;
        winOrLose = 'You Won!';
        calcPlayerGold(true);
        calcPlayerXP(true);
        changeSite(4);
    }
    else {
    npcBattleHP -= damage;
    npcHPBar = npcBattleHP/npcHP * 100;
    npcHPBar >= 50 ? npcColorGreen = 255 : npcColorGreen = Math.floor(npcHPBar * 5.1);
    npcHPBar <= 50 ? npcColorRed = 255 : npcColorRed = Math.floor((npcHPBar-50) * 5.1);
    
    npcDamageLog = damage;

    show();

    setTimeout(npcAttack, 500);
    }
}

function npcAttack() {
    resetLog();
    let damage = calcNpcDamage();
    npcCritChance() ? (damage *= 2, playerCritLog = 'Critical Strike') : damage;
    playerDodgeChance() ? (damage = 0, playerDodgeLog = 'Dodge') : damage;
    playerDodgeLog ? playerCritLog = '': playerCritLog;
    if (playerBattleHP <= damage) {
        playerBattleHP = 0;
        playerHPBar = 0;
        winOrLose = 'You Lost :(';
        calcPlayerGold(false);
        calcPlayerXP(false);
        changeSite(4);
    }
    else {
        playerBattleHP -= damage;
        playerHPBar = playerBattleHP/playerHP * 100;
        playerHPBar >= 50 ? playerColorGreen = 255 : playerColorGreen = Math.floor(playerHPBar * 5.1);
        playerHPBar <= 50 ? playerColorRed = 255 : playerColorRed = Math.floor((playerHPBar-50) * 5.1);

        playerDamageLog = damage;
        attackTurn = true;

        show();
        
    }
}

function resetLog() {
    playerCritLog = '';
    playerDodgeLog = '';
    playerDamageLog = '';

    npcCritLog = '';
    npcDodgeLog = '';
    npcDamageLog = '';
}

function purchaseItem(i) {
    if (storeItems[i].price > playerGold) {
        //display not enough money
    }
    else {
        if (storeItems[i].type1 == 'health') {
            playerHP += storeItems[i].value1;
        }
        if (storeItems[i].type2 == 'damage') {
            playerDamageBonus += storeItems[i].value2;
            calcPlayerDisplayDamage();
        }
        if (storeItems[i].type3 == 'dodge') {
            playerDodgeBonus += storeItems[i].value3;
        }
        if (storeItems[i].type4 == 'crit') {
            playerCritBonus += storeItems[i].value4;
        }
        playerGold -= storeItems[i].price;
        storeItems[i].inStock = false;
    }
    openStore();
}
function changeSite(siteNumber) {
    whichSite = siteNumber;
    show();
}
function leaveTournament() {
    isTournament = false;
    changeSite(0);
}



// Aggresjonsfunksjon
function liveshareStatus() {
    let dritt = 'dritt';
    let liveshare = dritt;
    if (liveshare != dritt);
    return false;
}