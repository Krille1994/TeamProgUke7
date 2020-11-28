// Modell

let whichSite = 0;
let playerHP = 1000;
let playerLevel = 1;
let playerXP = 0;
let xpEarned = 0;
let XPNeeded = playerLevel * 100;
let playerDamageBonus = 20;
let playerGold = 10000;
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
    {name: 'Balder', stats: [2, 220, 3, 2, 2], unlocked: true, alive: true, gold: 100, experience: 100},
    {name: 'Seronicus', stats: [5, 520, 9, 5, 7], unlocked: false, alive: true, gold: 100, experience: 100},
    {name: 'Bertrix', stats: [2, 220, 3, 2, 2], unlocked: false, alive: true, gold: 100, experience: 100},
    {name: 'Foll', stats: [5, 520, 9, 5, 7], unlocked: false, alive: true, gold: 100, experience: 100},
    {name: 'Hank', stats: [2, 220, 3, 2, 2], unlocked: false, alive: true, gold: 100, experience: 100},
    {name: 'Whaler', stats: [5, 520, 9, 5, 7], unlocked: false, alive: true, gold: 100, experience: 100},
    {name: 'Crank', stats: [2, 220, 3, 2, 2], unlocked: false, alive: true, gold: 100, experience: 100},
    {name: 'Frank', stats: [5, 520, 9, 5, 7], unlocked: false, alive: true, gold: 100, experience: 100},
    {name: 'Rixus', stats: [5, 520, 9, 5, 7], unlocked: false, alive: true, gold: 100, experience: 100}
];


// Store
const storeItems = [
    {item: 'name1', price: 100, type: 'health', look: 'hei', value: 10, inStock: true},
    {item: 'name2', price: 200, type: 'damage', look: 'hallo', value: 20, inStock: true},
    {item: 'name3', price: 300, type: 'health', look: 'ollah', value: 20, inStock: true},
    {item: 'name4', price: 400, type: 'critical', look: 'elloh', value: 20, inStock: true},
    {item: 'name5', price: 500, type: 'health', look: 'hey', value: 20, inStock: true},
    {item: 'name6', price: 600, type: 'dodge', look: 'hoy', value: 20, inStock: true},
    {item: 'name7', price: 100, type: 'health', look: 'hei', value: 20, inStock: true},
    {item: 'name8', price: 200, type: 'damage', look: 'hallo', value: 20, inStock: true},
    {item: 'name9', price: 100, type: 'health', look: 'hei', value: 10, inStock: true},
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
        if (storeItems[i].type == 'health') {
            playerHP += storeItems[i].value;
        }
        if (storeItems[i].type == 'damage') {
            playerDamageBonus += storeItems[i].value;
            calcPlayerDisplayDamage();
        }
        if (storeItems[i].type == 'dodge') {
            playerDodgeBonus += storeItems[i].value;
        }
        if (storeItems[i].type == 'critical') {
            playerCritBonus += storeItems[i].value;
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